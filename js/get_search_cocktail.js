async function searchCocktails(query, searchResults) {
  // Clear previous search results
  searchResults.innerHTML = "";

  try {
    // Make a request to the API to get the cocktails
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    const cocktails = data.drinks;

    // Return the search results
    return cocktails;
  } catch (error) {
    throw error;
  }
}

export default searchCocktails;
