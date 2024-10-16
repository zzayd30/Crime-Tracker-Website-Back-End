const asyncWrapper = require('../../middleware/async')
const sql = require('mssql');
const getSingleVictim = asyncWrapper(async (req, res) => {
    const { VictimId } = req.params;
    console.log(req.params)
    const request = new sql.Request();
    const query = `SELECT * FROM Victims where VictimId=@VictimId`;
    request.input('VictimId', sql.NVarChar, VictimId);
    request.query(query).then(result => {
        if (result.recordset.length < 1) {
            return res.status(404).json({ success: false, message: "Unable to Find the Victim" });
        }
        res.status(200).json({ success: true, data: result.recordset[0] })
    }).catch(err => {
        res.status(500).json({ success: false, error: err })
    })
})
module.exports = getSingleVictim