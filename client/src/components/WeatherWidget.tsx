import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind } from "lucide-react";
import { format } from "date-fns";

export function WeatherWidget() {
  const { data: currentWeather, isLoading: currentLoading } = trpc.weather.current.useQuery();
  const { data: forecast, isLoading: forecastLoading } = trpc.weather.forecast.useQuery();

  if (currentLoading || !currentWeather) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-32" />
        </CardHeader>
        <CardContent>
          <div className="h-16 bg-muted rounded mb-4" />
          <div className="h-4 bg-muted rounded w-full" />
        </CardContent>
      </Card>
    );
  }

  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Hull Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={getWeatherIcon(currentWeather.icon)}
              alt={currentWeather.description}
              className="w-20 h-20"
            />
            <div>
              <div className="text-4xl font-bold">{currentWeather.temp}°C</div>
              <div className="text-sm text-muted-foreground capitalize">
                {currentWeather.description}
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span>Humidity: {currentWeather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-blue-500" />
            <span>Wind: {currentWeather.wind_speed} m/s</span>
          </div>
          <div className="text-muted-foreground">
            Feels like: {currentWeather.feels_like}°C
          </div>
          <div className="text-muted-foreground">
            High: {currentWeather.temp_max}°C / Low: {currentWeather.temp_min}°C
          </div>
        </div>

        {/* 5-Day Forecast */}
        {!forecastLoading && forecast && forecast.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-3">5-Day Forecast</h4>
            <div className="grid grid-cols-5 gap-2">
              {forecast.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs font-medium mb-1">
                    {format(new Date(day.date), 'EEE')}
                  </div>
                  <img
                    src={getWeatherIcon(day.icon)}
                    alt={day.description}
                    className="w-10 h-10 mx-auto"
                  />
                  <div className="text-xs">
                    <span className="font-semibold">{day.temp_max}°</span>
                    <span className="text-muted-foreground">/{day.temp_min}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
