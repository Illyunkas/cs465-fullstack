var Trip = require('../../app_server/models/travlr');

var tripsList = async function(req, res) {
  try {
    var trips = await Trip.find({}).lean();
    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving trips from database',
      error: error.message,
    });
  }
};

module.exports = {
  tripsList: tripsList,
};
