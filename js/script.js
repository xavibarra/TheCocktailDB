for (let i; i < 10; i++) {}
// Crear el elemento div principal
const card = document.createElement("div");
card.classList.add(
  "card",
  "background-secundary-color",
  "shadow-principal-color"
);

// Crear el elemento h2 para el texto "margarita"
const heading = document.createElement("h2");
heading.classList.add("card-text", "white-text");
heading.textContent = "margarita";

// Crear el elemento div container
const container = document.createElement("div");
container.classList.add("container");

// Crear el elemento div para la imagen de la tarjeta
const cardImage = document.createElement("div");
cardImage.classList.add("card-image");

// Crear el elemento img para la imagen del cóctel
const image = document.createElement("img");
image.src = "../assets/5noda61589575158.jpg";
image.alt = "Cocktail Image";

// Agregar la imagen al elemento de la tarjeta
cardImage.appendChild(image);

// Crear el elemento div para los ingredientes
const ingredients = document.createElement("div");
ingredients.classList.add("ingredients", "white-text");

// Crear la lista de ingredientes
const ul = document.createElement("ul");
const ingredientsList = [
  "ingredient 1",
  "ingredient 2",
  "ingredient 3",
  "ingredient 4",
  "ingredient 5",
  "ingredient 6",
];

ingredientsList.forEach((ingredient) => {
  const li = document.createElement("li");
  li.textContent = ingredient;
  ul.appendChild(li);
});

// Agregar la lista de ingredientes al elemento div de los ingredientes
ingredients.appendChild(ul);

// Agregar los elementos al árbol DOM
card.appendChild(heading);
container.appendChild(cardImage);
container.appendChild(ingredients);
card.appendChild(container);

// Agregar la tarjeta al documento HTML
document.querySelector("#card").appendChild(card);

// ---------------------------------------------------------------------------------

// // Crear el elemento div principal
// const cardWhite = document.createElement("div");
// cardWhite.classList.add("card", "background-white", "shadow-secundary-color");

// // Crear el elemento h2 para el texto "margarita"
// const headingWhite = document.createElement("h2");
// headingWhite.classList.add("card-text");
// headingWhite.textContent = "margarita";

// // Crear el elemento div container
// const containerWhite = document.createElement("div");
// containerWhite.classList.add("container");

// // Crear el elemento div para la imagen de la tarjeta
// const cardImageWhite = document.createElement("div");
// cardImageWhite.classList.add("card-image");

// // Crear el elemento img para la imagen del cóctel
// const imageWhite = document.createElement("img");
// imageWhite.src = "../assets/5noda61589575158.jpg";
// imageWhite.alt = "Cocktail Image";

// // Agregar la imagen al elemento de la tarjeta
// cardImageWhite.appendChild(imageWhite);

// // Crear el elemento div para los ingredientes
// const ingredientsWhite = document.createElement("div");
// ingredientsWhite.classList.add("ingredients");

// // Crear la lista de ingredientes
// const ulWhite = document.createElement("ul");
// const ingredientsListWhite = [
//   "ingredient 1",
//   "ingredient 2",
//   "ingredient 3",
//   "ingredient 4",
//   "ingredient 5",
//   "ingredient 6",
// ];

// ingredientsListWhite.forEach((ingredient) => {
//   const li = document.createElement("li");
//   li.textContent = ingredient;
//   ulWhite.appendChild(li);
// });

// // Agregar la lista de ingredientes al elemento div de los ingredientes
// ingredientsWhite.appendChild(ul);

// // Agregar los elementos al árbol DOM
// cardWhite.appendChild(headingWhite);
// containerWhite.appendChild(cardImageWhite);
// containerWhite.appendChild(ingredientsWhite);
// cardWhite.appendChild(containerWhite);

// // Agregar la tarjeta al documento HTML
// document.querySelector(".cardWhite").appendChild(cardWhite);
