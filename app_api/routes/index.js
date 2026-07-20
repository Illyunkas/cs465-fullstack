var express = require('express');
var router = express.Router();
var tripsController = require('../controllers/trips');

router.get('/trips', tripsController.tripsList);

module.exports = router;
