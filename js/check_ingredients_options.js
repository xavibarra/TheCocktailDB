import getRandomCocktail from "./get_random_cocktail.js";
import getAllIngredients from "./get_all_ingredients.js";
import { showResults } from "./show_results_select_ingredients.js";

let cocktailIngredients = [];
let selectedIngredients = [];

async function showRandomCocktail() {
  try {
    // Get a random cocktail
    const cocktail = await getRandomCocktail();

    // Get all ingredients of the cocktail
    const ingredients = Object.entries(cocktail)
      .filter(([key, value]) => key.startsWith("strIngredient") && value)
      .map(([key, value]) => value);

    // Show the random cocktail card
    // Create the main div element
    const card = document.createElement("div");
    card.classList.add(
      "card-exam",
      "background-secundary-color",
      "shadow-principal-color"
    );
    // Create the h2 element for the cocktail name
    const heading = document.createElement("h2");
    heading.classList.add("card-text", "white-text");
    heading.textContent = cocktail.strDrink;
    // Create the container div element
    const container = document.createElement("div");
    container.classList.add("container");

    // Create the div element for the cocktail image
    const cardImage = document.createElement("div");
    cardImage.classList.add("card-image-exam");

    // Create the img element for the cocktail image
    const image = document.createElement("img");
    image.classList.add("cocktail-image-exam");
    image.src = cocktail.strDrinkThumb;
    image.alt = cocktail.strDrink + " Image";

    // Add the image to the card image element
    cardImage.appendChild(image);
    // Add elements to the DOM tree
    card.appendChild(heading);
    container.appendChild(cardImage);

    card.appendChild(container);

    // Add the card to the HTML document
    document.querySelector("#card").appendChild(card);

    // Add the ingredients in case the user responds incorrectly
    // Create the list element for the ingredients
    const cocktailIngredientsList = document.createElement("ul");
    cocktailIngredientsList.style.listStyle = "none";

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

// Get an array with all ingredients and remove the correct ones
async function optionsIngredients() {
  try {
    // Get all ingredients and compare them with the correct ones to get only the incorrect ones
    const ingredients = await getAllIngredients();
    cocktailIngredients = await showRandomCocktail();
    const incorrectIngredients = ingredients.filter(
      (ingredient) => !cocktailIngredients.includes(ingredient)
    );

    // Calculate how many incorrect ingredients are needed to have 25 ingredients
    const numberOfWrongIngredients = 25 - cocktailIngredients.length;

    // Get this number of incorrect ingredients
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

    // Concatenate the correct ingredients with the incorrect ones
    const ingredientsOptions =
      wrongIngredientsOptions.concat(cocktailIngredients);
    console.log("correct answer: " + cocktailIngredients);

    // Shuffle the list of ingredients using the Fisher-Yates algorithm
    for (let i = ingredientsOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ingredientsOptions[i], ingredientsOptions[j]] = [
        ingredientsOptions[j],
        ingredientsOptions[i],
      ];
    }

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
}

function compareIngredients(selectedIngredients, cocktailIngredients) {
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

// Function to clear the HTML
function clearHTML() {
  // Remove the random cocktail card
  const cardElement = document.querySelector("#card");
  cardElement.innerHTML = "";

  // Remove the list of ingredients
  const ingredientsOptionsDiv = document.querySelector("#ingredients-options");
  ingredientsOptionsDiv.innerHTML = "";

  // Reset the stored variables
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
      // Get the names of the selected ingredients
      const selectedIngredientsArray = selectedIngredients;
      // Call compareIngredients here
      const result = compareIngredients(
        selectedIngredientsArray,
        cocktailIngredients
      );
      // Call the imported function to use the result
      showResults(result);

      // Clear the HTML after showing the result
      clearHTML();

      // Show the "Next" button and hide the "Submit" button
      submitButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
    });
    nextButton.addEventListener("click", async () => {
      // Clear the HTML and reset the variables
      clearHTML();
      const correctMessage = document.getElementById(
        "correct-ingredients-options"
      );
      const incorrectMessage = document.getElementById(
        "incorrect-ingredients-options"
      );
      correctMessage.classList.add("hidden");
      incorrectMessage.classList.add("hidden");

      // Hide the "Next" button and show the "Submit" button
      nextButton.classList.add("hidden");
      submitButton.classList.remove("hidden");

      // Load a new cocktail
      const ingredientsOptions = await optionsIngredients();
      await showIngredients(ingredientsOptions);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
