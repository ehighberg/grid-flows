import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'


import { regionCodes, ioCodes, makeSeriesDict } from '../services/api-helper'
import { extractValues, extractAllRegionValues, timeParseData } from '../services/seriesParsing'


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
    console.log(formValues.startDate)
    console.log(timeParseData(demandSeries.California, formValues.startDate, formValues.endDate))

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
