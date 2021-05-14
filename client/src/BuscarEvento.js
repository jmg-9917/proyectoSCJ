import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';

function BuscarEvento() {
    const [nombreEvento, setNombreEvento] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [eventos, setEventos] = useState([]);

    return (
        <div>
            <h1>Buscar evento</h1>
            <div className="information">
                <label>Nombre del evento:</label>
                <TextField
                    type="text"
                    onChange={(event) => {
                        setNombreEvento(event.target.value)

                    }}
                />
                <label>Ciudad:</label>
                <TextField
                    type="text"
                    onChange={(event) => {
                        setCiudad(event.target.value)

                    }}
                />
                <Button>Continuar</Button>
            </div>
        </div>
    )

}
export default BuscarEvento;
