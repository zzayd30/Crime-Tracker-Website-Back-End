const asyncWrapper = require('../../middleware/async');
const sql = require('mssql');
const deleteSuspect = asyncWrapper((req, res) => {
    const { SuspectId } = req.params;
    console.log(req.params)
    const request = new sql.Request();
    const query = `Delete from Suspects where suspectId=@SuspectId`;
    request.input('SuspectId', sql.NVarChar, SuspectId);
    request.input('UserId', sql.NVarChar, req.user.UserId);
    request.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: err.message });
        }
        else {
            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ success: false, message: "Suspect Not Found" });
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
                    const query2 = `Update SuspectAudit 
                        set UserId=@UserId
                        WHERE @SuspectId = @SuspectId`
                    request.query(query2, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ success: false, message: err.message });
                        }
                        else {
                            return res.status(200).json({ success: true, message: "Suspect Deleted Successfully" });

                        }
                    })
                }
            })
        }

    });
})
module.exports = deleteSuspect