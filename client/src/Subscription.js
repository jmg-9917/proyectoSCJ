import React from 'react';
import Axios from 'axios';
const SubscribeToEvent = (idIntegrante, noEvento, fecha) => {
    Axios.defaults.withCredentials = true
    const fechaArr = fecha.split('T')
    const fechaFirst = fechaArr[0]
    console.log(fecha)
    Axios.post("http://localhost:3002/suscribeToEvent", {
        idIntegrante: idIntegrante,
        noEvento: noEvento,
        fecha: fechaFirst
    }).then(() => {
        console.log("Usuario" + idIntegrante + " registrado al evento " + noEvento)
    })
}
export const Unsubscribe = (idIntegrante, noEvento, fecha) => {
    Axios.defaults.withCredentials = true
    Axios.post("http://localhost:3002/unsubscribeToEvent", {
        idIntegrante: idIntegrante,
        noEvento: noEvento,
        fecha: fecha
    }).then(() => {
        alert('Unsubscribed from ' + noEvento)
    })
}
export default SubscribeToEvent;
