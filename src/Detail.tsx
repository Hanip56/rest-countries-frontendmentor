import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const [country, setCountry] = useState<any | undefined>();
  const [borderCountries, setBorderCountries] = useState<string[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { countryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = await res.json();

      if (!res.ok) {
        return setError("Failed to fetch Country");
      }

      const country = data[0];
      setCountry(country);

      const borders = country?.borders?.length > 0;

      console.log({ country });

      if (!borders) {
        setLoading(false);
        return;
      }
      const resBorders = await fetch(
        `https://restcountries.com/v3.1/alpha?fields=name&codes=${country?.borders.join(
          ","
        )}`
      );
      const dataBorders = await resBorders.json();

      setLoading(false);
      if (!resBorders.ok) {
        return setError("Failed to fetch Borders Country");
      }

      setBorderCountries(dataBorders?.map((db: any) => db.name.common));
    };
    fetchCountry();

    return () => {
      setCountry(undefined);
      setBorderCountries(undefined);
    };
  }, [countryName]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  let nativeName = "";
  let languages = [];
  let currencies = [];

  for (const key in country?.languages) {
    languages.push(country?.languages[key]);
  }

  for (const key in country?.currencies) {
    currencies.push(country?.currencies[key].name);
  }

  if (
    country?.name?.nativeName &&
    Object.keys(country?.name.nativeName).length > 0
  ) {
    nativeName =
      country?.name.nativeName[Object.keys(country?.name.nativeName)[0]]
        .official;
  }

  return (
    <>
      <button
        className="flex gap-2 items-center bg-white dark:bg-darkBlue_darkElement shadow-md py-2 px-4 text-sm mb-20 rounded-md"
        onClick={() => navigate("..")}
      >
        <BsArrowLeft />
        <span>Back</span>
      </button>
      <div className="w-full flex flex-col md:flex-row gap-10 md:gap-20">
        <img
          src={country?.flags?.svg}
          alt={country?.flags?.alt}
          className="sm:w-[40%] object-contain mx-auto"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-8">{country?.name?.common}</h1>
          <div className="w-full flex flex-col sm:flex-row items-start gap-8">
            <div className="basis-[50%] space-y-2 text-[16px]">
              <p>
                <span className="font-semibold">Native Name: </span>
                <span>{nativeName}</span>
              </p>
              <p>
                <span className="font-semibold">Population: </span>
                <span>{country?.population}</span>
              </p>
              <p>
                <span className="font-semibold">Region: </span>
                <span>{country?.region}</span>
              </p>
              <p>
                <span className="font-semibold">Sub Region: </span>
                <span>{country?.subregion}</span>
              </p>
              <p>
                <span className="font-semibold">Capital: </span>
                <span>{country?.capital.join(",")}</span>
              </p>
            </div>
            <div className="basis-[50%] space-y-2 text-[16px]">
              <p>
                <span className="font-semibold">Top Level Domain: </span>
                <span>{country?.tld.join(", ")}</span>
              </p>
              <p>
                <span className="font-semibold">Currencies: </span>
                <span>{currencies.join(", ")}</span>
              </p>
              <p>
                <span className="font-semibold">Languages: </span>
                <span>{languages.join(", ")}</span>
              </p>
            </div>
          </div>
          {/* borders */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
            <p className="font-semibold">
              Border Countries: {!borderCountries && <span>-</span>}{" "}
            </p>

            {borderCountries && (
              <div className="flex gap-2 flex-wrap">
                {borderCountries?.map((b, idx) => (
                  <Link key={idx} to={`/${b}`}>
                    <button className="bg-veryLightGray_lightBg dark:bg-darkBlue_darkElement shadow-md py-2 px-4 text-xs rounded-sm">
                      {b}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
