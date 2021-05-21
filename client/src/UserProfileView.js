import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Container, Row, Col, Card, Fade, Button} from 'react-bootstrap';
function UserProfileView() {
    const history = useHistory();
    const [nombre, setNombre] = useState('');
    const [idIntegrante, setId] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo_electronico, setCorreo] = useState('');
    const [puesto, setPuesto] = useState('');
    const [telefono, setTelefono] = useState('')
    const [fechaInscripcion, setFecha] = useState('');
    const [eventos, setEventos] = useState([]);
    const [counter, setCounter] = useState(false);
    const open = true;
    function UserInfo() {
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.LoggedIn) {
                setId(response.data.user[0][0].idIntegrante)
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
    const viewEvents = () => {
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

    UserInfo()
    return (
        <>
            <div className="place-column">
                <Container className="userProfile-info">
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

                <div className="subscribed-events">
                    <Button onClick={() => viewEvents()}>Ver Eventos</Button>
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

export default UserProfileView;
