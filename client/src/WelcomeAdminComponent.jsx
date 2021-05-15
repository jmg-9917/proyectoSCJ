import './App.css';
import { useState } from 'react';
import Axios from 'axios'
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
const WelcomeAdminComponent = () => {
    const history = useHistory();
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    function userFound() {
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.LoggedIn === false || response.data.user.length === 0) {
                history.push('/login')
                window.location.reload()
            }
            else {
                console.log(response.data)
                setNombre(response.data.user[0][0].nombre)
                setApellidos(response.data.user[0][0].apellidos)
            }
        })
    }
    userFound()
    return (
        <div>
            <h2>{nombre}</h2>
            <Link to="/registerMember">
                <li>Registrar Miembro</li>
            </Link>
            <Link to="/registerMeeting">
                <li>Registrar una junta</li>
            </Link>
            <Link to="/registerEvent">
                <li>Registrar un evento</li>
            </Link>
            <Link to="/registerLabReport">
                <li>Registra una practica</li>
            </Link>
            <Link to="/registerMaterials">
                <li>Registra materiales</li>
            </Link>
            <Link to="/registerVisits">
                <li>Registra una visita</li>
            </Link>
        </div>
    )

}

export default WelcomeAdminComponent;

