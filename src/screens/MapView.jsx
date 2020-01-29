import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

import { projectMap } from '../services/mapping'


const MapView = props => {

  const d3Container = useRef(null)
  const data = [1, 2, 3]


  // const [ mapSVG, setMapSVG ] = useState(null)

  useEffect(() => {
    // setMapSVG(projectMap())
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current)

      const update = svg.append('g')
        .selectAll('text')
        .data(data)

      update.enter()
        .append('text')
        .attr('x', (d, i) => i * 25)
        .attr('y', 40)
        .style('font-size', 24)
        .text((d: number) => d);

      update.attr('x', (d, i) => i * 40)
        .text((d: number) => d)

      update.exit()
        .remove()
    }
  }, [data])


  return (
    // <div className='map-container'>
    //   <h1>MAP</h1>
    // </div>
    <svg
      className='d3-component'
      width={400}
      height={200}
      ref={d3Container}
    />
  )
}

export default MapView
