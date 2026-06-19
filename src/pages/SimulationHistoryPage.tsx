import {
  ArrowRight,
  CalendarClock,
  Goal,
  History,
  PiggyBank,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

const formatDate = (value?: string) => {
  if (!value) {
    return 'Simulação salva'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function SimulationHistoryPage() {
  const { getAllFormData } = useSimulationStorage()
  const simulations = getAllFormData().toReversed()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Revise suas metas e acompanhe os cenários financeiros já criados."
      />

      {simulations.length === 0 ? (
        <section className="bg-card flex min-h-80 flex-col items-center justify-center rounded-2xl p-8 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <div className="bg-muted-primary text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full">
            <History size={28} />
          </div>
          <h2 className="text-foreground text-lg font-semibold">
            Nenhuma simulação encontrada
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">
            Crie sua primeira simulação para visualizar o histórico aqui.
          </p>
          <Link
            to="/"
            className="bg-primary text-primary-foreground mt-6 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
          >
            Criar simulação
          </Link>
        </section>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {simulations.map((simulation) => (
            <Link
              key={simulation.id}
              to={`/resultado/${simulation.id}`}
              className="group bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-primary mb-2 text-xs font-semibold tracking-widest uppercase">
                    {formatDate(simulation.createdAt)}
                  </p>
                  <h2 className="text-foreground text-xl font-semibold">
                    {simulation.goalName}
                  </h2>
                </div>
                <ArrowRight
                  size={20}
                  className="text-primary mt-1 shrink-0 transition-transform group-hover:translate-x-1"
                />
              </div>

              <div className="border-border mt-6 grid grid-cols-3 gap-3 border-t pt-4">
                <div>
                  <Goal size={16} className="text-primary mb-2" />
                  <p className="text-muted-foreground text-xs">Meta</p>
                  <p className="text-foreground mt-1 text-sm font-semibold">
                    {simulation.goalAmount}
                  </p>
                </div>
                <div>
                  <CalendarClock size={16} className="text-primary mb-2" />
                  <p className="text-muted-foreground text-xs">Prazo</p>
                  <p className="text-foreground mt-1 text-sm font-semibold">
                    {simulation.goalDeadline} meses
                  </p>
                </div>
                <div>
                  <PiggyBank size={16} className="text-primary mb-2" />
                  <p className="text-muted-foreground text-xs">Renda</p>
                  <p className="text-foreground mt-1 text-sm font-semibold">
                    {simulation.income}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
