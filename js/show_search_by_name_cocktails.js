import searchCocktails from "./get_search_cocktail.js";

// Get references to DOM elements
const searchInput = document.querySelector("#searchCocktail");
const searchResults = document.querySelector("#card");

// Variable to store the search timer
let searchTimer = null;

// Function to perform the search after a short delay
function performSearch(query) {
  // Clear previous search results
  searchResults.innerHTML = "";

  // Perform the search for cocktails
  searchCocktails(query, searchResults)
    .then((cocktails) => {
      // show results
      if (cocktails && cocktails.length > 0) {
        cocktails.forEach((cocktail) => {
          // Create the main div element
          const card = document.createElement("div");
          card.classList.add(
            "card",
            "background-secundary-color",
            "shadow-principal-color"
          );

          // Create the h2 element for the cocktail name
          const heading = document.createElement("h2");
          heading.classList.add("card-text", "white-text");
          heading.textContent = cocktail.strDrink;

          // Add a click event listener to the card
          card.addEventListener("click", function () {
            // Store the cocktail details in sessionStorage
            sessionStorage.setItem("cocktailDetails", JSON.stringify(cocktail));

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
          image.src = cocktail.strDrinkThumb;
          image.alt = cocktail.strDrink + " Image";

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
          card.appendChild(heading);
          container.appendChild(cardImage);
          container.appendChild(cocktailIngredientsDiv);
          card.appendChild(container);

          // Add the card to the HTML document
          document.querySelector("#card").appendChild(card);
        });
      } else {
        searchResults.textContent = "No cocktails found";
      }
    })
    .catch((error) => {
      console.error("Error performing search:", error);
      searchResults.textContent =
        "An error occurred while searching for cocktails";
    });
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
