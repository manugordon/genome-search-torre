import UserSearchBar from "./components/UserSearchBar/UserSearchBar";
import UsersList from "./components/UsersList/UsersList";
import { LinearProgress, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./App.css";
import getSearch from "./services/getSearch";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(sessionStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
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

  const handleSearch = async (query) => {
    setIsLoading(true);
    setQuery(query);
    try {
      const response = await getSearch(query);

      setSearchResults(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="App">
      <UserSearchBar onSearch={handleSearch} />
      {query && isLoading && (
        <Box className="linear-progress-container">
          <LinearProgress />
        </Box>
      )}
      <div className="users-list-container">
        {query &&
          searchResults.map((item) => (
            <UsersList
              user={item}
              favorites={favorites}
              addFavorite={addFavorite}
            />
          ))}
      </div>
      <div className="users-list-favorites-container">
        <h2>Favorites</h2>
        {favorites && favorites.length === 0 ? (
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
