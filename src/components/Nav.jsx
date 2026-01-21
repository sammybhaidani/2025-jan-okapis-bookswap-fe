import { Link } from "react-router-dom";
import H1 from "./atoms/H1";
import NavLinks from "./atoms/NavLinks";

export default function Nav() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:items-center">
          <Link
            to="/"
            className="flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <H1>Okapi BookSwap</H1>
          </Link>

          {/* Links */}
          <div className="flex flex-row flex-wrap justify-center gap-4">
            <NavLinks link="/" text="Available Books" />
            <NavLinks link="/claimed" text="Claimed Books" />
            <NavLinks link="/add" text="Add Book" />
          </div>
        </div>
      </div>
    </nav>
  );
}
