import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CategoryBar } from "./Layouts/Category/CategoryBar";
import Footer from "./Layouts/Footer/Footer";
import Navbar from "./Layouts/Header/Navbar";
import { HomeMainComp } from "./Layouts/Home/HomeMainComp";
import Login from "./Screens/Login/Login";
import Signup from "./Screens/Signup/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={[<Navbar />, <CategoryBar />, <HomeMainComp />, <Footer />]}
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
