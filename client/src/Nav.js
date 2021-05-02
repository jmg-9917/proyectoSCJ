import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
function Nav() {
    const navStyle = {
        color: 'white'
    }

    return (
        <nav>
            <h1>Sociedad Cientifica Juvenil</h1>
            <ul className="nav-links">
                <Link style={navStyle} to="/login">
                    <li>Log In</li>
                </Link>

            </ul>
        </nav>
    )
}
export default Nav;
