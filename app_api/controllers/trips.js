var Trip = require('../models/travlr');

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

var tripsFindCode = async function(req, res) {
  var tripCode = req.params.tripCode;

  if (!tripCode) {
    sendJsonResponse(res, 400, {
      message: 'tripCode parameter is required',
    });
    return;
  }

  try {
    var matches = await Trip.find({ code: tripCode }).lean();

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
  tripsFindCode: tripsFindCode,
};
