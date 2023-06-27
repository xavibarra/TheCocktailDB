let classicCocktailsArray = [];

// Function to fetch all classic cocktails from the JSON file
async function fetchClassicCocktails() {
  try {
    const response = await fetch(
      //path to json file hosted on github pages
      "https://xavibarra.github.io/custom-api-cocktaildb/classic_cocktails.json"
    );
    const data = await response.json();
    classicCocktailsArray = data.drinks;
    return classicCocktailsArray;
  } catch (error) {
    console.log(error);
  }
}

export default fetchClassicCocktails;
