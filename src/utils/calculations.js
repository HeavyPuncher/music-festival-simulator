export function calculateFestivalMetrics(festival) {
    const ticketRevenue =
      festival.attendance * festival.ticketPrice
  
    const artistCost = festival.artist.cost
  
    const stageCost = festival.stage.cost
  
    const toiletCost =
      festival.toilets * 200
  
    const securityCost =
      festival.security * 300
  
    const totalExpenses =
      artistCost +
      stageCost +
      toiletCost +
      securityCost
  
    const profit =
      ticketRevenue - totalExpenses
  
    const requiredToilets =
      Math.ceil(festival.attendance / 100)
  
    const energyUsage =
      festival.artist.powerUsage * 24
  
    return {
      ticketRevenue,
      totalExpenses,
      profit,
      requiredToilets,
      energyUsage,
    }
  }