const brlInputFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatBRLCurrencyInput(value: string): string {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  return brlInputFormatter.format(Number(digits) / 100)
}

export function parseCurrency(value: string): number {
  return (
    parseFloat(value.replace(/\./g, '').replace(',', '.').replace('R$','')) ||
    0
  )
}