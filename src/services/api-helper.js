import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const api_key = process.env.REACT_APP_EIA_API_KEY

const base=`https://api.eia.gov/series/?api_key=${api_key}&series_id=`

export const regionCodes = {
  California: 'CAL',
  Carolinas: 'CAR',
  Central: 'CENT',
  Florida: 'FLA',
  'Mid-Atlantic': 'MIDA',
  Midwest: 'MIDW',
  'New England': 'NE',
  'New York': 'NY',
  Northwest: 'NW',
  Southeast: 'SE',
  Southwest: 'SW',
  Tennessee: 'TEN',
  Texas: 'TEX',
}

export const ioCodes = {
  Supply: 'NG',
  Demand: 'D',
}

const constructSeriesString = (region, io) => {
  return (
    'EBA.'
    + regionCodes[region]
    + '-ALL.'
    + ioCodes[io]
    + '.H'
  )
}

const fetchSetOfRegionalData = async (io) => {
  const query = `${base}
    ${Object.keys(regionCodes)
      .map(region => constructSeriesString(region, io))
      .join(';')
    }`

  console.log(query)
  const response = await axios.get(query)
  return response.data.series
}

export const makeSeriesDict = async () => {
  const demandData = await fetchSetOfRegionalData('Demand')
  const supplyData = await fetchSetOfRegionalData('Supply')

  const seriesDict= {
      Demand: Object.assign({}, regionCodes),
      Supply: Object.assign({}, regionCodes)
  }

  const assignRegions = (data, io) => {
    data.forEach(series => {
      Object.keys(seriesDict[io]).forEach(region => {
          if (series.name.includes(region)) {
            seriesDict[io][region] = series
          }
      })
    })
  }

  assignRegions(demandData, 'Demand')
  assignRegions(supplyData, 'Supply')
  return seriesDict
}

const testRegionFetch = async () => {
  const allData = await makeSeriesDict()
  console.log(allData)
}

testRegionFetch()
