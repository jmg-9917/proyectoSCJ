
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

function AlterEvents() {
    Axios.defaults.withCredentials = true
    const [nombreEvento, setNombreEvento] = useState('');
    const [eventos, setEventos] = useState([]);

    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevaCiudad, setNuevaCiudad] = useState('');
    const [boolNacional, setBoolNacional] = useState(0);
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [chosenId, setChosenId] = useState(0);
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

    }

    const updateEvent = (id) => {
        setChosenId(id)
        Axios.put('http://localhost:3002/updateEvent', {
            noEvento: chosenId,
            nuevoNombre: nuevoNombre,
            nuevaCiudad: nuevaCiudad,
            boolNacional: boolNacional,
            nuevaDescripcion: nuevaDescripcion
        }).then((response) => {
            console.log(response.data)
            alert('Evento actualizado');
        })
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
                else if (val.nombreEvento.toLowerCase().includes(nombreEvento.toLowerCase()) || val.noEvento === chosenId) {
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
                                <Accordion.Toggle as={Button} onClick={() => {
                                    setChosenId(val.noEvento)
                                }} eventKey={val.noEvento}>Editar</Accordion.Toggle>
                                <Button onClick={eliminateEvent}>Eliminar</Button>


                            </Card.Header>
                        </Card>
                    </>

                )

            })}


        </div >
    )

}
export default AlterEvents;
