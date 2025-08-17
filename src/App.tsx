import "./styles.css"; 
import { useState } from "react";

import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";  
import UnitsToggle from "./components/UnitsToggle";
import WeatherCard, { WeatherData } from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import Loader from "./components/Loader";
import ErrorToast from "./components/ErrorToast";
import { useWeather } from "./hooks/useWeather";

// Import types
import { HourlyData } from "./components/HourlyForecastCard";
import { DailyData } from "./components/DailyForecastCard";

export default function App() {
  const {
    state: { units, theme, city, current, forecast, loading, error },
    actions: { setUnits, setTheme, loadByCity, locateMe },
  } = useWeather();

  const [savedLocations, setSavedLocations] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("savedLocations") || "[]")
  );

  const [showHourly, setShowHourly] = useState(true);

  const saveLocation = (location: string) => {
    if (!savedLocations.includes(location)) {
      const updated = [...savedLocations, location];
      setSavedLocations(updated);
      localStorage.setItem("savedLocations", JSON.stringify(updated));
    }
  };

  const removeLocation = (location: string) => {
    const updated = savedLocations.filter((l) => l !== location);
    setSavedLocations(updated);
    localStorage.setItem("savedLocations", JSON.stringify(updated));
  };

  const clearLocations = () => {
    setSavedLocations([]);
    localStorage.removeItem("savedLocations");
  };

// Ensure current matches WeatherData interface
const currentWeather: WeatherData | null = current
  ? {
      name: current.name,
      temp: current.main?.temp ?? 0,           // <-- adapt from your API
      weatherMain: current.weather[0]?.main ?? "clear",  // <-- adapt from your API
    }
  : null;


  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div className="brand">
          <h1 className="title">🌦 React Weather App</h1>
          <p className="subtitle">Your forecast at a glance</p>
        </div>

        <div className="actions">
          <button className="btn ghost" onClick={locateMe} title="Use my current location">
            📍 Locate me
          </button>

          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "light" ? "dark" : "light")} />

          <UnitsToggle units={units} onChange={setUnits} />
        </div>
      </header>

      <main className="container">
        <SearchBar onSearch={loadByCity} defaultValue={city} />

        {loading && <Loader />}
        {error && <ErrorToast message={error} />}

        {currentWeather && (
          <WeatherCard
            data={currentWeather}
            unit={units}
            theme={theme}
          />
        )}

        {currentWeather && (
          <button className="btn" onClick={() => saveLocation(currentWeather.name)}>
            💾 Save Location
          </button>
        )}

        {savedLocations.length > 0 && (
          <div className="saved-locations">
            {savedLocations.map((loc) => (
              <div className="chip" key={loc}>
                {loc}
                <span className="remove" onClick={() => removeLocation(loc)}>×</span>
              </div>
            ))}
            <button className="btn red" onClick={clearLocations}>Clear All</button>
          </div>
        )}

        {forecast && (
          <div style={{ margin: "1rem 0", textAlign: "center" } as React.CSSProperties}>
            <button className="btn" onClick={() => setShowHourly(!showHourly)}>
              {showHourly ? "Show Daily Forecast" : "Show Hourly Forecast"}
            </button>
          </div>
        )}

        {forecast && (
          <div className="grid two">
            {showHourly ? (
              <HourlyForecast items={forecast.hourly as HourlyData[]} unit={units} theme={theme} />
            ) : (
              <DailyForecast items={forecast.daily as DailyData[]} unit={units} theme={theme} />
            )}
          </div>
        )}
      </main>

      <footer className="footer"></footer>
    </div>
  );
}
