const asyncWrapper = require("../../middleware/async");
const sql = require('mssql')
const getSupects = asyncWrapper(async (req, res) => {
    const { sort, CaseId, SuspectName } = req.query
    let query = "SELECT CrimeId,S.SuspectId,SuspectName,Gender,Age,Height,Weight FROM Suspects S left join Crime_Suspect CS on S.suspectId=CS.SuspectId";
    if (sort) {
        console.log("In sort")
        query = `SELECT CrimeId,S.SuspectId,SuspectName,Gender,Age,Height,Weight FROM Suspects S left join Crime_Suspect CS on S.suspectId=CS.SuspectId order by ${sort} asc`;
    }
    if (CaseId) {
        query = `SELECT CrimeId,S.SuspectId,SuspectName,Gender,Age,Height,Weight FROM Suspects S left join Crime_Suspect CS on S.suspectId=CS.SuspectId where CaseId LIKE '%${CaseId}%'  order by ${sort} asc`;
    }
    else if (SuspectName) {
        query = `SELECT CrimeId,S.SuspectId,SuspectName,Gender,Age,Height,Weight FROM Suspects S left join Crime_Suspect CS on S.suspectId=CS.SuspectId where SuspectName LIKE '%${SuspectName}%' order by ${sort} asc`;
    }
    const request = new sql.Request();
    console.log(query);
    request.query(query, async (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message });
        }
        else {
            res.status(200).json({ success: true, data: result.recordset });
        }
    });
})
module.exports = getSupects;