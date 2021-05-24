import './App.css';
import React, {useState, useEffect} from 'react';
import {TextField} from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
function AlterVisits() {
    Axios.defaults.withCredentials = true
    const [nombre, setNombre] = useState('');
    const [visitas, setVisitas] = useState([]);
    const [descripcion, setDesc] = useState("");
    const [categoria, setCat] = useState("");
    const history = useHistory();
    useEffect(() => {
        let isMounted = true;
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:3002/visitas")
            .then((response) => {
                if (isMounted) {
                    setVisitas(response.data)
                }
            }, [])
        return () => {isMounted = false};

    })

    const eliminatePractica = (id) => {
        Axios.defaults.withCredentials = true
        Axios.delete(`http://localhost:3002/deleteVisit/${id}`)
        alert('Visita borrada correctamente.')
        history.push('/registerDashboard/alterItems/alterVisits')
    }

    const PassDataThrough = (noVisita, nombre, categoria, descripcion, fecha) => {
        history.push({
            pathname: "/registerDashboard/alterItems/editVisit",
            state: {
                noVisita: noVisita,
                nombre: nombre,
                categoria: categoria,
                fecha: fecha,
                descripcion: descripcion
            }

        })
        console.log(noVisita)
        console.log(nombre)
    }
    return (
        <div>
            <h1>Buscar visita</h1>
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
            {visitas.filter((val) => {
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
                                <Card.Text>{val.fecha}</Card.Text>
                                <Card.Text>{val.descripcion}</Card.Text>

                                <Button onClick={() => {
                                    PassDataThrough(val.noVisita, val.nombre, val.categoria, val.descripcion, val.fecha)
                                }}>Editar</Button>
                                <Button onClick={() => {
                                    eliminatePractica(val.noVisita)
                                }}>Eliminar</Button>
                            </Card.Body>
                        </Card>

                    </div>
                )
            })}
        </div>
    )

}
export default AlterVisits;
