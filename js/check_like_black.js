export function checkLike(cocktail) {
  const favorites = JSON.parse(localStorage.getItem("fav"));

  if (favorites) {
    const cocktailId = cocktail.idDrink;

    const isCocktailLiked = favorites.find((fav) => fav.idDrink === cocktailId);

    if (isCocktailLiked) {
      // The cocktail is saved as a favorite
      return "../assets/full-like-black.png";
    } else {
      // The cocktail isn't saved as a favorite
      return "../assets/like-out-black.png";
    }
  } else {
    // There aren't cocktails saved as favourites
    return "../assets/like-out-black.png";
  }
}
export function toggleFavorite(cocktail) {
  let favorites = JSON.parse(localStorage.getItem("fav")) || [];

  const index = favorites.findIndex((fav) => fav.idDrink === cocktail.idDrink);
  if (index > -1) {
    // If the cocktail is already in the favorites list, remove it
    favorites.splice(index, 1);
  } else {
    // If the cocktail is not in the favorites list, add it
    favorites.push(cocktail);
  }

  // Save the updated favorites list to localStorage as a JSON string
  localStorage.setItem("fav", JSON.stringify(favorites));
}
