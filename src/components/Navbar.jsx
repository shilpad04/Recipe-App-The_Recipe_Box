import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { getCategories } from "../api/mealApi";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const catBtnRef = useRef(null);
  const catMenuRef = useRef(null);

  useEffect(() => {
    getCategories().then((r) => setCategories(r.data.meals || []));
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [location.pathname, location.search]);

  function goCategory(cat) {
    if (!cat) return;
    navigate(`/recipes?cat=${encodeURIComponent(cat)}`);
  }

  function handleSearch(q) {
    navigate(q ? `/recipes?q=${encodeURIComponent(q)}` : "/recipes");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-red-600/80 backdrop-blur text-white px-4 sm:px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold whitespace-nowrap [font-family:'Pacifico',cursive]"
        >
          🍽 The Recipe Box
        </Link>

        {/* Hamburger */}
        <button
          className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 transition"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((s) => !s)}
        >
          <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = e.target.elements.search.value.trim();
            handleSearch(q);
          }}
          className="hidden sm:flex items-center gap-2 flex-1 justify-center"
        >
          <input
            name="search"
            placeholder="Search recipes..."
            className="px-4 py-2 rounded w-full sm:w-64 md:w-80 lg:w-[22rem] 
                       text-white placeholder:text-white bg-transparent 
                       [font-family:'Poppins',sans-serif]
                       border border-white/50 focus:border-white outline-none"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded [font-family:'Poppins',sans-serif] shadow-sm hover:shadow-md transition whitespace-nowrap"
          >
            <i className="fa-solid fa-magnifying-glass mr-2" />
            <span>Search</span>
          </button>
        </form>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-4 relative [font-family:'Poppins',sans-serif]">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/recipes" className="hover:underline">
            Recipes
          </NavLink>
          <NavLink
            to="/favourites"
            className="hover:underline flex items-center gap-1"
          >
            <i className="fa-solid fa-star" />
            <span>Favourites</span>
          </NavLink>

          {/* Category */}
          <div className="relative">
            <button
              ref={catBtnRef}
              onClick={() => setCatOpen((s) => !s)}
              className="inline-flex items-center gap-2 hover:underline"
            >
              <span>Category</span>
              <i
                className={`fa-solid fa-chevron-down text-xs transition ${
                  catOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {catOpen && (
              <div
                ref={catMenuRef}
                className="absolute right-0 mt-2 w-56 max-h-80 overflow-auto rounded-md bg-white text-black shadow-lg ring-1 ring-black/10 z-50"
              >
                <ul className="py-1">
                  {categories.map((c) => (
                    <li key={c.strCategory}>
                      <button
                        onClick={() => goCategory(c.strCategory)}
                        className="w-full text-left px-3 py-2 hover:bg-black/5"
                      >
                        {c.strCategory}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="sm:hidden mt-3 border-t border-white/20 pt-3 space-y-3">
          {/* Search - Mobile*/}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = e.target.elements.search.value.trim();
              handleSearch(q);
            }}
            className="flex items-center gap-2 [font-family:'Poppins',sans-serif]"
          >
            <input
              name="search"
              placeholder="Search recipes..."
              className="px-3 py-2 rounded flex-1 text-black placeholder:text-gray-500 bg-white border border-white/50 focus:border-white outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded shadow-sm hover:shadow-md transition"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </form>

          {/* Links - Mobile */}
          <div className="flex flex-col gap-2 text-center [font-family:'Poppins',sans-serif]">
            <NavLink to="/" className="hover:underline py-1">
              Home
            </NavLink>
            <NavLink to="/recipes" className="hover:underline py-1">
              Recipes
            </NavLink>
            <NavLink
              to="/favourites"
              className="hover:underline py-1 flex items-center gap-2 justify-center"
            >
              <i className="fa-solid fa-star" />
              <span>Favourites</span>
            </NavLink>
          </div>

          {/* Category - Mobile*/}
          <div className="flex flex-col gap-1 [font-family:'Poppins',sans-serif]">
            <label htmlFor="mobileCategory" className="text-sm font-medium">
              Category
            </label>
            <select
              id="mobileCategory"
              onChange={(e) => goCategory(e.target.value)}
              className="bg-white text-black px-3 py-2 rounded border border-white/40"
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((c) => (
                <option key={c.strCategory} value={c.strCategory}>
                  {c.strCategory}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
