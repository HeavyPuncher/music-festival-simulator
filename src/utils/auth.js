export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || []

  const existingUser = users.find((u) => u.email === user.email)

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
    }
  }

  users.push(user)

  localStorage.setItem("users", JSON.stringify(users))

  return {
    success: true,
    message: "Account created successfully",
  }
}

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || []

  const user = users.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) {
    return null
  }

  localStorage.setItem("currentUser", JSON.stringify(user))

  return user
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"))
}

export const logoutUser = () => {
  localStorage.removeItem("currentUser")
}