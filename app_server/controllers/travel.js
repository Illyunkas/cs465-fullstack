var fs = require('fs');

var travel = (req, res) => {
    var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
    res.render('travel', {
        title: 'Travlr Travel',
        trips: trips,
    });
};

module.exports = {
    travel
};
