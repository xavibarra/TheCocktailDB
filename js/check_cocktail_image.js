import getRandomCocktail from "./get_random_cocktail.js";
import getFiveIdRandom from "./get_five_idcocktail_random.js";
import { showResults } from "./show_results.js";
let cocktailId = null;
let count = 0;
let record;
// Check if there is a value saved in Local Storage
const recordFromLocalStorage = localStorage.getItem("recordFirstExercice");
if (recordFromLocalStorage !== null) {
  // If there is a saved value, assign it to the 'record' variable
  record = parseInt(recordFromLocalStorage, 10);
} else {
  // If there is no saved value, assign 0 to the 'record' variable
  record = 0;
  // Save the value 0 in the Local Storage
  localStorage.setItem("recordFirstExercice", 0);
}
const countText = document.getElementById("correctAnswers");
countText.textContent = count;

const recordText = document.getElementById("record");
recordText.textContent = record;

// Function to show cocktail ingredients and image
async function showCocktailIngredients() {
  try {
    // Get a random cocktail and extract its ID
    const cocktail = await getRandomCocktail();
    cocktailId = cocktail.idDrink;

    // Show the cocktail image
    const image = document.getElementById("correctAnswer");
    image.classList.add("cocktail-option-image");
    image.src = cocktail.strDrinkThumb;
    image.alt = cocktail.strDrink + " Image";

    // Show the cocktail name in the ingredient container
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

// Function to get a set of cocktail IDs
async function getCocktailsIds() {
  try {
    // Get five random cocktail IDs
    const fiveId = await getFiveIdRandom();

    // Show the cocktail ingredients and get the current cocktail ID
    const cocktailId = await showCocktailIngredients();

    // Remove the current cocktail ID from the five random IDs
    const filteredFiveId = fiveId.filter(
      (ingredient) => ingredient !== cocktailId
    );

    // Prepare the final set of cocktail IDs
    const finalCocktailIds = filteredFiveId.slice(-2);
    finalCocktailIds.push(cocktailId);

    // Shuffle the final set of cocktail IDs
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

// Function to handle click on a div
function handleClick(selectedCocktail) {
  const allCocktails = [
    document.getElementById("firstCocktail"),
    document.getElementById("secondCocktail"),
    document.getElementById("thirdCocktail"),
  ];

  // Loop through all the divs and remove the black border from the others
  allCocktails.forEach((cocktail) => {
    if (cocktail === selectedCocktail) {
      // If it's the selected div, add a black border
      cocktail.style.borderColor = "black";
      selectedCocktailDiv = cocktail; // Store the selected div
    } else {
      // If it's not the selected div, remove the border
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

function showTemporalMessage() {
  const message = document.getElementById("imageNotSelected");
  message.classList.remove("hidden");

  // After 1 second (1000 ms), hide the message
  setTimeout(function () {
    message.classList.add("hidden");
  }, 1000);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Show cocktails and set up event listeners
    showCocktails();

    // Event listener for the "Next" button
    nextButton.addEventListener("click", handleNextButtonClick);

    // Event listener for the "Submit" button
    submitButton.addEventListener("click", handleSubmit);

    function handleSubmit() {
      if (!selectedCocktailDiv) {
        // If no div is selected, log a message and show a temporary message
        console.log("No div is selected.");
        showTemporalMessage();
      } else {
        // Reset selected div's border color, clear HTML elements,
        // and show the "Next" button while hiding the "Submit" button
        selectedCocktailDiv.style.borderColor = "transparent";
        clearHTML();
        submitButton.classList.add("hidden");
        nextButton.classList.remove("hidden");
        const selectedCocktailId = selectedCocktailDiv.dataset.name;
        let result = selectedCocktailId === cocktailId;
        // Show the result message based on correct or incorrect selection
        showResults(result);
        if (result) {
          count++;
          countText.textContent = count;
          if (count > record) {
            // Update and store the new record in the Local Storage
            record = count;
            recordText.textContent = record;
            localStorage.setItem("recordFirstExercice", record);
          }
        } else {
          // Reset the count and update the displayed count
          count = 0;
          countText.textContent = count;
        }
      }
    }

    function handleNextButtonClick() {
      // Hide the "Next" button
      nextButton.classList.add("hidden");

      // Show the "Submit" button
      submitButton.classList.remove("hidden");

      // Show the container for cocktail options and ingredient list
      const cocktailsDiv = document.querySelector(
        "#container-cocktail-options"
      );
      cocktailsDiv.classList.remove("hidden");
      const ingredientsDiv = document.querySelector("#showIngredients");
      ingredientsDiv.classList.remove("hidden");

      // Clear previous messages and reset selectedCocktailDiv
      const firstDiv = document.querySelector("#firstCocktail");
      const correctMessage = document.getElementById(
        "correct-ingredients-options"
      );
      const incorrectMessage = document.getElementById(
        "incorrect-ingredients-options"
      );
      correctMessage.classList.add("hidden");
      incorrectMessage.classList.add("hidden");
      selectedCocktailDiv = null;

      // Show new set of cocktails and their ingredients
      showCocktails();
    }
  } catch (error) {
    throw error;
  }
});
