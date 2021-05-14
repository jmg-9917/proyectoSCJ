import './App.css';
import Register from './register';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LogIn from './login';
import Nav from './Nav';
import Dashboard from './dashboard';
import Axios from 'axios';

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Route path="/login" component={LogIn} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={() =>
                    <Dashboard authorized={false} />
                } />

            </div>
        </Router>
    );

}

export default App;
