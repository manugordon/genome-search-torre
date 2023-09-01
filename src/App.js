import "./App.css";
import React, { useState, useEffect } from "react";
import UserSearchBar from "./components/UserSearchBar/UserSearchBar";
import axios from "axios";
import FavoriteButton from "./components/FavoriteButton/FavoriteButton";

// import Spinner from "./components/Spinner/Spinner";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(sessionStorage.getItem("favorites"));
    setFavorites(storedFavorites);
  }, []);

  // Guardar favoritos en localStorage cuando cambian
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
    if (query !== "") {
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
        console.log({ data: data });
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className="App">
      <UserSearchBar onSearch={handleSearch} />
      <div className="results-container">
        <ul className="results-list">
          {searchResults.map((result, index) => (
            <li key={index}>
              <a href={`https://torre.ai/${result.username}`}>
                {result.name} <br></br> {result.professionalHeadline}
              </a>
              <FavoriteButton favorite={result} onAddFavorite={addFavorite} />
            </li>
          ))}
        </ul>
      </div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>{favorite.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
