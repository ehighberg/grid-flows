import React from 'react'

import { regionCodes } from '../services/api-helper'


const QuerySettings = props => {

  const { regionSelect, supplyOrDemand, startDate, endDate } = props.formValues

  return (
    <form>
      <label htmlFor='regionSelect'>Select Region: </label>
      <select
        id='regionSelect'
        name='regionSelect'
        value={regionSelect}
        onChange={props.onChange}>

        <option value={'All Regions'}>All Regions</option>
        {Object.keys(regionCodes).map((regionName, i) =>
          <option
            value={regionName}
            key={i}>
            {regionName}
          </option>)}

      </select>
      <br />

      <input
        type='radio'
        name='supplyOrDemand'
        value='Demand'
        checked={supplyOrDemand === 'Demand'} onChange={props.onChange} />
      Demand

      <input
        type='radio'
        name='supplyOrDemand'
        value='Supply'
        checked={supplyOrDemand === 'Supply'} onChange={props.onChange} />
      Supply
      <br />

      <label htmlFor='startDate'>Select Starting Date: </label>
      <input
        type='date'
        name='startDate'
        min={props.minDate}
        max={props.maxDate}
        value={startDate}
        onChange={props.onChange}/>
      <br />

      <label htmlFor='endDate'>Select Ending Date: </label>
      <input
        type='date'
        name='endDate'
        min={props.minDate}
        max={props.maxDate}
        value={endDate}
        onChange={props.onChange}/>
    </form>
  )
}

export default QuerySettings
