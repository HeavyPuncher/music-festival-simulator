import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../utils/auth"

function SavedFestivals() {
  const user = getCurrentUser()
  const [savedFestivals, setSavedFestivals] = useState([])
  const [selectedIds, setSelectedIds] = useState([])

  const loadSavedFestivals = () => {
    const allSaved = JSON.parse(localStorage.getItem("savedFestivals")) || []

    const userSaved = allSaved.filter((item) => item.userEmail === user.email)

    setSavedFestivals(userSaved)
  }

  useEffect(() => {
    loadSavedFestivals()
  }, [])

  const updateStorageAfterDelete = (idsToDelete) => {
    const allSaved = JSON.parse(localStorage.getItem("savedFestivals")) || []

    const updated = allSaved.filter((item) => !idsToDelete.includes(item.id))

    localStorage.setItem("savedFestivals", JSON.stringify(updated))

    setSelectedIds([])
    loadSavedFestivals()
  }

  const toggleSelected = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const selectAll = () => {
    setSelectedIds(savedFestivals.map((item) => item.id))
  }

  const clearSelection = () => {
    setSelectedIds([])
  }

  const deleteFestival = (id) => {
    const festival = savedFestivals.find((item) => item.id === id)

    const confirmed = window.confirm(
      `Are you sure you want to delete "${festival?.festival.name}"?`
    )

    if (!confirmed) return

    updateStorageAfterDelete([id])
  }

  const deleteSelected = () => {
    if (selectedIds.length === 0) return

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} selected festival setup(s)?`
    )

    if (!confirmed) return

    updateStorageAfterDelete(selectedIds)
  }

  const deleteAll = () => {
    if (savedFestivals.length === 0) return

    const confirmed = window.confirm(
      `Are you sure you want to delete ALL ${savedFestivals.length} saved festival setup(s)? This cannot be undone.`
    )

    if (!confirmed) return

    const idsToDelete = savedFestivals.map((item) => item.id)

    updateStorageAfterDelete(idsToDelete)
  }

  const formatMoney = (value) => {
    return `£${Math.round(value).toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Saved Festival Setups</h1>
            <p className="text-slate-400">
              Review, multi-select and delete saved festival simulations.
            </p>
          </div>

          <Link
            to="/builder"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded font-bold"
          >
            Back to Builder
          </Link>
        </header>

        {savedFestivals.length > 0 && (
          <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <p className="text-slate-300">
              {selectedIds.length} selected out of {savedFestivals.length}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={selectAll}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded font-bold"
              >
                Select All
              </button>

              <button
                onClick={clearSelection}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded font-bold"
              >
                Clear Selection
              </button>

              <button
                onClick={deleteSelected}
                disabled={selectedIds.length === 0}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-40 px-4 py-2 rounded font-bold"
              >
                Delete Selected
              </button>

              <button
                onClick={deleteAll}
                className="bg-red-800 hover:bg-red-900 px-4 py-2 rounded font-bold"
              >
                Delete All
              </button>
            </div>
          </div>
        )}

        {savedFestivals.length === 0 ? (
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl">
            <p>No saved festivals yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {savedFestivals.map((item) => {
              const isSelected = selectedIds.includes(item.id)

              return (
                <div
                  key={item.id}
                  className={`bg-slate-900 border p-6 rounded-2xl ${
                    isSelected ? "border-blue-500" : "border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelected(item.id)}
                      className="mt-2 h-5 w-5"
                    />

                    <div>
                      <h2 className="text-2xl font-bold">
                        {item.festival.name}
                      </h2>

                      <p className="text-slate-400">
                        Saved on {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

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
                    Delete This
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedFestivals