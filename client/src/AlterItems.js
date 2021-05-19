import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EditView from './EditView';
import AlterEvents from './AlterEvents';
import ChosenEventView from './ChosenEventView';
function AlterItems() {
    return (
        <div>
            <Router>
                <EditView />
                <Route path="/registerDashboard/alterItems/alterEvents" component={AlterEvents} />
                <Route path="/registerDashboard/alterItems/editEvent" component={ChosenEventView} />
            </Router>
        </div>

    )

}
export default AlterItems;
