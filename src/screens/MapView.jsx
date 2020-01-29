import React, { useEffect, useRef } from 'react'

import { projectMap } from '../services/mapping'


const MapView = props => {

  const d3Container = useRef(null)

  const data = {}

  const mapWidth = '95vw'
  const mapHeight = '60vw'


  useEffect(() => {
    // setMapSVG(projectMap())
    if (data && d3Container.current) {
      projectMap(data, d3Container)
    }
  }, [data])


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
