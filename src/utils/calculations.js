import { artists, stages } from "../data/festivalOptions"

export function calculateFestivalMetrics(festival) {
  const artist = artists.find((a) => a.id === Number(festival.artistId))
  const stage = stages.find((s) => s.id === Number(festival.stageId))

  if (!artist || !stage) {
    throw new Error("Invalid artist or stage selected")
  }

  const attendance = Number(festival.attendance) || 0
  const ticketPrice = Number(festival.ticketPrice) || 0
  const days = Number(festival.days) || 1
  const toilets = Number(festival.toilets) || 0
  const securityStaff = Number(festival.securityStaff) || 0
  const medicalStaff = Number(festival.medicalStaff) || 0
  const foodVendors = Number(festival.foodVendors) || 0

  let weatherMultiplier = 1

  if (festival.weather === "Cloudy") weatherMultiplier = 0.95
  if (festival.weather === "Rain") weatherMultiplier = 0.85
  if (festival.weather === "Storm") weatherMultiplier = 0.65

  const adjustedAttendance = Math.round(attendance * weatherMultiplier)

  const ticketRevenue = adjustedAttendance * ticketPrice
  const vendorRevenue = foodVendors * 500 * days
  const totalRevenue = ticketRevenue + vendorRevenue

  const artistCost = artist.cost
  const stageCost = stage.cost
  const toiletCost = toilets * 200
  const securityCost = securityStaff * 300 * days
  const medicalCost = medicalStaff * 400 * days
  const energyCost = artist.powerUsage * 0.35 * 24 * days
  const foodInfrastructureCost = foodVendors * 750

  const totalExpenses =
    artistCost +
    stageCost +
    toiletCost +
    securityCost +
    medicalCost +
    energyCost +
    foodInfrastructureCost

  const profit = totalRevenue - totalExpenses

  const requiredToilets = Math.ceil(adjustedAttendance / 100)
  const requiredSecurity = Math.ceil(adjustedAttendance / 250)
  const requiredMedicalStaff = Math.ceil(adjustedAttendance / 2000)

  const crowdRisk =
    adjustedAttendance > stage.capacity
      ? "High"
      : toilets < requiredToilets || securityStaff < requiredSecurity
      ? "Medium"
      : "Low"

  return {
    artistName: artist.name,
    artistType: artist.typeId,
    stageName: stage.name,
    adjustedAttendance,
    ticketRevenue,
    vendorRevenue,
    totalRevenue,
    totalExpenses,
    profit,
    requiredToilets,
    requiredSecurity,
    requiredMedicalStaff,
    energyCost,
    crowdRisk,
    stageCapacity: stage.capacity,
  }
}