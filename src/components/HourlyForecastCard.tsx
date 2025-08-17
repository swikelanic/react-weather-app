import React from "react";

export interface HourlyData {
  dt: number;
  temp: number;
  weather: { description: string; main: string }[];
}

interface Props {
  data: HourlyData;
  unit: "metric" | "imperial";
  theme?: "light" | "dark";
}

export default function HourlyForecastCard({ data, unit, theme = "light" }: Props) {
  const cardBg = theme === "dark" ? "#333" : "#f0f0f0";
  const textColor = theme === "dark" ? "#fff" : "#000";

  return (
    <div
      className="card hourly"
      style={{
        textAlign: "center",
        padding: "0.5rem",
        minWidth: "70px",
        backgroundColor: cardBg,
        color: textColor,
        borderRadius: "8px",
        margin: "0.25rem",
      }}
    >
      <p style={{ margin: "0.25rem 0" }}>{new Date(data.dt * 1000).getHours()}:00</p>
      <p style={{ margin: "0.25rem 0" }}>
        {Math.round(data.temp)}°{unit === "metric" ? "C" : "F"}
      </p>
      <p style={{ fontSize: "0.75rem", margin: "0.25rem 0", textTransform: "capitalize" }}>
        {data.weather[0].description || data.weather[0].main}
      </p>
    </div>
  );
}
