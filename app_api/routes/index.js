var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var authController = require('../controllers/authentication');
var tripsController = require('../controllers/trips');

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

// Standardized REST routes for trip resources.
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindOne);
router.post('/trips', authenticateJWT, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', authenticateJWT, tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
