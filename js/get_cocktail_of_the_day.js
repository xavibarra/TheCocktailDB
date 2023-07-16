export default async function getCocktailOfTheDay() {
  try {
    const currentDate = new Date();
    const storedDate = localStorage.getItem("cocktailDate");

    // Check if a stored date exists in localStorage
    if (storedDate) {
      const storedDateObj = new Date(storedDate);

      // Compare the stored date with the current date
      if (
        currentDate.getDate() === storedDateObj.getDate() &&
        currentDate.getMonth() === storedDateObj.getMonth() &&
        currentDate.getFullYear() === storedDateObj.getFullYear()
      ) {
        // If it's the same day, retrieve the stored cocktail
        const storedCocktail = JSON.parse(localStorage.getItem("cocktail"));
        return storedCocktail;
      }
    }

    // Fetch a new random cocktail
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const newCocktail = data.drinks[0];

    // Store the new cocktail and the current date in localStorage
    localStorage.setItem("cocktail", JSON.stringify(newCocktail));
    localStorage.setItem("cocktailDate", currentDate);

    return newCocktail;
  } catch (error) {
    throw new Error("Error getting the cocktail of the day");
  }
}
