import searchCocktails from "./get_search_cocktail.js";

// Get references to DOM elements
const searchInput = document.querySelector("#searchCocktail");
const searchResults = document.querySelector("#search-results");

// Variable to store the search timer
let searchTimer = null;

// Function to perform the search after a short delay
function performSearch(query) {
  // Clear previous search results
  searchResults.innerHTML = "";

  // Perform the search for cocktails
  searchCocktails(query, searchResults)
    .then((cocktails) => {
      // Display the results in <p> tags
      if (cocktails && cocktails.length > 0) {
        cocktails.forEach((cocktail) => {
          const cocktailParagraph = document.createElement("p");
          cocktailParagraph.textContent = cocktail.strDrink;
          searchResults.appendChild(cocktailParagraph);
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
