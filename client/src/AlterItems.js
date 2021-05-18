import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EditView from './EditView';
import AlterEvents from './AlterEvents';
function AlterItems() {
    return (
        <div>
            <Router>
                <EditView />
                <Route path="/registerDashboard/alterItems/alterEvents" component={AlterEvents} />
            </Router>
        </div>

    )

}
export default AlterItems;
