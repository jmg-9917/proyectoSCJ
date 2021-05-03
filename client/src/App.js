import './App.css';
import RegisterDashboard from './RegisterDashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LogIn from './login';
import Nav from './Nav';
import Presentation from './mainPage';
import Dashboard from './dashboard';
function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Router path="/mainPage" component={Presentation} />
                <Route path="/login" component={LogIn} />
                <Route path="/registerDashboard" component={RegisterDashboard} />
                <Route path="/dashboard" component={Dashboard} />
            </div>
        </Router>
    );

}

export default App;
