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
import Report_Content from '../Report_Content.js';
import Report_Content_A from '../Report_Content_A.js';
import Report_Content_B from '../Report_Content_B.js';
import Report_Content_CC from '../Report_Content_CC.js';
import Report_Content_SC from '../Report_Content_SC.js';
import Report_Content_P from '../Report_Content_P.js';
import Report_Content_ACC from '../Report_Content_ACC.js';
import Report_Content_Recent from '../Report_Content_Recent.js';
import Report_Content_J from '../Report_Content_J.js';

const RouteController = () => (
    
    <Router basename="/react">
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
                <Route path="/report_content/:no" component={Report_Content} />
                <Route path="/report_content_a" component={Report_Content_A} />
                <Route path="/report_content_b" component={Report_Content_B} />
                <Route path="/report_content_cc" component={Report_Content_CC} />
                <Route path="/report_content_sc" component={Report_Content_SC} />
                <Route path="/report_content_p" component={Report_Content_P} />
                <Route path="/report_content_acc" component={Report_Content_ACC} />
                <Route path="/report_content_recent" component={Report_Content_Recent} />
                <Route path="/report_content_j" component={Report_Content_J} />
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














