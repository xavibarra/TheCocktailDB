import getCocktailOfTheDay from "./get_cocktail_of_the_day.js";
import { checkLike, toggleFavorite } from "./check_like_black.js";

async function showCocktailOfTheDay() {
  try {
    const cocktail = await getCocktailOfTheDay();

    const cardWhiteElement = document.querySelector(".cardWhite");
    // cardWhiteElement.innerHTML = "";

    // Create the main section element
    const cardWhite = document.createElement("section");
    cardWhite.classList.add(
      "card",
      "background-white",
      "shadow-secundary-color"
    );

    // Create the heading element for the cocktail name
    const cocktailHeading = document.createElement("h2");
    cocktailHeading.classList.add("card-text");
    cocktailHeading.textContent = cocktail.strDrink;

    // Add a click event listener to the card
    cardWhite.addEventListener("click", function () {
      // Store the cocktail details in sessionStorage
      sessionStorage.setItem("cocktailDetails", JSON.stringify(cocktail));

      // Redirect to cocktail details screen
      window.location.href = "../pages/cocktail-details.html";
    });

    // Create the div element for the container
    const containerWhite = document.createElement("div");
    containerWhite.classList.add("container");

    // Create the figure element for the card image
    const cardImageWhite = document.createElement("figure");
    cardImageWhite.classList.add("card-image");

    // Create the img element for the cocktail image
    const cocktailImageElement = document.createElement("img");

    cocktailImageElement.classList.add("cocktail-image");
    cocktailImageElement.src = cocktail.strDrinkThumb;
    cocktailImageElement.alt = cocktail.strDrink + " Image";

    // Add the image to the card figure
    cardImageWhite.appendChild(cocktailImageElement);

    // Create the div element for the ingredients
    const cocktailIngredientsDiv = document.createElement("div");
    cocktailIngredientsDiv.classList.add("ingredients");

    //Create the title element for ingredients
    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.textContent = "Ingredients:";

    // Create the list element for the ingredients
    const cocktailIngredientsList = document.createElement("ul");

    // Get all the ingredients of the cocktail
    const ingredients = Object.entries(cocktail)
      .filter(([key, value]) => key.startsWith("strIngredient") && value)
      .map(([key, value]) => value);

    // Add each ingredient as a list item
    ingredients.forEach((ingredient) => {
      const ingredientListItem = document.createElement("li");
      ingredientListItem.textContent = ingredient;
      cocktailIngredientsList.appendChild(ingredientListItem);
    });

    // Add the title and ingredients list to the ingredients div element
    cocktailIngredientsDiv.appendChild(ingredientsTitle);
    cocktailIngredientsDiv.appendChild(cocktailIngredientsList);

    // Create like image
    const like = document.createElement("img");
    like.src = checkLike(cocktail);
    like.alt = "like image";
    like.classList.add("like-image");

    // Set the cocktail object as a custom attribute
    like.setAttribute("data-cocktail", JSON.stringify(cocktail));
    //Click like
    like.addEventListener("click", function (event) {
      //Do not send to cocktail-details when clicking on the like
      event.stopPropagation();
      const cocktailDetails = JSON.parse(this.getAttribute("data-cocktail"));
      toggleFavorite(cocktailDetails);

      // Update the like image
      this.src = checkLike(cocktailDetails);
    });

    // Add the elements to the DOM tree
    cardWhite.appendChild(cocktailHeading);
    containerWhite.appendChild(cardImageWhite);
    containerWhite.appendChild(cocktailIngredientsDiv);
    cardWhite.appendChild(containerWhite);
    cardWhite.appendChild(like);

    // Add the updated card to the HTML document
    cardWhiteElement.appendChild(cardWhite);
  } catch (error) {
    console.error(error.message);
  }
}

showCocktailOfTheDay();
