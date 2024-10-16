const asyncWrapper = require('../../middleware/async')
const sql = require('mssql');
const editSuspect = asyncWrapper(async (req, res) => {
    console.log("In edit Supsect");
    const { SuspectId, SuspectName, Age, Gender, Height, Weight } = req.body;
    console.log(req.body);
    const request = new sql.Request();
    const query = `UPDATE SUSPECTS
    SET SuspectName=@SuspectName,Age=@Age,Gender=@Gender,Height=@Height,Weight=@Weight
    where SuspectId=@SuspectId;`;
    request.input('SuspectId', sql.NVarChar, SuspectId);
    request.input('Age', sql.Int, Age);
    request.input('SuspectName', sql.NVarChar, SuspectName);
    request.input('Gender', sql.NVarChar, Gender);
    request.input('Height', sql.NVarChar, Height);
    request.input('Weight', sql.NVarChar, Weight);
    request.input('UserId', sql.NVarChar, req.user.UserId);
    request.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Unable to Update the Suspect" });
        }
        else {
            console.log(result);
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ success: false, message: "Suspect not found" });
            }
            const query2 = `Update SuspectAudit 
            set UserId=@UserId
            WHERE @SuspectId = @SuspectId`
            request.query(query2, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ success: false, message: err.message });
                }
                else {
                    return res.status(200).json({ success: true, message: "Updated the Suspect Successfully" });

                }
            })
        }
    })
})
module.exports = editSuspect;