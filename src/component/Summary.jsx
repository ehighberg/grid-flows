import React from 'react'

import { mean } from '../services/stats'

const Summary = props => {
  return (
    <summary>
      <h2>SUMMARY</h2>
      <p>{mean(props.demand.California.data.flat().filter((value, index) => index % 2 !== 0))}</p>
    </summary>
  )
}

export default Summary
