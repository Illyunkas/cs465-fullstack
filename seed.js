var mongoose = require('mongoose');
var Trip = require('./app_api/models/trip');

var dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

var sampleTrips = [
  {
    name: 'Gale Reef Adventure',
    image: '/images/reef1.jpg',
    description: 'Gale Reef Adventure: Explore the reefs on a guided snorkeling tour.',
    tags: 'Reef, Snorkeling, Sunset',
    price: '$91',
    date: '31-Dec-2024',
  },
  {
    name: 'Dawson\'s Reef Escape',
    image: '/images/reef2.jpg',
    description: 'Dawson\'s Reef Escape: Take in the stunning coral and marine life.',
    tags: 'Reef, Boat Tour, Relax',
    price: '$95',
    date: '31-Dec-2024',
  },
  {
    name: 'Claire\'s Reef Expedition',
    image: '/images/reef3.jpg',
    description: 'Claire\'s Reef Expedition: Dive deeper into an unforgettable reef adventure.',
    tags: 'Reef, Diving, Adventure',
    price: '$99',
    date: '31-Dec-2024',
  },
  {
    name: 'Volcanic Sky Safari',
    image: '/images/volcano.jpg',
    description: 'Volcanic Sky Safari: Fly over an active volcano, explore glowing lava fields, and finish the day in a luxury cliffside lodge.',
    tags: 'Volcano, Helicopter, Adventure, Lava',
    price: '$229',
    date: '15-NOV-2026',
  },
];

async function seed() {
  try {
    await mongoose.connect(dbURI);
    await Trip.deleteMany({});
    var inserted = await Trip.insertMany(sampleTrips);
    console.log('Seed complete. Trips inserted:', inserted.length);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
