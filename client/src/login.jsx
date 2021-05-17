import './App.css';
import { useState, useEffect, useRef } from 'react';
import Axios from 'axios'
import React from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import validator from 'validator';
import ReCAPTCHA from 'react-google-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';
const LogIn = () => {
    const [correo_electronico, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [activo, setActivo] = useState("");
    const [LogInStatus, setLogInStatus] = useState("");
    const [correoError, setCorreoError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const reCaptcha = useRef();


    Axios.defaults.withCredentials = true;
    let history = useHistory();

    function errorInFields() {
        let errors = {
            emailError: false,
            passwordError: false
        }
        if (validator.isEmail(correo_electronico)) {
            errors.emailError = false
            setCorreoError('')
        }
        else {
            setCorreoError('Inserte un correo electronico valido.')
            errors.emailError = true
        }
        if (validator.isEmpty(password)) {
            setPasswordError('Inserte su contraseña.')
            errors.passwordError = true
        }
        else if (password.length > 3) {
            errors.passwordError = true
            setPasswordError('')
        }
        return errors
    }


    const ingresar = () => {
        if (!token) {
            setError("Verify captcha")
            return;
        }
        else {
            setError("")

            Axios.post('http://localhost:3002/reCaptcha', {
                token: token
            }).then(() => {
                reCaptcha.current.reset();
                setToken("");
                alert("Sign in success");

                Axios.post('http://localhost:3002/login', {
                    correo: correo_electronico,
                    password: password
                }).then((response) => {
                    if (response.data.length === 0) {
                        console.log(response.data)
                        setLogInStatus("No coincide.")
                    }
                    else {
                        console.log("Frontend and backend connected.")
                        if (response.data[0].nombre === 'admin') {
                            history.push('/registerDashboard')
                        }
                        else {
                            history.push('/dashboard')
                        }
                    }
                })

            })
                .catch(e => {
                    setError(e)
                })
                .finally(() => {
                    setToken("");
                })

        }


    }




    return (
        <div className="App">
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
                <ReCAPTCHA className="recaptcha-Spacing"
                    sitekey="6LdSbs0aAAAAAIQgPXIQXHfEPB9WyTKyv2iyYljm"
                    onChange={token => {
                        setToken(token)
                    }}
                    onExpired={e => setToken("")}
                    ref={reCaptcha}
                ></ReCAPTCHA>
                <Button
                    type="submit"
                    onClick={ingresar}>
                    Continuar
            </Button>
            </div>
        </div>

    )
}

export default LogIn;

