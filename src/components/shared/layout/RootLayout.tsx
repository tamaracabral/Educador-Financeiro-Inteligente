import { Outlet } from 'react-router-dom'

import { Header } from '@/components/shared/Header'

export function RootLayout() {
  return (
    <>
      <Header />
      <main className="px-0 py-1">
        <Outlet />
      </main>
    </>
  )
}
