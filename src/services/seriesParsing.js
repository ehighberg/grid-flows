import moment from 'moment'
import { saxpy } from '@stdlib/blas/base'
import { Float32Array } from '@stdlib/array'


export const extractValues = series => {
  // Takes 2D array, flattens it, and takes every second element
  return series.flat().filter((value, index) => index % 2 !== 0)
}

const extractAllRegionValues = ioSeries => {
  const seriesLength = ioSeries.California.data.length

  const accumulator = new Float32Array(seriesLength)

  Object.keys(ioSeries).forEach(region => {
    const floatyArray = new Float32Array(extractValues(ioSeries[region].data))

    // saxpy is a FORTRAN-based function that adds arrays element-wise
    // https://stdlib.io/docs/api/v0.0.90/@stdlib/blas/base/saxpy

    saxpy(seriesLength, 1, floatyArray, 1, accumulator, 1)
  })

  return accumulator
}

export const timeParseData = (series, startDate, endDate) => {

  const startTime = moment(startDate)
  const endTime = moment(endDate).add(23, 'hours')

  const parsedSeries = Object.assign({}, series)

  parsedSeries.data = series.data.filter(timeValPair => {
    const parsedTime = moment.parseZone(timeValPair[0])
    return ( (parsedTime >= startTime) && (parsedTime <= endTime) )
  })

  return parsedSeries
}

export const timeParseAllRegionsData = (serieses, startDate, endDate) => {
  const allRegionsSeries = {
    name: "Demand for All Regions, hourly - UTC time",
    data: []
  }

  const timeParsedSerieses = Object.assign({}, serieses)
  console.log(timeParsedSerieses)
  Object.keys(serieses).forEach(seriesKey => {
    timeParsedSerieses[seriesKey] = timeParseData(serieses[seriesKey], startDate, endDate)
  })
  console.log(timeParsedSerieses)

  const allRegionsValues = extractAllRegionValues(timeParsedSerieses)
  console.log(allRegionsValues)

  timeParsedSerieses.Texas.data.forEach((timeValPair, i) => {
    allRegionsSeries.data.push([timeValPair[0], allRegionsValues[i]])
  })

  return allRegionsSeries
}
