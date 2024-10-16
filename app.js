require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connectDb');
const authRoutes = require('./routes/auth.js');
const crimeRoutes = require('./routes/crimes.js');
const suspectsRoute = require('./routes/suspects.js')
const evidencesRoute = require('./routes/evidences.js')
const victimRoutes = require('./routes/victims.js')
const auditRoutes = require('./routes/audit.js')
const auth = require('./middleware/auth.js')
const app = express();
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
require('dotenv').config();

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


app.use(cors(corsOptions)) // Use this after the variable declaration

//midddleware
app.use(express.static('./public'));

app.use(express.urlencoded({ extended: false }))

app.use(express.json());

//Routes
app.use(authRoutes);

// app.use(notFound);

// app.use(errorHandler);

//will check authentication
app.use(auth);

app.use(crimeRoutes);

app.use(suspectsRoute);

app.use(evidencesRoute);

app.use(victimRoutes);

app.use(auditRoutes);



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
    connectDb();
})
