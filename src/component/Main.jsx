import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'


import { makeSeriesDict } from '../services/api-helper'
import { timeParseData } from '../services/seriesParsing'


import MapView from '../screens/MapView'
import QuerySettings from '../screens/QuerySettings'

import Summary from './Summary'


const minDate = '2015-07-02'
const maxDate = moment().subtract(2, 'days').format('YYYY-MM-DD')


const Main = props => {

  const [ demandSeries, setDemandSeries ] = useState({})
  const [ supplySeries, setSupplySeries ] = useState({})

  const [ formValues , setFormValues ] = useState({
    regionSelect: 'All Regions',
    io: 'Demand',
    startDate: maxDate,
    endDate: maxDate,
  })

  const onFormChange = (e) => {
    console.log('Set', e.target.name, 'to', e.target.value)
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


  useEffect(() => {
    getAPIResponses()
   }, [])


  if (!demandSeries.California) {
    return (
      <h1>Loading...</h1>
    )
  } else {

    const parsedDemand = timeParseData(demandSeries[formValues.regionSelect],  formValues.startDate, formValues.endDate)

    const parsedSupply = supplySeries['All Regions'] ? timeParseData(supplySeries[formValues.regionSelect],  formValues.startDate, formValues.endDate) : {}

    console.log(parsedDemand)
    console.log(parsedSupply)

    return (
      <main>

        <Route exact path='/'>
          <MapView
            settings={formValues}
            Demand={parsedDemand}
            Supply={ parsedSupply.series_id ? parsedSupply : {} }
          />
        </Route>

        <Route exact path='/browse' >
          <QuerySettings
            onChange={onFormChange}
            minDate={minDate} maxDate={maxDate} formValues={formValues}
          />
        </Route>


        <Summary
          settings={formValues}
          Demand={parsedDemand}
          Supply={ parsedSupply.series_id ? parsedSupply : {} }
        />
      </main>
    )
  }
}

export default Main
