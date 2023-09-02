import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useRef } from "react";
import "./UserSearchBar.css";

function UserSearchBar({ onSearch }) {
  const inputRef = useRef(null);
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
        onClick={handleInputChange}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        inputRef={inputRef}
      />
    </div>
  );
}

export default UserSearchBar;
