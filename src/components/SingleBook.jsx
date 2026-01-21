import H2 from "../components/atoms/H2";
import Highlighted from "./atoms/Highlighted";

export default function SingleBook({ title, author, image, genre }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 sm:p-5">
        <H2>{title}</H2>
        <p className="text-sm sm:text-base text-gray-600 mt-2 mb-3">by {author}</p>
        <div className="flex items-center">
          <span className="text-xs sm:text-sm text-gray-500">Genre:</span>
          <span className="ml-2 text-xs sm:text-sm">
            <Highlighted>{genre}</Highlighted>
          </span>
        </div>
      </div>
    </div>
  );
}
