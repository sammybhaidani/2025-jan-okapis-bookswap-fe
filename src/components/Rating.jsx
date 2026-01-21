export default function Rating({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<span key={i} className="text-yellow-400">½</span>);
    } else {
      stars.push(<span key={i} className="text-gray-300">★</span>);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex text-lg sm:text-xl">{stars}</div>
      <span className="text-xs sm:text-sm font-medium text-gray-700">({rating})</span>
    </div>
  );
}
