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
  var tripId = req.params.tripId;

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

module.exports = {
  tripsList: tripsList,
  tripsFindOne: tripsFindOne,
};
