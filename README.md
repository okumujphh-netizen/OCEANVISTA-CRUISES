# OCEANVISTA-CRUISES


OceanVista Cruises is a cruise booking website developed as part of a software engineering project at Moringa School. It allows users to explore cruise packages, view destinations, filter cruises, and manage their bookings.

## Features

- Browse available cruise packages.
- View destinations, departure ports, durations, prices, and departure dates.
- Filter cruises by destination.
- Create bookings using customer details and guest numbers.
- View existing bookings.
- Delete bookings.
- Validate customer and booking information.
- Display status messages for errors and successful operations.
- Use a mock REST API to manage cruise and booking data.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES modules)
- JSON Server
- Jest
- Babel
- Git and GitHub

## Project Structure


OCEANVISTA-CRUISES/
├── index.html
├── cruises.html
├── bookings.html
├── db.json
├── package.json
├── package-lock.json
├── babel.config.cjs
├── jest.config.cjs
├── README.md
├── LICENSE
├── src/
│   ├── api.js
│   ├── bookings.js
│   ├── cruises.js
│   ├── ui.js
│   └── validation.js
├── style/
│   └── style.css
└── tests/
    └── validation.test.js


## Requirements

Install the following software before running the project:

- Node.js
- npm
- Git
- Python 3

## Installation

Clone the repository and enter the project directory:


git clone https://github.com/okumujphh-netizen/OCEANVISTA-CRUISES.git
cd OCEANVISTA-CRUISES


Install the dependencies:


npm install


## Running the Project

### 1. Start the API server

In your first terminal, run:


npm start


The JSON Server API should run at:

`http://localhost:3000`

### 2. Start the website

Open a second terminal in the project directory and run:


python3 -m http.server 8000


Open your browser and visit:

`http://localhost:8000`

Keep both terminals running while using the website.

## API Endpoints

The application uses JSON Server as its mock REST API.

| HTTP Method | Endpoint | Purpose |
|---|---|---|
| GET | `/cruises` | Retrieve available cruises |
| GET | `/bookings` | Retrieve bookings |
| POST | `/bookings` | Create a booking |
| PUT | `/bookings/:id` | Replace a booking |
| PATCH | `/bookings/:id` | Update selected booking fields |
| DELETE | `/bookings/:id` | Delete a booking |

The API base URL is `http://localhost:3000`.

## Testing

Run the test suite:


npm test


Generate a test coverage report:


npm run test:coverage


The current booking validation test suite contains six passing tests and achieves 100% statement, branch, function, and line coverage for `validation.js`. This result applies to the validation module, not the entire application.

## Design

OceanVista Cruises uses a maritime-inspired design with navy blue, teal, and light backgrounds. The website is designed to provide a clear and consistent cruise browsing and booking experience.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

Developed as a software engineering learning project at Moringa School.
Developed by :
NAME:John Paul Okumu.
student at Moringa School.
