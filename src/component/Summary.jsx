import React from 'react'
import moment from 'moment'

import { mean, stdDev, iqr } from '../services/stats-helper'
import { extractValues } from '../services/seriesParsing'

const Summary = props => {

  const timeFormat = 'YYYY-MM-DD hh:00'
  const startTimeString = moment(props.settings.startDate).format(timeFormat)
  const endTimeString = moment(props.settings.endDate).add(23, 'hours').format(timeFormat)

  const renderSupplyValue = valueFn => {
    if (!props.Supply.name) {
      return 'Loading...'
    } else {
      return valueFn(extractValues(props.Supply.data))
    }
  }

  const demandData = extractValues(props.Demand.data)
  const [ demLower, demMed, demHigh ] = iqr(demandData)
  const [ supLower, supMed, supHigh ] = props.Supply.name ? iqr(extractValues(props.Supply.data)) : ['Loading...', 'Loading...', 'Loading...']

  return (
    <summary>
      <h3 className='table-label'>
        {startTimeString} to {endTimeString} UTC
      </h3>

        <table className="greenTable">
          <thead>
            <tr>
            <th>{props.settings.regionSelect}</th>
            <th>Demand</th>
            <th>Supply</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Average</td>
              <td>{mean(demandData)}</td>
              <td>{renderSupplyValue(mean)}</td>
            </tr>
            <tr>
              <td>Standard Deviation</td>
              <td>{stdDev(demandData)}</td>
              <td>{renderSupplyValue(stdDev)}</td>
            </tr>
            <tr>
              <td>Lower Quartile</td>
              <td>{demLower}</td>
              <td>{supLower}</td>
            </tr>
            <tr>
              <td>Median</td>
              <td>{demMed}</td>
              <td>{supMed}</td>
            </tr>
            <tr>
              <td>Upper Quartile</td>
              <td>{demHigh}</td>
              <td>{supHigh}</td>
            </tr>
          </tbody>
        </table>
    </summary>
  )
}

export default Summary
