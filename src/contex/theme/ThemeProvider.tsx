import { type PropsWithChildren, useEffect, useState } from 'react'

import type { Theme } from '@/contex/theme/ThemeContex'
import { ThemeContex } from '@/contex/theme/ThemeContex'

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => {
    const localStorageTheme = localStorage.getItem('theme') as Theme | null

    if (localStorageTheme) {
      return localStorageTheme
    }

    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches

    return systemPrefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContex.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContex.Provider>
  )
}
