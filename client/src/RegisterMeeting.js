
import './App.css';
import { useState } from 'react';
import Axios from 'axios'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Snackbar, Alert, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
const RegisterMeeting = () => {
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [participantes, setParticipantes] = useState("");
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
                    setParticipantes("")
                }}
            />
            <Button variant="outlined" onClick={registrarJunta}>Registrar junta</Button>
        </div>
    )
}
export default RegisterMeeting;
