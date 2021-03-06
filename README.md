# Grid Flows



**Project decription:** View the flow of national electric grid generation and demand over time. Hourly -> monthly timeframe, animated and visualized with d3.js. Data courtesy of the [Energy Information Administration](https://www.eia.gov/opendata/qb.php?category=2122628).


## API Snippet
```
{
    "request": {
        "command": "series",
        "series_id": "EBA.MIDA-ALL.D.H"
    },
    "series": [
        {
            "series_id": "EBA.MIDA-ALL.D.H",
            "name": "Demand for Mid-Atlantic (region), hourly - UTC time",
            "units": "megawatthours",
            "f": "H",
            "description": "Timestamps follow the ISO8601 standard (https://en.wikipedia.org/wiki/ISO_8601). Hourly representations are provided in Universal Time.",
            "start": "20150701T05Z",
            "end": "20200123T19Z",
            "updated": "2020-01-23T14:46:15-0500",
            "data": [
                [
                    "20200123T19Z",
                    98243
                ],
                [
                    "20200123T18Z",
                    99676
                ],
                [
                    "20200123T17Z",
                    101703
                ],
                [
                    "20200123T16Z",
                    105125
                ],
                [
                    "20200123T15Z",
                    108365
                ]
		.
		.
		.
```


## Wireframes

![wireframe](https://i.imgur.com/yLK2VRb.png)


### MVP

- Landing page showing current regional consumption
- Allow queries of selected time / geographic area
- Tabular and map display of supply / demand data


### Post-MVP

- Legend
- Animation showing demand changing over time / geographic areas
- Tooltips
- Move summaries to slugs
- Summary table links to explanations of those statistics
- Smarter date parsing: only parse in an approximate range of the io array
- Move calculations to web workers for greater responsiveness
- Allow typed in dates
- Convert stats functions to d3
- Mobile version of mouseover / mouseout
- Scale coloration based on power / population, or to net generation / supply or demand (extra settings)
- Infer missing timestamps
- Desktop contact icons under name
- Better looking tooltips


- Demand forecasting model and predictions
- Model explanation
- Incorporate weather data into model
- Charts


## React Component Hierarchy

![component hierarchy](https://i.imgur.com/rDLmE4k.png)

## Components

| Component | Description |Type |
| --- | --- | --- |
| App | Uses api-helper.js and search terms (in state) to retrieve, filter, and pass data | Functional |
| Header | Has the browsing / search elements and site navigation | Stateless |
| QuerySettings | User selects dataset, timeframe, and region here | Stateless |
| Footer | Social media / professional links | Stateless |
| Main | Houses data display and map display through React Router and distributes data received from the API call (PMVP: and animation settings) in state | Functional |
| DataDisplay | Displays selected data in tabular and / or chart format | Stateless |
| Map | Displays selected data on regional / national map (PMVP: And animates power flow) | Stateless |
| Region | Renders single region of US | Stateless |
| (Animation) | Select animation speed / style | Stateless |
| (Prediction) | Makes predictions of future power usage from past data | Stateless |


## Priority Matrix

![priority matrix](https://i.imgur.com/3i0qW07.png)

## Timeframes

| Component | Priority | Estimated Time (hrs) | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Working API Calls | H | 2 | 6 | 6 |
| Component Hierarchy / Routing | H | 4 | 4 | 4 |
| Region / Data Type / Date Selection | H | 2 | 5 | 5 |
| Tabular Data Summary | H | 3 | 9 | 9 |
| Map Display | H | 6 | 24 | 24 |
| Total | H | 35 | 48 | 48 |


## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Jan 24th| Project Pitch / Wireframes / Priority Matrix / Component Hierarchy | Complete
|Jan 27th| API calls, Render data summary | Complete
|Jan 28th| Render Map (MVP) | Complete
|Jan 29th| Animated Power Flows | Incomplete
|Jan 30th| Supply / Demand prediction | Incomplete
|Jan 31st| Present | Incomplete

## Additional Libraries

- Axios - API requests
- React Router - URL-based conditional rendering
- d3.js - Pretty map views
- dotenv - Hide API keys
- Moment - Easier date handling
- d3-legend - Simple legends in d3

(PMVP)
- Stdlib-js - Data manipulation
- Math.js - Data manipulation
- Zebras - Tabular data manipulation
- machinelearn.js - C++ based algorithms


## Issues and Resolutions

I decided to load all the API data on initial page load into a single nested object. It turned out that navigating nested objects is complicated and messy, and took about 2 hours to get right.

Initially I was combining all of the regional API data into national data, but not all of the series had data covering the entire time period. Fixed by calling for national data directly from the API.

Getting d3 to work for the first time, while in React, was very challenging.

Object.assign only gave shallow copies, turns out you can work around this by parsing the object to JSON, then parsing it back.

Not all series have all timestamps available, will need to infer values.

Absolute positioning of text tooltips did not seem to actually move them, but transform: translate(); did.

D3 map styling is static right now, resolution TBD.


## Code Snippet

I made a plural for 'series', found out how to deep copy objects, and used Moment to get times only in a limited timeframe.

```
export const timeParseSerieses = (serieses, startDate, endDate) => {
  const startTime = moment.parseZone(startDate)
  const endTime = moment.parseZone(endDate).add(23, 'hours')

  const parsedSerieses = JSON.parse(JSON.stringify(serieses))

  Object.keys(parsedSerieses).forEach(key => {
    parsedSerieses[key].data = parsedSerieses[key].data.filter(
      timeValPair => {
        const parsedTime = moment.parseZone(timeValPair[0])
        return ( (parsedTime >= startTime) && (parsedTime <= endTime) )
      }
    )
  })

  return parsedSerieses
}
```

## Change Log
- [2020-01-24]: Dataset selection moved to own page.
- [2020-01-25]: Loading all API results on initial page landing.
- [2020-01-26]: Using Stdlib-js, Math.js for data wrangling.
- [2020-01-29]: Removed stdlib, Math. Moved charts to PMVP.
- [2020-01-30]: Removed flowing power from timeline, animations
