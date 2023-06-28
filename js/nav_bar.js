document.addEventListener("DOMContentLoaded", function () {
  var componentContainer = document.getElementById("nav-bar");

  fetch("../pages/components/nav-bar.html")
    .then((response) => response.text())
    .then((data) => {
      componentContainer.innerHTML = data;
      loadBurgerMenu();
    })
    .catch((error) => {
      console.error("Error al cargar el componente:", error);
    });
  function loadBurgerMenu() {
    // load and run burger_menu.js
    const scriptElement = document.createElement("script");
    scriptElement.src = "../js/burger_menu.js";
    document.body.appendChild(scriptElement);
  }
});
