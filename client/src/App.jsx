import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddToCart from "./Components/Cart/AddToCart";
import { PageNotFound } from "./Components/PageNotFound/PageNotFound";
import ProductView from "./Components/ProductView/ProductView";
import { CategoryBar } from "./Layouts/Category/CategoryBar";
import Footer from "./Layouts/Footer/Footer";
import Navbar from "./Layouts/Header/Navbar";
import { HomeMainComp } from "./Layouts/Home/HomeMainComp";
import Login from "./Screens/Login/Login";
import Signup from "./Screens/Signup/Signup";
import { AuthProvider } from './Utils/Context/useAuthentication';
import { ProtectComponent } from "./Utils/ProtectComponent";
import { ProtectCartComponent } from "./Utils/ProtectCartComponent";

/** Admin panel */
import AdminDashboard from "./ProtectedScreens/Admin/Dashboard/AdminDashboard";
import Sidebar from './ProtectedScreens/Admin/Components/Drawer/Sidebar';
import AdminProfile from './ProtectedScreens/Admin/AdminProfile';
import UserList from "./ProtectedScreens/Admin/Users/UserList";
import ProductList from "./ProtectedScreens/Admin/Products/ProductList";
import AddProduct from "./ProtectedScreens/Admin/Products/AddProduct";
import UpdateUser from "./ProtectedScreens/Admin/Users/UpdateUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers, getValidateUser } from "./Redux/Users/UserAction";
import { getProducts } from "./Redux/Products/Action";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
    // dispatch(getValidateUser());
  }, [dispatch]);

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
          <Route path="/product/:id" element={<><Navbar /><CategoryBar /><ProductView /><Footer /></>} />
          <Route path="/cart" element={<>
            <ProtectCartComponent>
              <Navbar /><CategoryBar /><AddToCart /><Footer />
            </ProtectCartComponent>
          </>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/admin" element={<Sidebar />} >
            <Route index element={<AdminDashboard />} />
            <Route index path="/admin/dashboard" element={<AdminDashboard />} />
            <Route index path="/admin/profile" element={<AdminProfile />} />
            <Route index path="/admin/users" element={<UserList />} />
            <Route index path="/admin/products" element={<ProductList />} />
            <Route index path="/admin/addproduct" element={<AddProduct />} />
            <Route index path="/admin/edituser" element={<UpdateUser />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
