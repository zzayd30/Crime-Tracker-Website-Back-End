const asyncWrapper = require("../../middleware/async");
const sql = require('mssql');
const getCrimes = asyncWrapper(async (req, res) => {
    const { sort, CrimeType, ReporterName, Description, Location } = req.query

    console.log(req.query)
    let query = "Select CrimeId, Concat(FirstName,' ',LastName) as ReporterName, CrimeType, Location, Date, Time, Description, CreatedAt, UpdatedAt from Crimes inner join[User] on[User].userId = Crimes.ReporterId";

    if (sort) {
        query = `Select CrimeId, Concat(FirstName,' ',LastName) as ReporterName, CrimeType, Location, Date, Time, Description, CreatedAt, UpdatedAt from Crimes
        inner join [User] on [User].userId=Crimes.ReporterId
        order by ${sort} asc`;
    }
    if (CrimeType) {
        query = `Select CrimeId, Concat(FirstName,' ',LastName) as ReporterName, CrimeType, Location, Date, Time, Description, CreatedAt, UpdatedAt from Crimes
        inner join [User] on [User].userId=Crimes.ReporterId
        where CrimeType LIKE '%${CrimeType}%'
        order by CrimeId asc`;
    }
    else if (ReporterName) {
        query = `Select CrimeId, Concat(FirstName,' ',LastName) as ReporterName, CrimeType, Location, Date, Time, Description, CreatedAt, UpdatedAt from Crimes
        inner join [User] on [User].userId=Crimes.ReporterId
        where Username LIKE '%${ReporterName}%'
        order by CrimeId asc`;
    }
    else if (Description) {
        query = `Select CrimeId, Concat(FirstName,' ',LastName) as ReporterName, CrimeType, Location, Date, Time, Description, CreatedAt, UpdatedAt from Crimes
        inner join [User] on [User].userId=Crimes.ReporterId
        where Description LIKE '%${Description}%'
        order by CrimeId asc`;
    }
    else if (Location) {
        query = `Select CrimeId, Concat(FirstName,' ',LastName) as ReporterName, CrimeType, Location, Date, Time, Description, CreatedAt, UpdatedAt from Crimes
        inner join [User] on [User].userId=Crimes.ReporterId
        where Location LIKE '%${Location}%'
        order by CrimeId asc`;
    }
    const request = new sql.Request();
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
module.exports = getCrimes;