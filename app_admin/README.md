# Travlr Admin

This is the Angular admin single-page app for Travlr Getaways. It talks to the Express backend through `/api/trips` and is used to list, add, edit, and delete trips.

## Run

Install dependencies from this folder:

```bash
npm install
```

Start the app:

```bash
npm start
```

Open `http://localhost:4200/` in the browser.

The backend must also be running from the repository root on port 3000 so the admin app can reach the API through its dev proxy.

## Scripts

- `npm start` starts the Angular dev server.
- `npm run build` builds the app.
- `npm test` runs the Vitest suite.
- `npm run watch` rebuilds on file changes.

## Notes

- If the trip list looks stuck on loading, make sure the backend is running and the proxy is reaching `http://localhost:3000`.
- The app uses Bootstrap styling and a small amount of jQuery/Popper for compatibility with the coursework assets.
