
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { Button, Fade, Card } from 'react-bootstrap';
function AlterMembers() {


    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [puesto, setPuesto] = useState("");
    const [telefono, setTelefono] = useState('');
    const [correo_electronico, setCorreo] = useState('');
    const [texto, setTexto] = useState("");
    const [integrantes, setIntegrantes] = useState([]);
    const history = useHistory();
    useEffect(() => {
        Axios.defaults.withCredentials = true
        let isMounted = true;
        Axios.get("http://localhost:3002/integrantes").then((response) => {
            if (isMounted) {
                setIntegrantes(response.data)
            }
        }, [])
        return () => { isMounted = false };

    })

    const eliminateMember = (id) => {
        Axios.defaults.withCredentials = true
        Axios.delete(`http://localhost:3002/deleteMember/${id}`)
        alert('Miembro borrado correctamente.')
        history.push('/registerDashboard/alterItems/alterMembers')
    }

    const PassDataThrough = (id, nombre, apellidos, puesto, telefono, correo_electronico, fechaInscripcion) => {
        history.push({
            pathname: "/registerDashboard/editMemberInfo",
            state: {
                id: id,
                nombre: nombre,
                apellidos: apellidos,
                puesto: puesto,
                telefono: telefono,
                correo: correo_electronico,
                fechaInscripcion: fechaInscripcion
            }

        })
        console.log(id)
        console.log(nombre)
    }


    return (
        <div>
            <div className="eventos">
                <h1>Buscar integrante</h1>
                <div className="information">
                    <label>Nombre:</label>
                    <TextField
                        type="text"
                        onChange={(event) => {
                            setNombre(event.target.value)
                            setApellidos(event.target.value)
                        }}
                    />
                </div>
                {integrantes.filter((val) => {
                    if (nombre === '' || apellidos === '') {
                        return val
                    }
                    else if (val.nombre.toLowerCase().includes(nombre.toLowerCase()) || val.apellidos.toLowerCase().includes(apellidos.toLowerCase())) {
                        return val
                    }
                }).map((val, key) => {

                    return (
                        <div className="card-placement">
                            <Fade in={true} timeout={500}>
                                <Card key={val.idIntegrante} className="Card-appearence" >
                                    <Card.Body>
                                        <Card.Title>{val.nombre}</Card.Title>
                                        <Card.Text>{val.apellidos}</Card.Text>
                                        <Card.Text>{val.puesto}</Card.Text>
                                        <Button
                                            onClick={() =>
                                                PassDataThrough(val.idIntegrante, val.nombre, val.apellidos, val.puesto, val.telefono, val.correo_electronico, val.fechaInscripcion)

                                            }
                                        >Editar</Button>
                                        <Button
                                            onClick={() => {
                                                eliminateMember(val.idIntegrante)
                                            }}>Eliminar</Button>
                                    </Card.Body>
                                </Card>
                            </Fade>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default AlterMembers;
