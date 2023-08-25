import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-[74rem] mx-auto p-8 mt-16 md:mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:countryName" element={<Detail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
