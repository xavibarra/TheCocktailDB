export default class SearchCocktails {
  constructor(query, searchResults) {
    this.query = query;
    this.searchResults = searchResults;
  }

  async search() {
    // Limpia los resultados de búsqueda anteriores
    this.searchResults.innerHTML = "";

    // Realiza una solicitud a la API para obtener los cocktails
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.query}`
    );
    const data = await response.json();
    const cocktails = data.drinks;

    // Devuelve los resultados de búsqueda
    return cocktails;
  }
}
