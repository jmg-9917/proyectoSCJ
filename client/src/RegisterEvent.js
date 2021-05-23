
import './App.css';
import {useState, useRef} from 'react';
import Axios from 'axios'
import React from 'react';
import {TextField, Button, RadioGroup, FormControlLabel, Radio} from '@material-ui/core'
import ReCAPTCHA from 'react-google-recaptcha';
import ShowAlert from './Flash-message-component';
import Map from './Address';
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
            <form id="integrante-form" >
                <h2>Registrar evento</h2>
                <label>Nombre del evento:</label>
                <TextField
                    type="text"
                    onChange={(event) => {
                        setNombreEvento(event.target.value)

                    }}
                />
                <label>Ciudad</label>
                <TextField
                    type="text"
                    onChange={(event) => {
                        setCiudad(event.target.value)

                    }}
                />
                <label>Es nacional?</label>
                <RadioGroup className="radio-display" value={radioValue} onChange={
                    (event) => {
                        setRadioValue(event.target.value)
                    }
                }>
                    <FormControlLabel value="si" control={<Radio />} label="Si" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <TextField
                    type="text"
                    multiline
                    fullWidth
                    rowsMax={4}
                    onChange={(event) => {
                        setDescripcion(event.target.value)
                    }
                    }
                ></TextField>
                <ReCAPTCHA className="recaptcha-Spacing"
                    sitekey="6LdSbs0aAAAAAIQgPXIQXHfEPB9WyTKyv2iyYljm"
                    onChange={token => {
                        setToken(token)
                    }}
                    onExpired={e => setToken("")}
                    ref={reCaptcha}
                ></ReCAPTCHA>
                <Map />
                <Button variant="outlined" onClick={registrarEvento}>Registrar evento</Button>
            </form>
        </div>

    )
}
export default RegisterEvent;
