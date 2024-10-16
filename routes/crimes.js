const express = require('express');
const app = express();
const router = express.Router();
const getCrimes = require("../controllers/crimes/getCrimes")
const addCrime = require("../controllers/crimes/addCrime")
const getSingleCrime = require("../controllers/crimes/getSingleCrime")
//Test Routes

router.route('/crimes').get(getCrimes);
router.route('/crimes/:CrimeId').get(getSingleCrime);
router.route('/crimes/add-crime').put(addCrime);

module.exports = router;