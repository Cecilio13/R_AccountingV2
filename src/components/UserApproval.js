import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import axios from 'axios';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';

class UserApproval extends React.Component{
    state ={
        data: [],
        pending_count : '',
        pending_user_list : [],
        approved_user_clist : [],
        cost_center_list_grouped: [],
        get_cost_center_list : [],
        options: [],
        userid_accounting : '',
        user_name : 'User Name',
        all_system_users_cost_center_access : [],
        all_system_users_access : [],
    }
    SubmitAccessControlForm = async (event) =>{
        event.preventDefault();
        const bodyFormData = new FormData(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_user_access',bodyFormData);
        console.log(response.data);
        document.getElementById('user_access_modalCloseBtn').click();
    }
    approve_user= async (id,user_position) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        bodyFormData.set('user_position', user_position);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/approve_user',bodyFormData);
        this.get_users_count();
    }
    deny_user= async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/deny_user',bodyFormData);
        this.get_users_count();
    }
    get_users_count= async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/get_users_count',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({pending_count : response.data.pending_user_count});
        this.setState({pending_user_list : response.data.pending_user_list});
        this.setState({approved_user_clist : response.data.approved_user_clist});
    }
    getCostCenterList = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/get_cost_center_list',{
            params:{
                query: props
            },
            crossDomain: true
        });
        
        this.setState({get_cost_center_list : response.data.get_cost_center_list});
        this.setState({cost_center_list_grouped : response.data.cost_center_list_grouped});
    }
    userid_accounting  = async (id,name) =>{
        this.setState({userid_accounting : id});
        this.setState({user_name : name});
        const response = await axios.get('http://localhost/Accounting_modified/public/api/get_user_current_access',{
            params:{
                id: id
            },
            crossDomain: true
        });
        console.log(response.data);
        for(var c=0; c<response.data.all_system_users_cost_center_access.length;c++){
            console.log(response.data.all_system_users_cost_center_access[c].id);
            if(response.data.all_system_users_cost_center_access[c].cost_center_id=="All"){
                document.getElementById('AllCheckOption').checked=true;
            }else{
                document.getElementById('report_checkbox'+response.data.all_system_users_cost_center_access[c].cost_center_id).checked=true;
            }
           
            
        }
            console.log(response.data.all_system_users_access.approvals);
            if(response.data.all_system_users_access.approvals=="1"){
                document.getElementById('ApprovalCheckbox').click();
            }
            if(response.data.all_system_users_access.approval_pending_bills=="1"){
                document.getElementById('user_access_pending_bills').click();
            }
            if(response.data.all_system_users_access.approval_bank=="1"){
                document.getElementById('user_access_pending_bank').click();
            }
            if(response.data.all_system_users_access.approval_coa=="1"){
                document.getElementById('user_access_pending_chartofaccounts').click();
            }
            if(response.data.all_system_users_access.approval_cc=="1"){
                document.getElementById('user_access_pending_cost_center').click();
            }
            if(response.data.all_system_users_access.approval_customer=="1"){
                document.getElementById('user_access_customer').click();
            }
            if(response.data.all_system_users_access.approval_supplier=="1"){
                document.getElementById('user_access_supplier').click();
            }
            if(response.data.all_system_users_access.approval_product_services=="1"){
                document.getElementById('user_access_productservices').click();
            }
            if(response.data.all_system_users_access.approval_sales=="1"){
                document.getElementById('user_access_sales_transaction').click();
            }
            if(response.data.all_system_users_access.approval_expense=="1"){
                document.getElementById('user_access_expense_transaction').click();
            }
            if(response.data.all_system_users_access.approval_boq=="1"){
                document.getElementById('user_access_bid_of_quotation').click();
            }
            
            
            if(response.data.all_system_users_access.journal_entry=="1"){
                document.getElementById('user_access_journal').click();
            }
            if(response.data.all_system_users_access.sales=="1"){
                document.getElementById('SalesCheckbox').click();
            }
            if(response.data.all_system_users_access.invoice=="1"){
                document.getElementById('user_access_invoice').click();
            }
            if(response.data.all_system_users_access.estimate=="1"){
                document.getElementById('user_access_estimate').click();
            }
            if(response.data.all_system_users_access.credit_note=="1"){
                document.getElementById('user_access_credit_note').click();
            }
            if(response.data.all_system_users_access.sales_receipt=="1"){
                document.getElementById('user_access_sales_receipt').click();
            }
            if(response.data.all_system_users_access.expense=="1"){
                document.getElementById('ExpenseCheckbox').click();
            }
            if(response.data.all_system_users_access.bill=="1"){
                document.getElementById('user_access_bills').click();
            }
            
            if(response.data.all_system_users_access.supplier_credit=="1"){
                document.getElementById('user_access_suppliercredit').click();
            }
            if(response.data.all_system_users_access.pay_bills=="1"){
                document.getElementById('user_access_paybills').click();
            }
            if(response.data.all_system_users_access.reports=="1"){
                document.getElementById('ReportCheckbox').click();
            }
            
            if(response.data.all_system_users_access.fund_feeds=="1"){
                document.getElementById('user_access_fund_feed').click();
            }
            if(response.data.all_system_users_access.chart_of_accounts=="1"){
                document.getElementById('user_access_chartofaccounts').click();
            }
            if(response.data.all_system_users_access.cost_center=="1"){
                document.getElementById('user_access_cost_center').click();
            }
            if(response.data.all_system_users_access.settings=="1"){
                document.getElementById('user_access_setting').click();
            }
            if(response.data.all_system_users_access.procurement_system=="1"){
                document.getElementById('ProcurementSystemCheckbox').click();
            }
            if(response.data.all_system_users_access.user_approval=="1"){
                document.getElementById('user_access_useraccessapproval').click();
            }
        
        this.setState({all_system_users_cost_center_access : response.data.all_system_users_cost_center_access});
        this.setState({all_system_users_access : response.data.all_system_users_access});
    }
    componentDidMount(){
        this.get_users_count();
        this.getCostCenterList();
    }

    render(){
        const user_approved= this.state.approved_user_clist.map((user)=>{
            return [
                <tr key={user.id}>
                    <td style={{verticalAlign : 'middle'}}>{user.id}</td>
                    <td style={{verticalAlign : 'middle'}}>{user.name}</td>
                    <td style={{verticalAlign : 'middle'}}>{user.position}</td>
                    <td style={{verticalAlign : 'middle'}}>{user.email}</td>
                    <td style={{verticalAlign : 'middle'}}>
                    {moment(user.created_at).format('MM-DD-YYYY')}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'center'}}>
                    <button data-toggle="modal" data-target="#UserAccessModal" className="btn btn-link btn-sm" onClick={()=> this.userid_accounting(user.id,user.name)}><span className="fa fa-user-friends"></span> User Access</button>
                    </td>
                </tr>
            ]
        });
        const user_pending= this.state.pending_user_list.map((user)=>{
            return [
                <tr key={user.id}>
                    <td style={{verticalAlign : 'middle'}}>{user.id}</td>
                    <td style={{verticalAlign : 'middle'}}>{user.name}</td>
                    <td style={{verticalAlign : 'middle'}}>{user.position}</td>
                    <td style={{verticalAlign : 'middle'}}>{user.email}</td>
                    <td style={{verticalAlign : 'middle'}}>
                    {moment(user.created_at).format('MM-DD-YYYY')}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'center'}}>
                        <a className="btn btn-success mr-2" data-toggle="modal" data-target="#EditBankModal" onClick={() => this.approve_user(user.id,user.position)} href="#" ><span className="fa fa-check"></span></a>
                        <a className="btn btn-danger"  onClick={() => this.deny_user(user.id)} href="#" ><span className="fa fa-times"></span></a>
                    </td>
                </tr>
            ]
        });
        const costcenter_report_list= this.state.cost_center_list_grouped.map((costcenter)=>{
            return [
                <div className="checkbox" key={costcenter.cc_no}>
                    <label ><input type="checkbox" name="accesscostcenter[]" id={`report_checkbox${costcenter.cc_no}`} className="report_sub" value={costcenter.cc_no}  />{costcenter.cc_name}</label>
                </div>
            ]
        });
        // const data=this.state.data.map((dat) =>{
        //     return <div key={dat.id}>{dat.id+" "+dat.name+" "+dat.position}</div>
        // });
        return (
            <div>
                <aside id="left-panel" className="left-panel" style={{minWidth : '250px'}}>
                    <Side />
                </aside>
                <div id="right-panel" className="right-panel" style={{width : '100%'}}>
                    <header id="header" className="header"> 
                    <Nav />
                    </header>
                    <div className="">
                        
                    <div id="UserAccessModal" className="modal fade" role="dialog">
                        <div className="modal-dialog modal-lg">

                            <div className="modal-content">
                            <div className="modal-header">
                                
                                <h5 className="modal-title" id="ModalTitle">{this.state.user_name}</h5>
                                <button type="reset" htmlFor="update_user_access_form" className="close" data-dismiss="modal"  aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            
                            <form id="update_user_access_form" onSubmit={this.SubmitAccessControlForm}>
                            <div className="modal-body">
                            <div className="row">
                                <div className="col-md-2">
                                    
                                    <p>User Access</p>
                                    <input type="hidden" name="userid_accounting" id="userid_accounting" value={this.state.userid_accounting} onChange={(event)=> this.setState({userid_accounting: event.target.value})} />
                                </div>
                                <div className="col-md-10">
                                    <div className="checkbox">
                                    <label><input type="checkbox"  name="access[]" value="Approvals" onClick={this.checkapproval} id="ApprovalCheckbox" />Approvals</label>
                                    
                                    </div>
                                    <div className="checkbox" style={{paddingLeft : '20px', display : 'none'}} id="sub_approval_checkboxes" >
                                        <div className="checkbox">
                                        <label ><input type="checkbox" id="user_access_pending_bills" name="access[]" className="approval_sub" value="Pending Bills Approval" />Pending Bills</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_pending_bank" name="access[]" className="approval_sub" value="Bank Approval" />Bank</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_pending_chartofaccounts" name="access[]" className="approval_sub" value="Chart of Account Approval" />Chart of Accounts</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_pending_cost_center" name="access[]" className="approval_sub" value="Cost Center Approval" />Cost Center</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_customer" name="access[]" className="approval_sub" value="Customer Approval" />Customer</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_supplier" name="access[]" className="approval_sub" value="Supplier Approval"  />Supplier</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_productservices" name="access[]" className="approval_sub" value="Product And Services Approval" />Product And Services</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_sales_transaction" name="access[]" className="approval_sub" value="Sales Transactions Approval" />Sales Transactions</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_expense_transaction" name="access[]" className="approval_sub" value="Expense Transactions Approval" />Expense Transactions</label>
                                        </div>
                                        
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_bid_of_quotation" name="access[]" className="approval_sub" value="Bid of Quotation Approval" />Bid of Quotation</label>
                                        </div>
                                        <div className="checkbox">
                                        <label><input type="checkbox"  id="user_access_useraccessapproval" name="access[]" className="approval_sub" value="User Access Approval" />User Access Approval</label>
                                        </div>
                                    </div>
                                    <div className="checkbox">
                                    <label><input type="checkbox"  id="user_access_setting" name="access[]" value="Settings" />Settings</label>
                                    </div>
                                    <div className="checkbox">
                                    <label><input type="checkbox"  id="user_access_chartofaccounts" name="access[]" value="Chart of Accounts" />Chart of Accounts</label>
                                    </div>
                                    <div className="checkbox">
                                    <label><input type="checkbox"  id="user_access_cost_center" name="access[]" value="Cost Center" />Cost Center</label>
                                    </div>
                                    <div className="checkbox">
                                    <label><input type="checkbox"  id="user_access_journal" name="access[]" value="Journal Entry" />Journal Entry</label>
                                    </div>
                                    
                                    <div className="checkbox">
                                    <label><input type="checkbox"  id="user_access_fund_feed" name="access[]" value="Fund Feeds"/>Fund Feeds</label>
                                    </div>
                                    <div className="checkbox">
                                    <label><input type="checkbox"   name="access[]"  value="Sales" id="SalesCheckbox"/>Sales</label>
                                    </div>
                                    <div className="checkbox" style={{paddingLeft : '20px', display : 'none'}} id="sub_sales_checkboxes">
                                        <div className="checkbox">
                                    <label ><input type="checkbox"  id="user_access_invoice" name="access[]" value="Invoice"/>Invoice</label>
                                    </div>
                                    <div className="checkbox">
                                    <label ><input type="checkbox"  id="user_access_estimate" name="access[]" value="Estimate"/>Estimate</label>
                                    </div>
                                    <div className="checkbox">
                                    <label><input type="checkbox"  id="user_access_credit_note" name="access[]" value="Credit Note"/>Credit Note</label>
                                    </div>
                                    <div className="checkbox">
                                    <label ><input type="checkbox"  id="user_access_sales_receipt" name="access[]" value="Sales Receipt"/>Sales Receipt</label>
                                    </div>
                                    </div>
                                    <div className="checkbox">
                                    <label><input type="checkbox"   value="Expense" name="access[]"  id="ExpenseCheckbox"/>Expense</label>
                                    
                                    </div>
                                    <div className="checkbox" style={{paddingLeft : '20px', display : 'none'}} id="sub_expense_checkboxes" >
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_bills" name="access[]" className="expense_sub" value="Bill"/>Bill</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_suppliercredit" name="access[]" className="expense_sub" value="Supplier Credit"/>Supplier Credit</label>
                                        </div>
                                        <div className="checkbox">
                                        <label ><input type="checkbox"  id="user_access_paybills" name="access[]" className="expense_sub" value="Pay Bills"/>Pay Bills</label>
                                        </div>
                                    
                                    </div>
                                    <div className="checkbox">
                                    <label><input type="checkbox"   name="access[]"  value="Procurement System" id="ProcurementSystemCheckbox"/>Procurement System</label>
                                    </div>
                                    <div className="checkbox" style={{paddingLeft : '20px', display : 'none'}} id="sub_procurement_checkboxes" >
                                        <select className="form-control w-50" name="ApprovalLevelProcurement" id="ApprovalLevelProcurement" style={{width : 'auto'}}>
                                            <option value="">--Select Approval Level--</option>
                                            <option value="A1">Recommending Approval</option>
                                            <option value="A2">Final Approval</option>
                                            <option value="A4">Processing Purchase Order</option>
                                            <option value="A3">Transaction Closing</option>
                                            
                                        </select>
                                    </div>
                                    <div className="checkbox">
                                    <label><input type="checkbox"  name="access[]" onclick="checkreport()" id="ReportCheckbox" value="Reports"/>Reports</label>
                                    
                                    </div>
                                    
                                    <div className="checkbox" style={{paddingLeft : '20px', display : 'none'}} id="sub_report_checkboxes" >
                                        <div className="checkbox">
                                        <label ><input type="checkbox" id="AllCheckOption" name="accesscostcenter[]" onclick="validatecheckboxAll()" className="report_sub"  value="All" />All</label>
                                        </div>
                                        {costcenter_report_list}
                                    </div>
                                    
                                </div>
                            </div>
                            </div>
                            <div className="modal-footer">
                                <button type="reset" id="user_access_modalCloseBtn" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit"   name="UserAccessSubmit" className="btn btn-primary">Save</button>
                            </div>
                            </form>
                            </div>
                            
                        </div>
                        </div>
                        <div className="breadcrumbs">
                            <div className="page-header float-left">
                                <div className="page-title">
                                    <h1>User Access Approval</h1>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <ul className="nav nav-tabs">
                                <li className="nav-item"><a className="nav-link  show active" data-toggle="tab" href="#all_users">All Users</a></li>
                                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#pending_users">Pending Users 
                                    <span className={`badge ${this.state.pending_count!=0? '' : 'displayNone' }`} style={{backgroundColor : '#d9534f', color : 'white' }}>{this.state.pending_count}</span>
                                </a></li>
                            
                            </ul>
                            <div className="tab-content p-1" >
                                <div className="tab-pane fade show active" id="all_users" role="tabpanel" aria-labelledby="home-tab">
                                <table className="table table-bordered" style={{backgroundColor : 'white'}}>
                                    <thead>
                                        <tr className="success">
                                            <th colSpan="10" style={{verticalAlign : 'middle', textAlign : 'center', fontWeight : 'bold'}}>Accounting System Users</th>
                                        </tr>
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>User ID</th>
                                            <th style={{verticalAlign : 'middle'}}>Name</th>
                                            <th style={{verticalAlign : 'middle'}}>Position</th>
                                            <th style={{verticalAlign : 'middle'}}>Email</th>
                                            <th style={{verticalAlign : 'middle'}}>Date Created</th>
                                            <th style={{verticalAlign : 'middle', textAlign : 'center'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user_approved}
                                    </tbody>
                                </table>
                                </div>
                                <div className="tab-pane fade " id="pending_users" role="tabpanel" aria-labelledby="home-tab">
                                    <table className="table table-bordered" style={{backgroundColor : 'white'}}>
                                        <thead>
                                            <tr className="success">
                                                <th colSpan="10" style={{verticalAlign : 'middle', textAlign : 'center', fontWeight : 'bold'}}>Pending Accounting System Users</th>
                                            </tr>
                                            <tr>
                                                <th style={{verticalAlign : 'middle'}}>User ID</th>
                                                <th style={{verticalAlign : 'middle'}}>Name</th>
                                                <th style={{verticalAlign : 'middle'}}>Position</th>
                                                <th style={{verticalAlign : 'middle'}}>Email</th>
                                                <th style={{verticalAlign : 'middle'}}>Date Created</th>
                                                <th style={{verticalAlign : 'middle', textAlign : 'center'}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user_pending}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal />
                </div>
                
            </div>
        );
    }
}

export default UserApproval;