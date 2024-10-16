const asyncWrapper = require('../../middleware/async')
const sql = require('mssql');
const getSingleSuspect = asyncWrapper(async (req, res) => {
    const { SuspectId } = req.params;
    console.log(req.params)
    const request = new sql.Request();
    const query = `SELECT * FROM Suspects where SuspectId=@SuspectId`;
    request.input('SuspectId', sql.NVarChar, SuspectId);
    request.query(query).then(result => {
        if (result.recordset.length < 1) {
            return res.status(404).json({ success: false, message: "Unable to Find the Suspcect" });
        }
        res.status(200).json({ success: true, data: result.recordset[0] })
    }).catch(err => {
        res.status(500).json({ success: false, error: err })
    })
})
module.exports = getSingleSuspect