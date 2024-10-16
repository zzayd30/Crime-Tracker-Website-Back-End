const asyncWrapper = require('../../middleware/async');
const sql = require('mssql');
const { nanoid } = require('nanoid');

const addVictim = asyncWrapper(async (req, res) => {
    const { CrimeId, VictimName, Age, Gender, Height, Weight } = req.body;
    console.log(req.body);
    const request = new sql.Request();
    const VictimId = nanoid();
    const query = `INSERT INTO Victims(VictimId,VictimName,Gender,Age,Height,Weight) values (@VictimId, @VictimName, @Gender, @Age, @Height,@Weight)`;
    request.input('VictimId', sql.NVarChar, VictimId);
    request.input('Age', sql.Int, Age);
    request.input('VictimName', sql.NVarChar, VictimName);
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
            const query1 = `INSERT INTO Crime_Victim(CrimeId,VictimId) Values ('${CrimeId}', '${VictimId}')`
            request.query(query1, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ success: false, message: err.message });
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
                        res.status(200).json({ success: true, msg: "Victim Added Successfully", CrimeId: CrimeId })
                    }
                })
            })
        }
    })
})

module.exports = addVictim;