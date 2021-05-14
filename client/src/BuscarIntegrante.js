import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { TextField, Button } from '@material-ui/core';
function BuscarIntegrante() {


    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [texto, setTexto] = useState("");


    const [integrantes, setIntegrantes] = useState([]);

    const handleSearch = () => {
        Axios.get('http://localhost:3002/buscarIntegrantes',
            {
                nombre: nombre
            })
            .then((response) => {
                setIntegrantes(response.data)
            })
    }


    return (
        <div>
            <h1>Buscar integrante</h1>
            <div className="information">
                <label>Nombre:</label>
                <TextField
                    type="text"
                    onChange={(event) => {
                        setNombre(event.target.value)
                    }}
                />
                <Button onClick={handleSearch}>Buscar</Button>
            </div>
            {integrantes.map((val, key) => {

                return (
                    <div>
                        <h1>val.nombre</h1>
                        <h1>val.apellidos</h1>
                    </div>
                )
            })}
        </div>
    )
}
export default BuscarIntegrante;
