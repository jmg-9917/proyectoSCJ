import './App.css';

import RegisterDashboard from './RegisterDashboard';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import LogIn from './login';
import Presentation from './mainPage';
import Dashboard from './dashboard';


function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Presentation} />
                    <Route exact path="/login" component={LogIn} />
                    <Route exact path="/registerDashboard" component={RegisterDashboard} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </div>
    );

}

export default App;
