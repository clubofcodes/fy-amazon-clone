import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CategoryBar } from "./Layouts/Category/CategoryBar";
import Navbar from "./Layouts/Header/Navbar";
import { HomeMainComp } from "./Layouts/Home/HomeMainComp";

function App() {
  return (
    <div>
      <Navbar />
      <CategoryBar />
      <Routes>
        <Route path="/" element={<HomeMainComp />} />
      </Routes>
    </div>
  );
}

export default App;
