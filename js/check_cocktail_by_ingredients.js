import getRandomCocktail from "./get_random_cocktail.js";
import getFiveIdRandom from "./get_five_idcocktail_random.js";
import { showResults } from "./show_results.js";
let cocktailId = null;
let cocktailIngredients = [];
let count = 0;
let record;
// Check if there is a value saved in Local Storage
const recordFromLocalStorage = localStorage.getItem("recordSecondExercice");
if (recordFromLocalStorage !== null) {
  // If there is a saved value, assign it to the 'record' variable
  record = parseInt(recordFromLocalStorage, 10);
} else {
  // If there is no saved value, assign 0 to the 'record' variable
  record = 0;
  // Save the value 0 in the Local Storage
  localStorage.setItem("recordSecondExercice", 0);
}
// Get the element with ID "correctAnswers" and set its text content to the 'count' variable value
const countText = document.getElementById("correctAnswers");
countText.textContent = count;

// Get the element with ID "record" and set its text content to the 'record' variable value
const recordText = document.getElementById("record");
recordText.textContent = record;

// Function to show cocktail ingredients on the page
async function showCocktailIngredients() {
  try {
    // Get a random cocktail
    const cocktail = await getRandomCocktail();
    cocktailId = cocktail.idDrink;
    const correctCocktail = document.getElementById("correctAnswer");
    correctCocktail.textContent = cocktail.strDrink;

    // Filter out non-empty ingredients and map them to an array
    cocktailIngredients = Object.entries(cocktail)
      .filter(([key, value]) => key.startsWith("strIngredient") && value)
      .map(([key, value]) => value);

    const ingredientsContainer = document.getElementById("showIngredients");

    // Iterate through cocktail ingredients and display them as h3 elements
    cocktailIngredients.forEach((ingredient) => {
      const ingredientName = document.createElement("h3");
      ingredientName.classList.add(
        "background-principal-color",
        "ingredient-cocktail-exam"
      );
      ingredientName.textContent = ingredient;
      ingredientsContainer.appendChild(ingredientName);
    });

    console.log("correct answer: " + cocktail.strDrink);
    return cocktailId;
  } catch (error) {
    throw error;
  }
}

// Function to fetch random cocktail IDs and prepare for display
async function getCocktailsIds() {
  try {
    // Get five random cocktail IDs
    const fiveId = await getFiveIdRandom();
    const cocktailId = await showCocktailIngredients();

    // Filter out the current cocktail ID from the five random IDs
    const filteredFiveId = fiveId.filter(
      (ingredient) => ingredient !== cocktailId
    );

    // Select two random IDs from the filtered list and add the current cocktail ID
    const finalCocktailIds = filteredFiveId.slice(-2);
    finalCocktailIds.push(cocktailId);

    let i = finalCocktailIds.length;
    while (--i > 0) {
      // Shuffle the finalCocktailIds array randomly
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

// Function to clear the HTML elements
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

  cocktailIngredients = [];
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

    const titleFirst = document.createElement("h2");
    titleFirst.classList.add("centered-text");
    titleFirst.textContent = cocktails[0].drinks[0].strDrink;

    // Create the img element for the cocktail image
    const imageFirst = document.createElement("img");
    imageFirst.classList.add("cocktail-option-image");
    imageFirst.src = cocktails[0].drinks[0].strDrinkThumb;
    imageFirst.alt = cocktails[0].drinks[0].strDrink + " Image";
    firstCocktail.appendChild(titleFirst);
    firstCocktail.appendChild(imageFirst);

    const titleSecond = document.createElement("h2");
    titleSecond.classList.add("centered-text");
    titleSecond.textContent = cocktails[1].drinks[0].strDrink;

    // Create the img element for the cocktail image
    const imageSecond = document.createElement("img");
    imageSecond.classList.add("cocktail-option-image");
    imageSecond.src = cocktails[1].drinks[0].strDrinkThumb;
    imageSecond.alt = cocktails[1].drinks[0].strDrink + " Image";
    secondCocktail.appendChild(titleSecond);
    secondCocktail.appendChild(imageSecond);

    const titleThird = document.createElement("h2");
    titleThird.classList.add("centered-text");
    titleThird.textContent = cocktails[2].drinks[0].strDrink;

    // Create the img element for the cocktail image
    const imageThird = document.createElement("img");
    imageThird.classList.add("cocktail-option-image");
    imageThird.src = cocktails[2].drinks[0].strDrinkThumb;
    imageThird.alt = cocktails[2].drinks[0].strDrink + " Image";
    thirdCocktail.appendChild(titleThird);
    thirdCocktail.appendChild(imageThird);
  } catch (error) {
    throw error;
  }
}
function showTemporalMessage() {
  const message = document.getElementById("cocktailNotSelected");
  message.classList.remove("hidden");

  // After 1 second (1000 ms), hide the message
  setTimeout(function () {
    message.classList.add("hidden");
  }, 1000);
}

const submitButton = document.getElementById("submit-ingredients-options");
const nextButton = document.getElementById("next-cocktail");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    showCocktails();

    // Event listener for the "Next" button
    nextButton.addEventListener("click", handleNextButtonClick);

    // Event listener for the "Submit" button
    submitButton.addEventListener("click", handleSubmit);

    function handleSubmit() {
      if (!selectedCocktailDiv) {
        // If no cocktail is selected, show a temporary message
        showTemporalMessage();
      } else {
        // Clear the HTML elements, reset selected div's border color,
        // and show the "Next" button while hiding the "Submit" button
        clearHTML();
        selectedCocktailDiv.style.borderColor = "transparent";
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
            localStorage.setItem("recordSecondExercice", record);
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
