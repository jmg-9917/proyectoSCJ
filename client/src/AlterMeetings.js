import './App.css';
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
function AlterMeetings() {
    Axios.defaults.withCredentials = true

    const [tipo, setTipo] = useState("");
    const [descripcion, setDesc] = useState("");


    const [juntas, setJuntas] = useState([]);
    const history = useHistory();
    useEffect(() => {
        let isMounted = true;
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:3002/juntas")
            .then((response) => {
                if (isMounted) {
                    setJuntas(response.data)
                }
            }, [])
        return () => { isMounted = false };

    })

    const eliminateJunta = (id) => {
        Axios.defaults.withCredentials = true
        Axios.delete(`http://localhost:3002/deleteMeeting/${id}`)
        alert('Junta borrada correctamente.')
        history.push('/registerDashboard/alterItems/alterMeetings')
    }

    const PassDataThrough = (noJuntas, tipo, descripcion, fecha) => {
        history.push({
            pathname: "/registerDashboard/alterItems/editMeeting",
            state: {
                noJuntas: noJuntas,
                tipo: tipo,
                fecha: fecha,
                descripcion: descripcion
            }

        })
        console.log(noJuntas)
        console.log(tipo)
    }
    return (
        <div>
            <h1>Buscar junta</h1>
            <div className="information">
                <label>Nombre:</label>
                <TextField
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
                    <div key={key}>
                        <Fade in={true} timeout={500}>
                            <Card className="Card-appearence" >
                                <Card.Body>
                                    <Card.Title>{val.tipo}</Card.Title>
                                    <Card.Text>{val.fecha}</Card.Text>
                                    <Card.Text>{val.descripcion}</Card.Text>
                                    <Button onClick={() => {
                                        PassDataThrough(val.noJuntas, val.tipo, val.descripcion, val.fecha)
                                    }}>Editar</Button>
                                    <Button onClick={() => {
                                        eliminateJunta(val.noJuntas)
                                    }}>Eliminar</Button>
                                </Card.Body>
                            </Card>
                        </Fade>
                    </div>
                )
            })}
        </div>
    )

}
export default AlterMeetings;
