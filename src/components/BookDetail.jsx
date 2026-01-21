import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import H2 from "./atoms/H2";
import Highlighted from "./atoms/Highlighted";
import P from "./atoms/P";
import Rating from "./Rating";
import ClaimForm from "./ClaimForm";
import ReturnForm from "./ReturnForm";
import BookReview from "./BookReview";
import ReviewForm from "./ReviewForm";

export default function BookDetail() {
  const { id } = useParams();

  const [bookDetails, setBookDetails] = useState(null);
  const [bookGenre, setBookGenre] = useState("");
  const [claimedName, setClaimedName] = useState(null);
  const [bookReviews, setBookReviews] = useState([]);
  const [bookReviewCount, setBookReviewCount] = useState(0);
  const [bookRating, setBookRating] = useState(null);

  function handlePerson(name) {
    setClaimedName(name);
  }

  function handleReviewSubmit() {
    setBookReviewCount((prev) => prev + 1);
  }

  function calculateBookRating(reviews) {
    if (!reviews || reviews.length === 0) {
      setBookRating(null);
      return;
    }
    const sumRatings = reviews.reduce((acc, currentValue) => acc + currentValue.rating, 0);
    const averageRating = (sumRatings / reviews.length).toFixed(1);
    setBookRating(averageRating);
  }

  function getBookDetails() {
    fetch(`https://book-swap-api-production.up.railway.app/api/books/${id}`)
      .then((response) => response.json())
      .then((details) => {
        const book = details.data;
        setBookDetails(book);
        setBookGenre(book.genre.name);
        setClaimedName(book.claimed_by_name);
        setBookReviews(book.reviews || []);
        setBookReviewCount((book.reviews || []).length);
        calculateBookRating(book.reviews || []);
      });
  }

  useEffect(() => {
    getBookDetails();
  }, [id, bookReviewCount]);

  if (!bookDetails) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-500">Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
        {/* Cover */}
        <div className="md:col-span-2">
          <div className="aspect-[3/4] max-w-sm mx-auto md:max-w-none rounded-lg overflow-hidden bg-gray-100 shadow-md">
            <img
              src={bookDetails.image}
              alt={bookDetails.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main info + blurb + claim/return + reviews */}
        <div className="md:col-span-3 space-y-6">
          {/* Title / author */}
          <div>
            <H2>{bookDetails.title}</H2>
            <p className="text-lg sm:text-xl text-gray-600 mt-2">by {bookDetails.author}</p>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Genre:</span>
              <Highlighted>{bookGenre}</Highlighted>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Year:</span>
              <span className="font-medium text-gray-700">{bookDetails.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Pages:</span>
              <span className="font-medium text-gray-700">{bookDetails.page_count}</span>
            </div>
          </div>

          {/* Rating summary */}
          {bookRating && (
            <div className="flex items-center gap-4">
              <Rating rating={bookRating} />
              <span className="text-xs sm:text-sm text-gray-500">
                ({bookReviewCount} {bookReviewCount === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}

          {/* Claimed / claim / return */}
          {claimedName ? (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-green-800 font-medium">
                  ✓ This book has been claimed by <Highlighted>{claimedName}</Highlighted>
                </p>
              </div>
              <ReturnForm id={id} name={claimedName} handlePerson={handlePerson} />
            </div>
          ) : (
            <ClaimForm getBookDetails={getBookDetails} />
          )}

          {/* Blurb */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
              About this book
            </h3>
            <P>{bookDetails.blurb}</P>
          </div>

          {/* Reviews + form */}
          <section id="reviews" className="border-t border-gray-200 pt-4 sm:pt-6 space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Reviews</h3>
              {bookReviewCount > 0 && (
                <span className="text-xs sm:text-sm text-gray-500">
                  {bookReviewCount} {bookReviewCount === 1 ? "review" : "reviews"}
                </span>
              )}
            </div>

            <ReviewForm id={id} handleReviewCount={handleReviewSubmit} />

            {bookReviews.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {bookReviews.map((review) => (
                  <BookReview
                    key={review.id}
                    name={review.name}
                    rating={review.rating}
                    comment={review.review}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm sm:text-base text-gray-500">
                No reviews yet. Be the first to share your thoughts.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
