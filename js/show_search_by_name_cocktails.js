import searchCocktails from "./get_search_cocktail.js";
import { checkLike, toggleFavorite } from "./check_like.js";

// Get references to DOM elements
const searchInput = document.querySelector("#searchCocktail");
const searchResults = document.querySelector("#card");

// Variable to store the search timer
let searchTimer = null;
async function performSearch(query) {
  try {
    // Clear previous search results
    searchResults.innerHTML = "";

    // Perform the search for cocktails
    const cocktails = await searchCocktails(query, searchResults);

    // Show results
    if (cocktails && cocktails.length > 0) {
      cocktails.forEach((cocktail) => {
        const card = document.createElement("div");
        card.classList.add(
          "card",
          "background-secundary-color",
          "shadow-principal-color"
        );

        const heading = document.createElement("h2");
        heading.classList.add("card-text", "white-text");
        heading.textContent = cocktail.strDrink;

        card.addEventListener("click", function () {
          sessionStorage.setItem("cocktailDetails", JSON.stringify(cocktail));
          window.location.href = "../pages/cocktail-details.html";
        });

        const container = document.createElement("div");
        container.classList.add("container");

        const cardImage = document.createElement("div");
        cardImage.classList.add("card-image");

        const image = document.createElement("img");
        image.classList.add("cocktail-image");
        image.src = cocktail.strDrinkThumb;
        image.alt = cocktail.strDrink + " Image";

        cardImage.appendChild(image);

        const cocktailIngredientsDiv = document.createElement("div");
        cocktailIngredientsDiv.classList.add("ingredients", "white-text");

        const ingredientsTitle = document.createElement("h3");
        ingredientsTitle.textContent = "Ingredients:";

        const cocktailIngredientsList = document.createElement("ul");

        const ingredients = Object.entries(cocktail)
          .filter(([key, value]) => key.startsWith("strIngredient") && value)
          .map(([key, value]) => value);

        ingredients.forEach((ingredient) => {
          const ingredientListItem = document.createElement("li");
          ingredientListItem.textContent = ingredient;
          cocktailIngredientsList.appendChild(ingredientListItem);
        });

        cocktailIngredientsDiv.appendChild(ingredientsTitle);
        cocktailIngredientsDiv.appendChild(cocktailIngredientsList);

        // Create like image
        const like = document.createElement("img");
        like.src = checkLike(cocktail);
        like.alt = "like image";
        like.classList.add("like-image");

        // Set the cocktail object as a custom attribute
        like.setAttribute("data-cocktail", JSON.stringify(cocktail));
        //Click like
        like.addEventListener("click", function (event) {
          //Do not send to cocktail-details when clicking on the like
          event.stopPropagation();
          const cocktailDetails = JSON.parse(
            this.getAttribute("data-cocktail")
          );
          toggleFavorite(cocktailDetails);

          // Update the like image
          this.src = checkLike(cocktailDetails);
        });

        card.appendChild(heading);
        container.appendChild(cardImage);
        container.appendChild(cocktailIngredientsDiv);
        card.appendChild(container);
        card.appendChild(like);

        document.querySelector("#card").appendChild(card);
      });
    } else {
      searchResults.textContent = "No cocktails found";
    }
  } catch (error) {
    console.error("Error performing search:", error);
    searchResults.textContent =
      "An error occurred while searching for cocktails";
  }
}

// Add an event listener to the search input
searchInput.addEventListener("input", (event) => {
  // Cancel the previous timer if it exists
  clearTimeout(searchTimer);

  // Get the search input value
  const query = event.target.value.trim();

  if (query !== "") {
    // Set a new timer to perform the search after 500ms
    searchTimer = setTimeout(() => {
      performSearch(query);
    }, 500);
  } else {
    // Clear the search results if there is no query
    searchResults.innerHTML = "";
  }
});
