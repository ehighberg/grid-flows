import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'

import { saxpy } from '@stdlib/blas/base'
import { Float32Array } from '@stdlib/array'


import { regionCodes, ioCodes, makeSeriesDict } from '../services/api-helper'
import { extractValues } from '../services/stats-helper'

import MapView from '../screens/MapView'
import QuerySettings from '../screens/QuerySettings'

import Summary from './Summary'


const minDate = '2015-07-01'
const maxDate = moment().subtract(1, 'days').format('YYYY-MM-DD')


const Main = props => {

  const [ demandSeries, setDemandSeries ] = useState({})
  const [ supplySeries, setSupplySeries ] = useState({})

  const [ formValues , setFormValues ] = useState({
    regionSelect: 'All Regions',
    supplyOrDemand: 'Demand',
    startDate: maxDate,
    endDate: maxDate,
  })

  const onFormChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
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

  const getAPIResponses = async () => {
    const demandRes = await makeSeriesDict('Demand')
    setDemandSeries(demandRes)
    const supplyRes = await makeSeriesDict('Supply')
    setSupplySeries(supplyRes)
  }

  useEffect(() => { getAPIResponses() }
    , [])


  if (!demandSeries.California) {
    return (
      <h1>Loading...</h1>
    )
  } else {


    console.log(demandSeries)
    extractAllRegionValues(demandSeries)

    return (
      <main>
        <Route exact path='/' component={MapView} />
        {// <Route exact path='/chart' component={Chart} />
      }

        <Route exact path='/browse' >
          <QuerySettings
            onChange={onFormChange}
            minDate={minDate} maxDate={maxDate} formValues={formValues}
          />
        </Route>

        <Summary
          settings={formValues}
          demand={demandSeries}
          supply={supplySeries}
        />
      </main>
    )
  }
}

export default Main
