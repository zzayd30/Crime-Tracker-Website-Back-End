const asyncWrapper = require('../../middleware/async');
const sql = require('mssql');
const deleteVictim = asyncWrapper((req, res) => {
    const { VictimId } = req.params;
    console.log(req.params)
    const request = new sql.Request();
    const query = `Delete from Victims where victimId=@VictimId`;
    request.input('VictimId', sql.NVarChar, VictimId);
    request.input('UserId', sql.NVarChar, req.user.UserId)

    request.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: err.message });
        }
        else {
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ success: false, message: "Victim Not Found" });
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
                        return res.status(200).json({ success: true, message: "Victim Deleted Successfully" });
                    }
                })
        }

    });
})
module.exports = deleteVictim