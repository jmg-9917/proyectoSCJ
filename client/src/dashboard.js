import React from 'react';
import App from './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import BuscarEvento from './BuscarEvento';
import BuscarIntegrante from './BuscarIntegrante';
import BuscarPractica from './BuscarPractica';
import BuscarJunta from './BuscarJunta';
import MostrarEventos from './MostrarEventos';
import WelcomeComponent from './WelcomeComponent';
import UserProfileView from './UserProfileView';
import { Button } from 'react-bootstrap';
function Dashboard() {
    const handleLogOut = () => {
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:3002/logout").then((response) => {
            console.log(response.data)

        })

    }

    return (
        <div>
            <Link to="/login">
                <Button onClick={handleLogOut}>Log Out</Button>
            </Link>
            <Router>
                <WelcomeComponent />
                <Route path="/dashboard/buscarIntegrante" component={BuscarIntegrante} />
                <Route path="/dashboard/buscarEvento" component={BuscarEvento} />
                <Route path="/dashboard/mostrarEventos" component={MostrarEventos} />
                <Route path="/dashboard/buscarPractica" component={BuscarPractica} />
                <Route path="/dashboard/buscarJunta" component={BuscarJunta} />
                <Route path="/dashboard/verPerfil" component={UserProfileView} />
            </Router>


        </div>

    )


}
export default Dashboard;

