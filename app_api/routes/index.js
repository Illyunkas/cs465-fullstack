const express = require('express');
const router = express.Router();

// 1. Force the Mongoose schema to load and register before the controller requires it
require('../models/travlr');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Define JWT middleware using express-jwt for Module 7 security
const { expressjwt: jwt } = require('express-jwt');
const authenticateJWT = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  algorithms: ['HS256']
});

// Authentication routes (Public)
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// Trip routes
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;
