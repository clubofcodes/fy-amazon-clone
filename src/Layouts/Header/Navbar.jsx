import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useRef } from 'react';
import { resizeSelect } from '../../Utils/SelectResizer';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const Categories = ["All Categories", "Alexa Skills", "Amazon Devices", "Apps & Games", "Beauty", "Baby", "Car & Motorbike", "Clothing & Accessories", "Art & Crafts"]

    const SelectRef = useRef();
    const inputRef = useRef();

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
                        <NavLink to="/"><img src="./Assets/img/amazon_PNG25.png" alt="" /></NavLink>
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
                    <a href=''>
                        <div className="nav_btn">
                            Hello, Sign in
                            <p>Account &amp; List <ArrowDropDownIcon fontSize="small" /> </p>
                        </div>
                    </a>
                    <a href=''>
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
        </header>
    )
}

export default Navbar;