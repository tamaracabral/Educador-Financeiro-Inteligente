import { createContext } from "react"

export type Theme = 'light' | 'dark'

interface ThemeContexValue {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContex = createContext<ThemeContexValue | undefined>(
  undefined,
)