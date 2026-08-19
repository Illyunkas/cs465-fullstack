const mongoose = require('mongoose');
const readLine = require('readline');
const fs = require('fs');
const path = require('path');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const connect = () => {
  mongoose.connect(dbURI, {});
};

// Auto-seed the trips collection if it's empty so data is available right after startup.
const seedIfEmpty = async () => {
  const Trip = require('./travlr');

  try {
    const count = await Trip.countDocuments({});
    if (count > 0) return;

    const tripsFile = path.join(__dirname, '../../data/trips.json');
    const trips = JSON.parse(fs.readFileSync(tripsFile, 'utf8') || '[]');

    if (trips.length > 0) {
      await Trip.insertMany(trips);
      console.log(`Auto-seeded ${trips.length} trips into empty database`);
    }
  } catch (error) {
    console.log('Auto-seed check failed:', error.message);
  }
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
  seedIfEmpty();
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

if (process.platform === 'win32') {
  const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  r1.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

const gracefulShutdown = async msg => {
  await mongoose.connection.close();
  console.log(`Mongoose disconnected through ${msg}`);
};

process.once('SIGUSR2', async () => {
  await gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', async () => {
  await gracefulShutdown('app termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await gracefulShutdown('app shutdown');
  process.exit(0);
});

connect();
require('./travlr');

module.exports = mongoose;
