import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';

function WelcomeComponent() {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");

    function UserFound() {
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.LoggedIn) {
                console.log(response.data)
                setNombre(response.data.user[0][0].nombre)
                setApellidos(response.data.user[0][0].apellidos)
            }
            else {
                console.log(response.data)
            }
        })
    }
    UserFound()
    return (
        <div>
            <h1>Bienvenido {nombre + " " + apellidos} </h1>
            <h1>Busca eventos de tu interes o encuentra informacion de algun integrante!</h1>
            <Link to="/dashboard/buscarIntegrante">
                <li>Buscar integrante</li>
            </Link>
            <Link to="/dashboard/buscarEvento">
                <li>Buscar evento</li>
            </Link>
            <Link to="/dashboard/buscarJunta">
                <li>Buscar junta</li>
            </Link>
            <Link to="/dashboard/buscarPractica">
                <li>Buscar practica</li>
            </Link>

            <Link to="/dashboard/mostrarEventos">
                <li>Mostrar eventos</li>
            </Link>
            <Link to="/dashboard/verPerfil">
                <li>Ver informacion de su perfil</li>
            </Link>

        </div>


    )


}

export default WelcomeComponent;
