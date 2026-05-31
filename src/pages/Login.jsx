import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../utils/auth"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    const user = loginUser(email, password)

    if (!user) {
      setError("Invalid email or password")
      return
    }

    navigate("/builder")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-700"
      >
        <h1 className="text-3xl font-bold mb-2">Festival Simulator</h1>
        <p className="text-slate-400 mb-6">
          Login to build and simulate your festival.
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <label className="block mb-2">Email</label>
        <input
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">Password</label>
        <input
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 mb-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold cursor-pointer">
          Login
        </button>

        <p className="mt-5 text-slate-400 text-center">
          No account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login