import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@material-ui/core';
import { Navbar, Nav } from 'react-bootstrap';
import './App.css';
const Presentation = () => {
    let history = useHistory()
    const goToLogin = () => {
        history.push('/login')
    };

    return (
        <>
            <header>
                <div className="opening-navbar-location">
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </header>
            <body>
                <div className="opening-mainpage-location">
                    <h1>Hola, ingresa para comenzar</h1>
                    <Button onClick={goToLogin}>
                        Log in
            </Button>
                </div>

            </body>
        </>
    )
}

export default Presentation;
