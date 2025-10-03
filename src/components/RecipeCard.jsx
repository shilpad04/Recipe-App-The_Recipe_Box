import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

function RecipeCard({ meal }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const fav = isFavourite(meal.idMeal);

  return (
    <div className="bg-neutral-900 rounded-lg shadow-md overflow-hidden text-center transform transition duration-300 hover:scale-105 hover:shadow-xl hover:border hover:border-red-500">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 leading-tight line-clamp-2 [font-family:'Poppins',sans-serif]">
          {meal.strMeal}
        </h2>
        <p className="text-gray-300">{meal.strCategory || "—"}</p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <Link
            to={`/recipe/${meal.idMeal}`}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded [font-family:'Poppins',sans-serif]"
          >
            View Details
          </Link>

          <button
            title={fav ? "Remove from favourites" : "Add to favourites"}
            onClick={() => toggleFavourite(meal)}
            className={`px-4 py-2 rounded border [font-family:'Poppins',sans-serif] transition-colors duration-200 ${
              fav
                ? "bg-yellow-500 text-black border-yellow-500 hover:bg-yellow-400"
                : "bg-neutral-800 text-white border-neutral-600 hover:bg-neutral-700"
            }`}
          >
            {fav ? (
              <>
                <i className="fa-solid fa-star mr-2" />
                Favourited
              </>
            ) : (
              <>
                <i className="fa-regular fa-star mr-2" />
                Add Favourite
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
