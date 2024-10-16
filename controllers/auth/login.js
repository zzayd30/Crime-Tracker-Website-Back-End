const asyncWrapper = require("../../middleware/async");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const login = asyncWrapper(async (req, res) => {
    console.log("This is req", req.body);
    const { Username, Password } = req.body;

    const request = new sql.Request();

    const query = "SELECT * FROM [USER] WHERE Username=@Username";
    request.input('Username', sql.NVarChar, Username);

    request.query(query, async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(404).json({ success: false, message: `Invalid Credentials` })
        }
        else {
            const User = result.recordset[0]
            console.log(User)
            if (User && (await bcrypt.compare(Password, User.Password))) {
                delete (User.Password)
                const token = jwt.sign(User, process.env.JWT_SECRET_KEY);
                return res.status(200).json({ success: true, message: "Your are logged in Successfully", User: User, token: token })
            }
            res.status(404).json({ success: false, message: "Invalid Credentials" });
        }
    });
})
module.exports = login;