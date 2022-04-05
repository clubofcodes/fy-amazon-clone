//import useState hook to create menu collapse state
import React from "react";
import { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  MenuItem,
} from "react-pro-sidebar";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
// import { logout } from "../../../../Redux/Users/UserAction";
import "./Sidebar.css";

const Sidebar = () => {

  const location = useLocation();
  const [isActive, setisActive] = useState(location.pathname);
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const selectCurrentTab = (curName) => {
    setisActive(curName)
  }
  const dispatch = useDispatch();
  return (
    <>
      <div id="header" className="disp-product">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <div className="text-center">
                <Link
                  to="/"
                >
                  <img
                    className={menuCollapse ? "w-75 p-2" : "w-50 p-3"}
                    src="/logo512.png"
                    alt=""
                  />
                </Link>
                <br />
                {!menuCollapse && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setisActive("/admin/dashboard")}
                    className="text-dark text-center"
                  >
                    E-Shop
                  </Link>
                )}
              </div>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <i className="bi bi-arrow-right-circle"></i>
              ) : (
                <i className="bi bi-arrow-left-circle"></i>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square"  className="drawer-menu">
              <MenuItem
                className={(isActive === "/admin/dashboard" || isActive === "/admin") && "active"}
                icon={<i className="bi bi-house-door"></i>}
              >
                <Link to="/admin/dashboard">Dashboard</Link>
              </MenuItem>
              <MenuItem
                className={isActive === "/admin/profile" && "active"}
                icon={<i className="bi bi-people"></i>}
              >
                <Link to="/admin/profile">Profile</Link>
              </MenuItem>
              <MenuItem
                className={isActive === "/admin/users" && "active"}
                icon={<i className="bi bi-people"></i>}
              >
                <Link to="/admin/users">Users</Link>
              </MenuItem>
              <MenuItem
                className={isActive === "/admin/products" && "active"}
                icon={<i className="bi bi-bag-plus"></i>}
              >
                <Link to="/admin/products">Product</Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter className="disp-product">
            <Menu iconShape="square">
              <MenuItem
                className={isActive === "/admin/logout" && "active"}
                onClick={() => {
                  setisActive("/admin/logout");
                  // dispatch(logout());
                }}
                icon={<i className="bi bi-box-arrow-in-right"></i>}
              >
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
      <main className={menuCollapse ? "slide-close" : "slide-open"} id="main-section">
        <Outlet context={{selectCurTab:selectCurrentTab}}/>
      </main>
    </>
  );
};

export default Sidebar;
