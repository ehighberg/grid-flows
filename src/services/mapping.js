import * as d3 from 'd3'
import { usStates } from '../data/us-states'


export const projectMap = (data, d3Container) => {
  // Largely from http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/ and http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922 and https://medium.com/@jeffbutsch/using-d3-in-react-with-hooks-4a6c61f1d102

  const svg = d3.select(d3Container.current)

  const width = d3Container.current.clientWidth
  const height = d3Container.current.clientHeight

  const scaleFactor = 1.35

  svg.append('svg')
    .attr('width', width)
    .attr('height', height)

  const albersProjection = d3.geoAlbersUsa()
    .translate([ width / 2, height / 2 ])
    .scale([width * scaleFactor])

  const path = d3.geoPath()
    .projection(albersProjection)

  const json = usStates

  svg.selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
    .attr('d', path)
    .style("stroke", "#fff")
    .style("stroke-width", "1")

  return svg

}
