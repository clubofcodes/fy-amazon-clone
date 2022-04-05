import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useRef } from 'react';
import { resizeSelect } from '../../Utils/SelectResizer';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../Utils/Context/useAuthentication';
import Footer from '../Footer/Footer';

const Navbar = () => {

    const Categories = ["All Categories", "Alexa Skills", "Amazon Devices", "Apps & Games", "Beauty", "Baby", "Car & Motorbike", "Clothing & Accessories", "Art & Crafts"]

    const SelectRef = useRef();
    const inputRef = useRef();

    //Custom hook to verify is user logedIn.
    const userAuth = useAuthentication();
    //routing hook to go to particular path.
    const navigate = useNavigate();

    useEffect(() => {
        // resize on initial load
        resizeSelect(SelectRef.current);
        SelectRef.current.addEventListener('change', (e) => {
            resizeSelect(e.target);
            inputRef.current.focus();
        });

    }, []);

    //For user logout
    const logoutuser = async () => {
        const logoutResponse = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        await logoutResponse.json();

        if (!logoutResponse.status === 200) {
            const error = new Error(logoutResponse.error);
            throw error;
        } else {
            userAuth.logout();
            navigate("/", { replace: true });
        }
    }

    return (
        <>
            <header>
                <nav>
                    <div className="left">
                        <div className="navlogo">
                            <NavLink to="/"><img src="./Assets/img/amazon_PNG25.png" alt="App Logo" /></NavLink>
                        </div>
                        <div className="nav_searchbaar">
                            <select
                                ref={SelectRef}
                                name='searchSelect'
                                className='SearchSelect'
                                defaultValue='All'>
                                <option value='All'>All</option>
                                {Categories &&
                                    Categories.map((option, index) => {
                                        return (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        );
                                    })}
                            </select>
                            <input ref={inputRef} type="text" name="" placeholder="Search Your Products" />
                            <div className="search_icon">
                                <SearchIcon id="search" />
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <NavLink className="nav_atag" to={!userAuth.userData?.email ? "/signin" : "/account"} id="signin_tag">
                            <div className="nav_btn">
                                Hello, {!userAuth.userData?.email ? "Sign in" : userAuth.userData?.fullname.split(" ")[0]}
                                <p>Account &amp; List <ArrowDropDownIcon fontSize="small" /> </p>
                            </div>
                        </NavLink>
                        <div className="dropdown_box card w-25 align-items-center d-none" id="dbox">
                            {(!userAuth.userData?.email) ? <NavLink className="signin_dbtn" to="/signin" >Sign In</NavLink> : <NavLink className="signin_dbtn" to="/" onClick={() => logoutuser()} >Sign Out</NavLink>}
                        </div>
                        <a className="nav_atag" href=''>
                            <div className="nav_btn">
                                Returns
                                <p>&amp; Orders</p>
                            </div>
                        </a>
                        <NavLink className="nav_atag cart_btn cart_inset" to={!userAuth.userData?.email ? "/signin" : "/cart"}>
                            <span className="cart_count">{userAuth.userData?.carts?.reduce((total, first) => (total + first.qty), 0) || 0}</span>
                            <img src="./Assets/img/cart.png" alt="" height="34" />
                            <span className="cart_text">Cart</span>
                        </NavLink>
                    </div>
                </nav>
            </header >
            <Outlet />
            <Footer />
        </>
    )
}

export default Navbar;