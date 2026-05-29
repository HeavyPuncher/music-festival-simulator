import { useState } from "react"
import { artists, stages } from "../data/festivalOptions"

function FestivalForm({ onCalculate }) {
  const [festival, setFestival] = useState({
    name: "",
    attendance: 10000,
    ticketPrice: 100,
    artist: artists[0],
    stage: stages[0],
    toilets: 100,
    security: 50,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onCalculate(festival)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-6 rounded-xl space-y-4"
    >
      <input
        className="w-full p-3 rounded bg-slate-700"
        placeholder="Festival Name"
        onChange={(e) =>
          setFestival({
            ...festival,
            name: e.target.value,
          })
        }
      />

      <input
        type="number"
        className="w-full p-3 rounded bg-slate-700"
        placeholder="Attendance"
        value={festival.attendance}
        onChange={(e) =>
          setFestival({
            ...festival,
            attendance: Number(e.target.value),
          })
        }
      />

      <button
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Simulate Festival
      </button>
    </form>
  )
}

export default FestivalForm