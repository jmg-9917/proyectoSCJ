import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import App from './App.css';
function MostrarEventos() {
    const [eventos, setEventos] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3002/eventos")
            .then((response) => {
                setEventos(response.data)
            }, [])

    })
    return (
        <div className="eventos">
            <h1>Mostrar todos los eventos</h1>
            {eventos.map((val, key) => {
                var nacionalText = ""
                if (val.nacional === 1) {
                    nacionalText = "Nacional"

                }
                else { nacionalText = "Local" }
                return (
                    <div className="evento">
                        <h1>{val.nombreEvento}</h1>
                        <h3>{val.ciudad}</h3>
                        <h3>{nacionalText}</h3>
                    </div>

                )

            })}
        </div>
    )


}
export default MostrarEventos;
