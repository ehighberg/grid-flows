import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'

import { mean } from '../services/stats'
import { regionCodes, ioCodes, timeLocaleCodes, fetchAllPowerSeries , testApi} from '../services/api-helper'

import MapView from '../screens/MapView'
import QuerySettings from '../screens/QuerySettings'

import Summary from './Summary'


const minDate = '2015-07-01'
const maxDate = moment().subtract(1, 'days').format('YYYY-MM-DD')

// testApi()


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
    const response = await fetchAllPowerSeries()
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
    console.log(typeof allPowerSeries.Local.Demand)
    console.log(allPowerSeries.Local.Demand)
    console.log(typeof allPowerSeries.Local.Demand.California)
    console.log(allPowerSeries.Local.Demand.California)


    return (
      <main>
        <p>{allPowerSeries.Local.Demand.Texas}</p>
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
