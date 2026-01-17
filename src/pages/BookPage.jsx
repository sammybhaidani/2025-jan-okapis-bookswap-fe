import { useParams } from "react-router-dom";
import BookDetail from "../components/BookDetail";
import { useEffect, useState } from "react";
import BookReview from "../components/BookReview";
import H5 from "../components/atoms/H5";

export default function BookPage() {

  const { id } = useParams()
  const [bookDetails, setBookDetails] = useState("")
  const [bookGenre, setBookGenre] = useState("")
  const [bookReviews, setBookReviews] = useState([])
  const [reviewNumber, setReviewNumber] = useState(0)
  const [averageRating, setAverageRating] = useState([])

  function getBookDetails() {
    fetch(`https://book-swap-api-production.up.railway.app/api/books/${id}`)
      .then(response => response.json())
      .then(details => {
        setBookDetails(details.data)
        setBookGenre(details.data.genre.name)
        setBookReviews(details.data.reviews)
        setReviewNumber(details.data.reviews.length)

        const ratings = details.data.reviews.map(review => review.rating)
        const total = ratings.reduce((acc, rating) => acc + rating, 0)
        const averageRating = (total / ratings.length).toFixed(1);

        setAverageRating(averageRating);
      })
  }

  useEffect(getBookDetails, [])

  return (
    <div>
      <div>
        <BookDetail rating={averageRating} review_number={reviewNumber} />
      </div>

      <div className="
                pt-2 pb-5 px-20 text-center mx-auto 
                md:max-w-[1000px] md:text-left md:px-10 md:py-2 md:items-start ">
        <H5 text="Reviews" />
        {bookReviews.map(function (reviews) {
          return (
            <BookReview
              key={reviews.id}
              name={reviews.name}
              rating={reviews.rating}
              review={reviews.review} />

          )
        })}
      </div>
    </div>
  )
}