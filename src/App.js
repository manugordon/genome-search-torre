import "./App.css";
import React, { useState, useEffect } from "react";
import UserSearchBar from "./components/UserSearchBar/UserSearchBar";
import axios from "axios";
import UsersList from "./components/UsersList/UsersList";
// import Spinner from "./components/Spinner/Spinner";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
      <div className="users-list-container">
        {searchResults.map((item) => (
          <UsersList user={item} addFavorite={addFavorite} />
        ))}
      </div>
      {/* <h2>Favorites</h2>
      <ul>
        {console.log(favorites)}
        {favorites.map((favorite, index) => (
          <li key={index}>{favorite.name}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
