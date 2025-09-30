// src/lib/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const api = {
  // Fetch all habits for a user
  getHabits: async (userId) => {
    const res = await fetch(`${BASE_URL}/api/habits/${userId}`)
    if (!res.ok) throw new Error("Failed to fetch habits")
    return res.json()
  },

  // Add a new habit
  addHabit: async ({ userId, title }) => {
    const res = await fetch(`${BASE_URL}/api/habits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title }),
    })
    if (!res.ok) throw new Error("Failed to add habit")
    return res.json()
  },

  // Toggle habit completion
  toggleHabit: async (habitId) => {
    const res = await fetch(`${BASE_URL}/api/habits/${habitId}/toggle`, {
      method: "PATCH",
    })
    if (!res.ok) throw new Error("Failed to toggle habit")
    return res.json()
  },

  // Delete a habit
  deleteHabit: async (habitId) => {
    const res = await fetch(`${BASE_URL}/api/habits/${habitId}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete habit")
    return res.json()
  },
}

export default api
