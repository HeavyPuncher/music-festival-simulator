import { describe, expect, it } from "vitest"
import { calculateFestivalMetrics } from "../utils/calculations"

describe("calculateFestivalMetrics", () => {
  it("calculates profit correctly for a sunny one-day festival", () => {
    const festival = {
      name: "Test Festival",
      location: "Field",
      attendance: 10000,
      ticketPrice: 100,
      days: 1,
      weather: "Sunny",
      artistTypeId: "local",
      artistId: 41,
      stageId: 2,
      toilets: 100,
      securityStaff: 40,
      medicalStaff: 5,
      foodVendors: 10,
    }

    const result = calculateFestivalMetrics(festival)

    expect(result.totalRevenue).toBe(1005000)
    expect(result.totalExpenses).toBe(127340)
    expect(result.profit).toBe(877660)
    expect(result.crowdRisk).toBe("Low")
  })

  it("reduces attendance when weather is rainy", () => {
    const festival = {
      name: "Rain Test Festival",
      location: "Field",
      attendance: 10000,
      ticketPrice: 100,
      days: 1,
      weather: "Rain",
      artistTypeId: "local",
      artistId: 41,
      stageId: 2,
      toilets: 100,
      securityStaff: 40,
      medicalStaff: 5,
      foodVendors: 10,
    }

    const result = calculateFestivalMetrics(festival)

    expect(result.adjustedAttendance).toBe(8500)
    expect(result.ticketRevenue).toBe(850000)
  })
})