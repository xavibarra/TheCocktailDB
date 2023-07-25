//Function to get 5 random cocktails id
export default async function getFiveIdRandom() {
  try {
    const idArray = [];
    for (let i = 0; i < 5; i++) {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      const randomCocktail = data.drinks[0];
      const id = data.drinks[0].idDrink;
      idArray.push(id);
    }
    return idArray;
  } catch (error) {
    throw error;
  }
}
