# 🍽️ Recipe App

A dynamic React application to browse, search, filter, and (optionally) favorite recipes using [TheMealDB](https://www.themealdb.com/api.php).  
Built with **React**, **TailwindCSS**, and **Axios/Fetch** for a responsive UI and smooth user experience.

---

## ✨ Features

- **Recipe Listings**
  - Display recipes fetched from a public meals API.
  - Show key details: **name**, **thumbnail image**, and **category**.
  - Each recipe card is clickable to view complete details.

- **Search & Filter**
  - Search recipes by **name or keyword**.
  - Filter recipes by:
    - **Category**
    - **Ingredient**
    - **Area/Meal type**
  - Search and filters work together for refined results.

- **Recipe Details**
  - Show full recipe details:
    - Instructions
    - Ingredients + measures
    - Category & Area
    - YouTube video (if available)
  - Easy navigation back to the main list.

- **Favorites**
  - Mark/unmark recipes as favorites.
  - Favorites persist using **localStorage**.

- **Responsive UI**
  - Mobile-first layout with TailwindCSS.
  - Sticky **Navbar** and **FilterBar** for quick access.

---

## 🧰 Tech Stack

- **React JS**
- **TailwindCSS**
- **Axios / Fetch API**
- **React Router** for navigation

---

## 🔌 Public API (TheMealDB)

Base URL: https://www.themealdb.com/api/json/v1/1/

Common Endpoints:
- Search by name → `search.php?s=<query>`  
- Lookup by ID → `lookup.php?i=<mealId>`  
- Filter by category → `filter.php?c=<CategoryName>`  
- Filter by ingredient → `filter.php?i=<IngredientName>`  
- Filter by area → `filter.php?a=<AreaName>`  
- List categories → `list.php?c=list`  
- List ingredients → `list.php?i=list`  
- List areas → `list.php?a=list` 

---

## 🗂️ Project Structure

recipe-app  
  public  
    background.png  
  src  
    api 
      mealApi.js
    components  
      FilterBar.jsx  
      Navbar.jsx  
      RecipeCard.jsx  
      SearchBar.jsx  
    context  
      FavouritesContext.jsx  
    hooks  
      useLocalStorage.js  
    pages  
      Home.jsx  
      RecipeDetails.jsx  
      Recipes.jsx  
    App.css  
    App.jsx  
    index.css  
    main.jsx  
  .gitignore  
  eslint.config.js  
  index.html  
  package-lock.json  
  package.json  
  README.md  

---

## 📦 Installation & Setup

1. **Clone the Repository**
```
   git clone https://github.com/shilpad04/Recipe-App-The_Recipe_Box.git
   cd Recipe-App-The_Recipe_Box
   npm install
```

2. **Run Development**
```
   npm run dev 
   npm start
```

3.**Build Production**
```
  npm run build
```

## 🧯 Error Handling

- Shows user-friendly messages when:

    - API/network fails.

    - No recipes are found for the given search/filter.
    
   
   
