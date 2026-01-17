import { useEffect, useState } from "react"
import Highlighted from "../components/atoms/Highlighted"

export default function AddBook() {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [genre, setGenre] = useState("")
  const [genreData, setGenreData] = useState([])
  const [year, setYear] = useState("")
  const [pageCount, setPageCount] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [blurb, setBlurb] = useState("")

  const [titleError, setTitleError] = useState("")
  const [authorError, setAuthorError] = useState("")
  const [genreError, setGenreError] = useState("")
  const [yearError, setYearError] = useState("")
  const [pageCountError, setPageCountError] = useState("")
  const [imageURLError, setImageURLError] = useState("")

  const [successMessage, setSuccessMessage] = useState("")

  function addBook() {

    const data = {
      "title": title,
      "author": author,
      "genre_id": genre,
      "year": year,
      "page_count": pageCount,
      "image": imageURL,
      "blurb": blurb
    }

    const requestOptions = {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch('https://book-swap-api-production.up.railway.app/api/books', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          setTitleError(data.errors.title)
          setAuthorError(data.errors.author)
          setGenreError(data.errors.genre_id)
          setImageURLError(data.errors.image)
          setPageCountError(data.errors.page_count)
          setYearError(data.errors.year)
        } else {
          setSuccessMessage(data.message)
        }

      })
  }

  function getGenre() {
    fetch('https://book-swap-api-production.up.railway.app/api/genres')
      .then(response => response.json())
      .then(genres => {
        setGenreData(genres.data)
      })
  }

  useEffect(getGenre, [])

  function handleSubmit(e) {
    e.preventDefault()
    addBook()
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleAuthorChange(e) {
    setAuthor(e.target.value)
  }

  function handleGenreChange(e) {
    setGenre(e.target.value)
  }

  function handleYearChange(e) {
    setYear(e.target.value)
  }

  function handlePageCountChange(e) {
    setPageCount(e.target.value)
  }

  function handleImageURLChange(e) {
    setImageURL(e.target.value)
  }

  function handleBlurbChange(e) {
    setBlurb(e.target.value)
  }

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}
        className="flex flex-col p-4 w-xl">
        <label className="mt-2 mb-1" htmlFor="title">Title (required)</label>
        <Highlighted text={titleError} />
        <input onChange={handleTitleChange} className="px-1 border-[1px]" type="text" placeholder="Title" name="title" id="title" />
        <label className="mt-2 mb-1" htmlFor="author">Author (required)</label>
        <Highlighted text={authorError} />
        <input onChange={handleAuthorChange} className="px-1 border-[1px]" type="text" placeholder="Author" name="author" id="author" />
        <label className="mt-2 mb-1" htmlFor="genre">Genre (required)</label>
        <Highlighted text={genreError} />
        <select id="genre" aria-label="Select genre" className="px-1 border-[1px]" onChange={handleGenreChange}>
          <option value="">No genre selected</option>
          {genreData.map(genre =>
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          )}
        </select>
        <label className="mt-2 mb-1" htmlFor="year">Year</label>
        <Highlighted text={yearError} />
        <input onChange={handleYearChange} className="px-1 border-[1px]" type="number" placeholder="2000" name="year" id="year" />
        <label className="mt-2 mb-1" htmlFor="pageCount">Page count</label>
        <Highlighted text={pageCountError} />
        <input onChange={handlePageCountChange} className="px-1 border-[1px]" type="number" placeholder="0" name="pageCount" id="pageCount" />
        <label className="mt-2 mb-1" htmlFor="imageURL">Image URL</label>
        <Highlighted text={imageURLError} />
        <input onChange={handleImageURLChange} className="px-1 border-[1px]" type="url" placeholder="Image URL" name="imageURL" id="imageURL" />
        <label className="mt-2 mb-1" htmlFor="blurb">Blurb</label>
        <textarea onChange={handleBlurbChange} className="px-1 border-[1px] h-[150px]" placeholder="Blurb" name="blurb" id="blurb"></textarea>
        <label className="mt-2 mb-1" htmlFor="addBook"></label>
        <input className="px-1 border-[1px]" type="submit" value="Add book" name="addBook" id="addBook" />
        <Highlighted text={successMessage} />
      </form>
    </div>
  )
}