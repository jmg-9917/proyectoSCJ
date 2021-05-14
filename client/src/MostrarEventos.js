import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import App from './App.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
function MostrarEventos() {
    const [eventos, setEventos] = useState([]);
    useEffect(() => {
        let isMounted = true;
        Axios.get("http://localhost:3002/eventos")
            .then((response) => {
                if (isMounted) {
                    setEventos(response.data)
                }
            }, [])
        return () => {isMounted = false};

    })
    return (
        <div className="eventos">
            <h1>Mostrar todos los eventos</h1>
            {eventos.map((val) => {
                var nacionalText = ""
                if (val.nacional === 1) {
                    nacionalText = "Nacional"

                }
                else {nacionalText = "Local"}
                return (
                    <>
                        <Card className="Card-appearence" >
                            <Card.Body>
                                <Card.Title>{val.nombreEvento}</Card.Title>
                                <Card.Text>{val.ciudad}</Card.Text>
                                <Card.Text>{nacionalText}</Card.Text>
                                <Card.Text>{val.descripcion}</Card.Text>
                                <Button>Inscribete al evento!</Button>
                            </Card.Body>
                        </Card>
                    </>

                )

            })}
        </div>
    )


}
export default MostrarEventos;
