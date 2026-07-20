# Travlr Getaways (CS-465)

Travlr Getaways is a Node.js and Express web application for browsing and managing travel content. The project now includes MongoDB integration through Mongoose for trip data storage, schema validation, and API delivery.

## Features
- Server-rendered pages for Travel, Rooms, Meals, and supporting static content pages.
- Admin trip management for creating and editing trip records.
- MongoDB-backed trip model with validation.
- JSON API endpoint for trip retrieval.
- Seed script for loading sample data into MongoDB.

## Tech Stack
- Node.js
- Express
- Handlebars (`hbs`)
- MongoDB
- Mongoose

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm
- MongoDB server (local or remote)
- `mongosh` (for inspection/testing)

## Project Structure
```text
app.js
app_api/
   db.js
   models/
      trip.js
   controllers/
      trips.js
   routes/
      index.js
app_server/
   controllers/
   routes/
   views/
data/
seed.js
```

## Installation
```bash
git clone https://github.com/Illyunkas/cs465-fullstack.git
cd cs465-fullstack/travlr
npm install
```

## Configuration
Set the MongoDB URI with an environment variable (optional if using local default).

```bash
export MONGODB_URI="mongodb://127.0.0.1:27017/travlr"
```

Default URI (when `MONGODB_URI` is not set):
`mongodb://127.0.0.1:27017/travlr`

## Running the Application
```bash
npm start
```

Application URL:
`http://localhost:3000`

## Database Seeding
Load sample trip data into MongoDB:

```bash
npm run seed
```

This inserts four sample trips including Volcanic Sky Safari.

## API
### Get all trips
- Method: `GET`
- Endpoint: `/api/trips`
- Response: JSON array of trip objects from MongoDB

Example:
```bash
curl http://localhost:3000/api/trips
```

## Admin Interface
Trip administration is available at:
- `http://localhost:3000/admin/trips`
- `http://localhost:3000/admin/trips/new`

Rooms and Meals add forms are available at:
- `http://localhost:3000/admin/rooms/new`
- `http://localhost:3000/admin/meals/new`

Note: Authentication is intentionally not implemented yet for coursework scope.

## Verification and Testing
Run these checks after startup:

```bash
curl http://localhost:3000/api/trips
curl -I http://localhost:3000/travel
mongosh travlr --eval "db.trips.find({}, {name:1, price:1, date:1}).pretty()"
```

Expected outcomes:
- `/api/trips` returns trip records in JSON format.
- `/travel` returns `HTTP/1.1 200 OK`.
- `mongosh` output includes the seeded trip documents.

## Scripts
- `npm start` - start the Express server.
- `npm run seed` - seed sample trips into MongoDB.

## Known Notes
- Some templates may still request `/stylesheets/style.css`; current styling is served from `/css/style.css`.

## Course Context
This project was developed for CS-465 Full Stack Development I at Southern New Hampshire University.
