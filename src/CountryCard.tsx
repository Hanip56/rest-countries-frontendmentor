import { useState } from "react";
import { CountryType } from "./Home";

const CountryCard = ({
  name,
  capital,
  flags,
  population,
  region,
}: CountryType) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoad = () => {
    setImgLoaded(true);
  };

  return (
    <div className="w-64 bg-white dark:bg-darkBlue_darkElement rounded-lg overflow-hidden shadow-md mx-auto cursor-pointer hover:shadow-xl transition-shadow">
      {!imgLoaded && <div className="bg-gray-500 animate-pulse h-40" />}
      <img
        src={flags.svg}
        alt={flags.alt}
        onLoad={handleLoad}
        className={imgLoaded ? "block" : "hidden"}
      />
      <div className="p-4 text-sm leading-7">
        <h4 className="text-base font-bold mb-2">{name.common}</h4>
        <p>
          <span className="font-semibold">Population: </span>
          {population}
        </p>
        <p>
          <span className="font-semibold">Region: </span>
          {region}
        </p>
        <p>
          <span className="font-semibold">Capital: </span>
          {capital.join(",")}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
