import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState, useRef } from "react";
import useOutsideAlerter from "./useOutsideAlerter";

type FilterCompProps = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const FilterComp = ({ filter, setFilter }: FilterCompProps) => {
  const [showSelect, setShowSelect] = useState(false);
  const regionsRef = useRef<HTMLDivElement>(null);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleClick = (region: string) => {
    if (filter === region) {
      setFilter("");
    } else {
      setFilter(region);
    }

    setShowSelect(false);
  };

  useOutsideAlerter(regionsRef, setShowSelect);

  return (
    <div className="text-veryDarkBlue_lightText relative w-40 text-xs bg-white shadow-md rounded-md">
      <div
        onClick={() => setShowSelect((prev) => !prev)}
        className="cursor-pointer p-3 px-4 flex justify-between items-center"
      >
        <p>{filter ? filter : "Filter by Region"}</p>
        {showSelect ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </div>
      {showSelect && (
        <div
          ref={regionsRef}
          className="absolute shadow-md w-full bg-white top-[2.6rem] rounded-lg left-0"
        >
          {regions.map((region, idx) => (
            <button
              key={idx}
              className={`py-3 px-4 text-start w-full hover:bg-cyan-100 ${
                filter === region ? "bg-cyan-100" : ""
              }`}
              onClick={() => handleClick(region)}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterComp;
