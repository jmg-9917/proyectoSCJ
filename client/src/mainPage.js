import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@material-ui/core';
import { Navbar, Nav, Carousel } from 'react-bootstrap';
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
                            <Nav >
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <Button onClick={goToLogin}>
                                    Log in
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </header>
            <body>
                <h1 className="center-slide-text">Hola, ingresa para comenzar</h1>
                <Carousel className="Carousel">
                    <Carousel.Item >
                        <div className="center-slide-text">
                            <h3>Descubre</h3>
                            <p>Adentrate en la sociedad cientifica juvenil.</p>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="center-slide-text">
                            <h3>Relacionate</h3>
                            <p>Esta red social es para aficionados de la ciencia.</p>

                        </div >
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="center-slide-text">
                            <h3>Unete</h3>
                            <p>Solicita tu registro e ingresa.</p>
                        </div>
                    </Carousel.Item>
                </Carousel>

            </body>
        </>
    )
}

export default Presentation;
