import { obtenerCocktailAleatorio } from "./cocktail.js";

async function usarCocktail() {
  try {
    const cocktail = await obtenerCocktailAleatorio();
    // Aquí puedes utilizar la información del cóctel como desees
    console.log(cocktail);
  } catch (error) {
    console.error(error.message);
  }
}

usarCocktail();

//---------------------------------------------------------------------------------------------
// Crear el elemento div principal
const cardWhite = document.createElement("div");
cardWhite.classList.add("card", "background-white", "shadow-secundary-color");

// Crear el elemento h2 para el texto "margarita"
const headingWhite = document.createElement("h2");
headingWhite.classList.add("card-text");
headingWhite.textContent = "margarita";

// Crear el elemento div container
const containerWhite = document.createElement("div");
containerWhite.classList.add("container");

// Crear el elemento div para la imagen de la tarjeta
const cardImageWhite = document.createElement("div");
cardImageWhite.classList.add("card-image");

// Crear el elemento img para la imagen del cóctel
const imageWhite = document.createElement("img");
imageWhite.src = "../assets/5noda61589575158.jpg";
imageWhite.alt = "Cocktail Image";

// Agregar la imagen al elemento de la tarjeta
cardImageWhite.appendChild(imageWhite);

// Crear el elemento div para los ingredientes
const ingredientsWhite = document.createElement("div");
ingredientsWhite.classList.add("ingredients");

// Crear la lista de ingredientes
const ulWhite = document.createElement("ul");
const ingredientsListWhite = [
  "ingredient 1",
  "ingredient 2",
  "ingredient 3",
  "ingredient 4",
  "ingredient 5",
  "ingredient 6",
];

ingredientsListWhite.forEach((ingredient) => {
  const li = document.createElement("li");
  li.textContent = ingredient;
  ulWhite.appendChild(li);
});

// Agregar la lista de ingredientes al elemento div de los ingredientes
ingredientsWhite.appendChild(ul);

// Agregar los elementos al árbol DOM
cardWhite.appendChild(headingWhite);
containerWhite.appendChild(cardImageWhite);
containerWhite.appendChild(ingredientsWhite);
cardWhite.appendChild(containerWhite);

// Agregar la tarjeta al documento HTML
document.querySelector(".cardWhite").appendChild(cardWhite);
