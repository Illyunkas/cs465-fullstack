var express = require('express');
var router = express.Router();
var tripsController = require('../controllers/trips');

// Standardized REST routes for trip resources.
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripId', tripsController.tripsFindOne);

module.exports = router;
