const express = require('express');
const getSuspectsAudit = require('../controllers/audit/getSuspectAudit');
const getVictimsAudit = require('../controllers/audit/getVictimAudit');
const app = express();
const router = express.Router();

//Test Routes
router.route('/suspectAudit').get(getSuspectsAudit)
router.route('/victimAudit').get(getVictimsAudit)

module.exports = router;