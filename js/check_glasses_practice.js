// Import getRandomCocktail function from "./get_random_cocktail.js";
import getRandomCocktail from "./get_random_cocktail.js";
import { showResults } from "./show_results_select_ingredients.js";

let currentGlass; // Declare a global variable to store the current glass
let glassSelected = [];

function toggleGlassSelection(event) {
  const clickedElement = event.target;

  // Check if the glassSelected array is not empty
  if (glassSelected.length > 0) {
    // Get the previously selected h3 element
    const previousSelected = glassSelected.pop();
    // Set its border color to transparent
    previousSelected.style.borderColor = "transparent";
  }

  // Store the clicked h3 element in the glassSelected array
  glassSelected.push(clickedElement);
  // Set its border color to black
  clickedElement.style.borderColor = "black";

  // Now, you can access the selected glass using "currentGlass" or "clickedElement.dataset.name" (data-name attribute)
  currentGlass = clickedElement.dataset.name;
}

async function showRandomCocktail() {
  try {
    // Get a random cocktail
    const cocktail = await getRandomCocktail();

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
    container.appendChild(cardImage);
    card.appendChild(heading);
    card.appendChild(container);

    const correctGlass = document.getElementById("correctAnswer");
    correctGlass.textContent = cocktail.strGlass;

    // Add the card to the HTML document
    document.querySelector("#card").appendChild(card);

    // Store the current glass in the global variable
    currentGlass = cocktail.strGlass;

    console.log("correct glass: " + cocktail.strGlass);

    return currentGlass;
  } catch (error) {
    throw error;
  }
}

// Function to clear the HTML
function clearHTML() {
  // Remove the random cocktail card
  const cardElement = document.querySelector("#card");
  cardElement.innerHTML = "";
}

// Función para mostrar el mensaje y ocultarlo después de un tiempo
function showTemporalMessage() {
  const message = document.getElementById("categoryNotSelected");
  message.classList.remove("hidden"); // Mostrar el mensaje

  // Después de 3 segundos (1000 ms), ocultar el mensaje
  setTimeout(function () {
    message.classList.add("hidden"); // Ocultar el mensaje
  }, 1000);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let glass = "Unknown";
    let currentGlass = await showRandomCocktail();

    // Add click event listeners to each <h3> element
    const h3Elements = document.querySelectorAll(".ingredient-option");
    h3Elements.forEach((h3) => {
      h3.addEventListener("click", toggleGlassSelection);
    });

    const submitButton = document.getElementById("submit-ingredients-options");
    const nextButton = document.getElementById("next-cocktail");
    const ingredientOptions = document.getElementById("ingredientOptions");

    submitButton.addEventListener("click", () => {
      // Verificar si alguna glass ha sido seleccionada
      if (glassSelected.length > 0) {
        // Clear the HTML after showing the result
        clearHTML();
        // Show the "Next" button and hide the "Submit" button
        submitButton.classList.add("hidden");
        nextButton.classList.remove("hidden");
        ingredientOptions.classList.add("hidden");
        // Obtener la glass seleccionada
        glass = glassSelected[0].dataset.name;
        // Comparar la glass seleccionada con la glass actual del cóctel
        let result = glass === currentGlass;
        showResults(result);
      } else {
        // Si no se ha seleccionado ninguna glass, mostrar mensaje de error o realizar alguna otra acción
        console.log("No se ha seleccionado ninguna glass.");
        showTemporalMessage();
      }
    });

    nextButton.addEventListener("click", async () => {
      const correctGlass = document.getElementById("correctAnswer");
      correctGlass.textContent = "";

      // Limpiar selecciones anteriores y restablecer el borde
      if (glassSelected.length > 0) {
        const previousSelected = glassSelected.pop();
        previousSelected.style.borderColor = "transparent";
      }

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
      ingredientOptions.classList.remove("hidden");

      // Call showRandomCocktail and update the currentGlass variable
      currentGlass = await showRandomCocktail();
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
