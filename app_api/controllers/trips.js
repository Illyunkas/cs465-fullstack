var Trip = require('../models/travlr');
var mongoose = require('mongoose');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var tripsList = async function(req, res) {
  try {
    var trips = await Trip.find({}).lean();
    sendJsonResponse(res, 200, trips);
  } catch (error) {
    sendJsonResponse(res, 500, {
      message: 'Error retrieving trips from database',
      error: error.message,
    });
  }
};

var tripsFindOne = async function(req, res) {
  var tripId = req.params.tripCode;

  if (!tripId) {
    sendJsonResponse(res, 400, {
      message: 'tripId parameter is required',
    });
    return;
  }

  try {
    var matches;

    if (mongoose.Types.ObjectId.isValid(tripId)) {
      matches = await Trip.find({ _id: tripId }).lean();
    } else {
      matches = await Trip.find({ code: tripId }).lean();
    }

    if (!matches || matches.length === 0) {
      sendJsonResponse(res, 404, {
        message: 'Trip not found',
      });
      return;
    }

    sendJsonResponse(res, 200, matches[0]);
  } catch (error) {
    sendJsonResponse(res, 500, {
      message: 'Error retrieving trip from database',
      error: error.message,
    });
  }
};

var tripsAddTrip = async function(req, res) {
  try {
    var existingTrip = await Trip.findOne({ code: req.body.code }).lean();

    if (existingTrip) {
      sendJsonResponse(res, 409, {
        message: 'Trip code already exists',
      });
      return;
    }

    var createdTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });

    sendJsonResponse(res, 201, createdTrip);
  } catch (error) {
    sendJsonResponse(res, 400, {
      message: 'Error adding trip',
      error: error.message,
    });
  }
};

var tripsUpdateTrip = async function(req, res) {
  var tripCode = req.params.tripCode;

  if (!tripCode) {
    sendJsonResponse(res, 400, {
      message: 'tripCode parameter is required',
    });
    return;
  }

  try {
    var updatedTrip = await Trip.findOneAndUpdate(
      { code: tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedTrip) {
      sendJsonResponse(res, 404, {
        message: 'Trip not found',
      });
      return;
    }

    sendJsonResponse(res, 200, updatedTrip);
  } catch (error) {
    sendJsonResponse(res, 400, {
      message: 'Error updating trip',
      error: error.message,
    });
  }
};

var tripsDeleteTrip = async function(req, res) {
  var tripCode = req.params.tripCode;

  if (!tripCode) {
    sendJsonResponse(res, 400, {
      message: 'tripCode parameter is required',
    });
    return;
  }

  try {
    var deletedTrip = await Trip.findOneAndDelete({ code: tripCode }).lean();

    if (!deletedTrip) {
      sendJsonResponse(res, 404, {
        message: 'Trip not found',
      });
      return;
    }

    sendJsonResponse(res, 200, {
      message: 'Trip deleted',
      trip: deletedTrip,
    });
  } catch (error) {
    sendJsonResponse(res, 500, {
      message: 'Error deleting trip',
      error: error.message,
    });
  }
};

module.exports = {
  tripsList: tripsList,
  tripsFindOne: tripsFindOne,
  tripsAddTrip: tripsAddTrip,
  tripsUpdateTrip: tripsUpdateTrip,
  tripsDeleteTrip: tripsDeleteTrip,
};
