# Festival Simulator Calculations

This document explains the formulas, assumptions and modelling choices used throughout the application.

The objective was to create a realistic but understandable simulation that could easily be extended with additional festival planning factors.

## Artist Selection

Artists are grouped by type:

- Headline Artist
- Rap / Hip-Hop
- Electronic / DJ
- Rock / Indie
- Local / Emerging

Each artist has:

- A booking cost
- A popularity score
- A power usage estimate

The selected artist affects:

- Artist booking cost
- Energy cost
- Forecast dashboard values

The artist type does not directly affect the calculation. It is used to filter the available artist list and improve the user experience.

## Revenue Calculations

### Ticket Revenue

Ticket revenue is based on expected attendance and ticket price.

Formula:

```js
ticketRevenue = adjustedAttendance * ticketPrice
```

Example:

```txt
10,000 attendees
£100 ticket

Revenue = £1,000,000
```

### Vendor Revenue

Food vendors pay a fixed pitch fee.

Formula:

```js
vendorRevenue = foodVendors * 500 * days
```

Assumption:

- £500 pitch fee per vendor per day

### Total Revenue

Formula:

```js
totalRevenue = ticketRevenue + vendorRevenue
```

## Weather Modelling

Weather affects expected attendance.

Assumptions:

| Weather | Attendance Multiplier |
|----------|----------|
| Sunny | 100% |
| Cloudy | 95% |
| Rain | 85% |
| Storm | 65% |

Formula:

```js
adjustedAttendance = attendance * weatherMultiplier
```

Example:

```txt
10,000 attendees
Rain

Adjusted Attendance:

10,000 × 0.85

= 8,500
```

## Expense Calculations

### Artist Cost

Each artist has a predefined booking fee.

Example:

| Artist Type | Example Artist | Cost |
|----------|----------|----------|
| Local / Emerging | Local DJ | £5,000 |
| Electronic / DJ | Fred Again | £180,000 |
| Rap / Hip-Hop | Stormzy | £350,000 |
| Headline Artist | Drake | £750,000 |

### Stage Cost

Each stage has a fixed setup cost and maximum capacity.

Example:

| Stage | Cost | Capacity |
|----------|----------|----------|
| Community Stage | £15,000 | 2,000 |
| Acoustic Stage | £30,000 | 5,000 |
| Dance Tent | £80,000 | 15,000 |
| Main Stage | £250,000 | 50,000 |

### Toilet Cost

Assumption:

- £200 per toilet

Formula:

```js
toiletCost = toilets * 200
```

### Security Cost

Assumption:

- £300 per security staff member per day

Formula:

```js
securityCost = securityStaff * 300 * days
```

### Medical Cost

Assumption:

- £400 per medical staff member per day

Formula:

```js
medicalCost = medicalStaff * 400 * days
```

### Energy Cost

Artist equipment consumes electricity throughout the event.

Assumptions:

- 24 hour energy availability
- £0.35 per kWh

Formula:

```js
energyCost = artist.powerUsage * 0.35 * 24 * days
```

### Vendor Infrastructure Cost

Each vendor requires infrastructure support such as space, power, cleaning and waste handling.

Assumption:

- £750 per vendor

Formula:

```js
foodInfrastructureCost = foodVendors * 750
```

## Total Expenses

Formula:

```js
totalExpenses =
  artistCost +
  stageCost +
  toiletCost +
  securityCost +
  medicalCost +
  energyCost +
  foodInfrastructureCost
```

## Profit Calculation

Formula:

```js
profit = totalRevenue - totalExpenses
```

## Capacity & Crowd Safety

### Required Toilets

Assumption:

- One toilet per 100 attendees

Formula:

```js
requiredToilets = Math.ceil(adjustedAttendance / 100)
```

### Required Security

Assumption:

- One security staff member per 250 attendees

Formula:

```js
requiredSecurity = Math.ceil(adjustedAttendance / 250)
```

### Required Medical Staff

Assumption:

- One medical staff member per 2,000 attendees

Formula:

```js
requiredMedicalStaff = Math.ceil(adjustedAttendance / 2000)
```

## Crowd Risk

The simulator calculates a simple crowd risk rating.

### High Risk

High risk is triggered when weather-adjusted attendance is greater than the selected stage capacity.

```js
adjustedAttendance > stage.capacity
```

### Medium Risk

Medium risk is triggered when capacity is acceptable, but toilets or security staffing are below the recommended requirement.

```js
toilets < requiredToilets || securityStaff < requiredSecurity
```

### Low Risk

Low risk is returned when stage capacity, toilets and security staffing are sufficient.

## Saved Setup Logic

Saved festivals are stored in browser localStorage.

Each saved setup includes:

- Festival input values
- Calculated metrics
- User email
- Created date

This allows the app to show saved setups, compare setups and delete one or multiple saved festivals.

## Draft Preservation

The current festival builder form is stored as festivalDraft in localStorage.

This means users can navigate away from the builder page and return without losing their current inputs.

The Clear Builder button removes this draft and resets the form to default values.

## Additional Features Added

Beyond the minimum requirements, the application also includes:

- Artist type filtering
- 50 artist options across 5 categories
- Festival comparison tools
- Saved festival management
- Multi-select deletion
- Delete all saved setups
- Confirmation before destructive delete actions
- Revenue visualisation charts
- Compact chart labels for large values
- Export to CSV
- Export to JSON
- Crowd risk assessment
- Weather forecasting impact
- User profile system
- Draft preservation while navigating between pages

These additions were included to improve usability and demonstrate extensibility of the overall system architecture.