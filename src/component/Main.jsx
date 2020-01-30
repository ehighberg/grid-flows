import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'


import { makeSeriesDict } from '../services/api-helper'
import { timeParseSerieses } from '../services/seriesParsing'


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

    const allParsedDemand = timeParseSerieses(demandSeries, formValues.startDate, formValues.endDate)

    const allParsedSupply = supplySeries['All Regions'] ? timeParseSerieses(supplySeries,  formValues.startDate, formValues.endDate) : {}

    console.log(allParsedDemand)
    console.log(allParsedSupply)

    return (
      <main>

        <Route exact path='/'>
          <MapView
            settings={formValues}
            Demand={allParsedDemand}
            Supply={ allParsedSupply['All Regions'] ? allParsedSupply : {} }
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
          Demand={allParsedDemand[formValues.regionSelect]}
          Supply={allParsedSupply['All Regions'] ? allParsedSupply[formValues.regionSelect] : {}}
        />
      </main>
    )
  }
}

export default Main
