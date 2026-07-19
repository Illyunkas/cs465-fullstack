var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin');

/* GET admin trip list. */
router.get('/trips', adminController.trips);
router.get('/trips/new', adminController.newTrip);
router.post('/trips', adminController.createTrip);
router.get('/trips/:index/edit', adminController.editTrip);
router.post('/trips/:index', adminController.updateTrip);

module.exports = router;
