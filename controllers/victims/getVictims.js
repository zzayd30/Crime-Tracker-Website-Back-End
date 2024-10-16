const asyncWrapper = require("../../middleware/async");
const sql = require('mssql')
const getVictims = asyncWrapper(async (req, res) => {
    const { sort, CaseId, VictimName } = req.query
    let query = "SELECT CrimeId,S.VictimId,VictimName,Gender,Age,Height,Weight FROM Victims S left join Crime_Victim CS on S.victimId=CS.VictimId";
    if (sort) {
        console.log("In sort")
        query = `SELECT CrimeId,S.VictimId,VictimName,Gender,Age,Height,Weight FROM Victims S left join Crime_Victim CS on S.victimId=CS.VictimId order by ${sort} asc`;
    }
    if (CaseId) {
        query = `SELECT CrimeId,S.VictimId,VictimName,Gender,Age,Height,Weight FROM Victims S left join Crime_Victim CS on S.victimId=CS.VictimId where CaseId LIKE '%${CaseId}%'  order by ${sort} asc`;
    }
    else if (VictimName) {
        query = `SELECT CrimeId,S.VictimId,VictimName,Gender,Age,Height,Weight FROM Victims S left join Crime_Victim CS on S.victimId=CS.VictimId where VictimName LIKE '%${VictimName}%' order by ${sort} asc`;
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
module.exports = getVictims;