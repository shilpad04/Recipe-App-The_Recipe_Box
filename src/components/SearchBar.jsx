import { useState } from "react";

function SearchBar({ onSearch, className = "" }) {
  const [q, setQ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(q.trim());
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search recipe by name..."
        className="px-4 py-2 rounded w-[28rem] text-white [font-family:'Poppins',sans-serif] placeholder-white bg-transparent border border-white/50 focus:border-white outline-none"
      />
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white [font-family:'Poppins',sans-serif] px-4 py-2 rounded"
      >
        <i className="fa-solid fa-magnifying-glass mr-2"></i>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
