document.addEventListener("DOMContentLoaded", function () {
  var componentContainer = document.getElementById("nav-bar");

  fetch("../pages/nav-bar.html")
    .then((response) => response.text())
    .then((data) => {
      componentContainer.innerHTML = data;
    })
    .catch((error) => {
      console.error("Error al cargar el componente:", error);
    });
  // load and run burger_menu.js
  const scriptElement = document.createElement("script");
  scriptElement.src = "../js/burger_menu.js";
  document.body.appendChild(scriptElement);
});
