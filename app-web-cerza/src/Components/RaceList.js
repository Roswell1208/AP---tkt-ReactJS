import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/RaceList.css";

const RaceList = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8080/api/races");
      setData(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = data.filter((item) =>
      item.libelleRace.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  }, [data, query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="fond">
      <div className="search-bar">
        <form>
          <input
            type="text"
            placeholder="Rechercher une race d'animal"
            value={query}
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div className="container">
        {searchResults.map((item) => (
          <div key={item.idRace} className="card">
            <div className="imgBx">
              <img src={item.imgRace} alt="img" />
            </div>
            <div className="content">
              <h2>{item.libelleRace}</h2>
              <p>{item.descriptionRace}</p>
              <Link to={`/encyclopédieAnimal?idRace=${item.idRace}`}>
                En savoir plus
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceList;
