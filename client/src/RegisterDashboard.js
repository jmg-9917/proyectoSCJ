import './App.css';
import {Link, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import WelcomeAdminComponent from './WelcomeAdminComponent';
import RegisterMember from './RegisterMember';
import RegisterEvent from './RegisterEvent';
import RegisterMeeting from './RegisterMeeting';
import RegisterLabReport from './RegisterLabReport';
import RegisterVisita from './RegisterVisit';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import {Navbar, Nav} from 'react-bootstrap';
function RegisterDashboard() {
    Axios.defaults.withCredentials = true
    const handleLogOut = () => {
        Axios.get("http://localhost:3002/logout").then((response) => {
            console.log(response.data)

        })

    }

    return (
        <div>
            <header>
                <div className="opening-navbar-location">
                    <Navbar className="navbar-spacing" bg="light" expand="lg">
                        <Navbar.Brand href="#home">SCJ</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav >
                                <Nav.Link href="dashboard">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <Link to="/login">
                                    <Button onClick={handleLogOut}>Log Out</Button>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </header>
            <body>
                <Router>
                    <WelcomeAdminComponent />
                    <Route path="/registerMember" component={RegisterMember} />
                    <Route path="/registerEvent" component={RegisterEvent} />
                    <Route path="/registerMeeting" component={RegisterMeeting} />
                    <Route path="/registerLabReport" component={RegisterLabReport} />
                    <Route path="/registerVisit" component={RegisterVisita} />
                </Router>
            </body>
        </div>
    )

}



export default RegisterDashboard;

