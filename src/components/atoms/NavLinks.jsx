import { NavLink } from "react-router-dom";

export default function NavLinks({ link, text }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `text-sm sm:text-base font-medium transition-colors duration-200 hover:text-indigo-600 ${isActive
          ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
          : "text-gray-600"
        }`
      }
    >
      {text}
    </NavLink>
  );
}
