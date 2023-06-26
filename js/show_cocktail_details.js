// Get the JSON object from sessionStorage
const jsonCocktail = sessionStorage.getItem("cocktailDetails");

// Check if the JSON object was found in sessionStorage
if (jsonCocktail) {
  // Convert the JSON object to a JavaScript object
  const cocktail = JSON.parse(jsonCocktail);

  // Access the cocktail name and assign it to the element with the ID "cocktail-name"
  const cocktailNameElement = document.getElementById("cocktail-name");
  cocktailNameElement.textContent = cocktail.strDrink;
} else {
  console.log("No JSON object found in sessionStorage");
}
