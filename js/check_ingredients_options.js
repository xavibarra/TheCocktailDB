import getRandomCocktail from "./get_random_cocktail.js";
import getAllIngredients from "./get_all_ingredients.js";
import { showResults } from "./show_results_select_ingredients.js"; // Importamos la función desde el otro archivo

let cocktailIngredients = [];
let selectedIngredients = [];

async function showRandomCocktail() {
  try {
    // Obtener el cóctel aleatorio
    const cocktail = await getRandomCocktail();

    // Obtener todos los ingredientes del cóctel
    const ingredients = Object.entries(cocktail)
      .filter(([key, value]) => key.startsWith("strIngredient") && value)
      .map(([key, value]) => value);

    // Mostrar los ingredientes por consola (puedes eliminar esta línea si no necesitas el log)
    console.log(ingredients);

    // Mostrar la tarjeta del cóctel aleatorio
    // Crear el elemento div principal
    const card = document.createElement("div");
    card.classList.add(
      "card-exam",
      "background-secundary-color",
      "shadow-principal-color"
    );
    // Crear el elemento h2 para el nombre del cóctel
    const heading = document.createElement("h2");
    heading.classList.add("card-text", "white-text");
    heading.textContent = cocktail.strDrink;
    // Crear el elemento div contenedor
    const container = document.createElement("div");
    container.classList.add("container");

    // Crear el elemento div para la imagen del cóctel
    const cardImage = document.createElement("div");
    cardImage.classList.add("card-image-exam");

    // Crear el elemento img para la imagen del cóctel
    const image = document.createElement("img");
    image.classList.add("cocktail-image-exam");
    image.src = cocktail.strDrinkThumb;
    image.alt = cocktail.strDrink + " Image";

    // Agregar la imagen al elemento de la imagen de la tarjeta
    cardImage.appendChild(image);
    // Agregar los elementos al árbol DOM
    card.appendChild(heading);
    container.appendChild(cardImage);

    card.appendChild(container);

    // Agregar la tarjeta al documento HTML
    document.querySelector("#card").appendChild(card);

    //agregar los ingredientes por si el usuario responde mal
    // Create the list element for the ingredients
    const cocktailIngredientsList = document.createElement("ul");

    // Add each ingredient as a list item
    ingredients.forEach((ingredient) => {
      const ingredientListItem = document.createElement("li");
      ingredientListItem.textContent = ingredient;
      cocktailIngredientsList.appendChild(ingredientListItem);
    });
    const incorrectMessage = document.getElementById(
      "incorrect-ingredients-options"
    );
    incorrectMessage.appendChild(cocktailIngredientsList);

    return ingredients;
  } catch (error) {
    throw error;
  }
}
// Obtener un array con todos los ingredientes y eliminar los que son correctos
async function optionsIngredients() {
  try {
    // Obtener todos los ingredientes y compararlos con los correctos para obtener solo los incorrectos
    const ingredients = await getAllIngredients();
    cocktailIngredients = await showRandomCocktail();
    const incorrectIngredients = ingredients.filter(
      (ingredient) => !cocktailIngredients.includes(ingredient)
    );
    console.log(incorrectIngredients);

    // Calcular cuántos ingredientes incorrectos se necesitan para obtener 25 ingredientes
    const numberOfWrongIngredients = 25 - cocktailIngredients.length;

    // Obtener este número de ingredientes incorrectos
    let wrongIngredientsOptions = [];
    let indexUsed = [];
    while (wrongIngredientsOptions.length < numberOfWrongIngredients) {
      const randomIndex = Math.floor(
        Math.random() * incorrectIngredients.length
      );
      if (!indexUsed.includes(randomIndex)) {
        indexUsed.push(randomIndex);
        wrongIngredientsOptions.push(incorrectIngredients[randomIndex]);
      }
    }
    console.log(wrongIngredientsOptions);

    // Concatenar los ingredientes correctos con los incorrectos
    const ingredientsOptions =
      wrongIngredientsOptions.concat(cocktailIngredients);
    console.log(ingredientsOptions);

    // Barajar la lista de ingredientes usando el algoritmo Fisher-Yates
    for (let i = ingredientsOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ingredientsOptions[i], ingredientsOptions[j]] = [
        ingredientsOptions[j],
        ingredientsOptions[i],
      ];
    }

    console.log("Final Ingredients List (Shuffled):", ingredientsOptions);

    return ingredientsOptions;
  } catch (error) {
    throw error;
  }
}

// Function to display ingredients in paragraphs inside div elements
async function showIngredients(ingredientsArray) {
  // Get the div container element where ingredients will be displayed
  const ingredientsDiv = document.querySelector("#ingredients-options");

  // Clear the previous content of the div (if any)
  ingredientsDiv.innerHTML = "";

  // Create a div for each ingredient and add the paragraph inside the div
  ingredientsArray.forEach((ingredient) => {
    // Create a new div element for each ingredient

    // Create a paragraph element for the ingredient's name
    const h3 = document.createElement("h3");
    h3.classList.add("background-principal-color", "ingredient-option");
    h3.textContent = ingredient;

    // Assign the name of the ingredient as a value to the 'data-name' attribute of the <h3>
    h3.setAttribute("data-name", ingredient);
    h3.addEventListener("click", toggleIngredientSelection);

    // Add the div to the main container
    ingredientsDiv.appendChild(h3);
  });
}

function toggleIngredientSelection(event) {
  const clickedH3 = event.target;
  const ingredientName = clickedH3.getAttribute("data-name");

  if (selectedIngredients.includes(ingredientName)) {
    // If the ingredient was already selected, remove it from the array
    selectedIngredients = selectedIngredients.filter(
      (ingredient) => ingredient !== ingredientName
    );
    // Deactivate the border color
    clickedH3.style.borderColor = "transparent";
  } else {
    // If the ingredient was not selected, add it to the array
    selectedIngredients.push(ingredientName);
    // Activate the border color
    clickedH3.style.borderColor = "var(--secundary-color)";
  }

  console.log("Selected Ingredients:", selectedIngredients);
}

function compareIngredients(selectedIngredients, cocktailIngredients) {
  console.log(selectedIngredients);
  console.log(cocktailIngredients);
  if (selectedIngredients.length !== cocktailIngredients.length) {
    return false;
  }

  const selectedSet = new Set(selectedIngredients);
  for (const ingredient of cocktailIngredients) {
    if (!selectedSet.has(ingredient)) {
      return false;
    }
  }

  return true;
}

// Función para limpiar el HTML
function clearHTML() {
  // Eliminar la tarjeta del cóctel aleatorio
  const cardElement = document.querySelector("#card");
  cardElement.innerHTML = "";

  // Eliminar la lista de ingredientes
  const ingredientsOptionsDiv = document.querySelector("#ingredients-options");
  ingredientsOptionsDiv.innerHTML = "";

  // Reiniciar las variables almacenadas
  cocktailIngredients = [];
  selectedIngredients = [];
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const ingredientsOptions = await optionsIngredients();
    await showIngredients(ingredientsOptions);

    const submitButton = document.getElementById("submit-ingredients-options");
    const nextButton = document.getElementById("next-cocktail");

    submitButton.addEventListener("click", () => {
      // Obtener los nombres de los ingredientes seleccionados
      const selectedIngredientsArray = selectedIngredients;
      // Llamar a compareIngredients aquí
      const result = compareIngredients(
        selectedIngredientsArray,
        cocktailIngredients
      );
      console.log("¿Los ingredientes coinciden?", result);
      // Llamar a la función importada para utilizar el resultado (result)
      showResults(result);

      // Limpiar el HTML después de mostrar el resultado
      clearHTML();

      // Mostrar el botón "Next" y ocultar el botón "Submit"
      submitButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
    });
    nextButton.addEventListener("click", async () => {
      // Limpiar el HTML y reiniciar las variables
      clearHTML();
      const correctMessage = document.getElementById(
        "correct-ingredients-options"
      );
      const incorrectMessage = document.getElementById(
        "incorrect-ingredients-options"
      );
      correctMessage.classList.add("hidden");
      incorrectMessage.classList.add("hidden");

      // Ocultar el botón "Next" y mostrar el botón "Submit"
      nextButton.classList.add("hidden");
      submitButton.classList.remove("hidden");

      // Cargar una nueva bebida
      const ingredientsOptions = await optionsIngredients();
      await showIngredients(ingredientsOptions);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
