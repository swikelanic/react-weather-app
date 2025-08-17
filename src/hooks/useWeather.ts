import { useCallback, useEffect, useState } from "react";
import type { Units, WeatherData, ForecastData } from "../services/weatherApi";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
} from "../services/weatherApi";

export function useWeather() {
  const [units, setUnits] = useState<Units>(
    () => (localStorage.getItem("units") as Units) || "metric"
  );
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const [city, setCity] = useState<string>(
    () => localStorage.getItem("city") || "Pretoria"
  );

  const [current, setCurrent] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [savedLocations, setSavedLocations] = useState<string[]>(() => {
    const stored = localStorage.getItem("savedLocations");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("units", units);
  }, [units]);

  const loadByCity = useCallback(
    async (q: string) => {
      setLoading(true);
      setError(null);
      try {
        const weather = await fetchWeatherByCity(q, units);
        const forecastData = await fetchForecastByCity(q, units);

        setCurrent(weather);
        setForecast(forecastData);

        setCity(q);
        localStorage.setItem("city", q);
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Failed to fetch weather";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  const loadByCoords = useCallback(
    async (lat: number, lon: number) => {
      setLoading(true);
      setError(null);
      try {
        const weather = await fetchWeatherByCoords(lat, lon, units);
        const forecastData = await fetchForecastByCoords(lat, lon, units);

        setCurrent(weather);
        setForecast(forecastData);

        setCity(weather.name);
        localStorage.setItem("city", weather.name);
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Failed to fetch weather";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  const locateMe = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        loadByCoords(latitude, longitude);
      },
      (err) => {
        const msg = err?.message || "Failed to get location";
        setError(msg);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [loadByCoords]);

  const saveLocation = useCallback(() => {
    if (!city) return;
    setSavedLocations((prev) => {
      if (prev.includes(city)) return prev;
      const updated = [...prev, city];
      localStorage.setItem("savedLocations", JSON.stringify(updated));
      return updated;
    });
  }, [city]);

  const removeLocation = useCallback((loc: string) => {
    setSavedLocations((prev) => {
      const updated = prev.filter((c) => c !== loc);
      localStorage.setItem("savedLocations", JSON.stringify(updated));
      return updated;
    });
  }, []);

  
  const clearLocations = useCallback(() => {
    setSavedLocations([]);
    localStorage.removeItem("savedLocations");
  }, []);

    useEffect(() => {
    const initDone = localStorage.getItem("initDone") === "1";

    if (!initDone) {
      locateMe();
      localStorage.setItem("initDone", "1");
    } else {
      loadByCity(city);
    }
  }, [city, locateMe, loadByCity]); 


  return {
    state: { units, theme, city, current, forecast, loading, error, savedLocations },
    actions: {
      setUnits,
      setTheme,
      loadByCity,
      locateMe,
      saveLocation,
      removeLocation,
      clearLocations,
    },
  } as const;
}
