import React, {useState, useEffect} from 'react';
import {TextField, Button} from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import Axios from 'axios'
function BuscarEvento() {
    const [nombreEvento, setNombreEvento] = useState('');
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        let isMounted = true;
        Axios.get("http://localhost:3002/eventos")
            .then((response) => {
                if (isMounted) {
                    setEventos(response.data)
                }
            }, [])
        return () => {isMounted = false};

    })
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
                else {nacionalText = "Local"}
                return (
                    <>
                        <Card key={key} className="Card-appearence" >
                            <Card.Body>
                                <Card.Title>{val.nombreEvento}</Card.Title>
                                <Card.Text>{val.ciudad}</Card.Text>
                                <Card.Text>{nacionalText}</Card.Text>
                                <Card.Text>{val.descripcion}</Card.Text>
                                <Button>Inscribete al evento!</Button>
                            </Card.Body>
                        </Card>
                    </>

                )

            })}


        </div>
    )

}
export default BuscarEvento;
