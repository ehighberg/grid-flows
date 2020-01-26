import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'

import { mean } from '../services/stats'
import { regionCodes, ioCodes, makeSeriesDict } from '../services/api-helper'

import MapView from '../screens/MapView'
import QuerySettings from '../screens/QuerySettings'

import Summary from './Summary'


const minDate = '2015-07-01'
const maxDate = moment().subtract(1, 'days').format('YYYY-MM-DD')



const Main = props => {

  const [ allPowerSeries, setAllPowerSeries ] = useState(null)

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
    const response = await makeSeriesDict()
    setAllPowerSeries(response)
  }

  useEffect(() => { getAPIResponses() }
    , [])


  if (!allPowerSeries) {
    console.log(allPowerSeries)
    return (
      <h1>Loading...</h1>
    )
  } else {


    console.log(allPowerSeries)
    console.log(typeof allPowerSeries.Demand)
    console.log(allPowerSeries.Demand)
    console.log(typeof allPowerSeries.Demand.California)
    console.log(allPowerSeries.Demand.California)


    return (
      <main>
        <p>{allPowerSeries.Demand.Texas.name}</p>
        <Route exact path='/' component={MapView} />
        {// <Route exact path='/chart' component={Chart} />
      }

        <Route exact path='/browse' >
          <QuerySettings
            onChange={onFormChange}
            minDate={minDate} maxDate={maxDate} formValues={formValues}
          />
        </Route>

        <Summary />
      </main>
    )
  }
}

export default Main
