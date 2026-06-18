import { PiggyBank } from 'lucide-react'

import { FormStep } from '@/components/shared/features/Simulation/FormStep'
import { StepProgress } from '@/components/shared/features/Simulation/Progress'

export const SimulationForm = () => {
  return (
    <>
      <StepProgress currentStep={1} totalSteps={10} />
      <FormStep
        icon={PiggyBank}
        title="Renda mensal bruta"
        question="Quanto é depositado na sua conta todo mês (somando todas as fontes)?"
        inputProps={{
          type: 'text',
          placeholder: '5.000,00',
          prefix: 'R$',
        }}
      />
    </>
  )
}
