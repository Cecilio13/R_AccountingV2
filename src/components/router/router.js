import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import App from '../App.js';
import UserApproval from '../UserApproval.js';
import Approvals from '../Approvals.js';
import JournalEntry from '../JournalEntry.js';
import print_journal from '../inc/print_journal.js';
import Sales from '../Sales.js';
import Expenses from '../Expenses.js';
import Reports from '../Reports.js';
import Accounting from '../Accounting.js';
import CostCenter from '../CostCenter.js';
import CheckRegister from '../CheckRegister.js';
import AccountAndSettings from '../AccountAndSettings.js';
import CustomFontStyles from '../CustomFontStyles.js';
import AllList from '../AllList.js';
import Dashboard from '../Dashboard.js';

const RouteController = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/pending_user">
                    <UserApproval />
                </Route>
                <Route path="/approvals">
                    <Approvals />
                </Route>
                <Route path="/journalentry/:je_no?/:style?" component={JournalEntry} />
                <Route path="/print_journal_entry/:no?" component={print_journal} />
                
                <Route path="/sales">
                    <Sales />
                </Route>
                <Route path="/expenses">
                    <Expenses />
                </Route>
                <Route path="/reports">
                    <Reports />
                </Route>
                <Route path="/accounting">
                    <Accounting />
                </Route>
                <Route path="/cost_center">
                    <CostCenter />
                </Route>
                <Route path="/checkregister">
                    <CheckRegister />
                </Route>
                <Route path="/accountsandsettings">
                    <AccountAndSettings />
                </Route>
                <Route path="/customformstyles">
                    <CustomFontStyles />
                </Route>
                <Route path="/alllists">
                    <AllList />
                </Route>
                <Route path="/">
                    <App />
                </Route>
                
            </Switch>
        </div>
    </Router>
);

export default RouteController;














