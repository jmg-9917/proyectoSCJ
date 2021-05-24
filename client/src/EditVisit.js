import React, {useState} from 'react';
import Axios from 'axios';
import {useHistory, Redirect} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {TextField} from '@material-ui/core';
function EditVisit(props) {
    const history = useHistory();
    const visitInfo = props.location.state;
    const noVisita = visitInfo.noVisita;
    const [nombre, setNombre] = useState(visitInfo.nombre);
    const [categoria, setCategoria] = useState(visitInfo.categoria);
    const [descr, setDesc] = useState(visitInfo.descripcion);
    const [fecha, setFecha] = useState(visitInfo.fecha)
    function received() {
        if (visitInfo) {
            return
        }
        else {<Redirect to='/registerDashboard' />}
    }
    received()

    const updateData = () => {
        Axios.defaults.withCredentials = true
        Axios.put('http://localhost:3002/updateVisit', {
            noVisita: noVisita,
            nuevoNombre: nombre,
            nuevaCategoria: categoria,
            nuevaDescripcion: descr,
            nuevaFecha: fecha
        })
        history.push(
            "/registerDashboard/alterItems/alterVisits"
        )
        alert('Visita actualizada correctamente.')

    };


    return (
        <>
            <Container>
                <Row>
                    <Col xs={6}>
                        Nombre:
                        <TextField placeholder={visitInfo.nombre}
                            onChange={(e) => {
                                setNombre(e.target.value)
                            }}></TextField>
                    </Col>
                    <Col xs={6}>
                        Categoria:
                        <TextField placeholder={visitInfo.categoria}
                            onChange={(e) => {
                                setCategoria(e.target.value)
                            }}></TextField>
                    </Col>
                    <Row>
                        <Col xs={6}>
                            Descripcion:
                            <TextField placeholder={visitInfo.descripcion}
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

export default EditVisit;
