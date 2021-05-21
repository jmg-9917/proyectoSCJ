import React from 'react';
import Axios from 'axios';
const SubscribeToEvent = (idIntegrante, noEvento, fecha) => {
    Axios.defaults.withCredentials = true
    Axios.post("http://localhost:3002/suscribeToEvent", {
        idIntegrante: idIntegrante,
        noEvento: noEvento,
        fecha: fecha
    }).then(() => {
        console.log("Usuario" + idIntegrante + " registrado al evento " + noEvento)
    })
}
export default SubscribeToEvent;  
