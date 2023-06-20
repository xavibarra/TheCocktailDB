function redirectToHome() {
  window.location.href = "pages/home.html";
}
function showMessage() {
  const messageDiv = document.getElementById("message-not-entry");
  messageDiv.classList.remove("hidden");
  const cardAgeCheck = document.getElementById("card-entry-hidden");
  cardAgeCheck.classList.add("hidden");
}
