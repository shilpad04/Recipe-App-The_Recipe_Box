import { useEffect, useState } from "react";
import { searchMealsByName } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

function Home() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    searchMealsByName("a").then((res) => {
      const allMeals = res.data.meals || [];
      setMeals(allMeals.slice(0, 6)); 
    });
  }, []);

  return (
    <div className="flex flex-col items-center text-center ">
      {/* Hero */}
      <div className="w-full min-h-[360px] bg-black bg-[url('/background.png')] bg-top bg-no-repeat bg-cover flex items-center justify-center py-20">
        <div className="bg-black/60 p-10 rounded-xl text-white max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-4 [font-family:'Poppins',sans-serif]">
            Welcome to The Recipe Box
          </h1>
          <p className="text-lg mb-8 [font-family:'Roboto',sans-serif]">
            Browse, search, filter and save your favourite meals 🍲
          </p>

          <div className="space-y-4 text-zinc-100">
            <h2 className="text-2xl font-bold text-red-400 [font-family:'Poppins',sans-serif]">
              The Recipe Box
            </h2>
            <p className="[font-family:'Roboto',sans-serif] italic">
              Your personal digital recipe collection. Discover new meals, save
              your favourites, and explore cuisines from around the world — all
              in one place.
            </p>

            <ul className="list-disc list-inside space-y-2 [font-family:'Roboto',sans-serif] text-left mx-auto max-w-2xl ">
              <li>
                <span className="font-semibold">Search:</span> Find recipes easily by typing the name of a dish.
              </li>
              <li>
                <span className="font-semibold">Filter:</span> Discover meals by choosing a category, ingredient, or cuisine type.
              </li>
              <li>
                <span className="font-semibold">Favourites:</span> Mark dishes you love and keep them saved in your personal recipe box.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="w-full bg-black text-center text-white py-12 px-6 [font-family:'Roboto',sans-serif]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 [font-family:'Poppins',sans-serif]">
            Featured Recipes
          </h2>
          {meals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <RecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          ) : (
            <p className="text-gray-300 [font-family:'Roboto',sans-serif]">Loading recipes...</p>
          )}

          <div className="mt-8">
            <Link
              to="/recipes"
              className="bg-red-600 hover:bg-red-700 text-white [font-family:'Roboto',sans-serif] px-6 py-3 rounded shadow-sm hover:shadow-md transition "
            >
              Browse More Recipes →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
