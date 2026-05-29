function Dashboard({ metrics }) {
    if (!metrics) return null
  
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded">
          Revenue: £{metrics.ticketRevenue}
        </div>
  
        <div className="bg-slate-800 p-4 rounded">
          Expenses: £{metrics.totalExpenses}
        </div>
  
        <div className="bg-slate-800 p-4 rounded">
          Profit: £{metrics.profit}
        </div>
  
        <div className="bg-slate-800 p-4 rounded">
          Energy Usage: {metrics.energyUsage} kWh
        </div>
      </div>
    )
  }
  
  export default Dashboard