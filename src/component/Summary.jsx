import React from 'react'

import { extractValues, mean, stdDev, iqr } from '../services/stats-helper'

const Summary = props => {

  const testData = props.demand.California.data

  return (
    <summary>
      <h2>SUMMARY</h2>
      <p>{mean(extractValues(testData))}</p>
      <p>{stdDev(extractValues(testData))}</p>
      <p>{iqr(extractValues(testData)).join(', ')}</p>
    </summary>
  )
}

export default Summary
