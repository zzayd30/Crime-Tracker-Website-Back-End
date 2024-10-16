const asyncWrapper = require('../../middleware/async')
const sql = require('mssql');
const getVictimsAudit = asyncWrapper(async (req, res) => {
    const request = new sql.Request();
    const query = "select * from VictimAuditView;"
    request.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: err.message });
        }
        return res.status(200).json({ success: true, data: result.recordset });
    })
})
module.exports = getVictimsAudit;