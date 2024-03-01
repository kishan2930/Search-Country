import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [countryData, setCountryData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const filteredCountries = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="body">
      <div>
        <input
          className="search"
          type="text"
          placeholder="Search for Countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.cca3} className="countryCard">
              <img
                src={country.flags.png}
                className="flag"
                alt={`Flag of ${country.name.common}`}
              />
              <h2>{country.name.common}</h2>
            </div>
          ))
        ) : (
          <div>No countries found</div>
        )}
      </div>
    </div>
  );
}
