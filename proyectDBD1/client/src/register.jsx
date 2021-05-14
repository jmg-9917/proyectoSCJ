import './App.css';
import { useState } from 'react';
import Axios from 'axios'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telefono, setTelefono] = useState("");
    const [puesto, setPuesto] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [fecha, setFecha] = useState("");
    const [LogInStatus, setLogInStatus] = useState("");
    const [activo, setActivo] = useState(false);

    const [nombreEvento, setNombreEvento] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [nacional, setNacional] = useState(false);


    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [participantes, setParticipantes] = useState("");

    function getFormattedDate() {
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        const formatted = yyyy + '-' + mm + '-' + dd;
        return formatted
    }

    const registrarJunta = () => {
        setParticipantes("No hay participantes aun.")
        Axios.post('http://localhost:3002/createJunta', {
            tipo: tipo,
            descripcion: descripcion,
            participantes: participantes
        }).then(() => {
            console.log("Junta registrada.")
        })
    };

    const registrarEvento = () => {
        Axios.post('http://localhost:3002/createEvent', {
            nombreEvento: nombreEvento,
            ciudad: ciudad,
            nacional: nacional
        }).then(() => {
            console.log(fecha)
            console.log("Frontend and backend connected.")
        })
    };
    const registrarIntegrante = () => {
        setActivo(true)
        const formatFecha = getFormattedDate()
        setFecha(formatFecha)
        Axios.post('http://localhost:3002/create', {
            nombre: nombre,
            apellidos: apellidos,
            telefono: telefono,
            puesto: puesto,
            correo: correo,
            fecha: fecha,
            password: password,
            activo: activo
        }).then(() => {
            console.log(fecha)
            console.log("Frontend and backend connected.")
        })
    };
    return (<div className="App">
        <div className="information">
            <h2>Registrar integrante</h2>
            <label>Nombre:</label>
            <input
                type="text"
                onChange={(event) => {
                    setNombre(event.target.value)

                }}
            />
            <label>Apellidos</label>
            <input
                type="text"
                onChange={(event) => {
                    setApellidos(event.target.value)

                }}
            />
            <label>Telefono:</label>
            <input
                type="number"
                onChange={(event) => {
                    setTelefono(event.target.value)

                }}
            />
            <label>Correo electronico:</label>
            <input
                type="text"
                onChange={(event) => {
                    setCorreo(event.target.value)

                }}
            />
            <label>Contraseña:</label>
            <input
                type="password"
                onChange={(event) => {
                    setPassword(event.target.value)

                }}
            />
            <label>Puesto:</label>
            <input
                type="text"
                onChange={(event) => {
                    setPuesto(event.target.value)

                }}
            />
            <button onClick={registrarIntegrante}>Registrar integrante</button>
            <h2>Registrar evento</h2>
            <label>Nombre del evento:</label>
            <input
                type="text"
                onChange={(event) => {
                    setNombreEvento(event.target.value)

                }}
            />
            <label>Ciudad</label>
            <input
                type="text"
                onChange={(event) => {
                    setCiudad(event.target.value)

                }}
            />
            <label>Es nacional?</label>
            <input
                type="radio" id="nacional" name="choice" value="si"

                onChange={(event) => {
                    if (event.target.value == "si")
                        setNacional(true)
                    console.log(nacional)
                }}
            />
            <label> Si</label>
            <input
                type="radio" id="noNacional" name="choice" value="no"

                onChange={(event) => {
                    if (event.target.value == "no")
                        setNacional(false)
                    console.log(nacional)
                }}
            />
            <label>No</label>
            <button onClick={registrarEvento}>Registrar evento</button>


            <h2>Registrar junta</h2>
            <label>Tipo de junta:</label>
            <input
                type="text"
                onChange={(event) => {
                    setTipo(event.target.value)

                }}
            />
            <label>Descripcion:</label>
            <input
                type="text"
                onChange={(event) => {
                    setDescripcion(event.target.value)
                    setParticipantes("")
                }}
            />
            <button onClick={registrarJunta}>Registrar junta</button>
        </div>
    </div>

    )
}

export default Register;

