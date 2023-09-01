import React, { useState } from "react";

import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./FavoriteButton.css";

const FavoriteButton = ({ favorite, onAddFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    onAddFavorite(favorite);
  };

  return (
    <IconButton className="favorite-button" onClick={toggleFavorite}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
