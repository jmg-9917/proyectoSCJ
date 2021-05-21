
import GetFormattedDate from './GetFormattedDate';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Fade } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Axios from 'axios'
function BuscarEvento() {
    const [nombreEvento, setNombreEvento] = useState('');
    const [eventos, setEventos] = useState([]);
    const [idIntegrante, setIdIntegrante] = useState('')
    const [open, setOpen] = useState(true);
    const history = useHistory()
    const instant = GetFormattedDate
    const [fecha,setFecha] = useState(instant)

    useEffect(() => {
        let isMounted = true;
        Axios.get("http://localhost:3002/eventos")
            .then((response) => {
                if (isMounted) {
                    setEventos(response.data)
                }
            }, [])
        return () => { isMounted = false };

    })

    function UserFound() {
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.LoggedIn) {
                console.log(response.data)
                setIdIntegrante(response.data.user[0][0].idIntegrante)
            }
            if (response.data.LoggedIn === false || response.data.user.length === 0) {
                history.push('/login')
                window.location.reload()
            }
        })
    }
    UserFound()
    const SubscribeToEvent = (noEvento) => {
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:3002/suscribeToEvent", {
            idIntegrante: idIntegrante,
            noEvento: noEvento,
            fecha: fecha
        }).then(() => {
            console.log("Usuario" + idIntegrante + " registrado al evento " + noEvento)
        })

    }

    return (
        <div>
            <div className="eventos">
                <h1>Buscar evento</h1>
                <TextField
                    type="text"
                    label="Nombre del evento"
                    onChange={(event) => {
                        setNombreEvento(event.target.value)

                    }}
                />
                {eventos.filter((val) => {

                    if (nombreEvento === "") {
                        return val
                    }
                    else if (val.nombreEvento.toLowerCase().includes(nombreEvento.toLowerCase())) {
                        return val
                    }
                }).map((val, key) => {
                    var nacionalText = ""
                    if (val.nacional === 1) {
                        nacionalText = "Nacional"

                    }
                    else { nacionalText = "Local" }
                    return (
                        <div className="card-placement">
                            <Fade in={open} timeout={500}>
                                <Card key={key} className="Card-appearence" >
                                    <Card.Body>
                                        <Card.Title>{val.nombreEvento}</Card.Title>
                                        <Card.Text>{val.ciudad}</Card.Text>
                                        <Card.Text>{nacionalText}</Card.Text>
                                        <Card.Text>{val.descripcion}</Card.Text>
                                        <Button
                                            onClick={() => {
                                                SubscribeToEvent(val.noEvento)
                                            }}>Inscribete al evento!</Button>
                                    </Card.Body>
                                </Card>
                            </Fade>
                        </div>

                    )

                })}


            </div>
        </div>
    )

}
export default BuscarEvento;
