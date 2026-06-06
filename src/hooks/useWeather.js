import { useState, useEffect, useCallback } from 'react';
import { fetchWeather } from '../services/weatherApi';

const DEFAULT_COORDS = { lat: 6.5244, lon: 3.3792 }; // Lagos fallback

/**
 * Hook to manage weather data fetching with geolocation support.
 */
export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [geoStatus, setGeoStatus] = useState('idle'); // idle | locating | granted | denied

  const loadWeather = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(lat, lon, { ai: true, units: 'metric' });
      setWeatherData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      const { lat, lon } = DEFAULT_COORDS;
      setCoords(DEFAULT_COORDS);
      loadWeather(lat, lon);
      return;
    }

    setGeoStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        setGeoStatus('granted');
        setCoords({ lat, lon });
        loadWeather(lat, lon);
      },
      () => {
        setGeoStatus('denied');
        const { lat, lon } = DEFAULT_COORDS;
        setCoords(DEFAULT_COORDS);
        loadWeather(lat, lon);
      },
      { timeout: 8000, maximumAge: 300000 }
    );
  }, [loadWeather]);

  const refresh = useCallback(() => {
    if (coords) {
      loadWeather(coords.lat, coords.lon);
    }
  }, [coords, loadWeather]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return {
    weatherData,
    loading,
    error,
    coords,
    geoStatus,
    refresh,
    requestLocation,
  };
}
