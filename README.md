# Travlr Getaways

Travlr Getaways is a full-stack travel site with two parts:

1. An Express server that renders the public pages and exposes the trip API.
2. A separate Angular admin app that consumes the API for trip CRUD work.

The trip data is stored in MongoDB through Mongoose. Public pages show trip information from the database, and the admin app can list, add, edit, and delete trips through `/api/trips`.

## How It Works

- `app.js` starts the Express application, connects MongoDB, mounts the public routes, and mounts the API routes.
- `app_server/` contains the server-rendered site used for pages like Travel, Rooms, Meals, About, Contact, and News.
- `app_api/` contains the JSON API used by both the public site and the Angular admin app.
- `app_admin/` is the Angular SPA used for the Module 6 admin workflow.
- The Angular app calls `/api/trips` through a dev-server proxy so it can talk to the backend without hardcoding hostnames.

## Project Layout

```text
travlr/
  app.js
  bin/www
  app_api/
    controllers/
      trips.js
    models/
      db.js
      seed.js
      travlr.js
    routes/
      index.js
  app_server/
    controllers/
    models/
    routes/
    views/
  public/
  data/
  app_admin/
```

## Requirements

- Node.js 18+ is recommended.
- npm
- MongoDB running locally or available through `MONGODB_URI`.

## Install

From the repository root:

```bash
npm install
cd app_admin
npm install
```

## Run the Project

Start the backend from the repository root:

```bash
npm start
```

The Express site runs at:

```text
http://localhost:3000
```

Start the Angular admin app in a second terminal:

```bash
cd app_admin
npm start
```

The admin app runs at:

```text
http://localhost:4200
```

## Data Setup

Seed MongoDB with the sample trips:

```bash
npm run seed
```

The trip collection is mapped to `travel` in MongoDB.

## Public Site

The server-rendered site is under `app_server/`.

- Travel page: `/travel`
- Rooms page: `/rooms`
- Meals page: `/meals`
- Static pages: `/about`, `/contact`, `/news`

These pages use Handlebars views and partials from `app_server/views/partials`.

## API

The trip API is mounted under `/api`.

### Trips

- `GET /api/trips` returns all trips as JSON.
- `GET /api/trips/:tripCode` returns one trip by code.
- `POST /api/trips` creates a trip.
- `PUT /api/trips/:tripCode` updates a trip by code.
- `DELETE /api/trips/:tripCode` deletes a trip by code.

The API returns `404` when a trip code is not found and `409` when a duplicate trip code is submitted.

### Example Checks

```bash
curl -i http://localhost:3000/api/trips
curl -i http://localhost:3000/api/trips/GRA-001
curl -i http://localhost:3000/api/trips/NO-SUCH-CODE
```

## Angular Admin App

The Angular app in `app_admin/` is the Module 6 trip manager.

- Trip listing loads trips from the API and displays cards.
- Add Trip creates new trip records.
- Edit Trip loads an existing trip, patches the form, and sends updates.
- Delete Trip removes a record and refreshes the list.

The admin app uses a dev proxy so requests to `/api/trips` go to the backend on port 3000.

## Verification

After both servers are running, these checks should work:

```bash
curl http://localhost:3000/api/trips
curl -I http://localhost:3000/travel
```

You can also inspect MongoDB directly:

```bash
mongosh travlr --eval "db.travel.find({}, {code:1, name:1, length:1, start:1, resort:1, perPerson:1}).pretty()"
```

## Scripts

Root project:

- `npm start` starts the Express app.
- `npm run seed` seeds the trip collection.

Angular admin app:

- `npm start` starts the Angular dev server.
- `npm run build` builds the admin app.

## Notes

- Authentication is not implemented for the coursework scope.
- Some browser consoles may show a Bootstrap CDN integrity warning; it does not block the admin app from loading the trip data.

## Course Context

This project was developed for CS-465 Full Stack Development I at Southern New Hampshire University.
