import { BsMoon, BsSun } from "react-icons/bs";
import useMode from "./useMode";

const Navbar = () => {
  const [mode, handleToggleMode] = useMode();

  return (
    <nav className="z-10 bg-white dark:bg-darkBlue_darkElement shadow-sm fixed top-0 w-screen text-veryDarkBlue_lightText dark:text-white">
      <div className="p-4 px-8 max-w-[74rem] flex justify-between items-center mx-auto">
        <h1 className="text-xl font-bold">Where in the world</h1>
        <button onClick={handleToggleMode} className="flex gap-2 items-center">
          {mode === "dark" ? (
            <BsSun className="w-4 h-4" />
          ) : (
            <BsMoon className="w-4 h-4" />
          )}
          <p className="font-semibold text-sm">
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
