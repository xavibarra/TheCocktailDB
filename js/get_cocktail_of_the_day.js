export async function obtenerCocktailAleatorio() {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    return data.drinks[0];
  } catch (error) {
    throw new Error("Error al obtener el cóctel aleatorio");
  }
}
