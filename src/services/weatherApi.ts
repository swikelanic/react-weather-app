export type Units = "metric" | "imperial";

export interface WeatherData {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string; main: string }[];
  wind: { speed: number };
}

export interface ForecastData {
  hourly: {
    dt: number;
    temp: number;
    weather: { main: string }[];
  }[];
  daily: {
    dt: number;
    temp: { day: number };
    weather: { main: string }[];
  }[];
}

// Use environment variable for API key
const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch weather data");
  }
  return res.json();
}

export async function fetchWeatherByCity(q: string, units: Units): Promise<WeatherData> {
  const res = await fetch(`${BASE}/weather?q=${q}&units=${units}&appid=${API_KEY}`);
  return handleResponse(res);
}

export async function fetchWeatherByCoords(lat: number, lon: number, units: Units): Promise<WeatherData> {
  const res = await fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`);
  return handleResponse(res);
}

export async function fetchForecastByCity(q: string, units: Units): Promise<ForecastData> {
  const res = await fetch(`${BASE}/forecast?q=${q}&units=${units}&appid=${API_KEY}`);
  const data = await handleResponse(res);

  return {
    hourly: data.list.slice(0, 12).map((x: any) => ({
      dt: x.dt,
      temp: x.main.temp,
      weather: x.weather,
    })),
    daily: data.list.filter((_x: any, i: number) => i % 8 === 0).map((x: any) => ({
      dt: x.dt,
      temp: { day: x.main.temp },
      weather: x.weather,
    })),
  };
}

export async function fetchForecastByCoords(lat: number, lon: number, units: Units): Promise<ForecastData> {
  const res = await fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`);
  const data = await handleResponse(res);

  return {
    hourly: data.list.slice(0, 12).map((x: any) => ({
      dt: x.dt,
      temp: x.main.temp,
      weather: x.weather,
    })),
    daily: data.list.filter((_x: any, i: number) => i % 8 === 0).map((x: any) => ({
      dt: x.dt,
      temp: { day: x.main.temp },
      weather: x.weather,
    })),
  };
}
