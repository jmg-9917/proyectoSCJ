
import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
function EditLabReports(props) {
    const history = useHistory();
    const labReportInfo = props.location.state;
    const noPractica = labReportInfo.noPractica;
    const [nombre, setNombre] = useState(labReportInfo.nombre);
    const [categoria, setCategoria] = useState(labReportInfo.categoria);
    const [descr, setDesc] = useState(labReportInfo.descripcion);
    const [fecha, setFecha] = useState(labReportInfo.fecha)
    function received() {
        if (labReportInfo) {
            return
        }
        else { <Redirect to='/registerDashboard' /> }
    }
    received()

    const updateData = () => {
        Axios.defaults.withCredentials = true
        Axios.put('http://localhost:3002/updateLabReport', {
            noPractica: noPractica,
            nuevoNombre: nombre,
            nuevaCategoria: categoria,
            nuevaDescripcion: descr,
            nuevaFecha: fecha
        })
        history.push(
            "/registerDashboard/alterItems/alterLabReports"
        )
        alert('Practica actualizada correctamente.')

    };


    return (
        <>
            <Container>
                <Row>
                    <Col xs={6}>
                        Nombre:
                        <TextField placeholder={labReportInfo.nombre}
                            onChange={(e) => {
                                setNombre(e.target.value)
                            }}></TextField>
                    </Col>
                    <Col xs={6}>
                        Categoria:
                        <TextField placeholder={labReportInfo.categoria}
                            onChange={(e) => {
                                setCategoria(e.target.value)
                            }}></TextField>
                    </Col>
                    <Row>
                        <Col xs={6}>
                            Descripcion:
                            <TextField placeholder={labReportInfo.descripcion}
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

export default EditLabReports;
