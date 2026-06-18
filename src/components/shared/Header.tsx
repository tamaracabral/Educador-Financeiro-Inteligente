import { Clock, Moon, Sun, TrendingUp, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import { Divider } from '@/components/shared/Divider'
import { useTheme } from '@/hooks/useTheme'

export function Header() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border px-2 py-3 sm:px-6">
      <nav className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Wallet size={20} className="text-primary-foreground" />
          </div>

          <span className="text-lg">
            <span className="font-medium text-muted-foreground">Planej</span>
            <span className="font-extrabold">.ai</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            icon={TrendingUp}
            onClick={() => void navigate('/')}
          >
            <span className="hidden sm:inline">Nova Simulação</span>
          </Button>
          <Button
            variant="ghost"
            icon={Clock}
            onClick={() => void navigate('/historico')}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Divider orientation="vertical" spacing={8} className="h-10" />
          <Button
            aria-label={`Mudar para tema ${
              theme === 'light' ? 'escuro' : 'claro'
            }`}
            variant="ghost"
            icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          />
        </div>
      </nav>
    </header>
  )
}
