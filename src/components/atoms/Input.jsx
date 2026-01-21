import FormError from "./FormError";

export default function Input({ label, id, type = "text", placeholder, value, handleInput, error }) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm mb-1" htmlFor={id}>{label}</label>}
      <input onChange={handleInput} className="border rounded p-1" type={type} id={id} placeholder={placeholder} value={value} />
      {error && <FormError text={error} />}
    </div>
  )
}