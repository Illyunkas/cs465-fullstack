var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var adminController = require('../controllers/admin');

function authenticateJWT(req, res, next) {
	var authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Bearer token required' });
	}

	var token = authHeader.slice(7);
	jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
		if (error) {
			return res.status(401).json({ message: 'Invalid or expired token' });
		}

		req.auth = decoded;
		return next();
	});
}

router.use(authenticateJWT);

router.get('/', adminController.dashboard);

/* GET admin trip list. */
router.get('/trips', adminController.trips);
router.get('/trips/new', adminController.newTrip);
router.post('/trips', adminController.createTrip);
router.get('/trips/:id/edit', adminController.editTrip);
router.post('/trips/:id', adminController.updateTrip);
router.post('/trips/:id/delete', adminController.deleteTrip);

/* GET/POST admin room and meal creation forms. */
router.get('/rooms', adminController.rooms);
router.get('/rooms/new', adminController.newRoom);
router.post('/rooms', adminController.createRoom);
router.get('/rooms/:index/edit', adminController.editRoom);
router.post('/rooms/:index', adminController.updateRoom);
router.post('/rooms/:index/delete', adminController.deleteRoom);

router.get('/meals', adminController.meals);
router.get('/meals/new', adminController.newMeal);
router.post('/meals', adminController.createMeal);
router.get('/meals/:index/edit', adminController.editMeal);
router.post('/meals/:index', adminController.updateMeal);
router.post('/meals/:index/delete', adminController.deleteMeal);

module.exports = router;
