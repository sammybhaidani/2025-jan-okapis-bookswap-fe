import Rating from "./Rating";

export default function BookReview({ name, comment, rating }) {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3">
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <Rating rating={rating} />
      </div>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{comment}</p>
    </div>
  );
}
