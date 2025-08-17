import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall";

export interface OneCallData {
  lat: number;
  lon: number;
  timezone: string;
  hourly: {
    dt: number;
    temp: number;
    weather: { icon: string; description: string }[];
  }[];
  daily: {
    dt: number;
    temp: { day: number; min: number; max: number };
    weather: { icon: string; description: string }[];
  }[];
}

export const fetchOneCallWeather = async (
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
): Promise<OneCallData | null> => {
  try {
    if (!API_KEY) throw new Error("API key is missing. Set REACT_APP_OPENWEATHER_API_KEY");

    const { data } = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        units,
        exclude: "minutely,alerts,current",
        appid: API_KEY,
      },
    });
     console.log("OneCall API response:", data);
    return {
      lat: data.lat,
      lon: data.lon,
      timezone: data.timezone,
      hourly: data.hourly || [],
      daily: data.daily || [],
    };
  } catch (error: any) {
    console.error("Error fetching forecast data:", error.response?.data || error.message);
    return null;
  }
};
