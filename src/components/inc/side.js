import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import '../../css/index.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
class Side extends React.Component{
    state ={data: []}
   
    getUserAccess= async (event) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/get_access',{
            params:{
                id: sessionStorage.getItem('Accounting_App_id'),
            },
            crossDomain: true
        });
        console.log(response.data.access);
        this.setState({data : response.data.access});
    }
    componentDidMount(){
        this.getUserAccess();
    }
    render(){
        
        // const data=this.state.data.map((dat) =>{
        //     return <div key={dat.id}>{dat.id+" "+dat.name+" "+dat.position}</div>
        // });
        return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-default">
            
            <div className="navbar-header">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars"></i>
                </button>
            </div>
            <div id="main-menu" className="main-menu collapse navbar-collapse">
                <ul className="nav navbar-nav">
                        <li className="active">
                            <Link to="/dashboard"><i className="menu-icon fas fa-tachometer-alt"></i>Dashboard </Link>
                                {/* <a href="dashboard" > <i className="menu-icon fas fa-tachometer-alt"></i>Dashboard </a> */}
                        </li>
                        <h3 className="menu-title" style={{marginBottom : '10px'}}>Menu</h3>
                        <li><a href="banking" style={{display : 'none'}}> <i className="menu-icon fas fa-wallet width30"></i>Banking</a></li>
                       
                        <li>
                            {this.state.data!=null && this.state.data.user_approval=="1"? <Link to="/pending_user" style={{padding : '5px 0'}}><i className="menu-icon fas fa-address-book width30"></i>User Access Approvals </Link> : ''}
                            
                            {/* <a href="pending_user"  style={{padding : '5px 0'}}> </a> */}
                        </li>
                       
                        <li>
                        {this.state.data!=null && this.state.data.approvals=="1"? <Link to="/approvals" style={{padding : '5px 0'}}><i className="menu-icon fas fa-check-square width30"></i>Approvals </Link>  : ''}
                        
                            {/* <a href="approvals" style={{padding : '5px 0'}}> <i className="menu-icon fas fa-check-square width30"></i>Approvals </a> */}
                        </li>
                        
                        <li>
                        {this.state.data!=null && this.state.data.journal_entry=="1"? <Link to="/journalentry" style={{padding : '5px 0'}}><i className="menu-icon fas fa-columns width30"></i>Journal Entry </Link>  : ''}
                        
                            {/* <a href="journalentry" style={{padding : '5px 0'}}> <i className="menu-icon fas fa-columns width30"></i>Journal Entry</a> */}
                        </li>
                       
                        <li>
                        {this.state.data!=null && this.state.data.sales=="1"? <Link to="/sales" style={{padding : '5px 0'}}><i className="menu-icon fas fa-chart-area width30"></i>Sales </Link>  : ''}
                        
                            {/* <a href="sales" style={{padding : '5px 0'}}> <i className="menu-icon fas fa-chart-area width30"></i>Sales</a> */}
                        </li>
                        
                        <li>
                        {this.state.data!=null && this.state.data.expense=="1"? <Link to="/expenses" style={{padding : '5px 0'}}> <i className="menu-icon fas fa-money-bill width30"></i>Expenses </Link>  : ''}
                            </li>
                        
                        <li>
                        {this.state.data!=null && this.state.data.reports=="1"? <Link to="/reports" style={{padding : '5px 0'}}> <i className="menu-icon far fa-file width30"></i>Reports</Link>  : ''}
                            </li>
                        
                        <li><a href="taxes" style={{display : 'none'}} > <i className="menu-icon fas fa-chart-line width30"></i>Taxes</a></li>
                        <li>
                        {this.state.data!=null && this.state.data.chart_of_accounts=="1"? <Link to="/accounting" style={{padding : '5px 0'}}> <i className="menu-icon fas fa-receipt width30"></i>Accounting</Link>  : ''}
                            </li>
                        <li>
                        {this.state.data!=null && this.state.data.cost_center=="1"? <Link to="/cost_center" style={{padding : '5px 0'}}> <i className="menu-icon fas fa-receipt width30"></i>Cost Center</Link>  : ''}
                            </li>
                        
                    <h3 className="menu-title" style={{marginBottom : '10px'}}>Create</h3>
                    
                    
                    {this.state.data!=null && this.state.data.sales=="1"? 
                    <li className="menu-item-has-children dropdown">
                        <a href="#" style={{padding : '5px 0'}} className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fas fa-user-tie width30"></i>Customers</a>
                        <ul className="sub-menu children dropdown-menu" style={{right : '-190px'}}>
                            {this.state.data!=null && this.state.data.invoice=="1"? <li><a style={{padding : '2px 0px 2px 0px'}} to="/invoice" data-toggle="modal" data-target="#invoicemodal"><i className="menu-icon fas fa-chart-area"></i> Invoice</a></li>  : ''}
                            
                            
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} to="/receivepayment" data-toggle="modal" data-target="#receivepaymentmodal"><i className="menu-icon fas fa-chart-area"></i> Receive Payment</a></li>
                            {this.state.data!=null && this.state.data.estimate=="1"? <li><a style={{padding : '2px 0px 2px 0px'}} href="estimate" data-toggle="modal" data-target="#estimatemodal"><i className="menu-icon fas fa-chart-area"></i> Estimate</a></li>  : ''}
                            {this.state.data!=null && this.state.data.credit_note=="1"?<li><a style={{padding : '2px 0px 2px 0px'}} href="creditnotice" data-toggle="modal" data-target="#creditnotemodal"><i className="menu-icon fas fa-chart-area"></i> Credit Notice</a></li>  : ''}
                            
                            {this.state.data!=null && this.state.data.sales_recipt=="1"? <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="salesreceipt" data-toggle="modal" data-target="#salesreceiptmodal"><i className="menu-icon fas fa-chart-area"></i> Sales Receipt</a></li>  : ''}
                            
                            
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="refundreceipt" data-toggle="modal" data-target="#refundreceiptmodal"><i className="menu-icon fas fa-chart-area"></i> Refund Receipt</a></li>
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="delayedcredit" data-toggle="modal" data-target="#delayedcreditmodal"><i className="menu-icon fas fa-chart-area"></i> Delayed Credit</a></li>
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="delayedcharge" data-toggle="modal" data-target="#delayedchargemodal"><i className="menu-icon fas fa-chart-area"></i> Delayed Charge</a></li>
                        </ul>
                    </li>
                      : ''}
                    {this.state.data!=null && this.state.data.sales=="1"? 
                    <li className="menu-item-has-children dropdown">
                        <a href="#" style={{padding : '5px 0'}} className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-list width30"></i>Suppliers</a>
                        <ul className="sub-menu children dropdown-menu" style={{right : '-190px'}}>
                            <li><a  style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="expense" data-toggle="modal" data-target="#expensemodal"><i className="menu-icon fa fa-list-alt "></i> Expense</a></li>
                            <li><a  style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="cheque" data-toggle="modal" data-target="#chequemodal"><i className="menu-icon fa fa-th-large "></i> Cheque</a></li>
                            {this.state.data!=null && this.state.data.bill=="1"?
                            <li><a style={{padding : '2px 0px 2px 0px'}} href="#" data-toggle="modal" data-target="#import_bill_modal"><i class="menu-icon fas fa-money-bill"></i> Import Bill</a></li>
                            
                            : ''}
                            {this.state.data!=null && this.state.data.bill=="1"?
                            <li><a style={{padding : '2px 0px 2px 0px'}} href="bill" data-toggle="modal" data-target="#billmodal"><i className="menu-icon fas fa-money-bill"></i> Bill</a></li>
                            
                            : ''}
                            {this.state.data!=null && this.state.data.pay_bills=="1"?
                            <li><a style={{padding : '2px 0px 2px 0px'}} href="paybills" data-toggle="modal" data-target="#paybillsmodal"><i className="menu-icon fa fa-paperclip "></i> Pay Bills</a></li>
                            : ''}
                            
                            
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="purchaseorder" data-toggle="modal" data-target="#purchaseordermodal"> <i className="menu-icon fa fa-th-large "></i> Purchase Order</a></li>
                            
                            {this.state.data!=null && this.state.data.supplier_credit=="1"?
                            <li><a style={{padding : '2px 0px 2px 0px'}} href="suppliercredit" data-toggle="modal" data-target="#suppliercreditmodal" style={{display : 'none'}}> <i className="menu-icon fas fa-money-bill"></i>Supplier Credit</a></li>
                            : ''}
                            
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="creditcardcredit" data-toggle="modal" data-target="#creditcardcreditmodal"><i className="menu-icon fa fa-paperclip "></i> Credit Card Credit</a></li>
                        </ul>
                    </li>

                    : ''}
                    {this.state.data!=null && this.state.data.fund_feeds=="1"?
                    <li className="menu-item-has-children dropdown">
                        <a href="#" style={{padding : '5px 0'}} className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-wrench width30"></i>Fund Feeds</a>
                        <ul className="sub-menu children dropdown-menu" style={{right : '-190px'}}>
                            <li><a style={{padding : '2px 0px 2px 0px'}} href="#" data-toggle="modal" data-target="#bankdepositmodal"><i className="menu-icon fa fa-download"></i>Undeposited Funds</a></li>
                            <li><Link style={{padding : '2px 0px 2px 0px'}} to="/checkregister" ><i className="menu-icon fa fa-money-bill"></i>Deposited Funds</Link></li>
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="budgeting"  data-toggle="modal" data-target="#AddBudgetModal"><i className="menu-icon fas fa-money-bill"></i> Budgeting</a></li>
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="transfer" data-toggle="modal" data-target="#transfermodal"><i className="menu-icon fa fa-upload"></i> Transfer</a></li>
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="statements"><i className="menu-icon fas fa-book"></i> Statements</a></li>
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="investqtyadj" data-toggle="modal" data-target="#investqtyadjmodal"><i className="menu-icon fas fa-book"></i> Invest Qty Adjustment</a></li>
                        </ul>
                    </li>
                   : ''}
                    <h3 className="menu-title" style={{marginBottom : '10px'}}>Settings</h3>
                    {this.state.data!=null && this.state.data.settings=="1"?
                    <li className="menu-item-has-children dropdown">
                        <a href="#" style={{padding : '5px 0'}} className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-home width30"></i>Your Company</a>
                        <ul className="sub-menu children dropdown-menu" style={{right : '-190px'}}>
                            <li><Link style={{padding : '2px 0px 2px 0px'}} to="/accountsandsettings"><i className="menu-icon fas fa-cog width30"></i> System Settings</Link></li>
                            {this.state.data!=null && this.state.data.created_at=="1"?
                            <li><Link style={{padding : '2px 0px 2px 0px'}} to="/customformstyles"><i className="menu-icon fas fa-list-alt"></i> Custom Form Styles</Link></li>
                            : ''}
                        </ul>
                    </li>
                    : ''}
                    <li className="menu-item-has-children dropdown" style={{display : 'none'}}>
                        <a href="#" style={{padding : '5px 0'}} className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-list width30"></i>Lists</a>
                        <ul className="sub-menu children dropdown-menu" style={{right : '-190px'}}>
                            <li><Link style={{padding : '2px 0px 2px 0px'}} to="/alllists"><i className="menu-icon fa fa-list-alt padding0"></i> All Lists</Link></li>
                            <li><Link style={{padding : '2px 0px 2px 0px'}} to="/sales"><i className="menu-icon fa fa-th-large padding0"></i> Products and Services</Link></li>
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="recurringtransactions"><i className="menu-icon fas fa-file"></i> Recurring Transactions</a></li>
                            <li><a style={{padding : '2px 0px 2px 0px' , display : 'none' }} href="attachments"><i className="menu-icon fa fa-paperclip "></i> Attachments</a></li>
                        </ul>
                    </li>

                    <li className="menu-item-has-children dropdown" style={{display : 'none'}}>
                        <a href="#" style={{padding : '5px 0'}} className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-wrench width30"></i>Tools</a>
                        <ul className="sub-menu children dropdown-menu" style={{right : '-190px'}}>
                            <li><Link style={{padding : '2px 0px 2px 0px'}} to="/importdata"><i className="menu-icon fa fa-download"></i> Import Data</Link></li>
                            <li><Link style={{padding : '2px 0px 2px 0px'}} to="/exportdata"><i className="menu-icon fa fa-upload"></i> Export Data</Link></li>
                            
                            
                            <li><Link style={{padding : '2px 0px 2px 0px' , display : 'none' }} to="/auditlog"><i className="menu-icon fas fa-file-alt"></i> Audit Log</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>

            </nav>

        </div>
        );
    }
}

export default Side;