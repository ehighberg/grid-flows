import * as d3 from 'd3'
import * as d3Legend from 'd3-svg-legend'

import { stateLines, stateRegions } from '../data/us-states'
import { round } from './stats-helper'


const assignRegions = (states) => {
  states.forEach(state => {
    state['region'] = stateRegions[state.properties.name]
  })
}

const calcExcess = (supply, demand) => {
  return (supply - demand) / demand
}

const onMouseover = function(statePath, svg, tooltip) {
  // Tooltip largely from https://bl.ocks.org/d3noob/a22c42db65eb00d4e369

  const supply = statePath.getAttribute('Supply')
  const demand = statePath.getAttribute('Demand')
  const excess = calcExcess(supply, demand)

  svg.selectAll('path').filter((item) =>
    (item.region === statePath.getAttribute('region'))
    )
    .style('stroke-width', '3')

  tooltip.transition()
    .duration(150)
    .style('opacity', 0.9)
    .text(`${round(excess * 100, 0)}%`)
    .attr('transform', `translate(${d3.event.pageX - window.screen.width * 0.1}, ${d3.event.pageY - 50})`)
}

const onMouseout = function(statePath, svg, tooltip) {
  svg.selectAll('path').filter((item) =>
    (item.region === statePath.getAttribute('region'))
    )
    .style('stroke-width', '1')

  tooltip.transition()
    .duration(150)
    .style('opacity', 0)
}

const addEvents = (svg, tooltip) => {

  svg.selectAll('path')
    .on('mouseover', function () {onMouseover(this, svg, tooltip)})
    .on('mouseout', function () {onMouseout(this, svg, tooltip)})
}

export const projectMap = (ioData, d3Container, settings) => {
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

  const g = svg.selectAll('path')
    .data(stateLines.features)
    .enter()
    .append('g')

  g.append('path')
    .attr('d', path)
    .attr('state', (d) => d.properties.name)
    .attr('region', (d) => d.region )
    .attr('Demand', (d) => ioData.Demand[d.region].data[0][1])
    .attr('Supply', 0)
    .style("stroke", "#fff")
    .style("stroke-width", "1")

  const tooltip = svg.append('text')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('font-size', '2em')
    .style('font-weight', 'bold')
    .style('fill', 'red')


  addEvents(svg, tooltip)

  if (ioData.Supply['All Regions']) {
    svg.selectAll('path')
      .attr('Supply', (d) => ioData.Supply[d.region].data[0][1])

    const colorScale = d3.scaleSequential()
      .domain([-0.3, 0.3])
      .interpolator(d3.interpolateViridis)

    svg.selectAll('path')
      .attr('fill', (d) => {
        const values = {
          Supply: ioData.Supply[d.region].data[0][1],
          Demand: ioData.Demand[d.region].data[0][1]
        }

        return colorScale(calcExcess(values.Supply, values.Demand))
      })

    const legend = d3Legend.legendColor()
      .scale(colorScale)
      .cells(7)
      .orient('horizontal')
      .shapePadding(0)
      .labels(['--30', '', '', '0', '', '', '30'])

    svg.append('g')
      .attr('class', 'legend-container')
      .attr('transform', `translate(0, ${0.78 * height})`)
      .call(legend)
      .append('text')
      .text('% Extra/Deficient Power')
      .attr('transform', `translate(0, 50)`)
      .attr('class', 'legend-title')
  }

  return svg
}
