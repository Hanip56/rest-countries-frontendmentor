import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import CountryCard from "./CountryCard";
import FilterComp from "./FilterComp";
import { Link } from "react-router-dom";

type NativeNameType = {
  [key: string]: string;
};

type CountryNameType = {
  common: string;
  official: string;
  nativeName: NativeNameType;
};

type FlagType = {
  png: string;
  svg: string;
  alt: string;
};

export type CountryType = {
  name: CountryNameType;
  capital: string[];
  region: string;
  population: number;
  flags: FlagType;
};

const Home = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  let filteredCountries = countries;

  if (filter) {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === filter
    );
  }

  if (search) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.official.toLowerCase().includes(search.toLowerCase())
    );
  }

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
      );
      const data = await res.json();

      if (!res.ok) {
        return console.log("Failed to fetch countries");
      }

      setCountries(data);
    };

    fetchCountries();
  }, []);

  return (
    <>
      <header className="flex flex-col gap-y-8 md:flex-row items-start md:items-center justify-between">
        {/* input */}
        <div className="py-3 px-6 w-full md:w-96 bg-white shadow-md flex items-center gap-5 rounded-md">
          <BsSearch className="w-3 h-3 text-darkGray_lightInput" />
          <input
            placeholder="Search for a country..."
            type="text"
            className="outline-none text-xs flex-1 placeholder:text-darkGray_lightInput text-veryDarkBlue_lightText"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* filter */}
        <FilterComp filter={filter} setFilter={setFilter} />
      </header>
      <main className="grid grid-cols-autoFill gap-2 gap-y-20 my-10">
        {filteredCountries?.map((country) => (
          <Link to={`/${country.name.common}`} key={country.name.official}>
            <CountryCard
              name={country.name}
              capital={country.capital}
              flags={country.flags}
              region={country.region}
              population={country.population}
            />
          </Link>
        ))}
      </main>
    </>
  );
};

export default Home;
