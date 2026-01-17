import { Link } from "react-router-dom";
import H1 from "./atoms/H1";
import NavLinks from "./atoms/NavLinks";

export default function Nav() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <H1>Okapi BookSwap</H1>
          </Link>

          <div className="flex items-center gap-8">
            <NavLinks link="/" text="Available Books" />
            <NavLinks link="/claimed" text="Claimed Books" />
            <NavLinks link="/add" text="Add Book" />
          </div>
        </div>
      </div>
    </nav>
  );
}
