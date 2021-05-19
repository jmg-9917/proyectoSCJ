import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';

function ChosenEventView(props) {
    const history = useHistory();
    const eventInfo = props.location.state;

    const [nombre, setNombre] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [nacional, setNacional] = useState('');
    const [descr, setDesc] = useState('');

    function received() {
        if (eventInfo) {
            return
        }
        else { <Redirect to='/registerDashboard' /> }
    }
    received()

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
                        <TextField placeholder={eventInfo.nacional}
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
                    <Button>Actualizar</Button>


                </Row>
            </Container>
        </>
    )
}

export default ChosenEventView;
