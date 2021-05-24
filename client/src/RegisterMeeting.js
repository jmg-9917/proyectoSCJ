
import './App.css';
import {useState, useRef} from 'react';
import Axios from 'axios'
import React from 'react';
import {TextField} from '@material-ui/core';
import {Button} from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
const RegisterMeeting = () => {
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const reCaptcha = useRef();

    const registrarJunta = () => {
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

                Axios.post('http://localhost:3002/createJunta', {
                    tipo: tipo,
                    descripcion: descripcion,
                }).then(() => {
                    console.log("Junta registrada.")
                })
                    .catch(e => {
                        setError(e)
                    })
                    .finally(() => {
                        setToken("");
                    })

            })

        };
    }

    return (
        <div>
            <form id="integrante-form" className="mainDisplay">
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
                    multiline
                    fullWidth
                    rowsMax={4}
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
            </form>
        </div>
    )
}
export default RegisterMeeting;
