import React from 'react';
import Axios from 'axios';
export const SubscribeToVisit = (idIntegrante, noVisita, fecha) => {
    Axios.defaults.withCredentials = true
    console.log(fecha)
    Axios.post("http://localhost:3002/suscribeToVisit", {
        idIntegrante: idIntegrante,
        noVisita: noVisita,
        fecha: fecha
    }).then(() => {
        alert('Registrado a la visita ' + noVisita)
        console.log("Usuario" + idIntegrante + " registrado a la visita " + noVisita)
    })
}
export const SubscribeToEvent = (idIntegrante, noEvento, fecha) => {
    Axios.defaults.withCredentials = true
    console.log(fecha)
    Axios.post("http://localhost:3002/suscribeToEvent", {
        idIntegrante: idIntegrante,
        noEvento: noEvento,
        fecha: fecha
    }).then(() => {
        alert('Registrado al evento ' + noEvento)
        console.log("Usuario" + idIntegrante + " registrado al evento " + noEvento)
    })
}
export const SubscribeToMeeting = (idIntegrante, noJuntas, fecha) => {
    Axios.defaults.withCredentials = true
    console.log(fecha)
    Axios.post("http://localhost:3002/suscribeToMeeting", {
        idIntegrante: idIntegrante,
        noJuntas: noJuntas,
        fecha: fecha
    }).then(() => {
        alert('Registrado a la junta ' + noJuntas)
        console.log("Usuario" + idIntegrante + " registrado a la junta " + noJuntas)
    })
}
export const SubscribeToLabReport = (idIntegrante, noPractica, fecha) => {
    Axios.defaults.withCredentials = true
    console.log(fecha)
    Axios.post("http://localhost:3002/suscribeToLabReport", {
        idIntegrante: idIntegrante,
        noPractica: noPractica,
        fecha: fecha
    }).then(() => {
        alert('Registrado a la practica ' + noPractica)
        console.log("Usuario" + idIntegrante + " registrado a la practica " + noPractica)
    })
}
export const UnsubscribeToEvent = (idIntegrante, noEvento, fecha) => {
    Axios.defaults.withCredentials = true
    Axios.post("http://localhost:3002/unsubscribeToEvent", {
        idIntegrante: idIntegrante,
        noEvento: noEvento,
        fecha: fecha
    }).then(() => {
        alert('Suscripcion eliminada para el evento ' + noEvento)
    })
}
export const UnsubscribeToLabReport = (idIntegrante, noPractica, fecha) => {
    Axios.defaults.withCredentials = true
    Axios.post("http://localhost:3002/unsubscribeToLabReport", {
        idIntegrante: idIntegrante,
        noEvento: noPractica,
        fecha: fecha
    }).then(() => {
        alert('Suscripcion eliminada para la practica ' + noPractica)
    })
}
export const UnsubscribeToMeeting = (idIntegrante, noJuntas, fecha) => {
    Axios.defaults.withCredentials = true
    Axios.post("http://localhost:3002/unsubscribeToMeeting", {
        idIntegrante: idIntegrante,
        noJunta: noJuntas,
        fecha: fecha
    }).then(() => {
        alert('Suscripcion eliminada para la junta ' + noJuntas)
    })
}
export const UnsubscribeToVisit = (idIntegrante, noVisita, fecha) => {
    Axios.defaults.withCredentials = true
    Axios.post("http://localhost:3002/unsubscribeToVisit", {
        idIntegrante: idIntegrante,
        noVisita: noVisita,
        fecha: fecha
    }).then(() => {
        alert('Suscripcion eliminada para la visita' + noVisita)
    })
}
export default SubscribeToEvent;
