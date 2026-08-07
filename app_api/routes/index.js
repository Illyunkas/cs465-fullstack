var express = require('express');
var router = express.Router();
var tripsController = require('../controllers/trips');

// Standardized REST routes for trip resources.
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindOne);
router.post('/trips', tripsController.tripsAddTrip);
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', tripsController.tripsDeleteTrip);

module.exports = router;
