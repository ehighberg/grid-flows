import * as d3 from 'd3'
import { stateLines, stateRegions } from '../data/us-states'


const assignRegions = (states) => {
  states.forEach(state => {
    state['region'] = stateRegions[state.properties.name]
  })
}

const onMouseover = function(statePath, svg) {
  console.log(svg)
  console.log(statePath)
  console.log(statePath.getAttribute('region'))

  svg.selectAll('path').filter((item) =>
    (item.region === statePath.getAttribute('region'))
    )
    .style('fill', '#fff')
}

const onMouseout = function(statePath, svg) {
  svg.selectAll('path').filter((item) =>
    (item.region === statePath.getAttribute('region'))
    )
    .style('fill', '#000')
}

const addEvents = (svg) => {
  svg.selectAll('path')
    .on('mouseover', function () {onMouseover(this, svg)})
    .on('mouseout', function () {onMouseout(this, svg)})
}

export const projectMap = (data, d3Container, settings) => {
  // With much help from http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/ and http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922 and https://medium.com/@jeffbutsch/using-d3-in-react-with-hooks-4a6c61f1d102

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

  assignRegions(stateLines.features)
  console.log(stateLines)

  svg.selectAll('path')
    .data(stateLines.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('state', (d) => d.properties.name)
    .attr('region', (d) => d.region )
    .style("stroke", "#fff")
    .style("stroke-width", "1")

  addEvents(svg)

  return svg
}
