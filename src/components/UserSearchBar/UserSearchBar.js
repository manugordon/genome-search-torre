import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./UserSearchBar.css";

function UserSearchBar({ onSearch }) {
  const [username, setUsername] = useState("");

  const handleInputChange = async (event) => {
    const inputUsername = event.target.value;
    setUsername(inputUsername);
    await onSearch(inputUsername);
  };

  return (
    <div className="search-container">
      <TextField
        className="search-bar"
        label="Search people by name"
        value={username}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default UserSearchBar;
