import { useEffect, useState } from "react";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
import CountryItem from "./CountryItem";
import SearchInputField from "./SearchInputField";
import SelectRegionComponent from "./SelectRegionComponent";

function Home() {
  const [darkMode] = useOutletContext();

  // states to store data when user is searching for a country of filters countries by region
  const [countriesList, setCountriesList] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [countriesByRegion, setCountriesByRegion] = useState("all");

  // loader data returns information about the countries
  const countries = useLoaderData();

  function handleSearch(e) {
    setSearchCountry(() => e.target.value);
  }

  function handleCountriesByRegion(e) {
    setCountriesByRegion(() => e.target.value);
  }

  //? SEARCH BY THE REGION OR FROM ALL THE LIST
  useEffect(() => {
    if (searchCountry || countriesByRegion !== "all") {
      // Filter countries which match the given string in the search field
      const filterCountrySearch = countries.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(searchCountry.toLowerCase()) &&
          country.region.toLowerCase() === countriesByRegion
      );
      // Set this filtered list based on the search results to render on the screen
      setCountriesList(filterCountrySearch);
    }
    // Search country from all country list
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
            // Filter just those countries which has the same selected region
            (country) => country.region.toLowerCase() === countriesByRegion
          )
        : // If no region is selected, return all the countries
          countries;

    // Update the countriesList array
    setCountriesList(filteredItems);
    // Clear the input field after region changes
    setSearchCountry("");
  }, [countriesByRegion, countries]);

  return (
    <div
      className={`pt-10 flex flex-col px-5 sm:px-10 transition-all duration-1000 ${
        darkMode ? "bg-darkModeBackground" : "bglightModeBackground"
      }`}
    >
      <div className="flex justify-between mb-10">
        {/* Search field */}
        <SearchInputField
          searchCountry={searchCountry}
          handleSearch={handleSearch}
        />

        {/* Dropdown list of region selection field */}
        <SelectRegionComponent
          handleCountriesByRegion={handleCountriesByRegion}
          countriesByRegion={countriesByRegion}
        />
      </div>

      <ul className="flex flex-wrap gap-14 justify-evenly">
        {/* Render this "error" message if there are no countries to be found */}
        {countriesList.length === 0 && (
          <p>
            No countries found by name <strong>{searchCountry}</strong> 🥺
          </p>
        )}
        {/* Loop through the given country list from the *LOADER* to create each item of the country */}
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
