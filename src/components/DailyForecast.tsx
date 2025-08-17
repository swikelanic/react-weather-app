import React from "react";
import DailyForecastCard, { DailyData } from "./DailyForecastCard"; // ✅ Import the type from the card

interface Props {
  items: DailyData[];
  unit: "metric" | "imperial";
  theme?: "light" | "dark";
}

export default function DailyForecast({ items, unit, theme = "light" }: Props) {
  return (
    <div
      className="daily-forecast"
      style={{
        display: "flex",
        overflowX: "auto",
        padding: "0.5rem 0",
      }}
    >
      {items.map((day, index) => (
        <DailyForecastCard key={index} data={day} unit={unit} theme={theme} />
      ))}
    </div>
  );
}
