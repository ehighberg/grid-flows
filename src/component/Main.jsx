import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'


import { makeSeriesDict } from '../services/api-helper'
import { fullyParseSeries } from '../services/seriesParsing'


import MapView from '../screens/MapView'
import QuerySettings from '../screens/QuerySettings'

import Summary from './Summary'


const minDate = '2015-07-01'
const maxDate = moment().subtract(2, 'days').format('YYYY-MM-DD')

let counter = 0


const Main = props => {

  const [ demandSeries, setDemandSeries ] = useState({})
  const [ supplySeries, setSupplySeries ] = useState({})

  const [ formValues , setFormValues ] = useState({
    regionSelect: 'California', // Change After Development
    io: 'Demand',
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

    counter++
    console.log('counter: ', + counter)

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
          Demand={fullyParseSeries(demandSeries, formValues)}
          Supply={
            supplySeries.Texas ? fullyParseSeries(supplySeries, formValues) : {}
          }
        />
      </main>
    )
  }
}

export default Main
