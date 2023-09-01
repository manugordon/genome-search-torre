import "./App.css";
import React, { useState, useEffect } from "react";
import UserSearchBar from "./components/UserSearchBar/UserSearchBar";
import axios from "axios";
import UsersList from "./components/UsersList/UsersList";
import { LinearProgress, Box } from "@mui/material";

// import Spinner from "./components/Spinner/Spinner";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(sessionStorage.getItem("favorites"));
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (favorite) => {
    if (!favorites.some((f) => f.ardaId === favorite.ardaId)) {
      setFavorites([...favorites, favorite]);
    } else {
      setFavorites(favorites.filter((f) => f.ardaId !== favorite.ardaId));
    }
  };

  const getData = (jsonString) => {
    const jsonArray = jsonString.split("}\n");
    jsonArray.pop();

    const jsonObjects = jsonArray.map((json) => {
      try {
        return JSON.parse(json + "}");
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    });
    return jsonObjects;
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://torre.ai/api/entities/_searchStream",
        {
          query: query,
          identityType: "person",
          limit: 10,
        }
      );
      const data = getData(response.data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="App">
      <UserSearchBar onSearch={handleSearch} />
      {isLoading && (
        <Box className="linear-progress-container">
          <LinearProgress />
        </Box>
      )}
      <div className="users-list-container">
        {searchResults.map((item) => (
          <UsersList
            user={item}
            favorites={favorites}
            addFavorite={addFavorite}
          />
        ))}
      </div>
      <div className="users-list-favorites-container">
        <h2>Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites selected yet.</p>
        ) : (
          favorites.map((favorite) => (
            <UsersList
              user={favorite}
              favorites={favorites}
              addFavorite={addFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
