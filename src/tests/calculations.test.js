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
      artistId: 4,
      stageId: 3,
      toilets: 100,
      securityStaff: 40,
      medicalStaff: 5,
      foodVendors: 10,
    }

    const result = calculateFestivalMetrics(festival)

    expect(result.totalRevenue).toBe(1005000)
    expect(result.totalExpenses).toBe(76590)
    expect(result.profit).toBe(928410)
    expect(result.crowdRisk).toBe("Low")
  })
})