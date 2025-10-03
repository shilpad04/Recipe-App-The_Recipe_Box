import { useEffect, useRef, useState } from "react";

function FilterBar({
  categories = [],
  ingredients = [],
  areas = [],
  selectedCategory,
  selectedIngredient,
  selectedArea,
  onCategoryChange,
  onIngredientChange,
  onAreaChange,
  onClear,
}) {
  const [catOpen, setCatOpen] = useState(false);
  const [ingOpen, setIngOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const catBtnRef = useRef(null);
  const ingBtnRef = useRef(null);
  const areaBtnRef = useRef(null);

  const catMenuRef = useRef(null);
  const ingMenuRef = useRef(null);
  const areaMenuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (
        catOpen &&
        catMenuRef.current &&
        catBtnRef.current &&
        !catMenuRef.current.contains(e.target) &&
        !catBtnRef.current.contains(e.target)
      )
        setCatOpen(false);

      if (
        ingOpen &&
        ingMenuRef.current &&
        ingBtnRef.current &&
        !ingMenuRef.current.contains(e.target) &&
        !ingBtnRef.current.contains(e.target)
      )
        setIngOpen(false);

      if (
        areaOpen &&
        areaMenuRef.current &&
        areaBtnRef.current &&
        !areaMenuRef.current.contains(e.target) &&
        !areaBtnRef.current.contains(e.target)
      )
        setAreaOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [catOpen, ingOpen, areaOpen]);

  const pill =
    "bg-white text-black px-3 py-2 rounded shadow-sm hover:shadow-md transition duration-200 w-full sm:w-48 md:w-56 text-left [font-family:'Poppins',sans-serif]";

  return (
    <div
      className="
        sticky [top:var(--nav-h,56px)] z-40
        bg-neutral-900/95 backdrop-blur px-4 py-3 shadow-md
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-start gap-3 [font-family:'Poppins',sans-serif]">
        <span className="font-bold text-white">Filter By</span>

        <button
          type="button"
          onClick={() => setFiltersOpen((s) => !s)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/15 text-white [font-family:'Poppins',sans-serif] sm:hidden"
          aria-expanded={filtersOpen}
          aria-controls="filters-panel"
        >
          <i className="fa-solid fa-filter" />
          <span className="text-sm">Filters</span>
          <i
            className={`fa-solid fa-chevron-down text-xs transition-transform ${
              filtersOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <div
        id="filters-panel"
        className={`${filtersOpen ? "grid" : "hidden"} sm:grid transition-all`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-3 sm:flex sm:flex-row sm:flex-wrap sm:gap-4 items-stretch sm:items-center justify-center mt-3 ">
          {/* Category */}
          <div className="flex flex-col items-center sm:items-start relative [font-family:'Poppins',sans-serif]">
            <label className="text-white font-medium mb-1 text-sm">
              Category
            </label>
            <button
              ref={catBtnRef}
              onClick={() => {
                setCatOpen((s) => !s);
                setIngOpen(false);
                setAreaOpen(false);
              }}
              className={`${pill} flex items-center justify-between`}
              aria-haspopup="true"
              aria-expanded={catOpen}
            >
              <span className="truncate">
                {selectedCategory ||
                  (categories.length ? "Select Category" : "Loading…")}
              </span>
              <i
                className={`fa-solid fa-chevron-down text-xs ml-2 transition ${
                  catOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {catOpen && (
              <div
                ref={catMenuRef}
                className="absolute left-0 top-full mt-1 w-full sm:w-48 md:w-56 max-height-64 max-h-64 overflow-auto rounded-md bg-white text-black shadow-lg ring-1 ring-black/10 z-50 [font-family:'Poppins',sans-serif]"
              >
                <ul className="py-1">
                  {categories.map((c) => (
                    <li key={c.strCategory}>
                      <button
                        onClick={() => {
                          onCategoryChange(c.strCategory);
                          setCatOpen(false);
                        }}
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

          {/* Ingredient */}
          <div className="flex flex-col items-center sm:items-start relative [font-family:'Poppins',sans-serif]">
            <label className="text-white font-medium mb-1 text-sm">
              Ingredient
            </label>
            <button
              ref={ingBtnRef}
              onClick={() => {
                setIngOpen((s) => !s);
                setCatOpen(false);
                setAreaOpen(false);
              }}
              className={`${pill} flex items-center justify-between`}
              aria-haspopup="true"
              aria-expanded={ingOpen}
            >
              <span className="truncate">
                {selectedIngredient ||
                  (ingredients.length ? "Select Ingredient" : "Loading…")}
              </span>
              <i
                className={`fa-solid fa-chevron-down text-xs ml-2 transition ${
                  ingOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {ingOpen && (
              <div
                ref={ingMenuRef}
                className="absolute left-0 top-full mt-1 w-full sm:w-48 md:w-56 max-h-80 overflow-auto rounded-md bg-white text-black shadow-lg ring-1 ring-black/10 z-50"
              >
                <ul className="py-1">
                  {ingredients.slice(0, 200).map((i) => (
                    <li key={i.idIngredient || i.strIngredient}>
                      <button
                        onClick={() => {
                          onIngredientChange(i.strIngredient);
                          setIngOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-black/5"
                      >
                        {i.strIngredient}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Cuisine Type */}
          <div className="flex flex-col items-center sm:items-start relative [font-family:'Poppins',sans-serif]">
            <label className="text-white font-medium mb-1 text-sm">
              Cuisine Type
            </label>
            <button
              ref={areaBtnRef}
              onClick={() => {
                setAreaOpen((s) => !s);
                setCatOpen(false);
                setIngOpen(false);
              }}
              className={`${pill} flex items-center justify-between`}
              aria-haspopup="true"
              aria-expanded={areaOpen}
            >
              <span className="truncate">
                {selectedArea || (areas.length ? "Select Area" : "Loading…")}
              </span>
              <i
                className={`fa-solid fa-chevron-down text-xs ml-2 transition ${
                  areaOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {areaOpen && (
              <div
                ref={areaMenuRef}
                className="absolute left-0 top-full mt-1 w-full sm:w-48 md:w-56 max-h-64 overflow-auto rounded-md bg-white text-black shadow-lg ring-1 ring-black/10 z-50 [font-family:'Poppins',sans-serif]"
              >
                <ul className="py-1">
                  {areas.map((a) => (
                    <li key={a.strArea}>
                      <button
                        onClick={() => {
                          onAreaChange(a.strArea);
                          setAreaOpen(false);
                        }}
                        className="w-full text-left [font-family:'Poppins',sans-serif] px-3 py-2 hover:bg-black/5"
                      >
                        {a.strArea}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Clear */}
          <div className="flex flex-col items-center sm:items-start [font-family:'Poppins',sans-serif]">
            <label className="invisible mb-1 text-sm">Clear</label>
            <button
              onClick={() => {
                onClear?.();
                setCatOpen(false);
                setIngOpen(false);
                setAreaOpen(false);
              }}
              className="bg-red-600 text-white [font-family:'Poppins',sans-serif] px-4 py-2 rounded shadow-sm transition duration-200 hover:bg-red-700 hover:shadow-md w-full sm:w-auto"
            >
              <i className="fa-solid fa-eraser mr-2"></i>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
