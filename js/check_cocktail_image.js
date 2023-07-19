import getRandomCocktail from "./get_random_cocktail.js";
import getFiveIdRandom from "./get_five_idcocktail_random.js";
import { showResults } from "./show_results_select_ingredients.js";
let cocktailId = null;

async function showCocktailIngredients() {
  try {
    const cocktail = await getRandomCocktail();
    cocktailId = cocktail.idDrink;
    const image = document.getElementById("correctAnswer");
    image.classList.add("cocktail-option-image");
    image.src = cocktail.strDrinkThumb;
    image.alt = cocktail.strDrink + " Image";

    const ingredientsContainer = document.getElementById("showIngredients");
    const ingredientName = document.createElement("h3");
    ingredientName.classList.add(
      "background-principal-color",
      "ingredient-cocktail-name"
    );
    ingredientName.textContent = cocktail.strDrink;
    ingredientsContainer.appendChild(ingredientName);

    return cocktailId;
  } catch (error) {
    throw error;
  }
}

async function getCocktailsIds() {
  try {
    const fiveId = await getFiveIdRandom();
    const cocktailId = await showCocktailIngredients();
    const filteredFiveId = fiveId.filter(
      (ingredient) => ingredient !== cocktailId
    );
    const finalCocktailIds = filteredFiveId.slice(-2);
    finalCocktailIds.push(cocktailId);
    let i = finalCocktailIds.length;
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [finalCocktailIds[randIndex], finalCocktailIds[i]] = [
        finalCocktailIds[i],
        finalCocktailIds[randIndex],
      ];
    }
    return finalCocktailIds;
  } catch (error) {
    throw error;
  }
}

let selectedCocktailDiv = null;

// Función para manejar el clic en un div
function handleClick(selectedCocktail) {
  const allCocktails = [
    document.getElementById("firstCocktail"),
    document.getElementById("secondCocktail"),
    document.getElementById("thirdCocktail"),
  ];

  // Recorrer todos los divs y quitar el borde negro en los demás
  allCocktails.forEach((cocktail) => {
    if (cocktail === selectedCocktail) {
      // Si es el div seleccionado, poner el borde negro
      cocktail.style.borderColor = "black";
      selectedCocktailDiv = cocktail; // Almacenar el div seleccionado
    } else {
      // Si no es el div seleccionado, quitar el borde
      cocktail.style.borderColor = "transparent";
    }
  });
}

// Function to clear the HTML
function clearHTML() {
  const cocktailsDiv = document.querySelector("#container-cocktail-options");
  cocktailsDiv.classList.add("hidden");
  const ingredientsDiv = document.querySelector("#showIngredients");
  ingredientsDiv.classList.add("hidden");
  ingredientsDiv.textContent = "";
  const firstDiv = document.querySelector("#firstCocktail");
  firstDiv.innerHTML = "";

  const secondDiv = document.querySelector("#secondCocktail");
  secondDiv.innerHTML = "";

  const thirdDiv = document.querySelector("#thirdCocktail");
  thirdDiv.innerHTML = "";
}

async function showCocktails() {
  try {
    const ids = await getCocktailsIds();
    const cocktails = [];
    for (const id of ids) {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const cocktail = await response.json();
      cocktails.push(cocktail);
    }

    const firstCocktail = document.getElementById("firstCocktail");
    firstCocktail.dataset.name = cocktails[0].drinks[0].idDrink;
    firstCocktail.addEventListener("click", () => handleClick(firstCocktail));

    const secondCocktail = document.getElementById("secondCocktail");
    secondCocktail.dataset.name = cocktails[1].drinks[0].idDrink;
    secondCocktail.addEventListener("click", () => handleClick(secondCocktail));

    const thirdCocktail = document.getElementById("thirdCocktail");
    thirdCocktail.dataset.name = cocktails[2].drinks[0].idDrink;
    thirdCocktail.addEventListener("click", () => handleClick(thirdCocktail));

    // Create the img element for the cocktail image
    const imageFirst = document.createElement("img");
    imageFirst.classList.add("cocktail-image-option");
    imageFirst.src = cocktails[0].drinks[0].strDrinkThumb;
    imageFirst.alt = cocktails[0].drinks[0].strDrink + " Image";
    firstCocktail.appendChild(imageFirst);

    // Create the img element for the cocktail image
    const imageSecond = document.createElement("img");
    imageSecond.classList.add("cocktail-image-option");
    imageSecond.src = cocktails[1].drinks[0].strDrinkThumb;
    imageSecond.alt = cocktails[1].drinks[0].strDrink + " Image";
    secondCocktail.appendChild(imageSecond);

    // Create the img element for the cocktail image
    const imageThird = document.createElement("img");
    imageThird.classList.add("cocktail-image-option");
    imageThird.src = cocktails[2].drinks[0].strDrinkThumb;
    imageThird.alt = cocktails[2].drinks[0].strDrink + " Image";
    thirdCocktail.appendChild(imageThird);
  } catch (error) {
    throw error;
  }
}

const submitButton = document.getElementById("submit-ingredients-options");
const nextButton = document.getElementById("next-cocktail");
// Función para mostrar el mensaje y ocultarlo después de un tiempo
function showTemporalMessage() {
  const message = document.getElementById("imageNotSelected");
  message.classList.remove("hidden"); // Mostrar el mensaje

  // Después de 1 segundo (1000 ms), ocultar el mensaje
  setTimeout(function () {
    message.classList.add("hidden"); // Ocultar el mensaje
  }, 1000);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    showCocktails();

    nextButton.addEventListener("click", handleNextButtonClick);
    submitButton.addEventListener("click", handleSubmit);
    function handleSubmit() {
      if (!selectedCocktailDiv) {
        console.log("No hay ningún div seleccionado.");
        showTemporalMessage();
      } else {
        selectedCocktailDiv.style.borderColor = "transparent";
        clearHTML();
        submitButton.classList.add("hidden");
        nextButton.classList.remove("hidden");
        const selectedCocktailId = selectedCocktailDiv.dataset.name;
        let result = selectedCocktailId === cocktailId;
        showResults(result);
      }
    }
    function handleNextButtonClick() {
      nextButton.classList.add("hidden"); // Oculta el botón "Next"
      submitButton.classList.remove("hidden"); // Muestra el botón "Submit"
      const cocktailsDiv = document.querySelector(
        "#container-cocktail-options"
      );
      cocktailsDiv.classList.remove("hidden");
      const ingredientsDiv = document.querySelector("#showIngredients");
      ingredientsDiv.classList.remove("hidden");
      const firstDiv = document.querySelector("#firstCocktail");
      const correctMessage = document.getElementById(
        "correct-ingredients-options"
      );
      const incorrectMessage = document.getElementById(
        "incorrect-ingredients-options"
      );
      correctMessage.classList.add("hidden");
      incorrectMessage.classList.add("hidden");
      selectedCocktailDiv = null; // Reinicia el div seleccionado

      showCocktails(); // Muestra nuevos cócteles y sus ingredientes
    }
  } catch (error) {
    throw error;
  }
});
