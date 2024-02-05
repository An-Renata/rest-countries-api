import { Link, useOutletContext } from "react-router-dom";

function CountryItem({ country }) {
  const [darkMode] = useOutletContext();
  return (
    <Link to={`/country/${country.name.common}`}>
      <li
        className={`cursor-pointer shadow-card-shadow rounded-md overflow-hidden w-[250px] ${
          darkMode
            ? "bg-darkModeElement text-darkModeText shadow-none"
            : "bg-lightModeElement text-lightModeText"
        }`}
        key={country.name.common}
      >
        <img
          className="block w-full h-[140px] overflow-hidden object-fill"
          src={country.flags.png}
          alt={country.flags.alt}
        ></img>
        <div className="px-6 py-10">
          <h3 className="font-extrabold mb-3">{country.name.common}</h3>
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {country.capital}
          </p>
        </div>
      </li>
    </Link>
  );
}

export default CountryItem;
