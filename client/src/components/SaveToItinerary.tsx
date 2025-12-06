import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

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
  const { isAuthenticated } = useAuth();
  
  const { data: isSaved, refetch } = trpc.itinerary.isInItinerary.useQuery(
    { itemType, itemId },
    { enabled: isAuthenticated }
  );
  
  const addMutation = trpc.itinerary.add.useMutation({
    onSuccess: () => {
      toast.success(`Added ${itemName} to your itinerary!`);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to add to itinerary: ${error.message}`);
    },
  });
  
  const removeMutation = trpc.itinerary.remove.useMutation({
    onSuccess: () => {
      toast.success(`Removed ${itemName} from your itinerary`);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to remove from itinerary: ${error.message}`);
    },
  });
  
  const handleClick = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    
    if (isSaved) {
      removeMutation.mutate({ itemType, itemId });
    } else {
      addMutation.mutate({ itemType, itemId });
    }
  };
  
  const isLoading = addMutation.isPending || removeMutation.isPending;
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={isSaved ? "border-[oklch(0.70_0.15_200)] text-[oklch(0.70_0.15_200)]" : ""}
    >
      {isSaved ? (
        <>
          <BookmarkCheck className={showText ? "mr-2 h-5 w-5" : "h-5 w-5"} />
          {showText && "Saved"}
        </>
      ) : (
        <>
          <Bookmark className={showText ? "mr-2 h-5 w-5" : "h-5 w-5"} />
          {showText && "Save to Itinerary"}
        </>
      )}
    </Button>
  );
}
