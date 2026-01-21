import { useEffect, useState } from "react";
import SingleBook from "../components/SingleBook";
import { Link } from "react-router-dom";
import GenreFilter from "../components/GenreFilter";

export default function Home({ claimed }) {
  const [bookInfo, setBookInfo] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  function getData() {
    const url = `https://book-swap-api-production.up.railway.app/api/books?claimed=${claimed}${selectedGenre ? `&genre=${selectedGenre}` : ''}`;
    fetch(url)
      .then(res => res.json())
      .then(fetchedInfo => {
        setBookInfo(fetchedInfo.data);
      })
      .catch(error => console.error("Error fetching books", error));
  }

  useEffect(getData, [claimed, selectedGenre]);

  useEffect(() => {
    fetch('https://book-swap-api-production.up.railway.app/api/genres')
      .then(res => res.json())
      .then(genres => {
        setGenres(genres.data);
      });
  }, []);

  function handleGenreChange(genreId) {
    setSelectedGenre(genreId);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {claimed ? "Claimed Books" : "Available Books"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {claimed ? "Browse books that have been claimed" : "Discover books available for swap"}
          </p>
        </div>

        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          handleGenreChange={handleGenreChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {bookInfo.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`} className="block">
              <SingleBook
                title={book.title}
                author={book.author}
                image={book.image}
                genre={book.genre.name}
              />
            </Link>
          ))}
        </div>

        {bookInfo.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base sm:text-lg">No books found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
