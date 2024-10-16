const asyncWrapper = require("../../middleware/async");
const sql = require('mssql')
const nanoid = require('nanoid');

const addCrime = asyncWrapper(async (req, res) => {
    console.log(req.body)
    const { CrimeType, Location, Description, Suspects, ReporterId, Victims } = req.body;
    const request = new sql.Request();
    let query = "INSERT INTO CRIMES(crimeId,ReporterID,CrimeType,Location,Date,Time,Description,CreatedAt,UpdatedAt) Values (@CrimeId, @ReporterId, @CrimeType, @Location, @Date, @Time, @Description, @CreatedAt, @UpdatedAt)"

    const CrimeId = nanoid.nanoid();
    request.input("CrimeId", sql.NVarChar, CrimeId);
    request.input("ReporterId", sql.NVarChar, ReporterId);
    request.input("CrimeType", sql.NVarChar, CrimeType);
    request.input("Location", sql.NVarChar, Location);
    request.input("Date", sql.Date, new Date().toISOString().slice(0, 10));
    request.input("Time", sql.DateTime, new Date().toISOString());
    request.input("Description", sql.NVarChar, Description);
    request.input("CreatedAt", sql.Date, new Date().toISOString());
    request.input("UpdatedAt", sql.Date, new Date().toISOString());

    request.query(query, async (err, result) => {
        var id;
        if (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: err.message });
        }
        else {
            Suspects.map(suspect => {
                let suspectId = nanoid.nanoid();
                const testQuery = `SELECT * FROM SUSPECTS where suspectName='${suspect}'`
                request.query(testQuery, async (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ success: false, message: err.message });
                    }
                    else {
                        const suspectData = result.recordset[0];
                        console.log(suspectData)
                        let newQuery;
                        if (!suspectData) {
                            newQuery = `INSERT INTO suspects(SuspectId,suspectName) values ('${suspectId}','${suspect}')`
                        } else {
                            suspectId = suspectData.SuspectId;

                            newQuery = `INSERT INTO suspects(SuspectId,suspectName,Age,Gender,Height,Weight) values ('${suspectData.SuspectId}','${suspect}',${suspectData.Age},'${suspectData.Gender}','${suspectData.Height}','${suspectData.Weight}')`

                        }
                        console.log(newQuery)
                        request.query(newQuery, async (err, result) => {
                            if (err) {
                                console.log("Error:1", err)
                                return res.status(500).json({ success: false, message: err.message });
                            }
                            else {
                                const suspectQuery = `INSERT INTO CRIME_SUSPECT(crimeId,SuspectId)
                                VALUES ('${CrimeId}','${suspectId}')`
                                request.query(suspectQuery, async (err, result) => {
                                    if (err) {
                                        console.log("Error2", err)
                                        return res.status(500).json({ success: false, message: err.message });
                                    }
                                });
                            }
                        });
                    }
                })
            })
            Victims.map(victim => {
                let victimId = nanoid.nanoid();
                const testQuery = `SELECT * FROM VICTIMS where victimName='${victim}'`
                request.query(testQuery, async (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ success: false, message: err.message });
                    }
                    else {
                        const victimData = result.recordset[0];
                        console.log("This is victim Data", victimData)
                        let newQuery;
                        if (!victimData) {
                            newQuery = `INSERT INTO Victims(VictimId,VictimName) values ('${victimId}','${victim}')`
                        } else {
                            victimId = victimData.VictimId
                            newQuery = `INSERT INTO victims(VictimId,victimName,Age,Gender,Height,Weight) values ('${victimId}','${victim}',${victimData.Age},'${victimData.Gender}','${victimData.Height}','${victimData.Weight}')`
                        }
                        console.log("This is new query", newQuery)
                        request.query(newQuery, async (err, result) => {
                            if (err) {
                                console.log("Error3", err)
                                return res.status(500).json({ success: false, message: err.message });
                            }
                            else {
                                const victimQuery = `INSERT INTO CRIME_VICTIM(victimId,CrimeId)
                                values
                                ('${victimId}', '${CrimeId}')`;
                                request.query(victimQuery, async (err, result) => {
                                    if (err) {
                                        console.log("Error4", err)
                                        return res.status(500).json({ success: false, message: err.message });
                                    }

                                });
                            }
                        });
                    }
                })
            })
            return res.status(200).json({ success: true, CrimeId: CrimeId });
        }
    });



})
module.exports = addCrime;