import React from "react";
import {
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemButton,
  Divider,
} from "@mui/material";
import "./UsersList.css";

import FavoriteButton from "../FavoriteButton/FavoriteButton";

const UsersList = ({ user, favorites, addFavorite }) => {
  return (
    <List className="users-list">
      <ListItemButton component="a" href={`https://torre.ai/${user.username}`}>
        <ListItemAvatar>
          <Avatar src={user.imageUrl}>Foto</Avatar>
        </ListItemAvatar>
        <ListItemText
          className="user-info"
          primary={user.name}
          secondary={user.professionalHeadline}
        />
        <FavoriteButton
          user={user}
          favorites={favorites}
          onAddFavorite={addFavorite}
        />
      </ListItemButton>

      <Divider className="divider" variant="fullWidth" component="li" />
    </List>
  );
};

export default UsersList;
