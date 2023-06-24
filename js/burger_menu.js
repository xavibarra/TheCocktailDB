window.addEventListener("load", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const containerBurgerMenu = document.querySelector(".container-burger-menu");
  const menuButton = document.getElementById("menuButton");
  function toggleMenuIcon() {
    menuButton.classList.toggle("opened");
  }
  menuButton.addEventListener("click", toggleMenuIcon);

  menuIcon.addEventListener("click", function () {
    containerBurgerMenu.classList.toggle("show");
  });

  window.addEventListener("click", function (event) {
    const target = event.target;
    const isClickInsideNavbar = containerBurgerMenu.contains(target);
    const isClickOnMenuIcon = menuIcon.contains(target);
    const isExpanded = menuButton.classList.contains("opened");

    if (!isClickInsideNavbar && !isClickOnMenuIcon && isExpanded) {
      containerBurgerMenu.classList.remove("show");
      toggleMenuIcon();
    }
  });
});
