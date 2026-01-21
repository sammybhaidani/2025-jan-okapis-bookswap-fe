export default function GenreFilter({ genres, selectedGenre, handleGenreChange }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      <button
        onClick={() => handleGenreChange("")}
        className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${selectedGenre === ""
          ? "bg-indigo-600 text-white shadow-md"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
      >
        All Genres
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleGenreChange(genre.id)}
          className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${selectedGenre === genre.id
            ? "bg-indigo-600 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
