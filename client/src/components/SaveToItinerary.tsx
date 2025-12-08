// Component disabled - auth removed

interface SaveToItineraryProps {
  itemType: "attraction" | "restaurant" | "accommodation";
  itemId: number;
  itemName: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
}

export function SaveToItinerary({
  itemType,
  itemId,
  itemName,
  variant = "outline",
  size = "default",
  showText = true,
}: SaveToItineraryProps) {
  // Component disabled - returns null
  return null;
}
