import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
function ChosenEventView(props) {
    const history = useHistory();
    const eventInfo = props.location.state;
    const noEvento = eventInfo.noEvento;
    const [nombre, setNombre] = useState(eventInfo.nombreEvento);
    const [ciudad, setCiudad] = useState(eventInfo.ciudad);
    const [nacional, setNacional] = useState(eventInfo.nacional);
    const [descr, setDesc] = useState(eventInfo.descripcion);
    const [direccion, setDireccion] = useState(eventInfo.direccion)
    const [fecha, setFecha] = useState(eventInfo.fecha)
    function received() {
        if (eventInfo) {
            return
        }
        else { <Redirect to='/registerDashboard' /> }
    }
    received()

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
                    <Button onClick={() => {
                        updateData()
                    }}>Actualizar</Button>


                </Row>
            </Container>
        </>
    )
}

export default ChosenEventView;
