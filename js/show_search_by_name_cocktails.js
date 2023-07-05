import SearchCocktails from "./get_search_cocktail.js";

const searchInput = document.getElementById("searchCocktail");
const searchResults = document.getElementById("searchResults");

const search = new SearchCocktails(searchInput.value, searchResults);

// Evento de cambio en el campo de entrada de texto
const classicCocktailsArray = await SearchCocktails();
searchInput.addEventListener("input", async (event) => {
  search.query = event.target.value;
  const cocktails = await search.search();

  // Limpia los resultados de búsqueda anteriores
  searchResults.innerHTML = "";

  // Muestra los resultados de búsqueda
  if (cocktails) {
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
  } else {
    const li = document.createElement("li");
    li.textContent = "No se encontraron resultados";
    searchResults.appendChild(li);
  }
});
