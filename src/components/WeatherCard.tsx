import { WeatherData } from "../services/weatherApi";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

interface Props {
  data: WeatherData;
  unit: "metric" | "imperial";
  theme?: "light" | "dark"; 
}

export default function WeatherCard({ data, unit, theme = "light" }: Props) {
  const weatherMain = data.weather[0].main.toLowerCase();

  const getWeatherIcon = () => {
    switch (weatherMain) {
      case "clear":
        return <WiDaySunny color="#FFD700" size={48} />;
      case "clouds":
        return <WiCloud color="#B0C4DE" size={48} />;
      case "rain":
      case "drizzle":
        return <WiRain color="#00BFFF" size={48} />;
      case "snow":
        return <WiSnow color="#ADD8E6" size={48} />;
      case "thunderstorm":
        return <WiThunderstorm color="#FFA500" size={48} />;
      default:
        return <WiDaySunny color="#FFD700" size={48} />;
    }
  };

  const cardBg = theme === "dark" ? "#333" : "#f0f0f0";
  const textColor = theme === "dark" ? "#fff" : "#000";

  return (
    <div
      className="card weather"
      style={{
        backgroundColor: cardBg,
        color: textColor,
        padding: "1rem",
        borderRadius: "8px",
        margin: "0.5rem 0",
      }}
    >
      <h2>{data.name}</h2>
      <div
        className="row"
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
      >
        <div className="icon">{getWeatherIcon()}</div>
        <div>
          <p>
            {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
          </p>
          <p>{data.weather[0].description}</p>
          <p>
            💧 {data.main.humidity}% | 💨 {data.wind.speed}{" "}
            {unit === "metric" ? "m/s" : "mph"}
          </p>
        </div>
      </div>
    </div>
  );
}
