import { useEffect, useState } from "react"
import {
  artistTypes,
  artists,
  stages,
  weatherOptions,
  locationOptions,
} from "../data/festivalOptions"

const defaultFestival = {
  name: "",
  location: "Field",
  attendance: 10000,
  ticketPrice: 100,
  days: 1,
  weather: "Sunny",
  artistTypeId: "headline",
  artistId: 1,
  stageId: 1,
  toilets: 100,
  securityStaff: 40,
  medicalStaff: 5,
  foodVendors: 10,
}

function FestivalForm({ onCalculate, onSave, onClear }) {
  const [festival, setFestival] = useState(() => {
    const savedDraft = localStorage.getItem("festivalDraft")

    if (savedDraft) {
      return JSON.parse(savedDraft)
    }

    return defaultFestival
  })

  useEffect(() => {
    localStorage.setItem("festivalDraft", JSON.stringify(festival))
  }, [festival])

  const filteredArtists = artists.filter(
    (artist) => artist.typeId === festival.artistTypeId
  )

  const handleChange = (e) => {
    setFestival({
      ...festival,
      [e.target.name]: e.target.value,
    })
  }

  const handleArtistTypeChange = (e) => {
    const selectedType = e.target.value

    const firstArtistOfType = artists.find(
      (artist) => artist.typeId === selectedType
    )

    setFestival({
      ...festival,
      artistTypeId: selectedType,
      artistId: firstArtistOfType.id,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onCalculate(festival)
  }

  const handleClear = () => {
    setFestival(defaultFestival)
    localStorage.removeItem("festivalDraft")

    if (onClear) {
      onClear()
    }
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
            min="0"
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
            min="0"
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
            min="1"
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

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Artist Type</label>
          <select
            name="artistTypeId"
            value={festival.artistTypeId}
            onChange={handleArtistTypeChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          >
            {artistTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
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
            {filteredArtists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name} - £{artist.cost.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
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
            min="0"
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
            min="0"
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
            min="0"
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
            min="0"
            value={festival.foodVendors}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded font-bold cursor-pointer">
          Simulate Festival
        </button>

        <button
          type="button"
          onClick={() => onSave(festival)}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded font-bold cursor-pointer"
        >
          Save Setup
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded font-bold cursor-pointer"
        >
          Clear Builder
        </button>
      </div>
    </form>
  )
}

export default FestivalForm