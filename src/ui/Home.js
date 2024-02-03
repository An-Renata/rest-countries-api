import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CountryItem from "./CountryItem";

function Home() {
  const countries = useLoaderData();

  const [countriesList, setCountriesList] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [countriesByRegion, setCountriesByRegion] = useState("all");

  // let currentRegion = useRef("all");
  // const navigate = useNavigate();

  //? SEARCH BY THE REGION OR FROM ALL THE LIST
  useEffect(() => {
    if (searchCountry || countriesByRegion !== "all") {
      const filterCountrySearch = countries.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(searchCountry.toLowerCase()) &&
          country.region.toLowerCase() === countriesByRegion
      );

      setCountriesList(filterCountrySearch);
    }
    if (searchCountry && countriesByRegion === "all") {
      const countrySearchFromAll = countries.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(searchCountry.toLowerCase()) &&
          country.region.toLowerCase()
      );

      setCountriesList(countrySearchFromAll);
    }
  }, [searchCountry, countries, countriesByRegion]);

  //? FILTER COUNTRIES BY REGION
  // Based on the initial render of all countries, filter the regions if any is selected
  useEffect(() => {
    const filteredItems =
      countriesByRegion !== "all"
        ? countries.filter(
            (country) => country.region.toLowerCase() === countriesByRegion
          )
        : // if no region is selected, return all the countries
          countries;

    // update the countriesList array
    setCountriesList(filteredItems);
    // Empty the input after region changes
    setSearchCountry("");

    // if the region changes, navigate to the currently selected region
    // if (countriesByRegion !== currentRegion.current)
    //   navigate(`/region/${countriesByRegion}`);

    // update the ref currentRegion with the currently selected region
    // currentRegion.current = countriesByRegion;
  }, [countriesByRegion, countries]);

  return (
    <div className="pt-10 flex flex-col px-5 sm:px-10">
      {/* ! relative */}
      <div className="flex justify-between mb-10">
        <div className="relative">
          <i
            className="fa-solid fa-magnifying-glass absolute top-4 left-3"
            style={{ color: "cfcfcf" }}
          ></i>
          <input
            type="text"
            value={searchCountry}
            placeholder="Search for a country"
            className="px-10 py-3 shadow-card-shadow rounded-md w-auto lg:w-[400px] "
            onChange={(e) => setSearchCountry(e.target.value)}
          ></input>
        </div>
        <select
          value={countriesByRegion}
          onChange={(e) => setCountriesByRegion(e.target.value)}
          className="cursor-pointer shadow-card-shadow text-sm px-4 rounded-md"
        >
          <option value="all">Filter by region</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      <ul className="flex flex-wrap gap-14 justify-evenly">
        {countriesList.length === undefined && <p>No countries found</p>}

        {countriesList.length > 0 &&
          countriesList.map((country) => (
            <CountryItem country={country} key={country.name.common} />
          ))}
      </ul>
    </div>
  );
}

// loader function
export const countriesLoader = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");

  const data = await res.json();
  return data;
};

export default Home;
