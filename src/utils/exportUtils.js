export function exportAsJSON(data, fileName = "festival-forecast.json") {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = fileName
  link.click()

  URL.revokeObjectURL(url)
}

export function exportAsCSV(data, fileName = "festival-forecast.csv") {
  const rows = [
    ["Metric", "Value"],
    ["Artist", data.artistName],
    ["Stage", data.stageName],
    ["Adjusted Attendance", data.adjustedAttendance],
    ["Ticket Revenue", data.ticketRevenue],
    ["Vendor Revenue", data.vendorRevenue],
    ["Total Revenue", data.totalRevenue],
    ["Total Expenses", data.totalExpenses],
    ["Profit", data.profit],
    ["Required Toilets", data.requiredToilets],
    ["Required Security", data.requiredSecurity],
    ["Required Medical Staff", data.requiredMedicalStaff],
    ["Energy Cost", data.energyCost],
    ["Crowd Risk", data.crowdRisk],
  ]

  const csvContent = rows.map((row) => row.join(",")).join("\n")

  const blob = new Blob([csvContent], {
    type: "text/csv",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = fileName
  link.click()

  URL.revokeObjectURL(url)
}