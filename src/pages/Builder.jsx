import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import FestivalForm from "../components/FestivalForm"
import Dashboard from "../components/Dashboard"
import { calculateFestivalMetrics } from "../utils/calculations"
import { getCurrentUser, logoutUser } from "../utils/auth"

function Builder() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const [metrics, setMetrics] = useState(null)
  const [savedMessage, setSavedMessage] = useState("")

  const handleCalculate = (festival) => {
    const results = calculateFestivalMetrics(festival)
    setMetrics(results)
  }

  const handleSave = (festival) => {
    const results = calculateFestivalMetrics(festival)

    const savedFestivals =
      JSON.parse(localStorage.getItem("savedFestivals")) || []

    const festivalToSave = {
      id: crypto.randomUUID(),
      userEmail: user.email,
      festival,
      metrics: results,
      createdAt: new Date().toISOString(),
    }

    savedFestivals.push(festivalToSave)

    localStorage.setItem("savedFestivals", JSON.stringify(savedFestivals))

    setSavedMessage("Festival setup saved successfully")
    setMetrics(results)
  }

  const handleLogout = () => {
    logoutUser()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Festival Simulator</h1>
            <p className="text-slate-400">
              Welcome, {user?.name}. Build, forecast and save your festival
              setup.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/saved"
              className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded font-bold"
            >
              Saved Setups
            </Link>

            <Link
              to="/compare"
              className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded font-bold"
            >
              Compare
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded font-bold"
            >
              Logout
            </button>
          </div>
        </header>

        {savedMessage && (
          <div className="bg-green-500/20 text-green-300 p-4 rounded-xl mb-5">
            {savedMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <FestivalForm onCalculate={handleCalculate} onSave={handleSave} />
          <Dashboard metrics={metrics} />
        </div>
      </div>
    </div>
  )
}

export default Builder