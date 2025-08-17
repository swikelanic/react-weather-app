import "./styles.css";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import UnitsToggle from "./components/UnitsToggle";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import Loader from "./components/Loader";
import ErrorToast from "./components/ErrorToast";
import { useWeather } from "./hooks/useWeather";
import { useState } from "react";

// ✅ Import types from card components
import { HourlyData } from "./components/HourlyForecastCard";
import { DailyData } from "./components/DailyForecastCard";

export default function App() {
  const {
    state: { units, theme, city, current, forecast, loading, error },
    actions: { setUnits, setTheme, loadByCity, locateMe },
  } = useWeather();

  const [savedLocations, setSavedLocations] = useState<string[]>(
    () => JSON.parse(localStorage.getItem("savedLocations") || "[]")
  );

  // Toggle between Hourly and Daily
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

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div className="brand">
          <h1 className="title">🌦 React Weather App</h1>
          <p className="subtitle">Your forecast at a glance</p>
        </div>

        <div className="actions">
          <button
            className="btn ghost"
            onClick={locateMe}
            title="Use my current location"
          >
            📍 Locate me
          </button>

          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
          />

          <UnitsToggle units={units} onChange={setUnits} />
        </div>
      </header>

      <main className="container">
        <SearchBar onSearch={loadByCity} defaultValue={city} />

        {loading && <Loader />}
        {error && <ErrorToast message={error} />}

        {current && <WeatherCard data={current} unit={units} theme={theme} />}

        {current && (
          <button className="btn" onClick={() => saveLocation(current.name)}>
            💾 Save Location
          </button>
        )}

        {savedLocations.length > 0 && (
          <div className="saved-locations">
            {savedLocations.map((loc) => (
              <div className="chip" key={loc}>
                {loc}
                <span className="remove" onClick={() => removeLocation(loc)}>
                  ×
                </span>
              </div>
            ))}
            <button className="btn red" onClick={clearLocations}>
              Clear All
            </button>
          </div>
        )}

        {/* Toggle Button */}
        {forecast && (
          <div style={{ margin: "1rem 0", textAlign: "center" }}>
            <button className="btn" onClick={() => setShowHourly(!showHourly)}>
              {showHourly ? "Show Daily Forecast" : "Show Hourly Forecast"}
            </button>
          </div>
        )}

        {/* Forecast display */}
        {forecast && (
          <div className="grid two">
            {showHourly ? (
              <HourlyForecast
                items={forecast.hourly as HourlyData[]}
                unit={units}
                theme={theme} // pass theme prop
              />
            ) : (
              <DailyForecast
                items={forecast.daily as DailyData[]}
                unit={units}
                theme={theme} // pass theme prop
              />
            )}
          </div>
        )}
      </main>

      <footer className="footer"></footer>
    </div>
  );
}
