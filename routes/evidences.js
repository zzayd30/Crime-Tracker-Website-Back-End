const express = require('express');
const AddEvidence = require('../controllers/evidences/addEvidence');
const app = express();
const router = express.Router();
//Test Routes

router.route('/evidences/add-evidences').put(AddEvidence);

module.exports = router;