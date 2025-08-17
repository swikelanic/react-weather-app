import React from "react";
import HourlyForecastCard, { HourlyData } from "./HourlyForecastCard"; // ✅ Correct import

interface Props {
  items: HourlyData[];
  unit: "metric" | "imperial";
  theme?: "light" | "dark";
}

export default function HourlyForecast({ items, unit, theme = "light" }: Props) {
  return (
    <div className="hourly-forecast" style={{ display: "flex", overflowX: "auto", padding: "0.5rem 0" }}>
      {items.map((hour, index) => (
        <HourlyForecastCard key={index} data={hour} unit={unit} theme={theme} />
      ))}
    </div>
  );
}
