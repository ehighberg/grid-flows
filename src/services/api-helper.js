import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const api_key = process.env.REACT_APP_EIA_API_KEY

const base = `https://api.eia.gov/series/?api_key=${api_key}&series_id=`

export const regionCodes = {
  'All Regions': 'US48',
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
  // API will return multiple series if IDs are joined by ;
  const query = `${base}${Object.keys(regionCodes)
      .map(region => constructSeriesString(region, io))
      .join(';')
    }`

  const response = await axios.get(query)
  return response.data.series
}

export const makeSeriesDict = async (io) => {
  const ioData = await fetchSetOfRegionalData(io)

  const seriesDict = Object.assign({}, regionCodes)

  // Looks through the array returned by the API, and matches each series to its corresponding region in seriesDict
  const assignRegions = (data) => {
    data.forEach(series => {
      Object.keys(seriesDict).forEach(region => {
          if (series.series_id.includes(regionCodes[region])) {
            seriesDict[region] = series
          }
      })
    })
  }

  assignRegions(ioData, io)
  return seriesDict
}
