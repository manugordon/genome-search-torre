import React from "react";

import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./FavoriteButton.css";

const FavoriteButton = ({ user, favorites, onAddFavorite }) => {
  const isFavorite =
    favorites.length > 0 && favorites.some((f) => f.ardaId === user.ardaId);

  const toggleFavorite = (e) => {
    e.preventDefault();
    onAddFavorite(user);
  };

  return (
    <IconButton className="favorite-button" onClick={toggleFavorite}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
