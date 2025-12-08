import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Filter, X, Star } from "lucide-react";

export interface SearchFiltersState {
  priceRange: [number, number];
  categories: string[];
  minRating: number;
  openNow: boolean;
}

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onFiltersChange: (filters: SearchFiltersState) => void;
  onReset: () => void;
}

const CATEGORIES = [
  { id: "museums", label: "Museums" },
  { id: "arts-culture", label: "Arts & Culture" },
  { id: "history-heritage", label: "History & Heritage" },
  { id: "family-friendly", label: "Family Friendly" },
  { id: "outdoor-activities", label: "Outdoor Activities" },
];

export function SearchFilters({ filters, onFiltersChange, onReset }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, minRating: rating === filters.minRating ? 0 : rating });
  };

  const handleOpenNowToggle = () => {
    onFiltersChange({ ...filters, openNow: !filters.openNow });
  };

  const hasActiveFilters = 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 100 || 
    filters.categories.length > 0 || 
    filters.minRating > 0 || 
    filters.openNow;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-lg">Filters</h3>
            {hasActiveFilters && (
              <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Hide" : "Show"} Filters
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-6 pt-4 border-t">
            {/* Price Range */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Price Range</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">£{filters.priceRange[0]}</span>
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">
                  {filters.priceRange[1] === 100 ? "£100+" : `£${filters.priceRange[1]}`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Filter by price per person (approximate)
              </p>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Categories</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CATEGORIES.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={filters.categories.includes(category.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Minimum Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(rating)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors ${
                      filters.minRating === rating
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-background hover:bg-accent/10 border-border"
                    }`}
                  >
                    <Star className={`w-4 h-4 ${filters.minRating === rating ? "fill-current" : ""}`} />
                    <span className="text-sm font-medium">{rating}+</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Open Now */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="open-now"
                checked={filters.openNow}
                onCheckedChange={handleOpenNowToggle}
              />
              <label
                htmlFor="open-now"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Open Now
              </label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
