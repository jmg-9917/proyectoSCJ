import React, {useState} from 'react';
import App from './App.css';
import {BrowserRouter as Router, Link, Route, useHistory} from 'react-router-dom';
import Axios from 'axios';
import BuscarEvento from './BuscarEvento';
import BuscarIntegrante from './BuscarIntegrante';
import BuscarPractica from './BuscarPractica';
import BuscarJunta from './BuscarJunta';
import MostrarEventos from './MostrarEventos';
import WelcomeComponent from './WelcomeComponent';
import UserProfileView from './UserProfileView';
import ChosenUserView from './ChosenUserView';
import BuscarVisitas from './BuscarVisita';
import {Navbar, Nav} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
function Dashboard() {
    const [nombre, setNombre] = useState('');
    const history = useHistory();
    const handleLogOut = () => {
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:3002/logout").then((response) => {
            console.log(response.data)

        })

    }


    Axios.defaults.withCredentials = true
    function UserFound() {
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.LoggedIn) {
                console.log(response.data)
                setNombre(response.data.user[0][0].nombre)
            }
            if (response.data.LoggedIn === false || response.data.user.length === 0) {
                history.push('/login')
                window.location.reload()
            }
        })
    }
    UserFound()
    if (nombre === "admin") {
        return (
            <div>
                <header>
                    <div className="opening-navbar-location">
                        <Navbar className="navbar-spacing" bg="light" expand="lg">
                            <Navbar.Brand href="/dashboard">SCJ</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav >
                                    <Nav.Link href="/dashboard">Home</Nav.Link>
                                    <Nav.Link href="/registerDashboard">Admin home</Nav.Link>
                                    <Link to="/login">
                                        <Button onClick={handleLogOut}>Log Out</Button>
                                    </Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </header>
                <body>
                    <div className="parent">
                        <Router>
                            <WelcomeComponent />
                            <Route path="/dashboard/buscarIntegrante" component={BuscarIntegrante} />
                            <Route path="/dashboard/verInfoIntegrante" component={ChosenUserView} />
                            <Route path="/dashboard/buscarEvento" component={BuscarEvento} />
                            <Route path="/dashboard/mostrarEventos" component={MostrarEventos} />
                            <Route path="/dashboard/buscarPractica" component={BuscarPractica} />
                            <Route path="/dashboard/buscarJunta" component={BuscarJunta} />
                            <Route path="/dashboard/buscarVisita" component={BuscarVisitas} />
                            <Route path="/dashboard/verPerfil" component={UserProfileView} />
                        </Router>
                    </div>
                </body>

            </div>

        )

    }
    else {
        return (
            <div>
                <header>
                    <div className="opening-navbar-location">
                        <Navbar className="navbar-spacing" bg="light" expand="lg">
                            <Navbar.Brand href="/dashboard">SCJ</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav >
                                    <Nav.Link href="/dashboard">Home</Nav.Link>
                                    <Link to="/login">
                                        <Button onClick={handleLogOut}>Log Out</Button>
                                    </Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </header>
                <body>
                    <div className="parent">
                        <Router>
                            <WelcomeComponent />
                            <Route path="/dashboard/buscarIntegrante" component={BuscarIntegrante} />
                            <Route path="/dashboard/verInfoIntegrante" component={ChosenUserView} />
                            <Route path="/dashboard/buscarEvento" component={BuscarEvento} />
                            <Route path="/dashboard/mostrarEventos" component={MostrarEventos} />
                            <Route path="/dashboard/buscarPractica" component={BuscarPractica} />
                            <Route path="/dashboard/buscarJunta" component={BuscarJunta} />
                            <Route path="/dashboard/buscarVisita" component={BuscarVisitas} />
                            <Route path="/dashboard/verPerfil" component={UserProfileView} />
                        </Router>
                    </div>
                </body>

            </div>

        )

    }

}
export default Dashboard;

