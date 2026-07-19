var fs = require('fs');
var path = require('path');

var tripsFile = path.join(__dirname, '../../data/trips.json');

function readTrips() {
  var file = fs.readFileSync(tripsFile, 'utf8');
  return JSON.parse(file || '[]');
}

function writeTrips(trips) {
  fs.writeFileSync(tripsFile, JSON.stringify(trips, null, 2), 'utf8');
}

var trips = (req, res) => {
  var travelData = readTrips();
  res.render('admin_trips', {
    title: 'Admin - Manage Trips',
    trips: travelData,
  });
};

var newTrip = (req, res) => {
  res.render('admin_trip_form', {
    title: 'Add New Trip',
    action: '/admin/trips',
    trip: {},
    submitLabel: 'Create Trip',
  });
};

var createTrip = (req, res) => {
  var travelData = readTrips();
  var newTrip = {
    name: req.body.name || 'New Trip',
    image: req.body.image || '/images/reef1.jpg',
    description: req.body.description || '',
    tags: req.body.tags || '',
    price: req.body.price || '$0',
    date: req.body.date || '',
  };
  travelData.push(newTrip);
  writeTrips(travelData);
  res.redirect('/admin/trips');
};

var editTrip = (req, res) => {
  var index = parseInt(req.params.index, 10);
  var travelData = readTrips();
  var trip = travelData[index];
  if (!trip) {
    return res.status(404).send('Trip not found');
  }
  res.render('admin_trip_form', {
    title: 'Edit Trip',
    action: '/admin/trips/' + index,
    trip: trip,
    submitLabel: 'Update Trip',
  });
};

var updateTrip = (req, res) => {
  var index = parseInt(req.params.index, 10);
  var travelData = readTrips();
  if (!travelData[index]) {
    return res.status(404).send('Trip not found');
  }
  travelData[index] = {
    name: req.body.name || travelData[index].name,
    image: req.body.image || travelData[index].image,
    description: req.body.description || travelData[index].description,
    tags: req.body.tags || travelData[index].tags,
    price: req.body.price || travelData[index].price,
    date: req.body.date || travelData[index].date,
  };
  writeTrips(travelData);
  res.redirect('/admin/trips');
};

module.exports = {
  trips,
  newTrip,
  createTrip,
  editTrip,
  updateTrip,
};
