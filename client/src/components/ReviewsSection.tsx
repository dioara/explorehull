import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/StarRating";
// Auth removed - reviews disabled temporarily
import { useState } from "react";
import { toast } from "sonner";
import { User } from "lucide-react";

interface ReviewsSectionProps {
  itemType: "attraction" | "restaurant" | "accommodation";
  itemId: number;
  itemName: string;
}

export function ReviewsSection({ itemType, itemId, itemName }: ReviewsSectionProps) {
  // Auth disabled
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: reviews, refetch } = trpc.reviews.getByItem.useQuery({
    itemType,
    itemId,
  });
  
  const { data: averageRating } = trpc.reviews.getAverageRating.useQuery({
    itemType,
    itemId,
  });
  
  const createReview = trpc.reviews.create.useMutation({
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      setIsSubmitting(false);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to submit review: ${error.message}`);
      setIsSubmitting(false);
    },
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    setIsSubmitting(true);
    createReview.mutate({
      itemType,
      itemId,
      rating,
      comment: comment.trim() || undefined,
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Average Rating Summary */}
      {averageRating && averageRating.count > 0 && (
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-[oklch(0.70_0.15_200)]">
              {averageRating.average.toFixed(1)}
            </div>
            <StarRating rating={averageRating.average} readonly size="md" />
            <div className="text-sm text-muted-foreground mt-1">
              {averageRating.count} {averageRating.count === 1 ? 'review' : 'reviews'}
            </div>
          </div>
        </div>
      )}
      
      {/* Review Form */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>
          
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Review submission is temporarily unavailable
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">
          Reviews {reviews && reviews.length > 0 && `(${reviews.length})`}
        </h3>
        
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[oklch(0.70_0.15_200)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-[oklch(0.70_0.15_200)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold">{review.userName || 'Anonymous'}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        <StarRating rating={review.rating} readonly size="sm" />
                      </div>
                      {review.comment && (
                        <p className="text-muted-foreground mt-2">{review.comment}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No reviews yet. Be the first to review {itemName}!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
