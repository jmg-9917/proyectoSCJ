import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EditView from './EditView';
import AlterEvents from './AlterEvents';
import AlterLabReports from './AlterLabReports';
import AlterVisits from './AlterVisits';
import AlterMeetings from './AlterMeetings';
import EditUserInfo from './EditUserInfo';
import EditVisit from './EditVisit';
import EditLabReports from './EditLabReports';
import ChosenEventView from './ChosenEventView';
import AlterMembers from './AlterMembers';
function AlterItems() {
    return (
        <div>
            <Router>
                <EditView />
                <Route path="/registerDashboard/alterItems/alterEvents" component={AlterEvents} />
                <Route path="/registerDashboard/alterItems/editEvent" component={ChosenEventView} />
                <Route path="/registerDashboard/alterItems/alterMembers" component={AlterMembers} />
                <Route path="/registerDashboard/alterItems/editMemberInfo" component={EditUserInfo} />
                <Route path="/registerDashboard/alterItems/alterLabReports" component={AlterLabReports} />
                <Route path="/registerDashboard/alterItems/editLabReport" component={EditLabReports} />
                <Route path="/registerDashboard/alterItems/alterMeetings" component={AlterMembers} />
                <Route path="/registerDashboard/alterItems/alterVisits" component={AlterVisits} />
                <Route path="/registerDashboard/alterItems/editVisit" component={EditVisit} />
            </Router>
        </div>

    )

}
export default AlterItems;
