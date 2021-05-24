
import './App.css';
import {useState, useRef} from 'react';
import Axios from 'axios'
import React from 'react';
import {TextField, Button, RadioGroup, FormControlLabel, Radio} from '@material-ui/core'
import ReCAPTCHA from 'react-google-recaptcha';
import ShowAlert from './Flash-message-component';
import {Container, Row, Col} from 'react-bootstrap';
const RegisterEvent = () => {
    const [nombreEvento, setNombreEvento] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [nacional, setNacional] = useState(false);
    const [radioValue, setRadioValue] = useState("no");
    const [descripcion, setDescripcion] = useState('');
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);
    const reCaptcha = useRef();
    const registrarEvento = () => {

        if (radioValue === "si") {
            setNacional(false)
            console.log(nacional)
        }
        else {
            setNacional(true)
            console.log(nacional)
        }

        if (!token) {
            setError("Verify captcha")
            setSuccess(false)
            ShowAlert(success, 'evento')
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

                Axios.post('http://localhost:3002/createEvent', {
                    nombreEvento: nombreEvento,
                    ciudad: ciudad,
                    nacional: nacional,
                    descripcion: descripcion
                }).then(() => {
                    console.log("Frontend and backend connected.")
                    setSuccess(true)
                    ShowAlert(success, 'evento')
                })

            })
                .catch(e => {
                    setError(e)
                })
                .finally(() => {
                    setToken("");
                })

        }

    };

    return (
        <div>
            <div className="mainDisplay">
                <form id="integrante-form" >
                    <Container>
                        <h2>Registrar evento</h2>
                        <Row className="row">
                            <TextField
                                type="text"
                                label="Nombre del evento"
                                onChange={(event) => {
                                    setNombreEvento(event.target.value)

                                }}
                            />
                        </Row>
                        <Row className="row">
                            <TextField
                                label="Ciudad"
                                type="text"
                                onChange={(event) => {
                                    setCiudad(event.target.value)

                                }}
                            />
                        </Row>

                        <Row className="row">
                            <div className="horizontal-radio">
                                <label>Es nacional?</label>
                                <RadioGroup value={radioValue} onChange={
                                    (event) => {
                                        setRadioValue(event.target.value)
                                    }
                                }>
                                    <FormControlLabel value="si" control={<Radio />} label="Si" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </div>
                        </Row>
                        <Row className="row">
                            <TextField
                                type="text"

                                label="Descripcion"
                                multiline
                                fullWidth
                                rowsMax={4}
                                onChange={(event) => {
                                    setDescripcion(event.target.value)
                                }
                                }
                            ></TextField>
                        </Row>
                        <Row className="row">
                            <ReCAPTCHA
                                sitekey="6LdSbs0aAAAAAIQgPXIQXHfEPB9WyTKyv2iyYljm"
                                onChange={token => {
                                    setToken(token)
                                }}
                                onExpired={e => setToken("")}
                                ref={reCaptcha}
                            ></ReCAPTCHA>
                        </Row>
                        <Row className="row-subtitle">
                            <h2>Publica el evento para que los integrantes puedan suscribirse</h2>
                        </Row>
                        <Row className="row-button">
                            <Button variant="outlined" onClick={registrarEvento}>Registrar evento</Button>
                        </Row>
                    </Container>
                </form>
            </div>
        </div>

    )
}
export default RegisterEvent;
