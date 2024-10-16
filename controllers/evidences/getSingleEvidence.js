const asyncWrapper = require("../../middleware/async")
const sql = require("mssql");
const getSingleEvidence = asyncWrapper((req, res) => {
    const { EvidenceId } = req.params;
    console.log(req.params)
    const request = new sql.Request();
    const query =
        res.status(500).json({ success: true })
})

module.exports = getSingleEvidence