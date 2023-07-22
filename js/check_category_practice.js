import getRandomCocktail from "./get_random_cocktail.js";
import { showResults } from "./show_results.js";

let currentCategory; // Declare a global variable to store the current category
let categorySelected = [];

let count = 0;
let record;
// Check if there is a value saved in Local Storage
const recordFromLocalStorage = localStorage.getItem("recordThirdExercice");
if (recordFromLocalStorage !== null) {
  // If there is a saved value, assign it to the 'record' variable
  record = parseInt(recordFromLocalStorage, 10);
} else {
  // If there is no saved value, assign 0 to the 'record' variable
  record = 0;
  // Save the value 0 in the Local Storage
  localStorage.setItem("recordThirdExercice", 0);
}
const countText = document.getElementById("correctAnswers");
countText.textContent = count;

const recordText = document.getElementById("record");
recordText.textContent = record;

function toggleCategorySelection(event) {
  const clickedElement = event.target;

  // Check if the categorySelected array is not empty
  if (categorySelected.length > 0) {
    // Get the previously selected h3 element
    const previousSelected = categorySelected.pop();
    // Set its border color to transparent
    previousSelected.style.borderColor = "transparent";
  }

  // Store the clicked h3 element in the categorySelected array
  categorySelected.push(clickedElement);
  // Set its border color to black
  clickedElement.style.borderColor = "black";

  // Now, you can access the selected category using "currentCategory" or "clickedElement.dataset.name" (data-name attribute)
  currentCategory = clickedElement.dataset.name;
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

    const correctCategory = document.getElementById("correctAnswer");
    correctCategory.textContent = cocktail.strCategory;

    // Add the card to the HTML document
    document.querySelector("#card").appendChild(card);

    // Store the current category in the global variable
    currentCategory = cocktail.strCategory;

    console.log("correct answer: " + cocktail.strCategory);

    return currentCategory;
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

  // Después de 1 segundo (1000 ms), ocultar el mensaje
  setTimeout(function () {
    message.classList.add("hidden"); // Ocultar el mensaje
  }, 1000);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let category = "Unknown";
    let currentCategory = await showRandomCocktail();

    // Add click event listeners to each <h3> element
    const h3Elements = document.querySelectorAll(".ingredient-option");
    h3Elements.forEach((h3) => {
      h3.addEventListener("click", toggleCategorySelection);
    });

    const submitButton = document.getElementById("submit-ingredients-options");
    const nextButton = document.getElementById("next-cocktail");
    const ingredientOptions = document.getElementById("ingredientOptions");

    submitButton.addEventListener("click", () => {
      // Verificar si alguna categoría ha sido seleccionada
      if (categorySelected.length > 0) {
        // Clear the HTML after showing the result
        clearHTML();
        // Show the "Next" button and hide the "Submit" button
        submitButton.classList.add("hidden");
        nextButton.classList.remove("hidden");
        ingredientOptions.classList.add("hidden");
        // Obtener la categoría seleccionada
        category = categorySelected[0].dataset.name;
        // Comparar la categoría seleccionada con la categoría actual del cóctel
        let result = category === currentCategory;
        showResults(result);
        if (result) {
          count++;
          countText.textContent = count;
          if (count > record) {
            record = count;
            recordText.textContent = record;
            localStorage.setItem("recordThirdExercice", record);
          }
        } else {
          count = 0;
          countText.textContent = count;
        }
      } else {
        // Si no se ha seleccionado ninguna categoría, mostrar mensaje de error o realizar alguna otra acción
        console.log("No se ha seleccionado ninguna categoría.");
        showTemporalMessage();
      }
    });

    nextButton.addEventListener("click", async () => {
      const correctCategory = document.getElementById("correctAnswer");
      correctCategory.textContent = "";

      // Limpiar selecciones anteriores y restablecer el borde
      if (categorySelected.length > 0) {
        const previousSelected = categorySelected.pop();
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

      // Call showRandomCocktail and update the currentCategory variable
      currentCategory = await showRandomCocktail();
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
