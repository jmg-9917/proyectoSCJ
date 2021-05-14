import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import React, { Component } from 'react';
import { Router, Redirect, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const LogIn = () => {
    const [correo_electronico, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [activo, setActivo] = useState("");
    const [LogInStatus, setLogInStatus] = useState("");
    Axios.defaults.withCredentials = true;
    let history = useHistory();
    const ingresar = () => {
        Axios.post('http://localhost:3002/login', {
            correo: correo_electronico,
            password: password
        }).then((response) => {
            if (response.data.length === 0) {
                console.log(response.data)
                setLogInStatus("No coincide.")

            }
            else {
                setLogInStatus("Bienvenido " + response.data[0].nombre + " " + response.data[0].apellidos)
                console.log("Frontend and backend connected.")
                history.push('/dashboard')


            }
        })
    };

    useEffect(() => {
        Axios.get("http://localhost:3002/login").then((response) => {
            console.log(response.data)
        })
    })

    return (<div className="App">
        <div className="information">
            <h1>Log In</h1>
            <label>Correo Electronico:</label>
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
            <button onClick={ingresar}>Continuar</button>
            <h2>{LogInStatus}</h2>
        </div>
    </div>

    )
}

export default LogIn;

