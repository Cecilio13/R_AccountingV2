import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';

class CheckRegister extends React.Component{
    state ={data: []}
    
    ooiienm= async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/students',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({data : response.data});
    }

    componentDidMount(){
        //this.ooiienm();
        
    }

    render(){

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
                        <div class="breadcrumbs">
                            <div class="page-header float-left">
                                <div class="page-title">
                                    <h1>Deposited Funds</h1>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                </div>
                                <div class="col-md-6">
                                    <div class="alert alert-secondary" role="alert">
                                    <h4 class="alert-heading"></h4>
                                    <div class="row">
                                    <div class="col-md-4">
                                        <p>From</p>
                                        <input type="date"  class="form-control form-control-sm" id="Fromdate" oninput="submitdates()" onkeyup="submitdates()" />
                                    </div>
                                    <div class="col-md-4">
                                        <p>To</p>
                                        <input type="date" class="form-control form-control-sm" id="Todate"  oninput="submitdates()" onkeyup="submitdates()" />
                                    </div>
                                    <div class="col-md-4">
                                        <p>Cost Center</p>
                                        <select class="form-control form-control-sm" id="CostCenterFilter" onchange="submitdates()">
                                            <option>All</option>    
                                            
                                        </select>
                                    </div>
                                    </div>
                                    <hr />
                                    <p>Total Deposited Fund</p>
                                    
                                    <h4 class="mb-0" id="TotalDepositedFundH4">PHP 0.00</h4>
                                    </div>
                                </div>
                            </div>
                            <table class="table table-bordered table-sm table-striped" style={{backgroundColor :'white'}} id="check_register_table">
                            <thead>
                                <tr>
                                    <th width="10%" style={{verticalAlign :'middle',textAlign : 'center'}}>
                                        <input style={{width :'100%'}} type="text" id="date_filter_input" onkeyup="FilterTableRowDate(0,this)" placeholder="Date" /></th>
                                    <th width="10%" style={{verticalAlign :'middle'}}>
                                        <input style={{width :'100%'}} type="text" id="no_filter_input" placeholder="Cost Center" onkeyup="FilterTableRowDate(1,this)" /></th>
                                    <th width="10%" style={{verticalAlign :'middle'}}>
                                        <input style={{width :'100%'}} type="text" id="no_filter_input" placeholder="Sales Receipt" onkeyup="FilterTableRowDate(2,this)" /></th>
                                    <th width="10%" style={{verticalAlign :'middle',textAlign : 'center'}} >
                                        <input style={{width :'100%'}} type="text" id="payee_filter_input" onkeyup="FilterTableRowDate(3,this)" placeholder="Payee" /></th>
                                    <th width="10%" style={{verticalAlign :'middle'}}>
                                        <input style={{width :'100%'}} type="text" id="no_filter_input" placeholder="Payment Method" onkeyup="FilterTableRowDate(4,this)" /></th>
                                    
                                    
                                    
                                    <th width="10%" style={{verticalAlign :'middle',textAlign : 'center'}}>
                                        <input style={{width :'100%'}} type="text" id="bankaccount_filter_input" onkeyup="FilterTableRowDate(5,this)" placeholder="Bank" /></th>
                                    <th width="10%" style={{verticalAlign :'middle',textAlign : 'center'}}>
                                        <input style={{width :'100%'}} type="text" id="balance_filter_input" onkeyup="FilterTableRowDate(6,this)" placeholder="Check No" /></th>
                                    <th width="10%"  style={{verticalAlign :'middle',textAlign : 'center'}}>
                                        <input style={{width :'100%'}} type="text" id="payment_filter_input" onkeyup="FilterTableRowDate(7,this)" placeholder="Amount" /></th>
                                    <th width="20%" style={{verticalAlign :'middle'}}>
                                        <input style={{width :'100%'}} type="text" id="no_filter_input" placeholder="Deposited To" onkeyup="FilterTableRowDate(8,this)" /></th>
                                </tr>
                                
                            </thead>
                            <tbody>

                            </tbody>
                            </table>
                        </div>
                        
                    </div>
                    <Modal />
                </div>
                
            </div>
        );
    }
}

export default CheckRegister;