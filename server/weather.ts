import axios from 'axios';

const OPENWEATHER_API_KEY = '3f787d423d618431c9999758216fb4b9';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Hull coordinates
const HULL_LAT = 53.7457;
const HULL_LON = -0.3367;

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
}

export interface ForecastDay {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
}

/**
 * Fetch current weather for Hull
 * @returns Current weather data
 */
export async function getCurrentWeather(): Promise<CurrentWeather | null> {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        lat: HULL_LAT,
        lon: HULL_LON,
        units: 'metric',
        appid: OPENWEATHER_API_KEY,
      },
    });

    const data = response.data;
    return {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      temp_min: Math.round(data.main.temp_min),
      temp_max: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind_speed: data.wind.speed,
    };
  } catch (error) {
    console.error('[Weather API] Failed to fetch current weather:', error);
    return null;
  }
}

/**
 * Fetch 5-day weather forecast for Hull
 * @returns Array of forecast days
 */
export async function getWeatherForecast(): Promise<ForecastDay[]> {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
      params: {
        lat: HULL_LAT,
        lon: HULL_LON,
        units: 'metric',
        appid: OPENWEATHER_API_KEY,
      },
    });

    // Group forecasts by day and get one forecast per day (at noon)
    const dailyForecasts: ForecastDay[] = [];
    const processedDates = new Set<string>();

    for (const item of response.data.list) {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const hour = date.getHours();

      // Get forecast around noon (12:00) for each day
      if (!processedDates.has(dateStr) && hour >= 11 && hour <= 13) {
        processedDates.add(dateStr);
        dailyForecasts.push({
          date: dateStr,
          temp_min: Math.round(item.main.temp_min),
          temp_max: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        });

        if (dailyForecasts.length >= 5) break;
      }
    }

    return dailyForecasts;
  } catch (error) {
    console.error('[Weather API] Failed to fetch forecast:', error);
    return [];
  }
}
