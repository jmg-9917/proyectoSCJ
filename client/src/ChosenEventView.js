import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button, Fade, Card } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
function ChosenEventView(props) {
    const history = useHistory();
    const eventInfo = props.location.state;
    const noEvento = eventInfo.noEvento;
    const [nombre, setNombre] = useState(eventInfo.nombreEvento);
    const [ciudad, setCiudad] = useState(eventInfo.ciudad);
    const [nacional, setNacional] = useState(eventInfo.nacional);
    const [descr, setDesc] = useState(eventInfo.descripcion);
    const [direccion, setDireccion] = useState(eventInfo.direccion);
    const [fecha, setFecha] = useState(eventInfo.fecha);

    const [matNombre, setMatNombre] = useState('');
    const [matTipo, setMatTipo] = useState('');
    const [matCantidad, setMatCant] = useState(0);
    const [materiales, setMateriales] = useState([])
    const open = true
    const materiaList = () => {
        let isMounted = true;
        Axios.post("http://localhost:3002/materialsRelatedToEvent",
            {
                noEvento: noEvento
            })
            .then((response) => {
                if (isMounted) {
                    setMateriales(response.data)
                }
            }, [])
        return () => { isMounted = false };

    }
    function received() {
        if (eventInfo) {
            return
        }
        else { <Redirect to='/registerDashboard' /> }
    }
    received()
    const addMaterial = () => {
        Axios.defaults.withCredentials = true
        Axios.post('http://localhost:3002/createMaterial', {
            nombre: matNombre,
            tipo: matTipo,
            cantidad: matCantidad,
            noEvento: noEvento
        }).then(() => {
            alert('Material registrado.')
        })
    }
    const deleteMaterial = (idMateriales) => {
        console.log(idMateriales)
    }
    const updateData = () => {
        const numNacional = substituteForNum(nacional)
        Axios.defaults.withCredentials = true
        Axios.put('http://localhost:3002/updateEvent', {
            noEvento: noEvento,
            nuevoNombre: nombre,
            nuevaCiudad: ciudad,
            boolNacional: numNacional,
            nuevaDescripcion: descr,
            nuevaDireccion: direccion,
            nuevaFecha: fecha
        })
        history.push(
            "/registerDashboard/alterItems/alterEvents"
        )
        alert('Evento actualizado correctamente.')

    };

    const substituteForText = (nacionalBool) => {
        if (nacionalBool !== 1) {
            return "Local"
        }
        return "Nacional"
    };

    const substituteForNum = (nacionalText) => {
        if (nacionalText !== "Local") {
            return 1
        }
        return 0
    };

    const formatDate = (date) => {
        const originalDate = date.split('-');
        let reversedArr = originalDate.reverse()
        let defaultValue = [];
        reversedArr.map((val) => {
            defaultValue.push(val)
        })
        console.log(defaultValue.join(',').replace(/,/g, '/').split())
        return defaultValue[0]
    }

    return (
        <>
            <Container>
                <Row>
                    <Col xs={6}>
                        Nombre:
                        <TextField placeholder={eventInfo.nombreEvento}
                            onChange={(e) => {
                                setNombre(e.target.value)
                            }}></TextField>
                    </Col>
                    <Col xs={6}>
                        Ciudad:
                        <TextField placeholder={eventInfo.ciudad}
                            onChange={(e) => {
                                setCiudad(e.target.value)
                            }}></TextField>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        Direccion:
                        <TextField placeholder={eventInfo.direccion}
                            onChange={(e) => {
                                setDireccion(e.target.value)
                            }}></TextField>
                    </Col>
                    <Col xs={6}>
                        Nacional:
                        <TextField placeholder={substituteForText(eventInfo.nacional)}
                            onChange={(e) => {
                                setNacional(e.target.value)
                            }}
                        ></TextField>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        Descripcion:
                            <TextField placeholder={eventInfo.descripcion}
                            onChange={(e) => {
                                setDesc(e.target.value)
                            }}  ></TextField>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        Fecha:
                            <TextField
                            id="date"
                            type="date"
                            onChange={(e) => {
                                setFecha(e.target.value)
                                console.log(fecha)
                            }}
                            defaultValue={formatDate(eventInfo.fecha)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />                         </Col>
                </Row>
                <Row>
                    <Button onClick={() => {
                        updateData()
                    }}>Actualizar</Button>
                </Row>
            </Container>
            <Row>
                <Col>
                    <Col>
                        <h3>Anota los materiales utilizados:</h3>
                        <TextField
                            label="Nombre"
                            type="text"
                            onChange={(e) => {
                                setMatNombre(e.target.value)
                            }}
                        ></TextField>
                        <TextField
                            label="Tipo"
                            type="text"
                            onChange={(e) => {
                                setMatTipo(e.target.value)
                            }}
                        ></TextField>
                        <TextField
                            label="Cantidad"
                            type="number"
                            onChange={(e) => {
                                setMatCant(e.target.value)
                            }}
                        ></TextField>
                    </Col>
                    <Button onClick={() => {
                        addMaterial(matNombre, matTipo, matCantidad, noEvento)
                        materiaList()
                    }}>Agregar a evento</Button>
                </Col>
                <Col>
                    {materiales.map((val, key) => {
                        return (
                            <div className="card-placement">
                                <Fade in={open} timeout={500}>
                                    <Card key={key} className="Card-appearence" >
                                        <Card.Body>
                                            <Card.Title>{val.nombre}</Card.Title>
                                            <Card.Text>{val.tipo}</Card.Text>
                                            <Card.Text>{val.cantidad}</Card.Text>
                                            <Button
                                                onClick={() => {
                                                    deleteMaterial(val.idMateriales)
                                                }}>Eliminar material</Button>
                                        </Card.Body>
                                    </Card>
                                </Fade>
                            </div>

                        )
                    })}
                </Col>
            </Row>
        </>
    )
}

export default ChosenEventView;
