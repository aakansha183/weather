import React from 'react';
import { Box, Typography } from '@mui/material';
import { WeatherDisplayProps } from '../utils/interfaces';

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, averageTemperature }) => {
  return (
    <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
      <Typography variant="h6">Weather Information</Typography>
      <Typography variant="body1">Min Temperature: {data.minTemp}°C</Typography>
      <Typography variant="body1">Max Temperature: {data.maxTemp}°C</Typography>
      <Typography variant="body1">Average Temperature: {averageTemperature.toFixed(2)}°C</Typography>
    </Box>
  );
};

export default WeatherDisplay;
