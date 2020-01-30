import React from 'react'

import { regionCodes } from '../services/api-helper'


const QuerySettings = props => {

  const { regionSelect, io, startDate, endDate } = props.formValues

  return (
    <form>
      <label htmlFor='regionSelect'>Select Region: </label>
      <select
        id='regionSelect'
        name='regionSelect'
        value={regionSelect}
        onChange={props.onChange}>

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
        name='io'
        value='Demand'
        checked={io === 'Demand'} onChange={props.onChange} />
      Demand

      <input
        type='radio'
        name='io'
        value='Supply'
        checked={io === 'Supply'} onChange={props.onChange} />
      Supply
      <br />

      <label htmlFor='startDate'>Start:</label>
      <input
        type='date'
        name='startDate'
        min={props.minDate}
        max={props.maxDate}
        value={startDate}
        onChange={props.onChange}/>

      <label htmlFor='endDate'>End:</label>
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
