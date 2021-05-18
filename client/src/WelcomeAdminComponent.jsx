import './App.css';
import Axios from 'axios'
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
const WelcomeAdminComponent = () => {
    const history = useHistory();
    function userFound() {
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.LoggedIn === false || response.data.user.length === 0) {
                history.push('/login')
                window.location.reload()
            }
            else {
                if (response.data.user[0][0].nombre !== "admin") {
                    history.push('/dashboard')
                    window.location.reload()
                }
                console.log(response.data)
            }
        });
    }
    userFound()
    return (
        <div>
            <Link to="/registerDashboard/registerMember">
                <li>Registrar Miembro</li>
            </Link>
            <Link to="/registerDashboard/alterItems">
                <li>Altera algo</li>
            </Link>

            <Link to="/registerDashboard/registerMeeting">
                <li>Registrar una junta</li>
            </Link>
            <Link to="/registerDashboard/registerEvent">
                <li>Registrar un evento</li>
            </Link>
            <Link to="/registerDashboard/registerLabReport">
                <li>Registra una practica</li>
            </Link>
            <Link to="/registerDashboard/registerMaterials">
                <li>Registra materiales</li>
            </Link>
            <Link to="/registerDashboard/registerVisit">
                <li>Registra una visita</li>
            </Link>
        </div>
    )

}

export default WelcomeAdminComponent;

