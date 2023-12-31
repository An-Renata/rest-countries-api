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
  // hsl(0, 0%, 98%)
  // shadow-md
  return (
    <div className="flex flex-col bg-[#fafafa] pt-10">
      <div className="flex justify-items-center justify-between px-2 lg:px-11 mb-10">
        <div className="relative   ">
          <i
            className="fa-solid fa-magnifying-glass absolute top-4 left-3"
            style={{ color: "cfcfcf" }}
          ></i>
          <input
            type="text"
            placeholder="Search for a country"
            className="px-10 py-3 shadow-card-shadow rounded-md w-auto lg:w-[400px] "
          ></input>
        </div>
        <select className="cursor-pointer shadow-card-shadow text-sm px-4 rounded-md">
          <option value="0">Filter by region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      {/* flex justify-center */}
      {/* flex flex-wrap gap-14 justify-center */}
      <div className="px-2 lg:px-11">
        <ul className="flex flex-wrap gap-16 justify-between">
          {countries.map((country) => (
            <li class=" cursor-pointer shadow-card-shadow rounded-md overflow-hidden w-[280px]">
              {/* <div> */}
              <img
                className="block w-full  h-[140px] overflow-hidden object-fill"
                src={country.flags.png}
                alt={country.flags.alt}
              ></img>
              {/* </div> */}
              <div className="px-6 py-10">
                <h3 className="font-extrabold mb-3">{country.name.common}</h3>
                <p>
                  <span className="font-semibold">Population:</span>{" "}
                  {/* toLocaleString() methods puts commas between numbers for better readability */}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
