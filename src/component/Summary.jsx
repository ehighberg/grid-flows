import React from 'react'

import { mean, stdDev, iqr } from '../services/stats-helper'
import { extractValues } from '../services/seriesParsing'

const Summary = props => {

  const io = props.settings.supplyOrDemand
  const data = extractValues(props[io].data)

  return (
    <summary>
      <h2>{props[io].name}</h2>
      <p>{mean(data)}</p>
      <p>{stdDev(data)}</p>
      <p>{iqr(data).join(', ')}</p>
    </summary>
  )
}

export default Summary
