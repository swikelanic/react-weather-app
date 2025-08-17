import React from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import type { IconType } from "react-icons";

export interface WeatherData {
  name: string;
  temp: number;
  weatherMain: string;
}

interface Props {
  data: WeatherData;
  unit: "metric" | "imperial";
  theme: "light" | "dark";
}

export default function WeatherCard({ data, unit, theme }: Props) {
  const getWeatherIcon = (): IconType | null => {
    switch (data.weatherMain.toLowerCase()) {
      case "clear":
        return WiDaySunny;
      case "clouds":
        return WiCloud;
      case "rain":
        return WiRain;
      case "snow":
        return WiSnow;
      case "thunderstorm":
        return WiThunderstorm;
      default:
        return null;
    }
  };

  const Icon = getWeatherIcon();

  return (
    <div className={`weather-card ${theme}`}>
      <div className="weather-header">
        <h2>{data.name}</h2>
        {/* ✅ Cast Icon to any to satisfy TypeScript */}
        {Icon ? React.createElement(Icon as any, { color: getIconColor(data.weatherMain), size: 48 }) : null}
      </div>
      <p>
        {data.temp}° {unit === "metric" ? "C" : "F"}
      </p>
    </div>
  );
}

function getIconColor(weatherMain: string) {
  switch (weatherMain.toLowerCase()) {
    case "clear":
      return "#FFD700";
    case "clouds":
      return "#B0C4DE";
    case "rain":
      return "#1E90FF";
    case "snow":
      return "#ADD8E6";
    case "thunderstorm":
      return "#FFA500";
    default:
      return "#000";
  }
}
