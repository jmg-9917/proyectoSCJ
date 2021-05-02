import './App.css';
import RegisterDashboard from './RegisterDashboard';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LogIn from './login';
import Nav from './Nav';

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Route path="/login" component={LogIn} />
                <Route path="/registerDashboard" component={RegisterDashboard} />
            </div>
        </Router>
    );

}

export default App;
