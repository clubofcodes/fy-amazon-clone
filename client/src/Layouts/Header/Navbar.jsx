import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useRef } from 'react';
import { resizeSelect } from '../../Utils/SelectResizer';
import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../../Utils/Context/useAuthentication';

const Navbar = () => {

    const Categories = ["All Categories", "Alexa Skills", "Amazon Devices", "Apps & Games", "Beauty", "Baby", "Car & Motorbike", "Clothing & Accessories", "Art & Crafts"]

    const SelectRef = useRef();
    const inputRef = useRef();

    //Custom hook to verify is user logedIn.
    const userAuth = useAuthentication();

    useEffect(() => {
        // resize on initial load
        resizeSelect(SelectRef.current);

        SelectRef.current.addEventListener('change', (e) => {
            resizeSelect(e.target);
            inputRef.current.focus();
        });

    }, []);


    return (
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
                        {(!userAuth.userData?.email) ? <NavLink className="signin_dbtn" to="/signin" >Sign In</NavLink> : <NavLink className="signin_dbtn" to="/" onClick={() => userAuth.logout()} >Sign Out</NavLink>}
                    </div>
                    <a className="nav_atag" href=''>
                        <div className="nav_btn">
                            Returns
                            <p>&amp; Orders</p>
                        </div>
                    </a>
                    <div className="cart_btn cart_inset">
                        <span className="cart_count">5</span>
                        <img src="./Assets/img/cart.png" alt="" height="34" />
                        <span className="cart_text">Cart</span>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Navbar;