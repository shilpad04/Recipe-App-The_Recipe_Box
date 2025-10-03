import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export const searchMealsByName = (name = "") =>
  axios.get(`${BASE_URL}search.php?s=${encodeURIComponent(name)}`);

export const getMealById = (id) =>
  axios.get(`${BASE_URL}lookup.php?i=${id}`);

export const getCategories = () =>
  axios.get(`${BASE_URL}list.php?c=list`);

export const getIngredients = () =>
  axios.get(`${BASE_URL}list.php?i=list`);

export const getAreas = () =>
  axios.get(`${BASE_URL}list.php?a=list`);

export const filterByCategory = (category) =>
  axios.get(`${BASE_URL}filter.php?c=${encodeURIComponent(category)}`);

export const filterByIngredient = (ingredient) =>
  axios.get(`${BASE_URL}filter.php?i=${encodeURIComponent(ingredient)}`);

export const filterByArea = (area) =>
  axios.get(`${BASE_URL}filter.php?a=${encodeURIComponent(area)}`);

export const getRandomMeal = () =>
  axios.get(`${BASE_URL}random.php`);

export default searchMealsByName;
