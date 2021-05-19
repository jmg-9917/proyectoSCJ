import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
function ChosenUserView(props) {
    const history = useHistory();
    const userInfo = props.location.state;

    function received() {
        if (userInfo) {
            return
        }
        else { history.push('/dashboard') }
    }
    received()

    return (
        <>
            <Container>
                <Row>
                    <Col xs={6}>
                        Nombre: {userInfo.nombre}
                    </Col>
                    <Col xs={6}>
                        Apellidos: {userInfo.apellidos}
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        Puesto: {userInfo.puesto}
                    </Col>
                    <Col xs={6} md={4}>
                        Telefono: {userInfo.telefono}
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>Fecha de incorporacion: {userInfo.fechaInscripcion}</Col>
                </Row>
                <Row>
                    <Col xs={6}>Correo electronico: {userInfo.correo}</Col>
                </Row>
            </Container>
        </>
    )
}

export default ChosenUserView;
