import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import Map from "./Address";
function ChosenEventView(props) {
    const history = useHistory();
    const eventInfo = props.location.state;
    const noEvento = eventInfo.noEvento;
    const [nombre, setNombre] = useState(eventInfo.nombreEvento);
    const [ciudad, setCiudad] = useState(eventInfo.ciudad);
    const [nacional, setNacional] = useState(eventInfo.nacional);
    const [descr, setDesc] = useState(eventInfo.descripcion);

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
            nuevaDescripcion: descr
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
                    <Button onClick={() => {
                        updateData()
                    }}>Actualizar</Button>


                </Row>
            </Container>
            <Map />
        </>
    )
}

export default ChosenEventView;
