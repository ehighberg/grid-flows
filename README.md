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

- Animation showing demand changing over time / geographic areas
- Demand forecasting model and predictions
- Model explanation
- Incorporate weather data into model


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
| Working API Calls | H | 2 | 6 | |
| Component Hierarchy / Routing | H | 4 | 4 | |
| Region / Data Type / Date Selection | H | 2 | 2.5 | |
| Tabular Data Summary | H | 3 | 4 | |
| Chart Display | H | 2 | | |
| Map Display | H | 6 | | |
| Frame-by-frame Power Visual | M | 4 | | |
| Animated Power Flows | M | 4 | | |
| Predictive Power Modeling | L | 8 | | |
| Total | H | 35 | | |


## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Jan 24th| Project Pitch / Wireframes / Priority Matrix / Component Hierarchy | Complete
|Jan 27th| API calls, Render basic info | Incomplete
|Jan 28th| Render Map, Charts (MVP) | Incomplete
|Jan 29th| Animated Power Flows | Incomplete
|Jan 30th| Supply / Demand prediction | Incomplete
|Jan 31st| Present | Incomplete

## Additional Libraries

- Axios - API requests
- React Router - URL-based conditional rendering
- d3.js - Pretty map views
- chroma - Color palettes
- dotenv - Hide keys
- Moment - Easier date handling
- Stdlib-js, Math.js - Better chart plotting, data manipulation

(PMVP)
- Zebras - Tabular data manipulation
- machinelearn.js - C++ based algorithms


## Issues and Resolutions

I decided to load all the API data on initial page load into a single nested object. It turned out that navigating nested objects is complicated and messy, and took about 2 hours to get right.

Ended up using Stdlib for some math operations that would have been cumbersome to implement by hand (and much slower).


## Code Snippet

Use this section to include a brief code snippet you are proud of, along with a brief description of why.

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
- [2020-01-24]: Dataset selection moved to own page.
- [2020-01-25]: Loading all API results on initial page landing.
- [2020-01-26]: Using Stdlib-js, Math.js for data wrangling.
