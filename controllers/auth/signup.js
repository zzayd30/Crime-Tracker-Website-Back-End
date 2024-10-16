// const { nanoid } = require("nanoid");
const sql = require("mssql");
const asyncWrapper = require('../../middleware/async');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid')

const signup = asyncWrapper(async (req, res) => {
    const { FirstName, LastName, Age, Username, Password, Email } = req.body

    if (!Username || !FirstName || !LastName || !Password || !Email || !Age) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const request = new sql.Request();

    const query = "INSERT INTO [USER] (UserId,FirstName,LastName,Email,Role,Age,Username, Password,Registration_Date) values (@UserId,@FirstName,@LastName,@Email,@Role,@Age,@Username,@Password,@Registration_Date)";


    request.input('UserId', sql.NVarChar, nanoid.nanoid());
    request.input('FirstName', sql.NVarChar, FirstName);
    request.input('LastName', sql.NVarChar, LastName);
    request.input('Email', sql.NVarChar, Email);
    request.input('Role', sql.NVarChar, "user");
    request.input('Age', sql.Int, Age);
    request.input('Username', sql.NVarChar, Username);
    request.input('Password', sql.NVarChar, hashedPassword);
    request.input('Registration_Date', sql.DateTime, new Date().toISOString().slice(0, 10));

    request.query(query, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ success: false, message: err.message })
        } else {
            res.status(200).json({ success: true });
        }
    });
})
module.exports = signup;