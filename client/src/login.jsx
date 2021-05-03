import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import React, { Component } from 'react';
import { Router, Redirect, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { TextField, Button, FormHelperText } from '@material-ui/core';
import validator from 'validator'
const LogIn = () => {
    const [correo_electronico, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [activo, setActivo] = useState("");
    const [LogInStatus, setLogInStatus] = useState("");

    const [correoError, setCorreoError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    Axios.defaults.withCredentials = true;
    let history = useHistory();

    function errorInFields() {
        let errors = {
            emailError: false,
            passwordError: false
        }
        if (validator.isEmail(correo_electronico)) {
            errors.emailError = false
        }
        else {
            setCorreoError('Inserte un correo electronico valido.')
            errors.emailError = true
        }
        if (validator.isEmpty(password)) {
            setPasswordError('Inserte su contraseña.')
            errors.passwordError = true
        }
        else if (password.length > 3) { errors.passwordError = true }
        return errors
    }

    const ingresar = () => {
        const errorDetected = errorInFields();
        if (errorDetected.emailError === false || errorDetected.passwordError === false) {
            Axios.post('http://localhost:3002/login', {
                correo: correo_electronico,
                password: password
            }).then((response) => {
                if (response.data.length === 0) {
                    console.log(response.data)

                }
                else {
                    setLogInStatus("Bienvenido " + response.data[0].nombre + " " + response.data[0].apellidos)
                    console.log("Frontend and backend connected.")
                    if (response.data[0].nombre === "admin") {
                        history.push('/registerDashboard')
                    }
                    else {

                        history.push('/dashboard')
                    }
                }
            })

        }
        else {
            console.log("not valid")
        }
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
            <TextField
                type="text"
                onChange={(event) => {
                    setCorreo(event.target.value)
                }}
                helperText={correoError}
            />
            <label>Contraseña:</label>
            <TextField
                type="password"
                onChange={(event) => {
                    setPassword(event.target.value)

                }}
                helperText={passwordError}
            />
            <Button onClick={ingresar}>Continuar</Button>
        </div>
    </div>

    )
}

export default LogIn;

