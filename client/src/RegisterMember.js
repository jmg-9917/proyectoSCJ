
import './App.css';
import { useState, useRef } from 'react';
import Axios from 'axios'
import React from 'react';
import { TextField, Button } from '@material-ui/core'
import validator from 'validator';
import GetFormattedDate from './GetFormattedDate';
import ReCAPTCHA from 'react-google-recaptcha';
import ShowAlert from './Flash-message-component';
import { Row, Container, Col } from 'react-bootstrap'
const RegisterMember = () => {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [telefono, setTelefono] = useState("");
    const [puesto, setPuesto] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [token, setToken] = useState("");
    const reCaptcha = useRef();
    const [success, setSuccess] = useState(null);

    const [nombreError, setNombreError] = useState("");
    const [apellidosError, setApellidosError] = useState("");
    const [telefonoError, setTelefonoError] = useState("");
    const [puestoError, setPuestoError] = useState("");
    const [correoError, setCorreoError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setPasswordConfirmationError] = useState("");


    const formatted = GetFormattedDate;
    const [fecha, setFecha] = useState(formatted);
    const [LogInStatus, setLogInStatus] = useState("");
    const [activo, setActivo] = useState(false);


    function errorInFields() {
        let errors = {
            nombreError: false,
            apellidosError: false,
            telefonoError: false,
            puestoError: false,
            correoError: false,
            passwordError: false,
            passwordConfirmationError: false

        }
        if (nombre.length < 2) {
            errors.nombreError = true
            setNombreError('Inserte un nombre valido')
        }
        else {
            errors.nombreError = false
            setNombreError('')
        }
        if (apellidos.length < 3) {
            errors.apellidosError = true
        }
        else {
            errors.apellidosError = false
            setApellidosError('')
        }
        if (telefono.length < 10) {
            errors.telefono = true
            setTelefonoError('Inserte un numero de telefono valido.')
        }
        else {
            errors.telefonoError = false
            setTelefonoError('')
        }
        if (puesto.length < 1) {
            errors.puestoError = true
            setPuestoError('Inserte un puesto valido')
        }
        else {
            errors.puestoError = false
            setPuestoError('')
        }
        if (validator.isEmail(correo)) {
            errors.correoError = false
            setCorreoError('')
        }
        else {
            setCorreoError('Inserte un correo electronico valido.')
            errors.emailError = true
        }
        if (password.length < 3) {
            errors.passwordError = true
            setPasswordError('La contraseña debe de tener mas de 3 caracteres.')
        }
        else {
            setPasswordError('')
            errors.passwordError = false
        }
        if (passwordConfirmation.length < 3) {
            setPasswordConfirmationError('La contraseña debe de tener mas de 3 caracteres.')
            errors.passwordConfirmationError = true
        }
        else {
            setPasswordConfirmationError('')
            errors.passwordConfirmationError = false
        }
        return errors
    }




    const comparePasswords = () => {
        return password === passwordConfirmation
    }
    const registrarIntegrante = () => {
        setActivo(true)
        const errorsDetected = errorInFields()
        if (errorsDetected.nombreError === false || errorsDetected.apellidosError === false || errorsDetected.telefonoError === false || errorsDetected.puestoError === false || errorsDetected.correoError === false || errorsDetected.passwordError === false || errorsDetected.passwordConfirmationError === false) {

            const correctPassword = comparePasswords();
            if (correctPassword) {
                setPasswordConfirmationError('')
                Axios.post('http://localhost:3002/create', {
                    nombre: nombre,
                    apellidos: apellidos,
                    telefono: telefono,
                    puesto: puesto,
                    correo: correo,
                    fecha: fecha,
                    password: password,
                    activo: activo
                }).then(() => {
                    console.log(fecha)
                    console.log("Frontend and backend connected.")
                    setSuccess(true)
                    ShowAlert(success, 'integrante')
                    document.getElementById("integrante-form").reset();

                })

            }
            else {
                setPasswordConfirmationError('Las contraseñas no coinciden')
            }
        }
        else {
            console.log('denied')
        }


    };
    return (<div>
        <div className="mainDisplay">
            <form id="integrante-form"  >
                <Container>
                    <Row className="row">
                        <Col xs={5} md={10}>
                            <h2>Registrar integrante</h2>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col xs={5} md={4}>
                            <label>Nombre:</label>
                            <TextField
                                helperText={nombreError}
                                type="text"
                                onChange={(event) => {
                                    setNombre(event.target.value)

                                }}
                            />
                        </Col>
                        <Col xs={2} md={4}>
                            <label>Apellidos</label>
                            <TextField
                                type="text"
                                helperText={apellidosError}
                                onChange={(event) => {
                                    setApellidos(event.target.value)

                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col xs={15} md={4}>
                            <label>Telefono:</label>
                            <TextField
                                type="number"
                                helperText={telefonoError}
                                onChange={(event) => {
                                    setTelefono(event.target.value)

                                }}
                            />
                        </Col>
                        <Col xs={15} md={4}>
                            <label>Correo electronico:</label>
                            <TextField
                                type="text"
                                helperText={correoError}
                                onChange={(event) => {
                                    setCorreo(event.target.value)

                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col xs={15} md={4}>
                            <label>Contraseña:</label>
                            <TextField
                                type="password"
                                helperText={passwordError}
                                onChange={(event) => {
                                    setPassword(event.target.value)

                                }}
                            />
                        </Col>
                        <Col xs={15} md={4}>
                            <label>Confirme contraseña:</label>
                            <TextField
                                type="password"
                                helperText={passwordConfirmationError}
                                onChange={(event) => {
                                    setPasswordConfirmation(event.target.value)
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2} >
                        </Col>
                        <Col xs={6} md={4} >
                            <label>Puesto:</label>
                            <TextField
                                type="text"
                                helperText={puestoError}
                                onChange={(event) => {
                                    setPuesto(event.target.value)

                                }}
                            />
                        </Col>
                        <Col >
                        </Col>
                    </Row>
                    <Row>
                        <Col  >
                        </Col>
                        <Col xs={10}>
                            <ReCAPTCHA
                                sitekey="6LdSbs0aAAAAAIQgPXIQXHfEPB9WyTKyv2iyYljm"
                                onChange={token => {
                                    setToken(token)
                                }}
                                onExpired={e => setToken("")}
                                ref={reCaptcha}
                            ></ReCAPTCHA>
                        </Col>
                        <Col >
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        </Col>
                        <Col xs={8} >
                            <Button variant="outlined" onClick={registrarIntegrante}>Registrar integrante</Button>
                        </Col>
                        <Col >
                        </Col>
                    </Row>
                </Container>
            </form>


        </div>
    </div>

    )
}

export default RegisterMember;
