import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

function Country() {
  const data = useLoaderData();

  const [countryBorders, setCountryBorders] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const {
    name: { common: countryName },
    region,
    population,
    name: { official: nativeName },
    capital,
    borders,
    currencies,
    languages,
    tld,
    flags: { svg: flag, alt: flagDescription },
  } = data[0];

  useEffect(() => {
    async function fetchBorders() {
      try {
        if (borders) {
          let temp = [];

          for (const el of borders) {
            const border = await getBorderCountries(el);

            temp.push(border);
          }

          setCountryBorders(temp);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBorders();
  }, [borders]);

  return (
    <div className="px-12">
      <button
        onClick={() => navigate(-1)}
        className="d-block mt-5 border px-6 py-1 text-xs shadow-sm rounded-md font-semibold"
      >
        &larr; Back
      </button>
      {isLoading && <p>LOADING</p>}

      {!isLoading && (
        <div className="grid gap-5 items-center grid-cols-2 py-10">
          <img src={flag} alt={flagDescription} />

          {/* country data */}
          <div className="self-center">
            <h3 className="font-bold text-xl mb-6">{countryName}</h3>

            <div className="flex gap-10 sm:gap-20 mb-6">
              <div className="font-semibold text-sm leading-8">
                <p>
                  Native Name: <span className="font-light">{nativeName}</span>
                </p>
                <p>
                  Population:{" "}
                  <span className="font-light">
                    {population && population.toLocaleString()}
                  </span>
                </p>
                <p>
                  Region: <span className="font-light">{region}</span>
                </p>
                <p>
                  Capital:
                  <span className="font-light"> {capital}</span>
                </p>
              </div>

              <div className="font-semibold text-sm leading-8">
                <p>
                  Top Level Domain:{" "}
                  <span className="font-light"> {tld[0] ?? ""}</span>
                </p>
                <p>
                  Currencies:{" "}
                  {Object.keys(currencies).map((el) => (
                    <span key={el} className="font-light">
                      {currencies[el].name}
                    </span>
                  ))}
                </p>
                <p>
                  Languages:
                  {languages &&
                    Object.keys(languages).map((el, index, obj) => (
                      <span className="font-light" key={el}>
                        {" "}
                        {languages[el]}
                        {index === obj.length - 1 ? "" : ", "}
                      </span>
                    ))}
                </p>
              </div>
            </div>

            <h4 className="text-sm font-semibold">
              Border Countries:{" "}
              <span className="font-light">{countryBorders.join(", ")}</span>
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Country;

export const countryLoader = async (country) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

  const data = await res.json();

  return data;
};

async function getBorderCountries(code) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

  const data = await res.json();

  return data[0].name.common;
}
