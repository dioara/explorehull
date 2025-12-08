import { trpc } from "@/lib/trpc";
import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle, CloudLightning } from "lucide-react";

/**
 * Weather bar component that displays current Hull weather and date
 * Appears at the top of all pages
 */
export function WeatherBar() {
  const { data: weather } = trpc.weather.current.useQuery(undefined, {
    refetchInterval: 600000, // Refresh every 10 minutes
    staleTime: 300000, // Consider data fresh for 5 minutes
  });

  // Format current date
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Get weather icon based on OpenWeatherMap icon code
  const getWeatherIcon = (icon: string) => {
    const iconCode = icon.substring(0, 2);
    const iconMap: Record<string, React.ReactElement> = {
      '01': <Sun className="w-4 h-4" />,           // clear sky
      '02': <Cloud className="w-4 h-4" />,         // few clouds
      '03': <Cloud className="w-4 h-4" />,         // scattered clouds
      '04': <Cloud className="w-4 h-4" />,         // broken clouds
      '09': <CloudDrizzle className="w-4 h-4" />, // shower rain
      '10': <CloudRain className="w-4 h-4" />,    // rain
      '11': <CloudLightning className="w-4 h-4" />, // thunderstorm
      '13': <CloudSnow className="w-4 h-4" />,    // snow
      '50': <Cloud className="w-4 h-4" />,         // mist
    };
    return iconMap[iconCode] || <Cloud className="w-4 h-4" />;
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-sm">
          {/* Weather Info */}
          <div className="flex items-center gap-4">
            {weather ? (
              <>
                <div className="flex items-center gap-2">
                  {getWeatherIcon(weather.icon)}
                  <span className="font-semibold">{Math.round(weather.temp)}°C</span>
                  <span className="text-slate-300">Hull</span>
                </div>
                <div className="hidden sm:block text-slate-300 capitalize">
                  {weather.description}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-slate-400">
                <Cloud className="w-4 h-4" />
                <span>Loading weather...</span>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="text-slate-300 hidden lg:block">
            {currentDate}
          </div>
        </div>
      </div>
    </div>
  );
}
