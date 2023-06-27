import fetchClassicCocktails from "./get_classic_cocktails.js";

window.addEventListener("DOMContentLoaded", function () {
  // Function to create the cocktail cards
  async function showClassicCocktails() {
    try {
      const classicCocktailsArray = await fetchClassicCocktails();
      for (let i = 0; i < 9; i++) {
        // Create the main div element
        const card = document.createElement("div");
        card.classList.add(
          "card",
          "background-secundary-color",
          "shadow-principal-color"
        );

        // Create the h2 element for the "margarita" text
        const heading = document.createElement("h2");
        heading.classList.add("card-text", "white-text");
        heading.textContent = classicCocktailsArray[i].strDrink;

        // Add a click event listener to the card
        card.addEventListener("click", function () {
          // Store the cocktail details in sessionStorage
          sessionStorage.setItem(
            "cocktailDetails",
            JSON.stringify(classicCocktailsArray[i])
          );

          // Redirect to cocktail details screen
          window.location.href = "../pages/cocktail-details.html";
        });

        // Create the container div element
        const container = document.createElement("div");
        container.classList.add("container");

        // Create the div element for the card image
        const cardImage = document.createElement("div");
        cardImage.classList.add("card-image");

        // Create the img element for the cocktail image
        const image = document.createElement("img");
        image.src = classicCocktailsArray[i].strDrinkThumb;
        image.alt = classicCocktailsArray[i].strDrink + " Image";

        // Add the image to the card image element
        cardImage.appendChild(image);

        // Create the div element for the ingredients
        const cocktailIngredientsDiv = document.createElement("div");
        cocktailIngredientsDiv.classList.add("ingredients", "white-text");

        // Create the title element for ingredients
        const ingredientsTitle = document.createElement("h3");
        ingredientsTitle.textContent = "Ingredients:";

        // Create the list element for the ingredients
        const cocktailIngredientsList = document.createElement("ul");

        // Get all the ingredients of the cocktail
        const ingredients = Object.entries(classicCocktailsArray[i])
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
        card.appendChild(heading);
        container.appendChild(cardImage);
        container.appendChild(cocktailIngredientsDiv);
        card.appendChild(container);

        // Add the card to the HTML document
        document.querySelector("#card").appendChild(card);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Call the showClassicCocktails function
  showClassicCocktails();
});
