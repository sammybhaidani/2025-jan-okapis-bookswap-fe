import { useParams } from "react-router-dom";
import BookDetail from "../components/BookDetail";
import { useEffect, useState } from "react";

export default function BookPage() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookReviews, setBookReviews] = useState([]);
  const [reviewNumber, setReviewNumber] = useState(0);
  const [averageRating, setAverageRating] = useState([]);

  function getBookDetails() {
    fetch(`https://book-swap-api-production.up.railway.app/api/books/${id}`)
      .then((response) => response.json())
      .then((details) => {
        setBookDetails(details.data);
        setBookGenre(details.data.genre.name);
        setBookReviews(details.data.reviews || []);
        setReviewNumber((details.data.reviews || []).length);

        const ratings = (details.data.reviews || []).map((review) => review.rating);
        if (ratings.length > 0) {
          const total = ratings.reduce((acc, rating) => acc + rating, 0);
          const averageRating = (total / ratings.length).toFixed(1);
          setAverageRating(averageRating);
        } else {
          setAverageRating(null);
        }
      });
  }

  useEffect(() => {
    getBookDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <BookDetail
          review_number={reviewNumber}
          rating={averageRating}
          refreshBook={getBookDetails}
        />
      </div>
    </div>
  );
}
