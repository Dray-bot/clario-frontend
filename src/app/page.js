"use client"

import Link from "next/link"
import { Exo_2 } from "next/font/google"
import { motion } from "framer-motion"

const exo = Exo_2({ subsets: ["latin"], weight: ["400", "600", "800"] })

export default function Home() {
  return (
    <main className={`relative flex flex-col items-center justify-center h-screen overflow-hidden bg-white ${exo.className}`}>
      {/* One-time paint splash */}
      <div className="paint-splash"></div>

      {/* Title */}
      <motion.h1
        initial={{ y: -200, opacity: 0, rotate: -10 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 12 }}
        className="text-7xl sm:text-8xl font-extrabold text-purple-800 relative z-10 mb-4"
      >
        Clario
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
        className="text-lg sm:text-xl text-gray-700 relative z-10 mb-10 text-center max-w-xl"
      >
        Build habits, track progress, and level up your life. Fun, simple, and motivating.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
        className="flex gap-4 relative z-10"
      >
        <Link
          href="/sign-up"
          className="bg-yellow-400 text-black px-8 py-3 rounded-xl shadow-lg font-bold transition transform hover:scale-105"
        >
          Get Started
        </Link>
        <Link
          href="/sign-in"
          className="bg-purple-600 text-white px-8 py-3 rounded-xl shadow-lg font-bold transition transform hover:scale-105"
        >
          Sign In
        </Link>
      </motion.div>

      <style jsx>{`
        .paint-splash {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle at 30% 30%, #9b5de5, transparent 60%),
                      radial-gradient(circle at 70% 70%, #f15bb5, transparent 60%),
                      radial-gradient(circle at 50% 50%, #fee440, transparent 60%);
          transform: translate(-50%, -50%) scale(0);
          border-radius: 50%;
          opacity: 0.6;
          animation: splash 1s ease-out forwards;
          z-index: 0;
        }

        @keyframes splash {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
        }
      `}</style>
    </main>
  )
}
