function SearchInputField({ searchCountry, handleSearch }) {
  return (
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
        onChange={(e) => handleSearch(e)}
      ></input>
    </div>
  );
}

export default SearchInputField;
