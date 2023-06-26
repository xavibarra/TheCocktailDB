let classicCocktailsArray = [];
const classicId = [
  11728, 11007, 11000, 11006, 11003, 11008, 17207, 17196, 11113,
];
// Function to fetch a cocktail by id
async function get_cocktail_by_id(id) {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    const newCocktail = data.drinks[0];
    classicCocktailsArray.push(newCocktail);
  } catch (error) {
    throw new Error("Error getting cocktail by id");
  }
}

// Function to fetch all classic cocktails
async function fetchClassicCocktails() {
  try {
    for (let i = 0; i < classicId.length; i++) {
      await get_cocktail_by_id(classicId[i]);
    }
    return classicCocktailsArray;
  } catch (error) {
    console.log(error);
  }
}

export default fetchClassicCocktails;
