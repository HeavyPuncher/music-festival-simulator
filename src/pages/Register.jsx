import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../utils/auth"

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()

    const result = registerUser(form)

    if (!result.success) {
      setError(result.message)
      return
    }

    navigate("/")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-700"
      >
        <h1 className="text-3xl font-bold mb-2">Create Profile</h1>
        <p className="text-slate-400 mb-6">
          Your profile is stored locally in the browser.
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <label className="block mb-2">Name</label>
        <input
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 mb-4"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label className="block mb-2">Email</label>
        <input
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 mb-4"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2">Password</label>
        <input
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 mb-6"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-bold cursor-pointer">
          Register
        </button>

        <p className="mt-5 text-slate-400 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register