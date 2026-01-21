import { useState } from "react";
import H2 from "./atoms/H2";
import Input from "./atoms/Input";

export default function ReturnForm({ id, name, handlePerson, refreshBook }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
    setEmailError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = { email };

    const requestOptions = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`https://book-swap-api-production.up.railway.app/api/books/return/${id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.errors?.email && email) {
          setEmailError(data.errors.email[0]);
        } else if (data.errors?.email && !email) {
          setEmailError(data.errors.email[1]);
        } else {
          handlePerson(null);
          refreshBook?.(); // Refresh book status
          setEmail("");
        }
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 bg-white border border-gray-200 rounded-lg p-4 sm:p-5 flex flex-col gap-3 w-full"
    >
      <H2>Want to return this book?</H2>

      <div className="space-y-1">
        <label
          htmlFor="return-email"
          className="block text-sm font-medium text-gray-700"
        >
          {name}&apos;s email
        </label>
        <Input
          id="return-email"
          label={null}
          placeholder="Email"
          handleInput={handleEmail}
          error={emailError}
          value={email}
        />
        {emailError && (
          <p className="mt-1 text-xs sm:text-sm text-red-600">{emailError}</p>
        )}
      </div>

      <div className="pt-1">
        <Input
          type="submit"
          value="Return"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm sm:text-base cursor-pointer transition-colors duration-200 shadow-md hover:shadow-lg"
        />
      </div>
    </form>
  );
}
