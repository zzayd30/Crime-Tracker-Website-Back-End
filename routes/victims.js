const express = require('express');
const addVictim = require('../controllers/victims/addVictim');
const editVictim = require('../controllers/victims/editVictim');
const getSingleVictim = require('../controllers/victims/getSingleVictim');
const getVictims = require('../controllers/victims/getVictims');
const deleteVictim = require('../controllers/victims/deleteVictim');
const app = express();
const router = express.Router();

router.route('/victims').get(getVictims);
router.route('/victims/:VictimId').get(getSingleVictim);
router.route('/victims/:VictimId').delete(deleteVictim);
router.route('/victims/add-victim').put(addVictim);
router.route('/victims/edit-victim').put(editVictim);


module.exports = router;