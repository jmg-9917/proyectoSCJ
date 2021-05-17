import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {TextField} from '@material-ui/core';
import {Card, Button} from 'react-bootstrap';
function BuscarPractica() {


    const [nombre, setNombre] = useState("");
    const [descripcion, setDesc] = useState("");
    const [categoria, setCat] = useState("");


    const [practicas, setPracticas] = useState([]);

    useEffect(() => {
        let isMounted = true;
        Axios.get("http://localhost:3002/practicas")
            .then((response) => {
                if (isMounted) {
                    setPracticas(response.data)
                }
            }, [])
        return () => {isMounted = false};

    })


    return (
        <div>
            <h1>Buscar practica</h1>
            <div className="information">
                <label>Nombre:</label>
                <TextField
                    type="text"
                    onChange={(event) => {
                        setNombre(event.target.value)
                        setCat(event.target.value)
                        setDesc(event.target.value)
                    }}
                />
            </div>
            {practicas.filter((val) => {
                if (nombre === '' || descripcion === '' || categoria === '') {
                    return val
                }
                else if (val.nombre.toLowerCase().includes(nombre.toLowerCase()) || val.descripcion.toLowerCase().includes(descripcion.toLowerCase()) || val.categoria.toLowerCase().includes(categoria.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {

                return (
                    <div>
                        <Card key={key} className="Card-appearence" >
                            <Card.Body>
                                <Card.Title>{val.nombre}</Card.Title>
                                <Card.Text>{val.categoria}</Card.Text>
                                <Card.Text>{val.descripcion}</Card.Text>

                                <Button>Ver mas informacion de la junta</Button>
                            </Card.Body>
                        </Card>

                    </div>
                )
            })}
        </div>
    )
}
export default BuscarPractica;

