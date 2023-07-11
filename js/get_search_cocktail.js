function searchCocktails(query, searchResults) {
  return new Promise((resolve, reject) => {
    // Clear previous search results
    searchResults.innerHTML = "";

    // Make a request to the API to get the cocktails
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`)
      .then((response) => response.json())
      .then((data) => {
        const cocktails = data.drinks;
        // Return the search results
        resolve(cocktails);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default searchCocktails;
