import moment from 'moment'

export const extractValues = series => {
  // Takes 2D array, flattens it, and takes every second element
  return series.flat().filter((value, index) => index % 2 !== 0)
}

export const timeParseData = (series, startDate, endDate) => {
  const startTime = moment.parseZone(startDate)
  const endTime = moment.parseZone(endDate).add(23, 'hours')

  const parsedSeries = Object.assign({}, series)

  parsedSeries.data = series.data.filter(timeValPair => {
    const parsedTime = moment.parseZone(timeValPair[0])
    return ( (parsedTime >= startTime) && (parsedTime <= endTime) )
  })

  return parsedSeries
}
