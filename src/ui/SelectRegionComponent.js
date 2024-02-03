function SelectRegionComponent({ countriesByRegion, handleCountriesByRegion }) {
  return (
    <select
      value={countriesByRegion}
      onChange={(e) => handleCountriesByRegion(e)}
      className="cursor-pointer shadow-card-shadow text-sm px-4 rounded-md"
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
