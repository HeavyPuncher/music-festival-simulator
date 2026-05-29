import { useState } from "react"
import FestivalForm from "./components/FestivalForm"
import Dashboard from "./components/Dashboard"
import { calculateFestivalMetrics } from "./utils/calculations"

function App() {
  const [metrics, setMetrics] = useState(null)

  const handleCalculate = (festival) => {
    const results =
      calculateFestivalMetrics(festival)

    setMetrics(results)
  }

  return (
    <div className="min-h-screen p-10 bg-slate-900">
      <h1 className="text-4xl font-bold mb-8">
        Festival Simulator
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <FestivalForm
          onCalculate={handleCalculate}
        />

        <Dashboard metrics={metrics} />
      </div>
    </div>
  )
}

export default App