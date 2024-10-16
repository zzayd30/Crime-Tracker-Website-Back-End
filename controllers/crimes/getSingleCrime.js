const asyncWrapper = require('../../middleware/async');
const sql = require('mssql');
const getSingleCrime = asyncWrapper(async (req, res) => {
    const request = new sql.Request();
    const { CrimeId } = req.params;
    const query1 = `Select Concat(FirstName,' ',LastName) as ReporterName, Location, CrimeType, Date, Time, Description,OfficerName as HandledBy
    from
      Crimes C left join [User] U on C.ReporterID=U.UserId left join Crime_Officer_Evidence COE
      on COE.crimeId=C.crimeId left join Officers O on o.OfficerId=COE.OfficerId where C.CrimeId=@CrimeId`;
    const query2 = `select S.SuspectId, SuspectName,Age,Gender,Height,Weight 
    from 
    Crimes C join
    Crime_suspect CS on C.CrimeId=CS.CrimeId
    join Suspects S on S.SuspectId=CS.SuspectID
    where C.CrimeId=@CrimeId`
    const query3 = `select V.VictimId,VictimName,Age,Gender,Height,Weight 
    from 
    Crimes C join
    Crime_Victim CV on C.CrimeId=CV.CrimeId
    join Victims V on V.VictimId=CV.VictimID
    where C.CrimeId=@CrimeId`
    const query4 = `select E.EvidenceId, E.EvidenceType, E.Description,OfficerName as CollectedBy
    from
      Crimes C join
      Crime_Officer_Evidence COE on C.CrimeId=COE.CrimeId
      join Evidences E on E.EvidenceId=COE.EvidenceID
      JOIN Officers O on O.OfficerId=COE.OfficerId where C.CrimeId=@CrimeId`
    request.input('CrimeId', sql.NVarChar, CrimeId);
    request.query(query1, async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: err.message });
        }
        else {
            if (!result.recordset[0]) {
                return res.status(404).json({ success: false, message: "Crime not found" });
            }
            data = result.recordset[0];
            console.log(result.recordset[0]);
            request.query(query2, async (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ success: false, message: err.message });
                }
                else {
                    console.log("THis is data", data)
                    console.log(result.recordset)
                    data.Suspects = result.recordset;
                    console.log("This is Suspects", data.suspects);
                    request.query(query3, async (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ success: false, message: err.message });
                        }
                        else {
                            data.Victims = result.recordset;
                            request.query(query4, async (err, result) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({ success: false, message: err.message });
                                }
                                else {
                                    data.Evidences = result.recordset;
                                    console.log(data.Evidences);
                                    return res.status(200).json({ success: true, data: data });
                                }
                            })
                        }
                    })
                }
            })
        }
    })



})

module.exports = getSingleCrime;