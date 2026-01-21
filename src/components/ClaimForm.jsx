import { useParams } from "react-router-dom";
import H3 from "./atoms/H3";
import { useState } from "react";

export default function ClaimForm({ getBookDetails }) {
  const { id } = useParams();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function sendClaimForm() {
    const data = {
      "name": name,
      "email": email,
    };

    const requestOptions = {
      method: "PUT",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    };

    fetch(`https://book-swap-api-production.up.railway.app/api/books/claim/${id}`, requestOptions)
      .then(response => response.json())
      .then(claimData => {
        setEmailError(claimData?.errors?.email);
        setNameError(claimData?.errors?.name);
        getBookDetails();
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendClaimForm();
  }

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError("");
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError("");
  }

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 sm:p-6">
      <H3>Claim this book</H3>
      <p className="text-sm sm:text-base text-gray-600 mt-2 mb-4 sm:mb-6">Fill in your details to claim this book for swap</p>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border ${nameError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none`}
            placeholder="Enter your full name"
          />
          {nameError && (
            <p className="mt-2 text-xs sm:text-sm text-red-600">⚠ {nameError}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border ${emailError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none`}
            placeholder="your.email@example.com"
          />
          {emailError && (
            <p className="mt-2 text-xs sm:text-sm text-red-600">⚠ {emailError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Claim Book
        </button>
      </form>
    </div>
  );
}
