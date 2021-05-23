
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
function AlterEvents() {
    Axios.defaults.withCredentials = true
    const [nombreEvento, setNombreEvento] = useState('');
    const [eventos, setEventos] = useState([]);
    const history = useHistory();
    useEffect(() => {
        let isMounted = true;
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:3002/eventos")
            .then((response) => {
                if (isMounted) {
                    setEventos(response.data)
                }
            }, [])
        return () => { isMounted = false };

    })

    const eliminateEvent = (id) => {
        Axios.defaults.withCredentials = true
        Axios.delete(`http://localhost:3002/deleteEvent/${id}`)
        alert('Evento borrado correctamente.')
        history.push('/registerDashboard/alterItems/alterEvents')
    }

    const PassDataThrough = (noEvento, nombreEvento, ciudad, nacional, descripcion) => {
        history.push({
            pathname: "/registerDashboard/alterItems/editEvent",
            state: {
                noEvento: noEvento,
                nombreEvento: nombreEvento,
                ciudad: ciudad,
                nacional: nacional,
                descripcion: descripcion
            }

        })
        console.log(noEvento)
        console.log(nombreEvento)
    }
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
            </div>
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
                    <>
                        <Card key={key} className="Card-appearence" >
                            <Card.Header>
                                <Card.Title>{val.nombreEvento}</Card.Title>
                                <Card.Text>Ciudad: {val.ciudad}</Card.Text>
                                <Card.Text>Nacional o local: {nacionalText}</Card.Text>
                                <Card.Text> Descripcion: {val.descripcion}</Card.Text>
                                <Button onClick={() => {
                                    PassDataThrough(val.noEvento, val.nombreEvento, val.ciudad, val.nacional, val.descripcion)
                                }}>Editar</Button>
                                <Button onClick={() => { eliminateEvent(val.noEvento) }}>Eliminar</Button>


                            </Card.Header>
                        </Card>
                    </>

                )

            })}


        </div >
    )

}
export default AlterEvents;
