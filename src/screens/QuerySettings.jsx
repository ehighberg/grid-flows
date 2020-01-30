import React from 'react'

import { regionCodes } from '../services/api-helper'


const QuerySettings = props => {

  const { regionSelect, startDate, endDate } = props.formValues

  return (
    <form>
      <label htmlFor='regionSelect'>Region Summary: </label>
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

      <label htmlFor='startDate'>Start:</label>
      <input
        type='date'
        name='startDate'
        min={props.minDate}
        max={props.maxDate}
        value={startDate}
        onChange={props.onChange}/>
      <br />

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
