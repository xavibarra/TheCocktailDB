async function getCocktailsCategories(category) {
  try {
    // Make a request to the API to get the cocktails by category
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();
    // console.log(data);
    const cocktails = data.drinks;
    const cocktailIds = cocktails.map((cocktail) => cocktail.idDrink);

    // Fetching github pages JSON file
    const localResponse = await fetch(
      "https://xavibarra.github.io/custom-api-cocktaildb/cocktails.json"
    );
    const localData = await localResponse.json();

    const localCocktails = localData.drinks;

    // Search for cocktails in the local JSON file using the IDs
    const foundCocktails = localCocktails.filter((cocktail) =>
      cocktailIds.includes(cocktail.idDrink)
    );

    // Return the search results
    return foundCocktails;
  } catch (error) {
    throw error;
  }
}

export default getCocktailsCategories;
