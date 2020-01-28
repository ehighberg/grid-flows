import * as d3 from 'd3'


export const projectMap = () => {
  // Largely from http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/

  const width = '90vw'
  const height = '70vw'

  const svg = d3.select('.map-container')
          .append('svg')
          .attr('width', width)
          .attr('height', height)

  const geometries = svg.append('geometries')

  const albersProjection = d3.geoAlbers()
          .scale(19000)
          .rotate([71.057,0])
          .center([0, 42.313])
          .translate(['45vw', '35vw'])

  const geoPath = d3.geoPath()
          .projection(albersProjection)

  geometries.selectAll('path')
          // .data(neighborhoods.features)
          .enter()
          .append('path')
          .attr( "fill", "#ccc" )
          .attr( "stroke", "#333")
          .attr('d, geopath')

  return svg
}
