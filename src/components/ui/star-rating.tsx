import { Star, StarHalf, StarOff } from "lucide-react";

const StarRating: React.FC<{ rating: number; maxStars?: number }> = ({
  rating,
  maxStars = 5,
}) => {
  const normalizedRating = (rating / 10) * maxStars;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-5 h-5 fill--warning text--warning"
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 fill-warning text--warning" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} className="w-5 h-5 text-base-300" />
      ))}
    </div>
  );
};

export default StarRating;
