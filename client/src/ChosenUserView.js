import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
function ChosenUserView(props) {
    const history = useHistory();
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo_electronico, setCorreo] = useState('');
    const [puesto, setPuesto] = useState('');
    const [telefono, setTelefono] = useState('')
    const [fechaInscripcion, setFecha] = useState('');
    const [userId, setUserId] = useState('');

    if (props.location.state.userId) {
        setUserId(props.location.state.userId)
    }
    else {
        history.push('/dashboard');
    }
    function getChosenUserInfo() {
        Axios.defaults.withCredententials = true

        Axios.post('http:/localhost:3002/getUser', {
            id: userId
        }).then((response) => {
            console.log(response.data)
        })

    }
    getChosenUserInfo()

    return (
        <>
            <Container>
                <Row>
                    <Col xs={6}>
                        Nombre: {nombre}
                    </Col>
                    <Col xs={6}>
                        Apellidos: {apellidos}
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        Puesto: {puesto}
                    </Col>
                    <Col xs={6} md={4}>
                        Telefono: {telefono}
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>Fecha de incorporacion: {fechaInscripcion}</Col>
                </Row>
            </Container>
        </>
    )
}

export default ChosenUserView;
