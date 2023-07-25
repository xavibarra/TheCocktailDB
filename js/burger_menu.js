// Execute the code after the page has loaded
window.addEventListener("load", function () {
  // Select necessary elements from the DOM
  const menuIcon = document.querySelector(".menu-icon");
  const containerBurgerMenu = document.querySelector(".container-burger-menu");
  const menuButton = document.getElementById("menuButton");

  // Function to toggle the 'opened' class on the menuButton, controlling menu appearance
  function toggleMenuIcon() {
    menuButton.classList.toggle("opened");
  }

  // Add a click event listener to the menuButton, call the toggleMenuIcon function on click
  menuButton.addEventListener("click", toggleMenuIcon);

  // Add a click event listener to the menuIcon (icon to trigger the menu),
  // Toggle the 'show' class on the containerBurgerMenu to display or hide the menu
  menuIcon.addEventListener("click", function () {
    containerBurgerMenu.classList.toggle("show");
  });

  // Add a click event listener to the window to handle clicks outside the menu
  window.addEventListener("click", function (event) {
    const target = event.target;
    const isClickInsideNavbar = containerBurgerMenu.contains(target);
    const isClickOnMenuIcon = menuIcon.contains(target);
    const isExpanded = menuButton.classList.contains("opened");

    // If the click is outside the menu and menu is expanded, close the menu and toggle the menuButton
    if (!isClickInsideNavbar && !isClickOnMenuIcon && isExpanded) {
      containerBurgerMenu.classList.remove("show");
      toggleMenuIcon();
    }
  });
});
