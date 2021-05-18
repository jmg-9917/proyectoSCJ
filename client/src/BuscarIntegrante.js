import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
function BuscarIntegrante() {


    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [texto, setTexto] = useState("");
    const [id, setId] = useState('')
    const [integrantes, setIntegrantes] = useState([]);
    useEffect(() => {
        let isMounted = true; Axios.get("http://localhost:3002/integrantes").then((response) => {
            if (isMounted) {
                setIntegrantes(response.data)
            }
        }, [])
        return () => { isMounted = false };

    })


    return (
        <div>
            <h1>Buscar integrante</h1>
            <div className="information">
                <label>Nombre:</label>
                <TextField
                    type="text"
                    onChange={(event) => {
                        setNombre(event.target.value)
                        setApellidos(event.target.value)
                    }}
                />
            </div>
            {integrantes.filter((val) => {
                if (nombre === '' || apellidos === '') {
                    return val
                }
                else if (val.nombre.toLowerCase().includes(nombre.toLowerCase()) || val.apellidos.toLowerCase().includes(apellidos.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {

                return (
                    <div>
                        <Card key={val.idIntegrante} className="Card-appearence" >
                            <Card.Body>
                                <Card.Title>{val.nombre}</Card.Title>
                                <Card.Text>{val.apellidos}</Card.Text>
                                <Card.Text>{val.puesto}</Card.Text>
                                <Link to="/dashboard/verInfoIntegrante">
                                    <Button >Ver mas informacion del miembro</Button>
                                </Link>
                            </Card.Body>
                        </Card>

                    </div>
                )
            })}
        </div>
    )
}
export default BuscarIntegrante;
