import React, { useState } from "react";

const FavoriteButton = ({ favorite, onAddFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onAddFavorite(favorite);
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
