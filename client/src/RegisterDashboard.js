import App from './App.css';
import {Link, Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import WelcomeAdminComponent from './WelcomeAdminComponent';
import RegisterMember from './RegisterMember';
import RegisterEvent from './RegisterEvent';
import RegisterMeeting from './RegisterMeeting';
import Axios from 'axios';
function RegisterDashboard() {
    const handleLogOut = () => {
        Axios.get("http://localhost:3002/login").then((response) => {
            response.data.loggedIn = false;
            response.data.user = [];
            console.log(response.data)

        })

    }

    return (
        <div>
            <Link to="/login">
                <button onClick={handleLogOut}>Log Out</button>
            </Link>
            <Router>
                <WelcomeAdminComponent />
                <Route path="/registerMember" component={RegisterMember} />
                <Route path="/registerEvent" component={RegisterEvent} />
                <Route path="/registerMeeting" component={RegisterMeeting} />
            </Router>
        </div>
    )

}



export default RegisterDashboard;

