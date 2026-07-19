# CS-465 Full Stack Development I

This project was developed as part of the CS-465 Full Stack Development I course at Southern New Hampshire University.

## Description
This application is a full-stack web application that allows users to manage a travel agency database developed for CS-465.

## Prerequisites
To run this project, you will need:
* Node.js
* Git

## Installation
1. Clone the repository:
   git clone https://github.com/Illyunkas/cs465-fullstack.git
2. Navigate to the project directory:
   cd cs465-fullstack
3. Install the required dependencies:
   npm install

## Running the Project
To start the application, run:

    npm start

The application will be accessible at http://localhost:3000.

## Admin Access
The project includes a simple admin interface for managing trips. After starting the application, open your browser and go to:

    http://localhost:3000/admin/trips

From that page you can add a new trip and edit existing trip entries.

Admin authorization is not currently implemented, but I plan to add secure login and access control for admin management in a future update.

## Dependencies
This project relies on the following packages:

express: The web application framework for Node.js.

hbs: The Express view engine for Handlebars.

cookie-parser: Middleware to parse the Cookie header and populate req.cookies.

morgan: HTTP request logger middleware for Node.js.

http-errors: Helper for creating HTTP errors for Express.

These dependencies will be automatically installed when you run npm install during the setup process.
