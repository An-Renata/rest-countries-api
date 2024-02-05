import { useOutletContext } from "react-router-dom";

function SelectRegionComponent({ countriesByRegion, handleCountriesByRegion }) {
  const [darkMode] = useOutletContext();
  return (
    <select
      value={countriesByRegion}
      onChange={(e) => handleCountriesByRegion(e)}
      className={`cursor-pointer shadow-card-shadow text-sm px-4 rounded-md w-1/2 py-3  sm:w-auto ${
        darkMode
          ? "bg-darkModeElement text-darkModeText shadow-none"
          : "bg-lightModeElement"
      }`}
    >
      <option value="all">Filter by region</option>
      <option value="africa">Africa</option>
      <option value="americas">America</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="oceania">Oceania</option>
    </select>
  );
}

export default SelectRegionComponent;
