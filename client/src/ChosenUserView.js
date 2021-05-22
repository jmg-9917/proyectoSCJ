import React, {useState} from 'react';
import Axios from 'axios';
import {useHistory, useLocation, Redirect} from 'react-router-dom';
import {Container, Row, Col, Card, Fade, Button} from 'react-bootstrap';
function ChosenUserView(props) {
    const history = useHistory();
    const userInfo = props.location.state;
    const [eventos, setEventos] = useState([]);
    const [counter, setCounter] = useState(false);
    const open = true;
    function received() {
        if (userInfo) {
            return
        }
        else {history.push('/dashboard')}
    }
    received()

    const viewEvents = (idIntegrante) => {
        setCounter(!counter)
        if (counter) {
            Axios.post("http://localhost:3002/subscribedEvents", {
                idIntegrante: idIntegrante
            })
                .then((response) => {
                    setEventos(response.data)
                    console.log(response.data)

                })

        }
        else {
            setEventos([])
        };
    }
    return (
        <>
            <div className="place-column">
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
                <div className="subscribed-events">
                    <Button onClick={() => viewEvents(userInfo.id)}>Ver Eventos</Button>
                    {eventos.map((val, key) => {
                        return (
                            <div className="card-placement">
                                <Fade in={open} timeout={500}>
                                    <Card key={key} className="card-Names" >
                                        <Card.Body>
                                            <Card.Title>{val.nombreEvento}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Fade>
                            </div>

                        )

                    })}
                </div>
            </div>
        </>
    )
}

export default ChosenUserView;
