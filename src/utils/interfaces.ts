export interface WeatherDisplayProps {
    data: any;
    averageTemperature: number;
  }
export interface CitySelectorProps {
    onCityChange: (city: string, lat: string, lng: string) => void;
  }