

var express = require('express');
var router = express.Router();

// Import your controllers (you will need to create/have these files)
var ctrlMain = require('../controllers/travel');
var ctrlRooms = require('../controllers/rooms');
var ctrlMeals = require('../controllers/meals');

/* GET home page. */
router.get('/', ctrlMain.travel);

/* GET rooms page. */
router.get('/rooms', ctrlRooms.rooms);

/* GET meals page. */
router.get('/meals', ctrlMeals.meals);

module.exports = router;