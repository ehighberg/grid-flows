export const mean = values => {
  return Math.floor(values.reduce((a, b) => a + b) / values.length * 100) / 100
}
