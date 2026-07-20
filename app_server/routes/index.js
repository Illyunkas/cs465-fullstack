

var express = require('express');
var router = express.Router();
var path = require('path');

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

/* Restore static content routes used by navigation tabs. */
router.get('/news', function(req, res) {
	res.redirect('/news.html');
});

router.get('/about', function(req, res) {
	res.redirect('/about.html');
});

router.get('/contact', function(req, res) {
	res.redirect('/contact.html');
});

module.exports = router;