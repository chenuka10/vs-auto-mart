interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className = "" }: StarRatingProps) {
  return (
    <div className={`flex gap-0.5 text-brass-600 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}