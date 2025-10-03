import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

function RecipeCard({ meal }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const fav = isFavourite(meal.idMeal);

  const buttonBase =
    "px-4 py-2 rounded shadow-sm transition duration-200 flex items-center justify-center gap-2";

  return (
    <div className="bg-neutral-900 rounded-lg shadow-md overflow-hidden text-center transform transition duration-300 hover:scale-105 hover:shadow-xl hover:border hover:border-red-500">
      {/* Clickable content (image + title + category) */}
      <Link to={`/recipe/${meal.idMeal}`} className="block">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 leading-tight line-clamp-2">
            {meal.strMeal}
          </h2>
          <p className="text-gray-300">{meal.strCategory || "—"}</p>
        </div>
      </Link>

      {/* Action buttons (not inside the link) */}
      <div className="flex items-center justify-center gap-3 p-4 pt-0">
        {/* View Details */}
        <Link
          to={`/recipe/${meal.idMeal}`}
          className={`${buttonBase} bg-red-600 hover:bg-red-700 text-white`}
        >
          <i className="fa-solid fa-circle-info" />
          View Details
        </Link>

        {/* Favourites */}
        <button
          title={fav ? "Remove from favourites" : "Add to favourites"}
          onClick={() => toggleFavourite(meal)}
          className={
            fav
              ? `${buttonBase} bg-yellow-500 text-black hover:bg-yellow-400`
              : `${buttonBase} bg-neutral-800 text-white border border-neutral-600 hover:bg-neutral-700`
          }
        >
          {fav ? (
            <>
              <i className="fa-solid fa-star" />
              Favourited
            </>
          ) : (
            <>
              <i className="fa-regular fa-star" />
              Add Favourite
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
