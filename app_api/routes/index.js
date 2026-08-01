var express = require('express');
var router = express.Router();
var tripsController = require('../controllers/trips');

router.get('/trips', tripsController.tripsList);
router.get('/travel', tripsController.travelList);

module.exports = router;
