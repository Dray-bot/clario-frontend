const API_URL = process.env.NEXT_PUBLIC_API_URL

const api = {
  getHabits: async (userId) => {
    const res = await fetch(`${API_URL}/habits/${userId}`)
    if (!res.ok) throw new Error("Error fetching habits")
    return res.json()
  },

  addHabit: async (habit) => {
    const res = await fetch(`${API_URL}/habits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habit),
    })
    if (!res.ok) throw new Error("Error adding habit")
    return res.json()
  },

  toggleHabit: async (id) => {
    const res = await fetch(`${API_URL}/habits/${id}`, { method: "PUT" })
    if (!res.ok) throw new Error("Error updating habit")
    return res.json()
  },

  deleteHabit: async (id) => {
    const res = await fetch(`${API_URL}/habits/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error deleting habit")
    return res.json()
  },
}

export default api
