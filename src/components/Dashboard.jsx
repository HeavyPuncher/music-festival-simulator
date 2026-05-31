import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

import { exportAsCSV, exportAsJSON } from "../utils/exportUtils"

function Dashboard({ metrics }) {
  if (!metrics) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">Forecast Dashboard</h2>
        <p className="text-slate-400">
          Fill in the festival details and click simulate to see the forecast.
        </p>
      </div>
    )
  }

  const formatMoney = (value) => {
    return `£${Math.round(value).toLocaleString()}`
  }

  const formatCompact = (value) => {
    return Intl.NumberFormat("en-GB", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  }

  const chartData = [
    { name: "Revenue", value: Math.round(metrics.totalRevenue) },
    { name: "Expenses", value: Math.round(metrics.totalExpenses) },
    { name: "Profit", value: Math.round(metrics.profit) },
  ]

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Forecast Dashboard</h2>

        <div className="flex gap-2">
          <button
            onClick={() => exportAsJSON(metrics)}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded font-bold cursor-pointer"
          >
            Export JSON
          </button>

          <button
            onClick={() => exportAsCSV(metrics)}
            className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded font-bold"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">Revenue</p>
          <h3 className="text-2xl font-bold text-green-400">
            {formatMoney(metrics.totalRevenue)}
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">Expenses</p>
          <h3 className="text-2xl font-bold text-red-400">
            {formatMoney(metrics.totalExpenses)}
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">Profit / Loss</p>
          <h3
            className={`text-2xl font-bold ${
              metrics.profit >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {formatMoney(metrics.profit)}
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">Weather Adjusted Attendance</p>
          <h3 className="text-2xl font-bold">
            {metrics.adjustedAttendance.toLocaleString()}
          </h3>
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl h-72">
        <h3 className="font-bold mb-2">Financial Overview</h3>

        <ResponsiveContainer width="100%" height="88%">
          <BarChart
            data={chartData}
            layout="vertical"
            barCategoryGap="20%"
            margin={{
              top: 5,
              right: 25,
              left: 25,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

            <XAxis
              type="number"
              tickFormatter={formatCompact}
              stroke="#cbd5e1"
              tickMargin={8}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={75}
              stroke="#cbd5e1"
              tickMargin={6}
            />

            <Tooltip
              formatter={(value) => formatMoney(value)}
              labelStyle={{ color: "#020617" }}
            />

            <Bar dataKey="value" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl space-y-2">
        <p>
          <strong>Artist:</strong> {metrics.artistName}
        </p>

        <p>
          <strong>Stage:</strong> {metrics.stageName}
        </p>

        <p>
          <strong>Stage Capacity:</strong>{" "}
          {metrics.stageCapacity.toLocaleString()}
        </p>

        <p>
          <strong>Required Toilets:</strong> {metrics.requiredToilets}
        </p>

        <p>
          <strong>Required Security:</strong> {metrics.requiredSecurity}
        </p>

        <p>
          <strong>Required Medical Staff:</strong>{" "}
          {metrics.requiredMedicalStaff}
        </p>

        <p>
          <strong>Energy Cost:</strong> {formatMoney(metrics.energyCost)}
        </p>

        <p>
          <strong>Crowd Risk:</strong>{" "}
          <span
            className={
              metrics.crowdRisk === "High"
                ? "text-red-400"
                : metrics.crowdRisk === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }
          >
            {metrics.crowdRisk}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Dashboard