export function formatARS(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(value)
}

export function formatARSParts(value: number) {
  const [int, decimals] = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  })
    .format(value)
    .replace('$', '') // strip currency symbol if you want
    .trim()
    .split(',')

  return { int, decimals }
}
