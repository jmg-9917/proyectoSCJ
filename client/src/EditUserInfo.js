import React, {useState} from 'react';
import Axios from 'axios';
import {useHistory, Redirect} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {TextField} from '@material-ui/core';
function EditUserInfo(props) {
    const history = useHistory();
    const userInfo = props.location.state;
    const idIntegrante = userInfo.id;
    const [nombre, setNombre] = useState(userInfo.nombre);
    const [apellidos, setApellidos] = useState(userInfo.apellidos);
    const [puesto, setPuesto] = useState(userInfo.puesto);
    function received() {
        if (userInfo) {
            return
        }
        else {<Redirect to='/registerDashboard' />}
    }
    received()

    const updateData = () => {
        Axios.defaults.withCredentials = true
        Axios.put('http://localhost:3002/updateMember', {
            idIntegrante: idIntegrante,
            nuevoNombre: nombre,
            nuevaApellidos: apellidos,
            nuevoPuesto: puesto,
        })
        history.push(
            "/registerDashboard/alterItems/alterMembers"
        )
        alert('Miembro actualizado correctamente.')

    };

    return (
        <>
            <Container>
                <Row>
                    <Col xs={6}>
                        Nombre:
                        <TextField placeholder={userInfo.nombre}
                            onChange={(e) => {
                                setNombre(e.target.value)
                            }}></TextField>
                    </Col>
                    <Col xs={6}>
                        Apellidos:
                        <TextField placeholder={userInfo.apellidos}
                            onChange={(e) => {
                                setApellidos(e.target.value)
                            }}></TextField>
                    </Col>
                    <Col xs={6}>
                        Puesto:
                        <TextField placeholder={userInfo.puesto}
                            onChange={(e) => {
                                setPuesto(e.target.value)
                            }}
                        ></TextField>
                    </Col>
                    <Button onClick={() => {
                        updateData()
                    }}>Actualizar</Button>


                </Row>
            </Container>
        </>
    )
}

export default EditUserInfo;

