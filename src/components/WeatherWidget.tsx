import React, { useState, useCallback, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import CitySelector from './CitySelector';
import WeatherDisplay from './WeatherDisplay';

const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [lat, setLat] = useState<string>('');
  const [lng, setLng] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeatherData = useCallback(async () => {
    if (!lat || !lng) return;

    try {
      const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lng,
          daily: 'weather_code,temperature_2m_max,temperature_2m_min',
          forecast_days: 1,
        },
      });
      setWeatherData({
        minTemp: data.daily.temperature_2m_min[0],
        maxTemp: data.daily.temperature_2m_max[0],
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [lat, lng]);

  const handleCityChange = (selectedCity: string, latitude: string, longitude: string) => {
    setCity(selectedCity);
    setLat(latitude);
    setLng(longitude);
  };

  const handleButtonClick = () => {
    fetchWeatherData();
  };

  const averageTemperature = useMemo(() => {
    if (weatherData) {
      const { minTemp, maxTemp } = weatherData;
      return parseFloat(((minTemp + maxTemp) / 2).toFixed(2));
    }
    return 0;
  }, [weatherData]);

  return (
    <Box sx={{ marginTop: '50px' }}>
      <CitySelector onCityChange={handleCityChange} />
      <Box textAlign="center" marginTop="20px">
        <Button variant="contained" onClick={handleButtonClick}>
          Fetch Weather
        </Button>
      </Box>
      {weatherData && (
        <WeatherDisplay data={weatherData} averageTemperature={averageTemperature} />
      )}
    </Box>
  );
};

export default WeatherWidget;
