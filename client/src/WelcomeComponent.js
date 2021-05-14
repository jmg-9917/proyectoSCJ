import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function WelcomeComponent() {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const history = useHistory();

    function userFound() {
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.user[0]) {
                setNombre(response.data.user[0].nombre)
                setApellidos(response.data.user[0].apellidos)
            }
            else {
                history.push('/login')
            }
        })
    }
    userFound()
    return (
        <div>
            <h1>Bienvenido {nombre + " " + apellidos} </h1>
            <h1>Busca eventos de tu interes o encuentra informacion de algun integrante!</h1>
            <Link to="/buscarIntegrante">
                <li>Buscar integrante</li>
            </Link>
            <Link to="/buscarEvento">
                <li>Buscar evento</li>
            </Link>
            <Link to="/mostrarEventos">
                <li>Mostrar eventos</li>
            </Link>

        </div>


    )
}

export default WelcomeComponent;
