import React from 'react'

import { extractValues, mean, stdDev, iqr } from '../services/stats-helper'

const Summary = props => {

  const testData = extractValues(props.demand.California.data)

  return (
    <summary>
      <h2>Summary data for </h2>
      <p>{mean(testData)}</p>
      <p>{stdDev(testData)}</p>
      <p>{iqr(testData).join(', ')}</p>
    </summary>
  )
}

export default Summary
