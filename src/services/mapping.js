import * as d3 from 'd3'
import { stateLines, stateRegions } from '../data/us-states'


const assignRegions = (states) => {
  states.forEach(state => {
    state['region'] = stateRegions[state.properties.name]
  })
}

const onMouseover = function(statePath, svg) {
  // console.log(svg)
  console.log(statePath)
  // console.log(statePath.getAttribute('region'))

  svg.selectAll('path').filter((item) =>
    (item.region === statePath.getAttribute('region'))
    )
    .style('stroke-width', '3')
}

const onMouseout = function(statePath, svg) {
  svg.selectAll('path').filter((item) =>
    (item.region === statePath.getAttribute('region'))
    )
    .style('stroke-width', '1')
}

const addEvents = (svg) => {
  svg.selectAll('path')
    .on('mouseover', function () {onMouseover(this, svg)})
    .on('mouseout', function () {onMouseout(this, svg)})
}

export const projectMap = (ioData, d3Container, settings) => {
  // With much help from http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/ and http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922 and https://medium.com/@jeffbutsch/using-d3-in-react-with-hooks-4a6c61f1d102
  console.log(ioData)

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
    .attr('Demand', (d) => ioData.Demand[d.region].data[0][1])
    .attr('Supply', 0)
    .style("stroke", "#fff")
    .style("stroke-width", "1")

  addEvents(svg)

  if (ioData.Supply['All Regions']) {
    svg.selectAll('path')
      .attr('Supply', (d) => ioData.Supply[d.region].data[0][1])

    const colorScale = d3.scaleSequential()
      .domain([-0.3, 0.3])
      .interpolator(d3.interpolateViridis)

    svg.selectAll('path')
      .attr('fill', (d) => {
        // console.log(d)
        // console.log(ioData.Demand[d.region].data[0][1])
        // console.log(colorScale(ioData.Demand[d.region].data[0][1]))
        const values = {
          Supply: ioData.Supply[d.region].data[0][1],
          Demand: ioData.Demand[d.region].data[0][1]
        }

        values.Net = values.Supply - values.Demand
        console.log(values.Net / values.Demand)
        return colorScale(values.Net / values.Demand)
      })
  }



  return svg
}
