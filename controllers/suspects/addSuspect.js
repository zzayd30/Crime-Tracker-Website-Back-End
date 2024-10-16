const asyncWrapper = require('../../middleware/async');
const sql = require('mssql')
const { nanoid } = require('nanoid')
const addSuspect = asyncWrapper((req, res) => {
    const { CrimeId, SuspectName, Age, Gender, Height, Weight } = req.body;
    console.log(req.body);
    const request = new sql.Request();
    const suspectId = nanoid();
    const query = `INSERT INTO SUSPECTS(SuspectId,SuspectName,Gender,Age,Height,Weight) values (@SuspectId, @SuspectName, @Gender, @Age, @Height,@Weight)`;
    request.input('SuspectId', sql.NVarChar, suspectId);
    request.input('Age', sql.Int, Age);
    request.input('SuspectName', sql.NVarChar, SuspectName);
    request.input('Gender', sql.NVarChar, Gender);
    request.input('Height', sql.NVarChar, Height);
    request.input('Weight', sql.NVarChar, Weight);
    request.input('UserId', sql.NVarChar, req.user.UserId)

    request.query(query, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: err.message });
        }
        else {
            const query1 = `INSERT INTO Crime_Suspect(CrimeId,SuspectId) Values ('${CrimeId}', '${suspectId}')`
            request.query(query1, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ success: false, message: err.message });
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
                        res.status(200).json({ success: true, msg: "Suspect Added Successfully", CrimeId: CrimeId })

                    }
                })
            })
        }
    })

})
module.exports = addSuspect