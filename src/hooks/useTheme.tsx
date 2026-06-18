import { useContext } from 'react'

import { ThemeContex } from '@/contex/theme/ThemeContex'

export function useTheme() {
  const context = useContext(ThemeContex)

  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }

  return context
}
