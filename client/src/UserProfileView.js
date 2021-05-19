import React, {useState} from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
function UserProfileView() {
    const history = useHistory();
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo_electronico, setCorreo] = useState('');
    const [puesto, setPuesto] = useState('');
    const [telefono, setTelefono] = useState('')
    const [fechaInscripcion, setFecha] = useState('');
    function UserInfo() {
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.LoggedIn) {
                setNombre(response.data.user[0][0].nombre)
                setApellidos(response.data.user[0][0].apellidos)
                setCorreo(response.data.user[0][0].correo_electronico)
                setPuesto(response.data.user[0][0].puesto)
                setTelefono(response.data.user[0][0].telefono)
                setFecha(response.data.user[0][0].fechaInscripcion)

            }

            else {

                history.push("/dashboard");
            }
        })
    }
    UserInfo()
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

export default UserProfileView;
