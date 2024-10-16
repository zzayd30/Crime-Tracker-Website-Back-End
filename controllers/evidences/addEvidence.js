const { nanoid } = require('nanoid');
const asynWrapper = require('../../middleware/async');
const sql = require('mssql');
const AddEvidence = asynWrapper(async (req, res) => {
    const { CrimeId, EvidenceType, Description, CollectedBy } = req.body;
    console.log(req.body);
    const request = new sql.Request();
    const evidenceId = nanoid();
    const query = "INSERT INTO EVIDENCES(evidenceId,EvidenceType,Description) Values (@evidenceId,@EvidenceType, @Description)";
    request.input("evidenceId", sql.NVarChar, evidenceId)
    request.input("EvidenceType", sql.NVarChar, EvidenceType)
    request.input("Description", sql.NVarChar, Description);
    request.input('UserId', sql.NVarChar, req.user.UserId)
    request.query(query, async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: err.message });
        }
        else {
            request.query(`Select * from Officers where officerName='${CollectedBy}'`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ success: false, message: err.message });
                }
                else {
                    console.log(result.recordset[0])
                    if (!result.recordset[0]) {
                        return res.status(404).json({ success: false, message: "Officer Not Found" });
                    }
                    const officerData = result.recordset[0];
                    console.log("This is officerData", officerData)
                    const OfficerId = officerData.OfficerId;
                    const insertQuery = `INSERT INTO Crime_Officer_Evidence(CrimeId,OfficerId,EvidenceId) Values ('${CrimeId}','${OfficerId}','${evidenceId}')`
                    console.log(insertQuery)
                    request.query(insertQuery, (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ success: false, message: err.message });
                        }
                        const query2 = `Update Evidences_audit 
                set UserId=@UserId
                WHERE @EvidenceId = @EvidenceId`
                        request.query(query2, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ success: false, message: err.message });
                            }
                            else {
                                return res.status(200).json({ success: true, message: "Evidence was successfully added", CrimeId: CrimeId });
                            }
                        })
                    })
                }
            })
            const evidenceQuery = `INSERT INTO Crime_Officer_Evidence(CrimeId,EvidenceId,OfficerId) Values`
        }
    })
})
module.exports = AddEvidence