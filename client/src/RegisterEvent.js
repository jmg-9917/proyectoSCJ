
import './App.css';
import {useState} from 'react';
import Axios from 'axios'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Snackbar, Alert, TextField, Button, RadioGroup, FormControlLabel, Radio} from '@material-ui/core'

const RegisterEvent = () => {
    const [nombreEvento, setNombreEvento] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [nacional, setNacional] = useState(false);
    const [radioValue, setRadioValue] = useState("no");
    const registrarEvento = () => {

        if (radioValue === "si") {
            setNacional(false)
            console.log(nacional)
        }
        else {
            setNacional(true)
            console.log(nacional)
        }
        Axios.post('http://localhost:3002/createEvent', {
            nombreEvento: nombreEvento,
            ciudad: ciudad,
            nacional: nacional
        }).then(() => {
            console.log("Frontend and backend connected.")
        })
    };

    return (
        <div>
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
            <RadioGroup value={radioValue} onChange={
                (event) => {
                    setRadioValue(event.target.value)
                }
            }>
                <FormControlLabel value="si" control={<Radio />} label="Si" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            <Button variant="outlined" onClick={registrarEvento}>Registrar evento</Button>
        </div>

    )
}
export default RegisterEvent;
