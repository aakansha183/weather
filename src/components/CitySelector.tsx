import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import cities from '../utils/cities.json';
import { CitySelectorProps } from '../utils/interfaces';

const CitySelector: React.FC<CitySelectorProps> = ({ onCityChange }) => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      const cityData = JSON.parse(lastCity);
      setSelectedCity(cityData.city);
      onCityChange(cityData.city, cityData.lat, cityData.lng);
    }
  }, [onCityChange]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const cityName = event.target.value as string;
    const cityData = cities.find(city => city.city === cityName);
    if (cityData) {
      setSelectedCity(cityName);
      localStorage.setItem('lastCity', JSON.stringify(cityData));
      onCityChange(cityName, cityData.lat, cityData.lng);
    }
  };

  return (
    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
      <br></br>
      <InputLabel>Select City</InputLabel>
      <Select value={selectedCity} onChange={handleChange}>
        {cities.map(city => (
          <MenuItem key={city.city} value={city.city}>
            {city.city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CitySelector;
