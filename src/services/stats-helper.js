const round = (numToRound, numPlaces) => {
  const powerOf10 = 10 ** numPlaces
  return Math.floor(numToRound * powerOf10) / powerOf10
}

const sortHelper = values => {
  return values.sort((a, b) => a > b)
}


export const mean = values => {
  // https://wikimedia.org/api/rest_v1/media/math/render/svg/4e3313161244f8ab61d897fb6e5fbf6647e1d5f5
  return round(values.reduce((a, b) => a + b) / values.length, 2)
}

export const stdDev = values => {
  // Standard Deviation
  // https://wikimedia.org/api/rest_v1/media/math/render/svg/067067e579e43b39ca1e57d9be52bda5b80cd284

  const sampleMean = mean(values)
  return round((
    values.reduce((a, b) =>
    a + (b - sampleMean) ** 2) / (values.length - 1)
    )
    ** 0.5
    , 2)
}

export const iqr = values => {
  // Interquartile Range
  // https://en.wikipedia.org/wiki/Interquartile_range

  const sortedValues = sortHelper(values)
  const numVals = sortedValues.length

  const median = (numVals % 2 !== 0) ?
    sortedValues[Math.floor(numVals / 2)] :
    (sortedValues[Math.floor(numVals / 2)] +
      sortedValues[Math.floor(numVals / 2) + 1]) / 2

  const lowerIQR = sortedValues[Math.floor(numVals / 4)]
  const upperIQR = sortedValues[Math.floor(3 * numVals / 4)]

  return [lowerIQR, median, upperIQR]
}
