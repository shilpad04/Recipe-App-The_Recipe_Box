import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavouritesContext = createContext();

function FavouritesProvider({ children }) {
  // favorites as { [idMeal]: mealObject }
  const [favs, setFavs] = useLocalStorage("favourite_meals", {});

  function toggleFavourite(meal) {
    setFavs((prev) => {
      const next = { ...prev };
      if (next[meal.idMeal]) {
        delete next[meal.idMeal];
      } else {
        next[meal.idMeal] = {
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strCategory: meal.strCategory || "",
        };
      }
      return next;
    });
  }

  const value = useMemo(
    () => ({
      favs,
      isFavourite: (id) => Boolean(favs[id]),
      toggleFavourite,
      allFavourites: Object.values(favs),
      clearFavourites: () => setFavs({}),
    }),
    [favs, setFavs]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}

export default FavouritesProvider;
