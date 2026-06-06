// const BASE_URL = 'https://api.weather-ai.co/v1/weather';
// const API_KEY = import.meta.env.VITE_WEATHER_AI_KEY;

// /**
//  * Fetch weather data for a given lat/lon.
//  * @param {number} lat
//  * @param {number} lon
//  * @param {object} options - { ai: boolean, units: string }
//  * @returns {Promise<object>} Weather data
//  */

// console.log(import.meta.env.VITE_WEATHER_AI_KEY);

// export async function fetchWeather(lat, lon, options = {}) {
//   const { ai = true, units = 'metric' } = options;

//   const params = new URLSearchParams({
//     lat: lat.toString(),
//     lon: lon.toString(),
//     units,
//   });

//   if (ai) params.append('ai', 'true');

//   const headers = {
//     'Content-Type': 'application/json',
//   };

//   if (API_KEY) {
//     headers['Authorization'] = `Bearer ${API_KEY}`;
//   }

//   const response = await fetch(`${BASE_URL}?${params.toString()}`, {
//     method: 'GET',
//     headers,
//   });

//   if (!response.ok) {
//     const errorBody = await response.text().catch(() => '');
//     throw new WeatherApiError(
//       `Weather API error: ${response.status} ${response.statusText}`,
//       response.status,
//       errorBody
//     );
//   }

//   const data = await response.json();
//   return data;
// }

// export class WeatherApiError extends Error {
//   constructor(message, status, body) {
//     super(message);
//     this.name = 'WeatherApiError';
//     this.status = status;
//     this.body = body;
//   }
// }


const BASE_URL = '/api/weather';

console.log('BASE_URL:', BASE_URL);

const response = await fetch(
  `${BASE_URL}?${params.toString()}`
);

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