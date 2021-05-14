
import './App.css';
import { useState, useRef } from 'react';
import Axios from 'axios'
import React from 'react';
import { TextField, Button } from '@material-ui/core'
import ReCAPTCHA from 'react-google-recaptcha';
import ShowAlert from './Flash-message-component';
const RegisterMeeting = () => {
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const reCaptcha = useRef();
    const [success, setSuccess] = useState(null);

    const registrarJunta = () => {
        if (!token) {
            setError("Verify captcha")
            setSuccess(false);
            ShowAlert(success, 'junta')
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

                Axios.post('http://localhost:3002/createJunta', {
                    tipo: tipo,
                    descripcion: descripcion,
                }).then(() => {
                    console.log("Junta registrada.")
                    setSuccess(true);
                    ShowAlert(success, 'junta')
                })
                    .catch(e => {
                        setError(e)
                    })
                    .finally(() => {
                        setToken("");
                    })

            })

        };

        return (
            <div>
                <h2>Registrar junta</h2>
                <label>Tipo de junta:</label>
                <TextField
                    type="text"
                    onChange={(event) => {
                        setTipo(event.target.value)

                    }}
                />
                <label>Descripcion:</label>
                <TextField
                    type="text"
                    onChange={(event) => {
                        setDescripcion(event.target.value)
                    }}
                />
                <ReCAPTCHA className="recaptcha-Spacing"
                    sitekey="6LdSbs0aAAAAAIQgPXIQXHfEPB9WyTKyv2iyYljm"
                    onChange={token => {
                        setToken(token)
                    }}
                    onExpired={e => setToken("")}
                    ref={reCaptcha}
                ></ReCAPTCHA>
                <Button variant="outlined" onClick={registrarJunta}>Registrar junta</Button>
            </div>
        )
    }
}
export default RegisterMeeting;
