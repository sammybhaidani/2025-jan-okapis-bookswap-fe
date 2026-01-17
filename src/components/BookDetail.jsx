import { useEffect, useState } from "react";
import H2 from "./atoms/H2";
import Highlighted from "./atoms/Highlighted";
import P from "./atoms/P";
import Rating from "./Rating";
import { useParams } from "react-router-dom";
import ClaimForm from "./ClaimForm";

export default function BookDetail({ review_number, rating }) {

  const { id } = useParams()
  const [bookDetails, setBookDetails] = useState("")
  const [bookGenre, setBookGenre] = useState("")
  const [claimedName, setClaimedName] = useState(null)

  function getBookDetails() {
    console.log('getBookDetails')
    fetch(`https://book-swap-api-production.up.railway.app/api/books/${id}`)
      .then(response => response.json())
      .then(details => {
        console.log('Data fetched')
        setBookDetails(details.data)
        setBookGenre(details.data.genre.name)
        setClaimedName(details.data.claimed_by_name)
      })
  }

  useEffect(getBookDetails, [])

  return (
    <div className="flex flex-col 
        items-center text-center mx-auto md:max-w-[1000px]
        gap-2 pt-2 p-5 px-10 
        md:flex-row md:text-left md:p-10 md:items-start">
      <div className="md:max-w-[60%]">
        <img className="md:w-1000"
          src={bookDetails.image} alt={bookDetails.title} />
      </div>

      <div className="flex flex-col gap-[10px]">
        <H2 text={bookDetails.title} />
        <Highlighted text={bookDetails.author} />
        <Highlighted text={bookDetails.year} />
        <Highlighted text={`${bookDetails.page_count} pages`} />
        <Highlighted text={bookGenre} />
        <div >
          <Rating rating={rating} reviewNumber={review_number} />
        </div>
        <ClaimForm person={claimedName} getBookDetails={getBookDetails} />
        <div className="pt-5">
          <P text={bookDetails.blurb} />
        </div>
      </div>
    </div>
  )
}