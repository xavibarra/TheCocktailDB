export default async function getAllIngredients() {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    );
    const data = await response.json();
    const allIngredients = data.drinks.map((drink) => drink.strIngredient1);
    console.log(allIngredients);
  } catch (error) {
    throw error;
  }
}
