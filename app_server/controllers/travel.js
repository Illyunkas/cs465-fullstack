var Trip = require('../../app_api/models/trip');

var travel = async (req, res) => {
    try {
        var trips = await Trip.find({}).lean();
        res.render('travel', {
            title: 'Travlr Travel',
            trips: trips,
        });
    } catch (error) {
        console.error('Error retrieving trips from MongoDB:', error.message);
        res.status(500).render('error', {
            message: 'Unable to load trips from database',
            error: error,
        });
    }
};

module.exports = {
    travel
};
