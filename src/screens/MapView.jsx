import React, { useEffect, useRef } from 'react'

import { projectMap } from '../services/mapping'


const MapView = props => {

  const d3Container = useRef(null)

  const data = {
    Demand: props.Demand,
    Supply: props.Supply
  }

  const mapWidth = '95vw'
  const mapHeight = '60vw'


  useEffect(() => {
    if (d3Container.current) {
      console.log('using effect MapView')
      console.log(data)
      projectMap(data, d3Container, props.settings)
    }
  }, [data, props.settings])


  return (
    <div className='map-container'>
      <svg
        className='d3-component'
        width={mapWidth}
        height={mapHeight}
        ref={d3Container}
      />
    </div>
  )
}

export default MapView
