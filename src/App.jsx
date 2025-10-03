import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import { useFavourites } from "./context/FavouritesContext";
import RecipeCard from "./components/RecipeCard";

function FavouritesPage() {
  const { allFavourites, clearFavourites } = useFavourites();
  return (
    <div className="min-h-[calc(100vh-56px)] bg-neutral-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold [font-family:'Poppins',sans-serif]">Your Favourites</h1>
        {allFavourites.length > 0 && (
          <button
            onClick={clearFavourites}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-sm hover:shadow-md transition [font-family:'Poppins',sans-serif]"
          >
            <i className="fa-solid fa-trash-can mr-2" />
            Clear All
          </button>
        )}
      </div>

      {allFavourites.length ? (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFavourites.map((m) => (
            <RecipeCard key={m.idMeal} meal={m} />
          ))}
        </div>
      ) : (
        <p className="text-zinc-300 text-center [font-family:'Roboto',sans-serif]">No favourites yet. Go add some!</p>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="overflow-x-hidden bg-black">
      <Navbar />
      
      <div className="h-14 sm:h-16" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </div>
  );
}
export default App;
