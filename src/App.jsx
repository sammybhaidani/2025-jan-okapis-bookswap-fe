import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";
import AddBook from "./pages/AddBook";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home claimed={0} />} />
        <Route path="/claimed" element={<Home claimed={1} />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  )
}