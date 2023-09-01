import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./UserSearchBar.css";

function UserSearchBar({ onSearch }) {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    onSearch(username);
  };

  const handleInputChange = async (event) => {
    const inputUsername = event.target.value;
    setUsername(inputUsername);
    await onSearch(inputUsername);
  };

  return (
    <div>
      <TextField
        className="search-bar"
        label="Search Username"
        value={username}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Enter username"
    //     value={username}
    //     onChange={handleInputChange}
    //   />
    //   <button onClick={handleSearch}>Search</button>
    // </div>
  );
}

export default UserSearchBar;
