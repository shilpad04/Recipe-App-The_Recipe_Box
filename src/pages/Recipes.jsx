import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  searchMealsByName,
  getCategories,
  getIngredients,
  getAreas,
  filterByCategory,
  filterByIngredient,
  filterByArea,
} from "../api/mealApi";
import FilterBar from "../components/FilterBar";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);

  const [cat, setCat] = useState(params.get("cat") || "");
  const [ing, setIng] = useState(params.get("ing") || "");
  const [area, setArea] = useState(params.get("area") || "");

  useEffect(() => {
    getCategories().then((r) => setCategories(r.data.meals || []));
    getIngredients().then((r) => setIngredients(r.data.meals || []));
    getAreas().then((r) => setAreas(r.data.meals || []));
  }, []);

  useEffect(() => {
    const q = params.get("q");
    const catParam = params.get("cat");
    const ingParam = params.get("ing");
    const areaParam = params.get("area");

    if (catParam) {
      setCat(catParam);
      filterByCategory(catParam).then((r) => setMeals(r.data.meals || []));
      return;
    }
    if (ingParam) {
      setIng(ingParam);
      filterByIngredient(ingParam).then((r) => setMeals(r.data.meals || []));
      return;
    }
    if (areaParam) {
      setArea(areaParam);
      filterByArea(areaParam).then((r) => setMeals(r.data.meals || []));
      return;
    }
    if (q) {
      searchMealsByName(q).then((r) => setMeals(r.data.meals || []));
      return;
    }
    searchMealsByName("").then((r) => setMeals(r.data.meals || []));
  }, [params]);

  function onCategoryChange(value) {
    setCat(value);
    if (value)
      filterByCategory(value).then((r) => setMeals(r.data.meals || []));
    else searchMealsByName("").then((r) => setMeals(r.data.meals || []));
  }

  function onIngredientChange(value) {
    setIng(value);
    if (value)
      filterByIngredient(value).then((r) => setMeals(r.data.meals || []));
    else searchMealsByName("").then((r) => setMeals(r.data.meals || []));
  }

  function onAreaChange(value) {
    setArea(value);
    if (value) filterByArea(value).then((r) => setMeals(r.data.meals || []));
    else searchMealsByName("").then((r) => setMeals(r.data.meals || []));
  }

  function onClear() {
    setCat("");
    setIng("");
    setArea("");
    searchMealsByName("").then((r) => setMeals(r.data.meals || []));
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-neutral-900 to-zinc-900 text-white">
      <FilterBar
        categories={categories}
        ingredients={ingredients}
        areas={areas}
        selectedCategory={cat}
        selectedIngredient={ing}
        selectedArea={area}
        onCategoryChange={onCategoryChange}
        onIngredientChange={onIngredientChange}
        onAreaChange={onAreaChange}
        onClear={onClear}
      />

      <div className="p-6 flex flex-col items-center">
        {meals?.length ? (
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {meals.map((m) => (
              <RecipeCard key={m.idMeal} meal={m} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-300 text-center [font-family:'Roboto',sans-serif]">
            No recipes found. Try different filters.
          </p>
        )}
      </div>
    </div>
  );
}

export default Recipes;
