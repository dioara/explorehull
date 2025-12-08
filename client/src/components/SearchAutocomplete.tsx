import { useState, useEffect, useRef } from "react";
import { Search, TrendingUp, MapPin, Calendar, Utensils, Hotel } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
}

const POPULAR_SEARCHES = [
  { query: "museum", icon: MapPin, category: "Attractions" },
  { query: "aquarium", icon: MapPin, category: "Attractions" },
  { query: "restaurant", icon: Utensils, category: "Dining" },
  { query: "hotel", icon: Hotel, category: "Accommodation" },
  { query: "events", icon: Calendar, category: "Events" },
  { query: "maritime", icon: MapPin, category: "Heritage" },
];

export function SearchAutocomplete({ 
  placeholder = "Search attractions, events, restaurants...",
  className = "",
  onSearch,
  autoFocus = false
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Get search suggestions when user types (debounced)
  const { data: suggestions } = trpc.search.suggestions.useQuery(
    { q: query },
    { 
      enabled: query.length >= 2,
      staleTime: 60000 // Cache for 1 minute
    }
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      setShowSuggestions(false);
      if (onSearch) {
        onSearch(trimmedQuery);
      } else {
        setLocation(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const showPopularSearches = showSuggestions && query.length === 0;
  const showLiveSuggestions = showSuggestions && query.length >= 2 && suggestions && suggestions.length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-strong p-3 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <Input 
            type="text" 
            placeholder={placeholder}
            className="border-0 focus-visible:ring-0 text-foreground bg-transparent text-base"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            autoFocus={autoFocus}
          />
        </div>
        <Button 
          type="submit"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-xl px-8 shadow-sm hover:shadow-md transition-all"
        >
          Search
        </Button>
      </form>

      {/* Suggestions Dropdown */}
      {(showPopularSearches || showLiveSuggestions) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-strong border border-border overflow-hidden z-50">
          {showPopularSearches && (
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <TrendingUp className="w-4 h-4" />
                Popular Searches
              </div>
              <div className="space-y-1">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item.query}
                    onClick={() => handleSuggestionClick(item.query)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors text-left text-foreground"
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="flex-1 font-medium">{item.query}</span>
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showLiveSuggestions && (
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Search className="w-4 h-4" />
                Suggestions
              </div>
              <div className="space-y-1">
                {suggestions.map((suggestion: any) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion.name)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors text-left text-foreground"
                  >
                    {suggestion.type === 'attraction' && <MapPin className="w-4 h-4 text-muted-foreground" />}
                    {suggestion.type === 'event' && <Calendar className="w-4 h-4 text-muted-foreground" />}
                    {suggestion.type === 'restaurant' && <Utensils className="w-4 h-4 text-muted-foreground" />}
                    {suggestion.type === 'accommodation' && <Hotel className="w-4 h-4 text-muted-foreground" />}
                    <span className="flex-1 font-medium">{suggestion.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{suggestion.type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
