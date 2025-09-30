import { ClerkProvider } from "@clerk/nextjs"
import Providers from "./providers"
import QueryProvider from "./query-provider"
import "./globals.css"
import { Exo_2 } from "next/font/google"

// Load Exo_2 font with multiple weights
const exo = Exo_2({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={exo.className}>
      <head>
        <title>Clario - Habit Tracker</title>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Social preview image */}
        <meta property="og:title" content="Clario - Habit Tracker" />
        <meta
          property="og:description"
          content="Track your habits, stay consistent, and level up with Clario."
        />
        <meta property="og:image" content="/images/clario.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="/images/clario.png" />
      </head>
      <body>
        <ClerkProvider
          appearance={{ variables: { colorPrimary: "#7C3AED", colorText: "#FFF200" } }}
        >
          <Providers>
            <QueryProvider>
              {children}
            </QueryProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
