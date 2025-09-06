"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, SunMedium } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // tránh hydration error
    return <div/>
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded"
    >
      {theme === "light" ? <Moon /> : <SunMedium />}
    </button>
  )
}
