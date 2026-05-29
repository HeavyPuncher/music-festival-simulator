import { describe, it, expect } from "vitest"
import { calculateFestivalMetrics } from "../utils/calculations"

describe("Festival calculations", () => {
  it("calculates profit correctly", () => {
    const result =
      calculateFestivalMetrics({
        attendance: 1000,
        ticketPrice: 100,
        toilets: 10,
        security: 5,
        artist: {
          cost: 10000,
          powerUsage: 100,
        },
        stage: {
          cost: 5000,
        },
      })

    expect(result.profit).toBe(81500)
  })
})