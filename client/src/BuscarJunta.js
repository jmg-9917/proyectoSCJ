
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { TextField } from '@material-ui/core';
import { Card, Button, Fade } from 'react-bootstrap';
function BuscarJunta() {


    const [tipo, setTipo] = useState("");
    const [descripcion, setDesc] = useState("");


    const [juntas, setJuntas] = useState([]);

    useEffect(() => {
        let isMounted = true;
        Axios.get("http://localhost:3002/juntas")
            .then((response) => {
                if (isMounted) {
                    setJuntas(response.data)
                }
            }, [])
        return () => { isMounted = false };

    })


    return (
        <div className="eventos">
            <h1>Buscar junta</h1>
            <div>
                <TextField
                    label="Nombre"
                    type="text"
                    onChange={(event) => {
                        setTipo(event.target.value)
                        setDesc(event.target.value)
                    }}
                />
            </div>
            {juntas.filter((val) => {
                if (tipo === '' || descripcion === '') {
                    return val
                }
                else if (val.tipo.toLowerCase().includes(tipo.toLowerCase()) || val.descripcion.toLowerCase().includes(descripcion.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {

                return (
                    <div className="card-placement" key={key}>
                        <Fade in={true} timeout={500}>
                            <Card className="Card-appearence" >
                                <Card.Body>
                                    <Card.Title>{val.tipo}</Card.Title>
                                    <Card.Text>{val.fecha}</Card.Text>
                                    <Card.Text>{val.descripcion}</Card.Text>
                                    <Button>Ver mas informacion de la junta</Button>
                                </Card.Body>
                            </Card>
                        </Fade>

                    </div>
                )
            })}
        </div>
    )
}
export default BuscarJunta;
