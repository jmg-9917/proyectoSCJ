
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { TextField } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { SubscribeToVisit, UnsubscribeToVisit } from './Subscription';
function BuscarVisitas() {


    const [nombre, setNombre] = useState("");
    const [descripcion, setDesc] = useState("");
    const [categoria, setCat] = useState("");
    const [fecha, setFecha] = useState('');
    const [idIntegrante, setIdIntegrante] = useState('')
    const [visitas, setVisitas] = useState([]);
    const history = useHistory()
    const [susc, setSusc] = useState(false)
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


    useEffect(() => {
        let isMounted = true;
        Axios.get("http://localhost:3002/visitas")
            .then((response) => {
                if (isMounted) {
                    setVisitas(response.data)
                }
            }, [])
        return () => { isMounted = false };

    })


    return (
        <div className="eventos">
            <h1>Buscar visita</h1>
            <div>
                <TextField
                    label="Nombre"
                    type="text"
                    onChange={(event) => {
                        setNombre(event.target.value)
                        setCat(event.target.value)
                        setDesc(event.target.value)
                    }}
                />
            </div>
            {visitas.filter((val) => {
                if (nombre === '' || descripcion === '' || categoria === '') {
                    return val
                }
                else if (val.nombre.toLowerCase().includes(nombre.toLowerCase()) || val.descripcion.toLowerCase().includes(descripcion.toLowerCase()) || val.categoria.toLowerCase().includes(categoria.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {

                return (
                    <div className="card-placement">
                        <Card key={key} className="Card-appearence" >
                            <Card.Body>
                                <Card.Title>{val.nombre}</Card.Title>
                                <Card.Text>{val.categoria}</Card.Text>
                                <Card.Text>{val.descripcion}</Card.Text>

                                <Button
                                    onClick={() => {
                                        setSusc(!susc)
                                        if (susc) {
                                            SubscribeToVisit(idIntegrante, val.noVisita, val.fecha)
                                        }
                                        else {
                                            UnsubscribeToVisit(idIntegrante, val.noVisita, val.fecha)
                                        }
                                    }}>Inscribete</Button>
                            </Card.Body>
                        </Card>

                    </div>
                )
            })}
        </div>
    )
}
export default BuscarVisitas;

