const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Trip = require('./travlr');

const tripsFile = path.join(__dirname, '../../data/trips.json');

const seedDatabase = async () => {
  try {
    const host = process.env.DB_HOST || '127.0.0.1';
    const dbURI = `mongodb://${host}/travlr`;
    await mongoose.connect(dbURI);

    const raw = fs.readFileSync(tripsFile, 'utf8');
    const trips = JSON.parse(raw || '[]');

    await Trip.deleteMany({});
    const inserted = await Trip.insertMany(trips);

    console.log(`Seed complete. Trips inserted: ${inserted.length}`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
