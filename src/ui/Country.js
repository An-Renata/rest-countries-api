import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
// Spinner from NPM
import { ClipLoader } from "react-spinners";

const overrideSpinner = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Country() {
  // data about the selected country
  const data = useLoaderData();
  const navigate = useNavigate();

  // Set country
  const [countryBorders, setCountryBorders] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  // Destructuring country data
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
        // If there are neighbours around the country, call async function
        if (borders) {
          setIsloading(true);
          // Temporary variable to store all the country names before putting it to state
          let temp = [];

          for (const el of borders) {
            const border = await getBorderCountries(el);

            temp.push(border);
          }
          // Set borders to state
          setCountryBorders(temp);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }

    fetchBorders();
  }, [borders]);

  return (
    <div className="px-12">
      <button
        // Navigate function goes back to the homepage
        onClick={() => navigate(-1)}
        className="d-block mt-5 border px-6 py-1 text-xs shadow-sm rounded-md font-semibold"
      >
        &larr; Back
      </button>
      {isLoading && (
        // NPM spinner
        <ClipLoader
          color="#2d3b48"
          cssOverride={{
            position: "absolute",
            right: "50%",
            bottom: "50%",
            marginTop: "auto",
            display: "block",
            transform: "translate(-50%, -50%)",
          }}
          loading={isLoading}
          size={50}
          speedMultiplier={1}
        />
      )}

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

// Loader function to get more data about the currently selected country
export const countryLoader = async (country) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

  const data = await res.json();

  return data;
};

// Fet borders data in fullName.
// Selected country gives country code. i.e. ["LTU", "EST"]
// Function calls the API again, to fetch full country name
async function getBorderCountries(code) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

  const data = await res.json();

  return data[0].name.common;
}
