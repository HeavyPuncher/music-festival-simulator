# Festival Simulator

A locally hosted React application that allows users to design, simulate, compare and export music festival plans.

This application was built as part of the NovAzure Software Engineer take-home challenge and is designed to run entirely offline with no backend services or internet connection required.

## Features

### User Profiles

- Register a profile locally
- Login using locally stored credentials
- User sessions stored in browser localStorage
- Logout functionality

### Festival Builder

Create and customise a music festival using configurable options including:

- Attendance
- Festival duration
- Weather conditions
- Artist type
- Specific artist from a filtered artist bank
- 50 artists across 5 artist categories
- Stages
- Toilets
- Security staff
- Medical staff
- Food vendors
- Location type

### Forecast Simulation

Generate realistic festival forecasts including:

- Revenue
- Expenses
- Profit / Loss
- Weather impact
- Attendance impact
- Crowd risk assessment
- Energy costs
- Staffing requirements
- Toilet requirements

### Saved Setups

- Save festival configurations
- View saved festival forecasts
- Delete individual saved festivals
- Multi-select saved festivals
- Delete selected saved festivals
- Delete all saved festivals
- Confirmation before deleting one, many, or all saved setups
- Compare saved festivals side-by-side

### Draft Preservation

- Festival builder values are saved as a local draft
- Users can navigate to Saved Setups or Compare and return without losing unfinished form values
- The Clear Builder button resets the draft manually

### Export

Export festival forecasts as:

- JSON
- CSV

### Visualisation

- Financial overview chart
- Compact chart values for large numbers
- Improved chart readability for high-value forecasts

## Technology Stack

### Frontend

- React
- React Router
- JavaScript
- Vite

### Styling

- Tailwind CSS

### Data Storage

- Browser LocalStorage

### Visualisation

- Recharts

### Testing

- Vitest

## Installation

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

## Running Tests

Run unit tests:

```bash
npm test
```

## Local Storage

The application stores data locally in the browser.

Stored keys:

- users
- currentUser
- savedFestivals
- festivalDraft

No backend database is required.

## Project Structure

```txt
src/
├── components/
│   ├── Dashboard.jsx
│   ├── FestivalForm.jsx
│   └── ProtectedRoute.jsx
├── data/
│   └── festivalOptions.js
├── pages/
│   ├── Builder.jsx
│   ├── CompareFestivals.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── SavedFestivals.jsx
├── tests/
│   └── calculations.test.js
├── utils/
│   ├── auth.js
│   ├── calculations.js
│   └── exportUtils.js
├── App.jsx
├── main.jsx
└── index.css
```

## Future Improvements

Potential future enhancements include:

- Multi-day event simulation timelines
- Dynamic weather forecasting
- Artist popularity impact modelling
- Vendor profit forecasting
- Carbon footprint calculations
- Camping facilities
- Parking and transport modelling
- AI festival recommendations
- Interactive financial dashboards
- Advanced crowd flow simulation