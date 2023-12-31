import searchCocktailsIngredient from "./get_search_by_ingredient.js";
import { checkLike, toggleFavorite } from "./check_like.js";

//Get references to DOM elements
const searchInput = document.querySelector("#searchIngredient");
const searchResults = document.querySelector("#card");
const searchButton = document.querySelector("#buttonSearchIngredient");

async function performSearch(query) {
  try {
    // Clear previous search results
    searchResults.innerHTML = "";

    const cocktails = await searchCocktailsIngredient(query, searchResults);
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

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    performSearch(query);
  } else {
    // cleaning results
    searchResults.innerHTML = "";
  }
});
searchInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const query = searchInput.value.trim();
    if (query !== "") {
      performSearch(query);
    } else {
      // cleaning results
      searchResults.innerHTML = "";
    }
  }
});
