window.addEventListener("load", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const containerBurgerMenu = document.querySelector(".container-burger-menu");

  menuIcon.addEventListener("click", function () {
    containerBurgerMenu.classList.toggle("show");
  });
});
