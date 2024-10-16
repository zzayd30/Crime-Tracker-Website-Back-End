const asyncWrapper = require('../../middleware/async')
const sql = require('mssql');
const editVictim = asyncWrapper(async (req, res) => {
    console.log("In edit Supsect");
    const { VictimId, VictimName, Age, Gender, Height, Weight } = req.body;
    console.log(req.body);
    const request = new sql.Request();
    const query = `UPDATE VictimS
    SET VictimName=@VictimName,Age=@Age,Gender=@Gender,Height=@Height,Weight=@Weight
    where VictimId=@VictimId;`;
    request.input('VictimId', sql.NVarChar, VictimId);
    request.input('Age', sql.Int, Age);
    request.input('VictimName', sql.NVarChar, VictimName);
    request.input('Gender', sql.NVarChar, Gender);
    request.input('Height', sql.NVarChar, Height);
    request.input('Weight', sql.NVarChar, Weight);
    request.input('UserId', sql.NVarChar, req.user.UserId)

    request.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Unable to Update the Victim" });
        }
        else {
            console.log(result);
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ success: false, message: "Victim not found" });
            }
            const query2 = `Update VictimAudit 
                set UserId=@UserId
                WHERE @VictimId = @VictimId`
                request.query(query2, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ success: false, message: err.message });
                    }
                    else {
                        return res.status(200).json({ success: true, message: "Updated the Victim Successfully" });
                    }
                })
        }
    })
})
module.exports = editVictim;