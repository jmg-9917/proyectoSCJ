
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Card, Button, Fade } from 'react-bootstrap';
import { SubscribeToMeeting, UnsubscribeToMeeting } from './Subscription';
function BuscarJunta() {
    const [idIntegrante, setIdIntegrante] = useState('')
    const history = useHistory()
    const [tipo, setTipo] = useState("");
    const [descripcion, setDesc] = useState("");
    const [susc, setSusc] = useState(false)
    const [juntas, setJuntas] = useState([]);

    function UserFound() {
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.LoggedIn) {
                console.log(response.data)
                setIdIntegrante(response.data.user[0][0].idIntegrante)
            }
            if (response.data.LoggedIn === false || response.data.user.length === 0) {
                history.push('/login')
                window.location.reload()
            }
        })
    }
    UserFound()


    useEffect(() => {
        let isMounted = true;
        Axios.get("http://localhost:3002/juntas")
            .then((response) => {
                if (isMounted) {
                    setJuntas(response.data)
                }
            }, [])
        return () => { isMounted = false };

    })


    return (
        <div className="eventos">
            <h1>Buscar junta</h1>
            <div>
                <TextField
                    label="Nombre"
                    type="text"
                    onChange={(event) => {
                        setTipo(event.target.value)
                        setDesc(event.target.value)
                    }}
                />
            </div>
            {juntas.filter((val) => {
                if (tipo === '' || descripcion === '') {
                    return val
                }
                else if (val.tipo.toLowerCase().includes(tipo.toLowerCase()) || val.descripcion.toLowerCase().includes(descripcion.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {

                return (
                    <div className="card-placement" key={key}>
                        <Fade in={true} timeout={500}>
                            <Card className="Card-appearence" >
                                <Card.Body>
                                    <Card.Title>{val.tipo}</Card.Title>
                                    <Card.Text>{val.fecha}</Card.Text>
                                    <Card.Text>{val.descripcion}</Card.Text>

                                    <Button
                                        onClick={() => {
                                            setSusc(!susc)
                                            if (susc) {
                                                SubscribeToMeeting(idIntegrante, val.noJuntas, val.fecha)
                                            }
                                            else {
                                                UnsubscribeToMeeting(idIntegrante, val.noJuntas, val.fecha)
                                            }
                                        }}>Inscribete</Button>
                                </Card.Body>
                            </Card>
                        </Fade>

                    </div>
                )
            })}
        </div>
    )
}
export default BuscarJunta;
