
import './App.css';
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
function AlterLabReports() {
    Axios.defaults.withCredentials = true
    const [nombreEvento, setNombreEvento] = useState('');
    const [practicas, setPracticas] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDesc] = useState("");
    const [categoria, setCat] = useState("");
    const history = useHistory();
    useEffect(() => {
        let isMounted = true;
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:3002/practicas")
            .then((response) => {
                if (isMounted) {
                    setPracticas(response.data)
                }
            }, [])
        return () => { isMounted = false };

    })

    const eliminatePractica = (id) => {
        Axios.defaults.withCredentials = true
        Axios.delete(`http://localhost:3002/deleteLabReport/${id}`)
        alert('Practica borrada correctamente.')
        history.push('/registerDashboard/alterItems/alterLabReports')
    }

    const PassDataThrough = (noPractica, nombre, categoria, descripcion, fecha) => {
        history.push({
            pathname: "/registerDashboard/alterItems/editLabReport",
            state: {
                noPractica: noPractica,
                nombre: nombre,
                categoria: categoria,
                fecha: fecha,
                descripcion: descripcion
            }

        })
        console.log(noPractica)
        console.log(nombre)
    }
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
                                <Card.Text>{val.fecha}</Card.Text>
                                <Card.Text>{val.descripcion}</Card.Text>

                                <Button onClick={() => {
                                    PassDataThrough(val.noPractica, val.nombre, val.categoria, val.descripcion, val.fecha)
                                }}>Editar</Button>
                                <Button onClick={() => {
                                    eliminatePractica(val.noPractica)
                                }}>Eliminar</Button>
                            </Card.Body>
                        </Card>

                    </div>
                )
            })}
        </div>
    )

}
export default AlterLabReports;
