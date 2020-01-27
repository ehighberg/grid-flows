import moment from 'moment'
import { saxpy } from '@stdlib/blas/base'
import { Float32Array } from '@stdlib/array'

export const extractValues = series => {
  // Takes 2D array, flattens it, and takes every second element
  return series.flat().filter((value, index) => index % 2 !== 0)
}

export const extractAllRegionValues = ioSeries => {
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
