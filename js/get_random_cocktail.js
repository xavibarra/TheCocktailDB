export default async function getRandomCocktail() {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const randomCocktail = data.drinks[0];
    return randomCocktail;
  } catch (error) {
    throw error;
  }
}
