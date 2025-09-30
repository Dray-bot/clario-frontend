"use client"

import { useState, useEffect, useRef } from "react"
import { useUser, UserButton } from "@clerk/nextjs"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import api from "@/lib/api"
import { motion } from "framer-motion"
import gsap from "gsap"
import { Exo_2 } from "next/font/google"

const modernFont = Exo_2({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
})

export default function DashboardPage() {
  const { user } = useUser()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const [newHabit, setNewHabit] = useState("")
  const [reminderTime, setReminderTime] = useState("")
  const containerRef = useRef(null)

  // GSAP page entry animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      )
    }
  }, [])

  // Fetch habits
  const { data: habits = [], isLoading } = useQuery({
    queryKey: ["habits", user?.id],
    queryFn: () => api.getHabits(user.id),
    enabled: !!user?.id,
  })

  // Mutations
  const addHabitMutation = useMutation({
    mutationFn: api.addHabit,
    onSuccess: () => {
      queryClient.invalidateQueries(["habits", user.id])
      enqueueSnackbar("Habit added!", { variant: "success" })
      setNewHabit("")
    },
    onError: () => enqueueSnackbar("Error adding habit", { variant: "error" }),
  })

  const toggleHabitMutation = useMutation({
    mutationFn: api.toggleHabit,
    onSuccess: () => queryClient.invalidateQueries(["habits", user.id]),
    onError: () => enqueueSnackbar("Error updating habit", { variant: "error" }),
  })

  const deleteHabitMutation = useMutation({
    mutationFn: api.deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries(["habits", user.id])
      enqueueSnackbar("Habit deleted!", { variant: "info" })
    },
    onError: () => enqueueSnackbar("Error deleting habit", { variant: "error" }),
  })

  const handleAddHabit = (e) => {
    e.preventDefault()
    if (!newHabit.trim()) return
    addHabitMutation.mutate({ userId: user.id, title: newHabit })
  }

  if (isLoading) return <p className="p-6 text-purple-700">Loading habits...</p>

  // Stats
  const totalHabits = habits.length
  const completedHabits = habits.filter((h) => h.completed).length
  const streak = habits.reduce((acc, h) => acc + (h.streak || 0), 0)

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-white via-purple-50 to-white text-gray-900 ${modernFont.className} overflow-hidden`}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-purple-200 bg-purple-50/60 backdrop-blur-md shadow-sm">
        <motion.h1
          className="text-3xl font-extrabold text-purple-700 tracking-wide flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold">
            C
          </span>
          Clario
        </motion.h1>
        <UserButton afterSignOutUrl="/" />
      </header>

      <main ref={containerRef} className="p-6 max-w-5xl mx-auto space-y-10">
        {/* Greeting */}
        <motion.div
          className="text-2xl font-bold text-purple-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Welcome back, {user?.firstName || "User"} 👋
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white border border-purple-200 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-600">Total Habits</h3>
            <p className="text-3xl text-purple-700 font-bold">{totalHabits}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white border border-purple-200 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-600">
              Completed Today
            </h3>
            <p className="text-3xl text-purple-700 font-bold">
              {completedHabits}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white border border-purple-200 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-600">Total Streak</h3>
            <p className="text-3xl text-purple-700 font-bold">{streak}🔥</p>
          </motion.div>
        </div>

        {/* Add habit form */}
        <motion.form
          onSubmit={handleAddHabit}
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Enter a new habit..."
            className="flex-1 border-2 border-purple-300 rounded-xl px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            disabled={addHabitMutation.isPending}
            className="bg-purple-600 text-white px-5 py-3 rounded-xl font-bold shadow hover:bg-purple-700 transition transform hover:scale-105"
          >
            Add
          </button>
        </motion.form>

        {/* Reminder input */}
        <div className="flex gap-3 items-center">
          <label className="font-semibold text-purple-800">Set Reminder:</label>
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="border-2 border-purple-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Habits list */}
        <ul className="space-y-5">
          {habits.map((habit) => (
            <motion.li
              key={habit._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between bg-white border border-purple-200 p-4 rounded-xl shadow hover:shadow-purple-200"
            >
              <div
                onClick={() => toggleHabitMutation.mutate(habit._id)}
                className={`cursor-pointer text-lg ${
                  habit.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {habit.title}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-purple-600 font-semibold">
                  🔥 {habit.streak || 0} days
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteHabitMutation.mutate(habit._id)}
                  className="text-red-500 font-bold hover:text-red-400 transition"
                >
                  ✕
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>
      </main>
    </div>
  )
}
