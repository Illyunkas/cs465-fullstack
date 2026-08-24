# Travlr Getaways

Travlr Getaways is a full-stack travel application with a public Express and Handlebars site, a JSON API backed by MongoDB, and a separate Angular admin SPA for managing trips.

The admin SPA uses JWT authentication. Anyone can read trip data, while creating, editing, and deleting trips requires an authenticated admin session.

## Prerequisites

- Node.js 20.19 or later
- npm
- MongoDB running locally on port `27017`, or access to a MongoDB host
- Git

## Clone And Install

Clone the repository and install dependencies for both applications:

```bash
git clone https://github.com/Illyunkas/cs465-fullstack.git
cd cs465-fullstack
npm install
npm --prefix app_admin install
```

## Configure Local Environment

Create a `.env` file in the repository root. This file is intentionally ignored by Git because it contains a secret.

```bash
JWT_SECRET=replace-this-with-a-long-random-secret
```

Generate a suitable value on macOS or Linux with:

```bash
openssl rand -hex 32
```

Copy the generated value after `JWT_SECRET=`. Do not commit `.env` or share the secret.

### MongoDB

By default, the API connects to:

```text
mongodb://127.0.0.1/travlr
```

To use another MongoDB host, add `DB_HOST` to `.env`:

```bash
DB_HOST=your-mongodb-hostname
```

The application expects MongoDB to be available before the backend starts.

## Seed Sample Data

Seed the default trip records after MongoDB is running:

```bash
npm run seed
```

Trip documents are stored in the `travel` collection in the `travlr` database.

## Run Locally

Start the backend from the repository root:

```bash
npm start
```

The Express site and API are available at `http://localhost:3000`.

In a second terminal, start the Angular admin SPA:

```bash
npm --prefix app_admin start
```

The admin SPA is available at `http://localhost:4200`. Its development proxy forwards `/api` requests to `http://localhost:3000`, so both servers must be running to load live data and make changes. If the API is unavailable, the trip listing displays bundled sample trips so the interface remains viewable.

## Application Areas

- Public site: `http://localhost:3000`
- Travel page: `http://localhost:3000/travel`
- Rooms page: `http://localhost:3000/rooms`
- Meals page: `http://localhost:3000/meals`
- Angular admin SPA: `http://localhost:4200`
- Admin login page: `http://localhost:4200/login`

## API

All API endpoints are mounted under `/api`.

### Public Trip Endpoints

- `GET /api/trips` returns all trips.
- `GET /api/trips/:tripCode` returns one trip by its code.

### Authentication Endpoints

- `POST /api/register` creates a user and returns a JWT.
- `POST /api/login` verifies credentials and returns a JWT.

Both endpoints accept JSON with these fields:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "A strong password"
}
```

The `name` field is required for registration only. Login requires `email` and `password`.

### Protected Trip Endpoints

The following routes require an `Authorization: Bearer <JWT>` request header:

- `POST /api/trips` creates a trip.
- `PUT /api/trips/:tripCode` updates a trip.
- `DELETE /api/trips/:tripCode` deletes a trip.

Requests without a valid, unexpired JWT receive `401 Unauthorized`.

## Verify Authentication

1. Register an account with `POST http://localhost:3000/api/register`.
2. Log in with `POST http://localhost:3000/api/login` and copy the returned `token`.
3. Send a protected trip request without the token and confirm it returns `401`.
4. Repeat the request with Postman's **Bearer Token** authorization type and confirm the request passes authentication.
5. Log in at `http://localhost:4200/login`. Add, Edit, and Delete controls appear after login and disappear after logout.

For a non-destructive command-line check that reads trip data:

```bash
curl -i http://localhost:3000/api/trips
```

## Build And Scripts

From the repository root:

- `npm start` starts the Express backend.
- `npm run seed` seeds the MongoDB trip collection.

For the Angular admin app:

```bash
npm --prefix app_admin run build
```

This creates a production build in `app_admin/dist/travlr-admin`.

## Project Layout

```text
travlr/
  app.js                 Express application entry point
  app_api/               MongoDB models, API controllers, and routes
  app_server/            Public-site controllers, routes, and Handlebars views
  app_admin/             Angular admin SPA
  public/                Static public-site assets
  data/                  Sample JSON data
  bin/www                HTTP server startup script
```

## Security Notes

- Passwords are stored as salted PBKDF2 hashes, never as plain text.
- JWTs expire after one hour.
- The JWT secret belongs only in `.env`; never commit it to source control.
- This project authenticates users but does not implement role-based authorization. Any authenticated user can modify trips.

## Course Context

This project was developed for CS-465 Full Stack Development I at Southern New Hampshire University.

# CS 465 Full Stack Development: Travlr Getaways Portfolio

## Module 8 journal

## Architecture

**Frontend Approaches (Express HTML, JavaScript, SPA):**  
  In this project, the customer-facing side uses server-side rendering via **Express and Handlebars (HBS)** templates, where the server constructs HTML pages and serves them directly to the client. This approach is lightweight, SEO-friendly, and ideal for static or infrequently updated content. In contrast, the administrative panel (`app_admin`) is built as an **Angular Single-Page Application (SPA)** using client-side JavaScript/TypeScript. The SPA loads a single HTML shell and dynamically updates views via component routing and API requests without full page reloads, providing a faster, richer, and more interactive experience for admin operations like managing trips.

**NoSQL Backend (MongoDB):**  
  MongoDB was chosen for the backend because its document-oriented model maps naturally to JavaScript and JSON data structures. Travel records (such as trips, itineraries, pricing, and resort details) often contain semi-structured or nested data that can evolve. MongoDB provides schema flexibility, high write throughput, and seamless integration with Mongoose ODM in Node.js, eliminating the need for complex SQL schema migrations and relational joins.

---

## Functionality

* **JSON vs. JavaScript & Frontend/Backend Integration:**  
  JavaScript is a full programming language with functions, objects, and logic execution, whereas **JSON (JavaScript Object Notation)** is a lightweight, text-based data interchange format. JSON acts as the universal bridge between the decoupled layers: the Express API serializes database models into JSON strings and delivers them across HTTP, and the frontend (both Angular and Handlebars helpers) parses that JSON back into native objects to render dynamic UI content.

* **Code Refactoring & Reusable UI Components:**  
  Throughout development, code was refactored from tightly coupled server routes into a clear separation of concerns—splitting business logic into dedicated API controllers (`app_api`), server-side display controllers (`app_server`), and Angular services. In the Angular admin app, creating reusable UI components (such as modular form inputs, trip listing cards, and authentication guards) reduced redundant code, simplified maintenance, and ensured consistent design and validation behavior across create, edit, and view states.

---

## Testing

* **API Endpoints, HTTP Methods & Security:**  
  Robust full-stack applications require verifying CRUD operations across all standard HTTP methods: `GET` (retrieving trip lists and details), `POST` (creating records and user authentication), `PUT` (updating existing trips), and `DELETE` (removing data). Tools like Postman allowed endpoint testing prior to frontend integration to validate status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found) and payload integrity. Testing becomes significantly more complex with authentication layers: protected endpoints require generating, passing, and validating **JSON Web Tokens (JWT)** in the `Authorization: Bearer <token>` header, ensuring unauthorized requests are rejected while maintaining persistent sessions for legitimate admins.

---

## Reflection

* **Professional Alignment & Marketable Skills:**  
  Building the full-stack Travlr Getaways application provided practical, end-to-end experience spanning RESTful API design, modern SPA development with Angular, Mongoose data modeling, and secure JWT-based role authentication. Gaining hands-on proficiency across the full MEAN stack demonstrates my ability to architect decoupled, production-ready web systems. These skills directly strengthen my portfolio as a software engineer capable of delivering secure, scalable, and maintainable software solutions.
