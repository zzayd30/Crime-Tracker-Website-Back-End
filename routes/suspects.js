const express = require('express');
const app = express();
const router = express.Router();
const getSupects = require('../controllers/suspects/getSuspects');
const getSingleSuspect = require('../controllers/suspects/getSingleSuspect');
const addSuspect = require('../controllers/suspects/addSuspect');
const editSuspect = require('../controllers/suspects/editSuspect');
const deleteSuspect = require('../controllers/suspects/deleteSuspect');
//Test Routes

router.route('/suspects').get(getSupects);
router.route('/suspects/:SuspectId').get(getSingleSuspect);
router.route('/suspects/:SuspectId').delete(deleteSuspect);
router.route('/suspects/add-suspect').put(addSuspect);
router.route('/suspects/edit-suspect').put(editSuspect);

module.exports = router;