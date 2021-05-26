import './App.css';
import {useState, useEffect, useRef} from 'react';
import Axios from 'axios'
import React from 'react';
import {useHistory} from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';
import validator from 'validator';
import ReCAPTCHA from 'react-google-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
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
            errors.passwordError = false
            setPasswordError('')
        }
        return errors
    }


    const ingresar = () => {
        const errorDetected = errorInFields()
        if (errorDetected.emailError || errorDetected.passwordError) {
            console.log(errorDetected)
        }
        else {
            setLogInStatus('')
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

                    Axios.post('http://localhost:3002/login', {
                        correo: correo_electronico,
                        password: password
                    }).then((response) => {
                        if (response.data.length === 0) {
                            console.log(response.data)
                            setLogInStatus("Verifique los datos ingresados.")
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


    }




    return (
        <div>
            <div >
                <Card className='login-card'>
                    <Card.Title className="login-title">
                        <h3>Log In</h3>
                    </Card.Title>
                    <div >
                        <Card.Body className="login-items">
                            <TextField
                                className="login-item"
                                type="text"
                                label="Correo Electronico"
                                onChange={(event) => {
                                    setCorreo(event.target.value)
                                }}
                                helperText={correoError}
                            />
                            <TextField
                                className="login-item"
                                type="password"
                                label="Contraseña"
                                onChange={(event) => {
                                    setPassword(event.target.value)

                                }}
                                helperText={passwordError}
                            />
                            <ReCAPTCHA
                                className="login-item"
                                sitekey="6LdSbs0aAAAAAIQgPXIQXHfEPB9WyTKyv2iyYljm"
                                onChange={token => {
                                    setToken(token)
                                }}
                                onExpired={e => setToken("")}
                                ref={reCaptcha}
                            ></ReCAPTCHA>
                            <label>{LogInStatus}</label>
                            <Button
                                className="login-item"
                                type="submit"
                                onClick={ingresar}>
                                Continuar
        </Button>
                        </Card.Body>
                    </div>
                </Card>
            </div>
        </div>

    )
}

export default LogIn;

