import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {Hidden} from '@material-ui/core';

const userLoggedIn = () => {
    Axios.get('http://localhost:3002/login').then((response) => {
        if (response.data.length === 0) {
            return false
        }
        else {return true}
    })
}

function Nav() {
    const navStyle = {
        color: 'white'
    }
    const logged = userLoggedIn();
    if (logged) {
        document.getElementById("login").style.visibility = 'hidden'
    }
    return (
        <div>
            <nav>
                <ul className="nav-links">
                    <h1>Sociedad Cientifica Juvenil</h1>
                </ul>
            </nav>
        </div>
    )
}
export default Nav;
