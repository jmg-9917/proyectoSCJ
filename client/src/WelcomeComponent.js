import React from 'react';
import Axios from 'axios';
import {useState} from 'react';
import {useHistory, Link, Redirect} from 'react-router-dom';
import {ListGroup} from 'react-bootstrap';

function WelcomeComponent() {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const history = useHistory()
    Axios.defaults.withCredentials = true
    function UserFound() {
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.LoggedIn) {
                console.log(response.data)
                setNombre(response.data.user[0][0].nombre)
                setApellidos(response.data.user[0][0].apellidos)
            }
            if (response.data.LoggedIn === false || response.data.user.length === 0) {
                history.push('/login')
                window.location.reload()
            }
        })
    }
    UserFound()
    return (
        <div>
            <ListGroup >
                <ListGroup.Item>
                    <Link to="/dashboard/verPerfil">
                        <li>Ver informacion de su perfil</li>
                    </Link>
                </ListGroup.Item >
                <ListGroup.Item >
                    <Link to="/dashboard/buscarIntegrante">
                        <li>Buscar integrante</li>
                    </Link>
                </ListGroup.Item >
                <ListGroup.Item >
                    <Link to="/dashboard/buscarEvento">
                        <li>Buscar evento</li>
                    </Link>
                </ListGroup.Item >
                <ListGroup.Item >
                    <Link to="/dashboard/buscarJunta">
                        <li>Buscar junta</li>
                    </Link>
                </ListGroup.Item >
                <ListGroup.Item >
                    <Link to="/dashboard/buscarPractica">
                        <li>Buscar practica</li>
                    </Link>
                </ListGroup.Item >
                <ListGroup.Item >
                    <Link to="/dashboard/buscarVisita">
                        <li>Buscar visita</li>
                    </Link>
                </ListGroup.Item >

            </ListGroup >
        </div>


    )


}

export default WelcomeComponent;
