import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (disabled) => {

    return (
        <nav className="navbar">
            <NavLink to="/form" activeStyle={{color: "white"}} >Form</NavLink>
            { disabled ? <div>Report</div> : <NavLink to="/report" activeStyle={{color: "white"}}>Report</NavLink>}
        </nav>
    )
}

export default Navbar;