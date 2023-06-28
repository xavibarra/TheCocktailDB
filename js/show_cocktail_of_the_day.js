import { obtenerCocktailDelDia } from "./get_cocktail_of_the_day.js";

async function usarCocktail() {
  try {
    const cocktail = await obtenerCocktailDelDia();

    const cardWhiteElement = document.querySelector(".cardWhite");
    // cardWhiteElement.innerHTML = "";

    // Create the main section element
    const cardWhite = document.createElement("section");
    cardWhite.classList.add(
      "card",
      "background-white",
      "shadow-secundary-color"
    );

    // Create the heading element for the cocktail name
    const cocktailHeading = document.createElement("h2");
    cocktailHeading.classList.add("card-text");
    cocktailHeading.textContent = cocktail.strDrink;

    // Add a click event listener to the card
    cardWhite.addEventListener("click", function () {
      // Store the cocktail details in sessionStorage
      sessionStorage.setItem("cocktailDetails", JSON.stringify(cocktail));

      // Redirect to cocktail details screen
      window.location.href = "../pages/cocktail-details.html";
    });

    // Create the div element for the container
    const containerWhite = document.createElement("div");
    containerWhite.classList.add("container");

    // Create the figure element for the card image
    const cardImageWhite = document.createElement("figure");
    cardImageWhite.classList.add("card-image");

    // Create the img element for the cocktail image
    const cocktailImageElement = document.createElement("img");
    cocktailImageElement.src = cocktail.strDrinkThumb;
    cocktailImageElement.alt = cocktail.strDrink + " Image";

    // Add the image to the card figure
    cardImageWhite.appendChild(cocktailImageElement);

    // Create the div element for the ingredients
    const cocktailIngredientsDiv = document.createElement("div");
    cocktailIngredientsDiv.classList.add("ingredients");

    //Create the title element for ingredients
    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.textContent = "Ingredients:";

    // Create the list element for the ingredients
    const cocktailIngredientsList = document.createElement("ul");

    // Get all the ingredients of the cocktail
    const ingredients = Object.entries(cocktail)
      .filter(([key, value]) => key.startsWith("strIngredient") && value)
      .map(([key, value]) => value);

    // Add each ingredient as a list item
    ingredients.forEach((ingredient) => {
      const ingredientListItem = document.createElement("li");
      ingredientListItem.textContent = ingredient;
      cocktailIngredientsList.appendChild(ingredientListItem);
    });

    // Add the title and ingredients list to the ingredients div element
    cocktailIngredientsDiv.appendChild(ingredientsTitle);
    cocktailIngredientsDiv.appendChild(cocktailIngredientsList);

    // Add the elements to the DOM tree
    cardWhite.appendChild(cocktailHeading);
    containerWhite.appendChild(cardImageWhite);
    containerWhite.appendChild(cocktailIngredientsDiv);
    cardWhite.appendChild(containerWhite);

    // Add the updated card to the HTML document
    cardWhiteElement.appendChild(cardWhite);
  } catch (error) {
    console.error(error.message);
  }
}

usarCocktail();