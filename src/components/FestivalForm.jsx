import { useState } from "react"
import {
  artists,
  stages,
  weatherOptions,
  locationOptions,
} from "../data/festivalOptions"

function FestivalForm({ onCalculate, onSave }) {
  const [festival, setFestival] = useState({
    name: "",
    location: "Field",
    attendance: 10000,
    ticketPrice: 100,
    days: 1,
    weather: "Sunny",
    artistId: 1,
    stageId: 1,
    toilets: 100,
    securityStaff: 40,
    medicalStaff: 5,
    foodVendors: 10,
  })

  const handleChange = (e) => {
    setFestival({
      ...festival,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onCalculate(festival)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-700 p-6 rounded-2xl space-y-5"
    >
      <h2 className="text-2xl font-bold">Festival Builder</h2>

      <div>
        <label className="block mb-2">Festival Name</label>
        <input
          name="name"
          value={festival.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          placeholder="RickFest 2026"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Location Type</label>
        <select
          name="location"
          value={festival.location}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
        >
          {locationOptions.map((location) => (
            <option key={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2">Attendance</label>
          <input
            name="attendance"
            type="number"
            value={festival.attendance}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="block mb-2">Ticket Price (£)</label>
          <input
            name="ticketPrice"
            type="number"
            value={festival.ticketPrice}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="block mb-2">Days</label>
          <input
            name="days"
            type="number"
            value={festival.days}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">Weather</label>
        <select
          name="weather"
          value={festival.weather}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
        >
          {weatherOptions.map((weather) => (
            <option key={weather}>{weather}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2">Artist</label>
        <select
          name="artistId"
          value={festival.artistId}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
        >
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name} - £{artist.cost.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2">Stage</label>
        <select
          name="stageId"
          value={festival.stageId}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
        >
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name} - Capacity {stage.capacity.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-2">Toilets</label>
          <input
            name="toilets"
            type="number"
            value={festival.toilets}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="block mb-2">Security</label>
          <input
            name="securityStaff"
            type="number"
            value={festival.securityStaff}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="block mb-2">Medical</label>
          <input
            name="medicalStaff"
            type="number"
            value={festival.medicalStaff}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="block mb-2">Food Vendors</label>
          <input
            name="foodVendors"
            type="number"
            value={festival.foodVendors}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded font-bold">
          Simulate Festival
        </button>

        <button
          type="button"
          onClick={() => onSave(festival)}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded font-bold"
        >
          Save Setup
        </button>
      </div>
    </form>
  )
}

export default FestivalForm