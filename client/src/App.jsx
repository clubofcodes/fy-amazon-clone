import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PageNotFound } from "./Components/PageNotFound/PageNotFound";
import { CategoryBar } from "./Layouts/Category/CategoryBar";
import Footer from "./Layouts/Footer/Footer";
import Navbar from "./Layouts/Header/Navbar";
import { HomeMainComp } from "./Layouts/Home/HomeMainComp";
import Login from "./Screens/Login/Login";
import Signup from "./Screens/Signup/Signup";
import { AuthProvider } from './Utils/Context/useAuthentication';
import { ProtectComponent } from "./Utils/ProtectComponent";

function App() {
  return (
    <div className="h-100">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<><Navbar /><CategoryBar /><HomeMainComp /><Footer /></>} />
          <Route path="/signin" element={
            //ProtectComponent Protects it's child component from accessing without login.
            <ProtectComponent>
              <Login />
            </ProtectComponent>
          } />
          <Route path="/register" element={
            <ProtectComponent>
              <Signup />
            </ProtectComponent>
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
