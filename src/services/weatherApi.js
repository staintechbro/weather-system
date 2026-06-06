const BASE_URL = '/api/weather';

/**

* Fetch weather data for a given lat/lon.
* @param {number} lat
* @param {number} lon
* @param {object} options
* @returns {Promise<object>}
  */

export async function fetchWeather(lat, lon, options = {}) {
const { ai = true, units = 'metric' } = options;

const params = new URLSearchParams({
lat: lat.toString(),
lon: lon.toString(),
units,
});

if (ai) {
params.append('ai', 'true');
}

console.log('Fetching from:', `${BASE_URL}?${params.toString()}`);

const response = await fetch(
`${BASE_URL}?${params.toString()}`
);

if (!response.ok) {
const errorBody = await response.text().catch(() => '');


throw new WeatherApiError(
  `Weather API error: ${response.status} ${response.statusText}`,
  response.status,
  errorBody
);


}

return await response.json();
}

export class WeatherApiError extends Error {
constructor(message, status, body) {
super(message);
this.name = 'WeatherApiError';
this.status = status;
this.body = body;
}
}
