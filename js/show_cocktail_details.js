// Get the JSON object from sessionStorage
const jsonCocktail = sessionStorage.getItem("cocktailDetails");

// Check if the JSON object was found in sessionStorage
if (jsonCocktail) {
  // Convert the JSON object to a JavaScript object
  const cocktail = JSON.parse(jsonCocktail);

  // Access the cocktail name and assign it to the element"
  const cocktailNameElement = document.getElementById("cocktail-name");
  cocktailNameElement.textContent = cocktail.strDrink.toUpperCase();

  const tagsElement = document.getElementById("tags");
  if (cocktail.strTags) {
    tagsElement.textContent = "#" + cocktail.strTags.replace(/,/g, " #");
  }
  // Attach event listeners to flags
  const flagElements = document.getElementsByClassName("flag-image");
  for (let i = 0; i < flagElements.length; i++) {
    flagElements[i].addEventListener("click", handleFlagClick);
    flagElements[i].addEventListener("touchstart", handleFlagClick);
  }

  // Function to fetch translation from API
  async function translateText(text, targetLanguage) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|${targetLanguage}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const translatedText = data.responseData.translatedText;

      return translatedText;
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  }

  // Get the instructions element
  const instructionsTextElement = document.querySelector(
    "#instructions .instructions-text"
  );

  // Set default language to English
  let currentLanguage = "en";

  // Function to handle flag click
  function handleFlagClick(event) {
    const flagId = event.target.id;

    // Define language mappings
    const languageMap = {
      flagEn: "en",
      flagEs: "es",
      flagFr: "fr",
      flagIt: "it",
      flagDe: "de",
      flagCa: "ca",
    };

    const targetLanguage = languageMap[flagId];

    // Check if the target language is different from the current language
    if (targetLanguage !== currentLanguage) {
      // Update the current language
      currentLanguage = targetLanguage;
      if (targetLanguage === "en") {
        // If target language is English, display original English instructions
        instructionsTextElement.textContent = cocktail.strInstructions;
      } else {
        // Get the translation for the instructions
        const translatedInstructions =
          cocktail[`strInstructions${targetLanguage.toUpperCase()}`];
        if (translatedInstructions) {
          instructionsTextElement.textContent = translatedInstructions;
        } else {
          // If the translation doesn't exist, use the API to translate
          translateText(cocktail.strInstructions, targetLanguage)
            .then((translatedText) => {
              if (translatedText) {
                instructionsTextElement.textContent = translatedText;
              } else {
                instructionsTextElement.textContent =
                  "Translation not available";
              }
            })
            .catch((error) => {
              console.error("Error:", error.message);
              instructionsTextElement.textContent = "Translation error";
            });
        }
      }
    }
  }

  // Set initial instructions to English
  instructionsTextElement.textContent = cocktail.strInstructions;

  //Insert cocktail image
  const imageContainer = document.getElementById("img-cocktail-details");
  const imageElement = document.createElement("img");
  imageElement.src = cocktail.strDrinkThumb;
  imageElement.alt = "Img " + cocktail.strDrink;
  imageElement.classList.add("cocktail-details-img");

  //Insert cocktail ingredients
  const ingredientsContainer = document.getElementById("ingredients");

  // Get the ingredients and measures from the cocktail object
  const ingredients = [];
  const measures = [];

  // Add ingredients and measures to the corresponding array
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (cocktail[ingredientKey] !== null) {
      ingredients.push(cocktail[ingredientKey]);
      measures.push(cocktail[measureKey]);
    } else {
      break;
    }
  }

  const ingredientsDiv = document.createElement("div");
  ingredientsDiv.classList.add("ingredients-container-details");
  ingredientsContainer.appendChild(ingredientsDiv);

  // Create <p> elements for each ingredient and measure
  for (let i = 0; i < ingredients.length; i++) {
    const ingredientElement = document.createElement("p");

    // Display the measure and ingredient, or just the ingredient if the measure is null
    let measureText = measures[i] !== null ? measures[i] : "";

    ingredientElement.textContent = `${measureText} ${ingredients[i]}`;

    ingredientsDiv.appendChild(ingredientElement);
  }

  imageContainer.appendChild(imageElement);
} else {
  console.log("No JSON object found in sessionStorage");
}
