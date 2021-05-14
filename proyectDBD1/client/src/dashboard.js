import React, { useState } from 'react';
import App from './App.css';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import Axios from 'axios';
import BuscarEvento from './BuscarEvento';
import BuscarIntegrante from './BuscarIntegrante';
import MostrarEventos from './MostrarEventos';
import WelcomeComponent from './WelcomeComponent';
function Dashboard() {

    return (
        <Router>
            <WelcomeComponent />
            <Route path="/buscarIntegrante" component={BuscarIntegrante} />
            <Route path="/buscarEvento" component={BuscarEvento} />
            <Route path="/mostrarEventos" component={MostrarEventos} />

        </Router>
    )

}



export default Dashboard;

