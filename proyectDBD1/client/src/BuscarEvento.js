import React, { useState } from 'react';
import Axios from 'axios';

function BuscarEvento() {
    const [nombreEvento, setNombreEvento] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [eventos, setEventos] = useState([]);

    return (
        <div>
            <h1>Buscar evento</h1>
            <div className="information">
                <label>Nombre del evento:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setNombreEvento(event.target.value)

                    }}
                />
                <label>Ciudad:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setCiudad(event.target.value)

                    }}
                />
                <button>Continuar</button>
            </div>
        </div>
    )

}
export default BuscarEvento;
