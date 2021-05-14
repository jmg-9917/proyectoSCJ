import React, {useState} from 'react';
import App from './App.css';
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Axios from 'axios';
import BuscarEvento from './BuscarEvento';
import BuscarIntegrante from './BuscarIntegrante';
import MostrarEventos from './MostrarEventos';
import WelcomeComponent from './WelcomeComponent';
function Dashboard() {
    const handleLogOut = () => {
        Axios.get("http://localhost:3002/login").then((response) => {
            response.data.loggedIn = false;
            response.data.user = [];
            console.log(response.data)

        })

    }


    return (
        <div>
            <Link to="/login">
                <button onClick={handleLogOut}>Log Out</button>
            </Link>
            <Router>
                <WelcomeComponent />
                <Route path="/buscarIntegrante" component={BuscarIntegrante} />
                <Route path="/buscarEvento" component={BuscarEvento} />
                <Route path="/mostrarEventos" component={MostrarEventos} />

            </Router>

        </div>

    )

}



export default Dashboard;

