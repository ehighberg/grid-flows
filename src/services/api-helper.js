import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const api_key = process.env.REACT_APP_EIA_API_KEY

const base=`https://api.eia.gov/series/?api_key=${api_key}&series_id=`
const baseNoSeriesId=`https://api.eia.gov/series/?api_key=${api_key}`

export const regionCodes = {
  California: 'CAL',
  Carolinas: 'CAR',
  Central: 'CENT',
  Florida: 'FLA',
  'Mid Atlantic': 'MIDA',
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

export const timeLocaleCodes = {
  Local: 'L',
  UTC: '',
}

const constructSeriesQuery = (region, io, timeLocale) => {
  const query = (
    base
    + 'EBA.'
    + regionCodes[region]
    + '-ALL.'
    + ioCodes[io]
    + '.H'
    + timeLocaleCodes[timeLocale]
  )
  return query
}

const constructSeriesString = (region, io, timeLocale) => {
  return (
    'EBA.'
    + regionCodes[region]
    + '-ALL.'
    + ioCodes[io]
    + '.H'
    + timeLocaleCodes[timeLocale]
  )
}

export const fetchSeries = async (queryParts) => {
  const query = constructSeriesQuery(...queryParts)
  const response = await axios.get(query)
  return response.data.series[0]
}

export const testApi = async () => {
  const data = await fetchSeries(['New England', 'Supply', 'UTC'])
  console.log(data)
}

const assignSeries = async(seriesDict) => {
  Object.keys(seriesDict).forEach(locale =>
    Object.keys(seriesDict[locale]).forEach(io =>
      Object.keys(seriesDict[locale][io]).forEach(async region => {
        const seriesData = await fetchSeries([region, io, locale])
        seriesDict[locale][io][region] = seriesData
      })))
  return seriesDict
}

export const fetchAllPowerSeries = async () => {

  // nestedMapping from https://stackoverflow.com/a/38829074
  const nestedMapping = (outerObject, innerItem) => {
    return Object.keys(outerObject).reduce((keys, newKey) =>
      ({...keys, [newKey]: innerItem}), {})
  }

  const seriesDict = nestedMapping(timeLocaleCodes,
    nestedMapping(ioCodes,
    regionCodes))

  const assignedDict = await assignSeries(seriesDict)

  console.log(assignedDict)
  console.log(assignedDict.Local.Supply.California)
  return assignedDict
}
