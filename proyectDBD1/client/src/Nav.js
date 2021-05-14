import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
function Nav() {
    const navStyle = {
        color: 'white'
    }
    const handleLogOut = () => {
        Axios.get("http://localhost:3002/login").then((response) => {
            response.data.loggedIn = false;
            response.data.user = [];
            console.log(response.data)
        })
    }
    return (
        <nav>
            <h1>Sociedad Cientifica Juvenil</h1>
            <ul className="nav-links">
                <Link style={navStyle} to="/register">
                    <li>Admin</li>
                </Link>
                <Link style={navStyle} to="/login">
                    <li>Log In</li>
                </Link>
                <Link style={navStyle} to="/login">
                    <button onClick={handleLogOut}>Log Out</button>
                </Link>
            </ul>
        </nav>
    )
}
export default Nav;
