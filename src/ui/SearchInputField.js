import { useOutletContext } from "react-router-dom";

function SearchInputField({ searchCountry, handleSearch }) {
  const [darkMode] = useOutletContext();

  return (
    <div
      className={`relative ${
        darkMode ? "text-darkModeText" : "text-lightModeText"
      }`}
    >
      <i
        className="fa-solid fa-magnifying-glass absolute top-4 left-3"
        style={{ color: "cfcfcf" }}
      ></i>
      <input
        type="text"
        value={searchCountry}
        placeholder="Search for a country"
        className={`px-10 py-3 shadow-card-shadow rounded-md w-auto lg:w-[400px]  ${
          darkMode ? "bg-darkModeElement  shadow-none" : "bg-lightModeElement"
        }`}
        onChange={(e) => handleSearch(e)}
      ></input>
    </div>
  );
}

export default SearchInputField;
