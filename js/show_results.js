import launchConfetti from "./confeti.js";
// Function to display the results
export function showResults(result) {
  if (result) {
    // Result is true, show success message
    const correctMessage = document.getElementById(
      "correct-ingredients-options"
    );
    correctMessage.classList.remove("hidden");

    // Call the confetti function for celebration
    launchConfetti();
  } else {
    // Result is false, show error message
    const incorrectMessage = document.getElementById(
      "incorrect-ingredients-options"
    );
    incorrectMessage.classList.remove("hidden");
  }
}
