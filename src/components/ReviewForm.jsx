import { useState } from "react";
import H3 from "./atoms/H3";
import Input from "./atoms/Input";
import FormError from "./atoms/FormError";

export default function ReviewForm({ id, handleReviewCount }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("-");
  const [review, setReview] = useState("");
  const [nameError, setNameError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [ratingError, setRatingError] = useState("");

  function handleName(e) {
    setName(e.target.value);
    setNameError("");
  }

  function handleRating(e) {
    setRating(e.target.value);
    setRatingError("");
  }

  function handleReview(e) {
    setReview(e.target.value);
    setReviewError("");
  }

  function clearForm() {
    setName("");
    setReview("");
    setRating("-");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: name,
      rating: Number(rating),
      review: review,
      book_id: id,
    };

    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("https://book-swap-api-production.up.railway.app/api/reviews", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setNameError(data.errors.name);
          setReviewError(data.errors.review);
          setRatingError(data.errors.rating);
        } else {
          handleReviewCount();
          clearForm();
        }
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-white border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 w-full"
    >
      <H3>Want to review this book?</H3>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="review-name">
          Name
        </label>
        <Input
          id="review-name"
          label={null}
          placeholder="Your name"
          handleInput={handleName}
          error={nameError}
          value={name}
        />
        {nameError && <FormError text={nameError} />}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="ratings">
          Score
        </label>
        <select
          onChange={handleRating}
          id="ratings"
          name="ratings"
          value={rating}
          className={`mt-1 block w-32 px-3 py-2 rounded-lg border text-sm ${ratingError ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
        >
          <option value="-">-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {ratingError && <FormError text={ratingError} />}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="review-text">
          Review
        </label>
        <textarea
          id="review-text"
          onChange={handleReview}
          rows="5"
          className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm ${reviewError ? "border-red-500 bg-red-50" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none`}
          placeholder="Share your thoughts about this book..."
          value={review}
        />
        {reviewError && <FormError text={reviewError} />}
      </div>

      <div className="pt-2">
        <Input
          type="submit"
          value="Review"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm sm:text-base cursor-pointer transition-colors duration-200"
        />
      </div>
    </form>
  );
}
