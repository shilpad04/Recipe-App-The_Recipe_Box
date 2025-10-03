import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMealById } from "../api/mealApi";
import { useFavourites } from "../context/FavouritesContext";

function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const { isFavourite, toggleFavourite } = useFavourites();

  useEffect(() => {
    getMealById(id).then((res) => setMeal(res.data.meals?.[0] || null));
  }, [id]);

  const ingredients = useMemo(() => {
    if (!meal) return [];
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const mea = meal[`strMeasure${i}`];
      if (ing && ing.trim()) list.push(`${ing}${mea ? ` - ${mea}` : ""}`);
    }
    return list;
  }, [meal]);

  if (!meal)
    return (
      <div className="min-h-[calc(100vh-56px)] bg-gradient-to-r from-black via-neutral-900 to-zinc-900 text-white p-6 flex items-center justify-center">
        Loading...
      </div>
    );

  const fav = isFavourite(meal.idMeal);
  const videoId = meal.strYoutube ? meal.strYoutube.split("v=")[1] : null;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-r from-black via-neutral-900 to-zinc-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="flex items-center gap-3">
          <Link to="/recipes" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded [font-family:'Poppins',sans-serif]">
            <i className="fa-solid fa-arrow-left mr-2" />
            Back
          </Link>
          <button
            onClick={() => toggleFavourite(meal)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white [font-family:'Poppins',sans-serif] px-4 py-2 rounded"
          >
            {fav ? (
              <>
                <i className="fa-solid fa-star mr-2" /> Remove Favourite
              </>
            ) : (
              <>
                <i className="fa-regular fa-star mr-2" /> Add Favourite
              </>
            )}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full max-w-md rounded-lg shadow-lg mx-auto"
          />

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-2 [font-family:'Poppins',sans-serif]">{meal.strMeal}</h1>
            <p className="mb-4 [font-family:'Roboto',sans-serif]">
              Category: {meal.strCategory} {meal.strArea ? `• ${meal.strArea}` : ""}
            </p>

            <h2 className="text-xl font-semibold mb-2 [font-family:'Poppins',sans-serif]">Ingredients</h2>
            <ul className="list-disc list-inside mb-4 text-zinc-200 text-left mx-auto max-w-xl [font-family:'Roboto',sans-serif]">
              {ingredients.map((x, idx) => (
                <li key={idx}>{x}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-2 [font-family:'Poppins',sans-serif]">Instructions</h2>
            <p className="mb-4 whitespace-pre-line text-zinc-200 text-left mx-auto max-w-2xl [font-family:'Roboto',sans-serif]">
              {meal.strInstructions}
            </p>
          </div>
        </div>

        {videoId && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center [font-family:'Poppins',sans-serif]">🎬 Recipe Video</h2>
            <div className="relative w-full max-w-3xl mx-auto">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Recipe Video"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
