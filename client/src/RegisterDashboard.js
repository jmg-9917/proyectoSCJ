import App from './App.css';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import WelcomeAdminComponent from './WelcomeAdminComponent';
import RegisterMember from './RegisterMember';
import RegisterEvent from './RegisterEvent';
import RegisterMeeting from './RegisterMeeting';
function RegisterDashboard() {

    return (
        <Router>
            <WelcomeAdminComponent />
            <Route path="/registerMember" component={RegisterMember} />
            <Route path="/registerEvent" component={RegisterEvent} />
            <Route path="/registerMeeting" component={RegisterMeeting} />
        </Router>
    )

}



export default RegisterDashboard;

