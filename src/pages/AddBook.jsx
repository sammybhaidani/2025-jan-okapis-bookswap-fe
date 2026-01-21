import { useEffect, useState } from "react";
import Highlighted from "../components/atoms/Highlighted";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [genreData, setGenreData] = useState([]);
  const [year, setYear] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [blurb, setBlurb] = useState("");
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [yearError, setYearError] = useState("");
  const [pageCountError, setPageCountError] = useState("");
  const [imageURLError, setImageURLError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function addBook() {
    const data = {
      "title": title,
      "author": author,
      "genre_id": genre,
      "year": year,
      "page_count": pageCount,
      "image": imageURL,
      "blurb": blurb
    };

    const requestOptions = {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    };

    fetch('https://book-swap-api-production.up.railway.app/api/books', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          setTitleError(data.errors.title);
          setAuthorError(data.errors.author);
          setGenreError(data.errors.genre_id);
          setImageURLError(data.errors.image);
          setPageCountError(data.errors.page_count);
          setYearError(data.errors.year);
          setSuccessMessage("");
        } else {
          setSuccessMessage(data.message);
          setTitle("");
          setAuthor("");
          setGenre("");
          setYear("");
          setPageCount("");
          setImageURL("");
          setBlurb("");
        }
      });
  }

  function getGenre() {
    fetch('https://book-swap-api-production.up.railway.app/api/genres')
      .then(response => response.json())
      .then(genres => {
        setGenreData(genres.data);
      });
  }

  useEffect(getGenre, []);

  function handleSubmit(e) {
    e.preventDefault();
    addBook();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add a New Book</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Share a book with the community</p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm sm:text-base text-green-800 font-medium">✓ {successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Book Title <Highlighted>*</Highlighted>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setTitleError(""); }}
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border ${titleError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none`}
                placeholder="Enter the book title"
              />
              {titleError && <p className="mt-2 text-xs sm:text-sm text-red-600">⚠ {titleError}</p>}
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author <Highlighted>*</Highlighted>
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => { setAuthor(e.target.value); setAuthorError(""); }}
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border ${authorError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none`}
                placeholder="Enter the author name"
              />
              {authorError && <p className="mt-2 text-xs sm:text-sm text-red-600">⚠ {authorError}</p>}
            </div>

            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                Genre <Highlighted>*</Highlighted>
              </label>
              <select
                id="genre"
                value={genre}
                onChange={(e) => { setGenre(e.target.value); setGenreError(""); }}
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border ${genreError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none`}
              >
                <option value="">Select a genre</option>
                {genreData.map((genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
              {genreError && <p className="mt-2 text-xs sm:text-sm text-red-600">⚠ {genreError}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year <Highlighted>*</Highlighted>
                </label>
                <input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => { setYear(e.target.value); setYearError(""); }}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border ${yearError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none`}
                  placeholder="2024"
                />
                {yearError && <p className="mt-2 text-xs sm:text-sm text-red-600">⚠ {yearError}</p>}
              </div>

              <div>
                <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700 mb-2">
                  Page Count <Highlighted>*</Highlighted>
                </label>
                <input
                  id="pageCount"
                  type="number"
                  value={pageCount}
                  onChange={(e) => { setPageCount(e.target.value); setPageCountError(""); }}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border ${pageCountError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none`}
                  placeholder="320"
                />
                {pageCountError && <p className="mt-2 text-xs sm:text-sm text-red-600">⚠ {pageCountError}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL <Highlighted>*</Highlighted>
              </label>
              <input
                id="imageURL"
                type="url"
                value={imageURL}
                onChange={(e) => { setImageURL(e.target.value); setImageURLError(""); }}
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border ${imageURLError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none`}
                placeholder="https://example.com/book-cover.jpg"
              />
              {imageURLError && <p className="mt-2 text-xs sm:text-sm text-red-600">⚠ {imageURLError}</p>}
            </div>

            <div>
              <label htmlFor="blurb" className="block text-sm font-medium text-gray-700 mb-2">
                Book Description
              </label>
              <textarea
                id="blurb"
                value={blurb}
                onChange={(e) => setBlurb(e.target.value)}
                rows="5"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none resize-none"
                placeholder="Enter a brief description of the book..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Add Book to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
