
import React, {useState} from 'react';
import Axios from 'axios';
import {useHistory, Redirect} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {TextField} from '@material-ui/core';
function EditMeeting(props) {
    const history = useHistory();
    const meetingInfo = props.location.state;
    const noJuntas = meetingInfo.noJuntas;
    const [tipo, setTipo] = useState(meetingInfo.tipo);
    const [descr, setDesc] = useState(meetingInfo.descripcion);
    const [fecha, setFecha] = useState(meetingInfo.fecha)
    function received() {
        if (meetingInfo) {
            return
        }
        else {<Redirect to='/registerDashboard' />}
    }
    received()

    const updateData = () => {
        Axios.defaults.withCredentials = true
        Axios.put('http://localhost:3002/updateMeeting', {
            noJuntas: noJuntas,
            nuevoTipo: tipo,
            nuevaDescripcion: descr,
            nuevaFecha: fecha
        })
        history.push(
            "/registerDashboard/alterItems/alterMeetings"
        )
        alert('Junta actualizada correctamente.')

    };


    return (
        <>
            <Container>
                <Row>
                    <Col xs={6}>
                        Tipo:
                        <TextField placeholder={meetingInfo.tipo}
                            onChange={(e) => {
                                setTipo(e.target.value)
                            }}></TextField>
                    </Col>
                    <Row>
                        <Col xs={6}>
                            Descripcion:
                            <TextField placeholder={meetingInfo.descripcion}
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

export default EditMeeting;
