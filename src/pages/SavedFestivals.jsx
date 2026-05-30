import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../utils/auth"

function SavedFestivals() {
  const user = getCurrentUser()
  const [savedFestivals, setSavedFestivals] = useState([])

  useEffect(() => {
    const allSaved = JSON.parse(localStorage.getItem("savedFestivals")) || []

    const userSaved = allSaved.filter(
      (item) => item.userEmail === user.email
    )

    setSavedFestivals(userSaved)
  }, [user.email])

  const deleteFestival = (id) => {
    const allSaved = JSON.parse(localStorage.getItem("savedFestivals")) || []

    const updated = allSaved.filter((item) => item.id !== id)

    localStorage.setItem("savedFestivals", JSON.stringify(updated))

    setSavedFestivals(updated.filter((item) => item.userEmail === user.email))
  }

  const formatMoney = (value) => {
    return `£${Math.round(value).toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Saved Festival Setups</h1>
            <p className="text-slate-400">
              Review previously saved festival simulations.
            </p>
          </div>

          <Link
            to="/builder"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded font-bold"
          >
            Back to Builder
          </Link>
        </header>

        {savedFestivals.length === 0 ? (
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl">
            <p>No saved festivals yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {savedFestivals.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-700 p-6 rounded-2xl"
              >
                <h2 className="text-2xl font-bold">
                  {item.festival.name}
                </h2>

                <p className="text-slate-400 mb-4">
                  Saved on {new Date(item.createdAt).toLocaleString()}
                </p>

                <div className="space-y-2">
                  <p>
                    <strong>Attendance:</strong>{" "}
                    {Number(item.festival.attendance).toLocaleString()}
                  </p>

                  <p>
                    <strong>Weather:</strong> {item.festival.weather}
                  </p>

                  <p>
                    <strong>Revenue:</strong>{" "}
                    {formatMoney(item.metrics.totalRevenue)}
                  </p>

                  <p>
                    <strong>Expenses:</strong>{" "}
                    {formatMoney(item.metrics.totalExpenses)}
                  </p>

                  <p>
                    <strong>Profit:</strong>{" "}
                    <span
                      className={
                        item.metrics.profit >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {formatMoney(item.metrics.profit)}
                    </span>
                  </p>

                  <p>
                    <strong>Risk:</strong> {item.metrics.crowdRisk}
                  </p>
                </div>

                <button
                  onClick={() => deleteFestival(item.id)}
                  className="mt-5 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedFestivals