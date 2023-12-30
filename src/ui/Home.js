import { useEffect, useState } from "react";

function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch("https://restcountries.com/v3.1/all");

      const data = await res.json();

      setCountries(data);
    }

    fetchCountries();
  }, []);

  return (
    <div>
      <div>
        <input type="text" placeholder="search for a country"></input>
        <select>
          <option value="0">Filter by region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="main">
        <ul className="country">
          {countries.map((country) => (
            <li class="card">
              <div className="img">
                <img src={country.flags.png} alt={country.flags.alt}></img>
              </div>
              <div className="about-country">
                <h3>{country.name.common}</h3>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
            </li>
          ))}
          {/* */}
          {/* 
          <li>
            <div>
              <p>IMG</p>
            </div>
            <div>
              <h3>Lithuania</h3>
              <p>population</p>
              <p>region</p>
              <p>capital</p>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Home;
