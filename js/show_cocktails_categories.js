import getCocktailsCategories from "./get_cocktails_categories.js";

const categorySelect = document.getElementById("categorySelect");
const categoryList = document.getElementById("categoryList");
const categoriesResults = document.querySelector("#card");

// Event listener for select
categorySelect.addEventListener("change", function () {
  const selectedValue = categorySelect.value;
  if (selectedValue != "select") {
    categoriesResults.innerHTML = "";
    showCocktailsCategories(selectedValue);
  }
  //else {
  //   const SelectCategory = document.getElementById("selectCategoryText");
  //   const textCard = document.createElement("h2");
  //   textCard.classList.add("centered-text", "white-text");
  //   textCard.textContent = "Select a category";
  //   SelectCategory.appendChild(textCard);
  //}
});
// Event listener for list
const listItems = categoryList.getElementsByTagName("li");
for (let i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener("click", function () {
    const selectedValue = listItems[i].dataset.value;
    if (selectedValue != "") {
      categoriesResults.innerHTML = "";
      showCocktailsCategories(selectedValue);
    }
  });
}

async function showCocktailsCategories(category) {
  try {
    const cocktails = await getCocktailsCategories(category);
    if (cocktails && cocktails.length > 0) {
      cocktails.forEach((cocktail) => {
        // Create the main div element
        const card = document.createElement("div");
        card.classList.add(
          "card",
          "background-secundary-color",
          "shadow-principal-color"
        );

        // Create the h2 element for the cocktail name
        const heading = document.createElement("h2");
        heading.classList.add("card-text", "white-text");
        heading.textContent = cocktail.strDrink;

        // Add a click event listener to the card
        card.addEventListener("click", function () {
          // Store the cocktail details in sessionStorage
          sessionStorage.setItem("cocktailDetails", JSON.stringify(cocktail));

          // Redirect to cocktail details screen
          window.location.href = "../pages/cocktail-details.html";
        });
        // Create the container div element
        const container = document.createElement("div");
        container.classList.add("container");

        // Create the div element for the card image
        const cardImage = document.createElement("div");
        cardImage.classList.add("card-image");

        // Create the img element for the cocktail image
        const image = document.createElement("img");
        image.src = cocktail.strDrinkThumb;
        image.alt = cocktail.strDrink + " Image";

        // Add the image to the card image element
        cardImage.appendChild(image);

        // Create the div element for the ingredients
        const cocktailIngredientsDiv = document.createElement("div");
        cocktailIngredientsDiv.classList.add("ingredients", "white-text");

        // Create the title element for ingredients
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

        // Add the elements to the DOM tree
        card.appendChild(heading);
        container.appendChild(cardImage);
        container.appendChild(cocktailIngredientsDiv);
        card.appendChild(container);

        // Add the card to the HTML document
        document.querySelector("#card").appendChild(card);
      });
    } else {
      searchResults.textContent = "No cocktails found";
    }
  } catch (error) {
    console.error(error.message);
  }
}
