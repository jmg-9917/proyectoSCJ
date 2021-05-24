import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';
function EditView() {
    return (
        <>
            <div className="sub-title-placement">
                <h1>Algo no está bien? Edita lo que necesites.</h1>
            </div>
            <Container>
                <ListGroup>
                    <Row>
                        <Col>
                            <ListGroup.Item className="sub-links">
                                <Link to="/registerDashboard/alterItems/alterEvents">
                                    <li >Editar eventos</li>
                                </Link>
                            </ListGroup.Item>
                        </Col>
                        <Col>
                            <ListGroup.Item className="sub-links">
                                <Link to="/registerDashboard/alterItems/alterMembers">
                                    <li >Editar miembros</li>
                                </Link>
                            </ListGroup.Item>
                        </Col>
                        <Col>
                            <ListGroup.Item className="sub-links">
                                <Link to="/registerDashboard/alterItems/alterLabReports">
                                    <li >Editar practicas</li>
                                </Link>
                            </ListGroup.Item>
                        </Col>
                        <Col>
                            <ListGroup.Item className="sub-links">
                                <Link to="/registerDashboard/alterItems/alterVisits">
                                    <li >Editar visitas</li>
                                </Link>
                            </ListGroup.Item>
                        </Col>
                        <Col>
                            <ListGroup.Item className="sub-links">
                                <Link to="/registerDashboard/alterItems/alterMeetings">
                                    <li >Editar juntas</li>
                                </Link>
                            </ListGroup.Item>
                        </Col>
                    </Row>
                </ListGroup>
            </Container>
        </>

    )


}

export default EditView;


