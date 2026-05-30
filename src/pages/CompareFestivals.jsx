import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../utils/auth"

function CompareFestivals() {
  const user = getCurrentUser()

  const [savedFestivals, setSavedFestivals] = useState([])
  const [firstId, setFirstId] = useState("")
  const [secondId, setSecondId] = useState("")

  useEffect(() => {
    const allSaved = JSON.parse(localStorage.getItem("savedFestivals")) || []

    const userSaved = allSaved.filter(
      (item) => item.userEmail === user.email
    )

    setSavedFestivals(userSaved)

    if (userSaved[0]) setFirstId(userSaved[0].id)
    if (userSaved[1]) setSecondId(userSaved[1].id)
  }, [user.email])

  const firstFestival = savedFestivals.find((item) => item.id === firstId)
  const secondFestival = savedFestivals.find((item) => item.id === secondId)

  const formatMoney = (value) => {
    return `£${Math.round(value).toLocaleString()}`
  }

  const renderFestivalCard = (item) => {
    if (!item) return null

    return (
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">{item.festival.name}</h2>

        <div className="space-y-2">
          <p>
            <strong>Attendance:</strong>{" "}
            {Number(item.festival.attendance).toLocaleString()}
          </p>

          <p>
            <strong>Weather:</strong> {item.festival.weather}
          </p>

          <p>
            <strong>Artist:</strong> {item.metrics.artistName}
          </p>

          <p>
            <strong>Stage:</strong> {item.metrics.stageName}
          </p>

          <p>
            <strong>Revenue:</strong> {formatMoney(item.metrics.totalRevenue)}
          </p>

          <p>
            <strong>Expenses:</strong> {formatMoney(item.metrics.totalExpenses)}
          </p>

          <p>
            <strong>Profit:</strong>{" "}
            <span
              className={
                item.metrics.profit >= 0 ? "text-green-400" : "text-red-400"
              }
            >
              {formatMoney(item.metrics.profit)}
            </span>
          </p>

          <p>
            <strong>Risk:</strong> {item.metrics.crowdRisk}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Compare Festivals</h1>
            <p className="text-slate-400">
              Compare saved festival setups side by side.
            </p>
          </div>

          <Link
            to="/builder"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded font-bold"
          >
            Back to Builder
          </Link>
        </header>

        {savedFestivals.length < 2 ? (
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl">
            <p>You need at least two saved festivals to compare.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block mb-2">First Festival</label>
                <select
                  value={firstId}
                  onChange={(e) => setFirstId(e.target.value)}
                  className="w-full p-3 rounded bg-slate-800 border border-slate-700"
                >
                  {savedFestivals.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.festival.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">Second Festival</label>
                <select
                  value={secondId}
                  onChange={(e) => setSecondId(e.target.value)}
                  className="w-full p-3 rounded bg-slate-800 border border-slate-700"
                >
                  {savedFestivals.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.festival.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {renderFestivalCard(firstFestival)}
              {renderFestivalCard(secondFestival)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CompareFestivals