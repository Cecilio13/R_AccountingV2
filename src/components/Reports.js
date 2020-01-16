import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/index.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';

class Reports extends React.Component{
    state ={
        data: [],
        favorite_report : [],
    }
    
    getReportPageData = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getReportPageData',{
            params:{
                TO : '2019-12-31',
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({favorite_report : response.data.favorite_report});
    }
    componentDidMount(){
        //this.ooiienm();
        this.getReportPageData();
    }

    render(){
        const fav_report_list=this.state.favorite_report.map((dat) =>{
            var entry_count=0;
            if(dat.report_name=="Transaction List by Supplier"){
                if(dat.expenses_track_expense_and_item_by_customer=="on"){
                    if(dat.report_status=="1"){
                        entry_count=1;
                        if(entry_count % 2 != 0){
                            return [
                                <tr>
                                <td style={{verticalAlign : 'middle'}}><Link className="btn btn-link" to="{{$fav->report_link}}">{dat.report_name}</Link></td>
                                <td style={{verticalAlign : 'middle'}}>
                                    <button className="btn btn-link btn-sm" data-report-name={dat.report_name} ><i className="fas fa-star"></i></button>
                                </td>
                                <td width="50%"></td>
                                </tr>
                            ]
                        }else{
                            return [
                                <tr>
                                <td style={{verticalAlign : 'middle'}}><Link className="btn btn-link" to="{{$fav->report_link}}">{dat.report_name}</Link></td>
                                <td style={{verticalAlign : 'middle'}}>
                                    <button className="btn btn-link btn-sm" data-report-name={dat.report_name} ><i className="fas fa-star"></i></button>
                                </td>
                                <td width="50%"></td>
                                </tr>
                            ]
                        }
                    }
                }
                
            }else{
                if(dat.report_status=="1"){
                    return [
                        <tr>
                        <td style={{verticalAlign : 'middle'}}><Link className="btn btn-link" to="{{$fav->report_link}}">{dat.report_name}</Link></td>
                        <td style={{verticalAlign : 'middle'}}>
                            <button className="btn btn-link btn-sm" data-report-name={dat.report_name} ><i className="fas fa-star"></i></button>
                        </td>
                        <td width="50%"></td>
                        </tr>
                    ]
                }
            }
            
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
                        
                        <div className="breadcrumbs">
                            <div className="page-header float-left">
                                <div className="page-title">
                                    <h1>Reports</h1>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {/* <div dangerouslySetInnerHTML={{ __html: this.state.data }} /> */}
                            <div className="card" style={{marginTop:'10px',display : 'none'}}>
                            <div className="card-header" id="headingNine">
                              <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                   <span className="oi oi-caret-bottom"></span> Favorites
                                </button>
                              </h5>
                            </div>
                            <div id="collapseNine" className="collapse show" aria-labelledby="headingFive" data-parent="#accordionExample">
                              <div className="card-body">
                               <div className="row">
                                    <div className="col-md-10">
                                        
                                        <table className="table table-hover table-sm table-report" >
                                            <tbody>
                                            {fav_report_list}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card" >
                          <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                              <button className="btn btn-link"  type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <span className="oi oi-caret-bottom"></span> Business Overview
                              </button>
                            </h5>
                          </div>
                          
                          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5">
                                        <table className="table table-hover table-sm table-report" >
                                            <tbody >
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} colspan="2"><Link className="btn btn-link" to={`report_content_a`}>Audit Log</Link></td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content_b`}>Budget Summary Report</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/BalanceSheetComparisonByDate`}>Balance Sheet Comparison</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/BalanceSheetDetailByDate`}>Balance Sheet Detail</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/BalanceSheetByDate`}>Balance Sheet</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-5">
                                        <table className="table table-hover table-sm table-report" >
                                            <tbody >
                                                
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/ProfitandlossByDate`}>Profit and Loss</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/sales_transaction_list_by_date`}>Sales Transaction List</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/expense_transaction_list_by_date`}>Expenses Transaction List</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                              <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <span className="oi oi-caret-bottom"></span> Who Owe You
                              </button>
                            </h5>
                          </div>
                          <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5">
                                        <table className="table table-hover table-sm table-report" >
                                            <tbody >
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/AR_REceivable_ageing_by_date`}>Account Recievable Ageing Summary</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/collectionreport_bydate`}>Collections Report</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/Customer_Balance_Summary_by_date`}>Customer Balance Summary</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-5">
                                        <table className="table table-hover table-sm table-report" >
                                            <tbody >
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/Invoice_List_by_date`}>Invoice List</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/Open_Invoice_List_by_date`}>Open Invoice</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="headingThree">
                            <h5 className="mb-0">
                              <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <span className="oi oi-caret-bottom"></span> Sales and Customer
                              </button>
                            </h5>
                          </div>
                          <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5">
                                        <table className="table table-hover table-sm table-report" >
                                            <tbody >
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content_cc`}>Customer Contact List</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                            
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/deposit_detail_by_date`}>Deposit Detail</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                            
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/estimatebycustomer_by_date`}>Estimates by Customer</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-5">
                                        <table className="table table-hover table-sm table-report" >
                                            <tbody >
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content_p`}>Product/Service List</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/salesbyCustomer_Summary_by_date`}>Sales by Customer Summary</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/salesbyProduct_Summary_by_date`}>Sales by Product/Service Summary</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="headingFour">
                            <h5 className="mb-0">
                              <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                  <span className="oi oi-caret-bottom"></span> Expenses and Suppliers
                              </button>
                            </h5>
                          </div>
                          <div id="collapseFour" className="collapse show" aria-labelledby="headingFour" data-parent="#accordionExample">
                            <div className="card-body">
                              <div className="row">
                                  <div className="col-md-5">
                                      <table className="table table-hover table-sm table-report" >
                                          <tbody >
                                              <tr>
                                                  <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/ChequeDetail_bydate`}>Check Detail</Link></td>
                                                  <td style={{verticalAlign : 'middle'}}>
                                                      
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content_sc`}>Supplier Contact List</Link></td>
                                                  <td style={{verticalAlign : 'middle'}}>
                                                      
                                                  </td>
                                              </tr>
                                              
                                          </tbody>
                                      </table>
                                  </div>
                                  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="headingFive">
                            <h5 className="mb-0">
                              <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                 <span className="oi oi-caret-bottom"></span> What You Owe
                              </button>
                            </h5>
                          </div>
                          <div id="collapseFive" className="collapse show" aria-labelledby="headingFive" data-parent="#accordionExample">
                            <div className="card-body">
                             <div className="row">
                                  <div className="col-md-5">
                                      <table className="table table-hover table-sm table-report" >
                                          <tbody >
                                              <tr>
                                                  <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/AccountsPayableByDate`}>Accounts Payable Detail</Link></td>
                                                  <td style={{verticalAlign : 'middle'}}>
                                                      
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/AccountsPayableAgeingSummaryByDate`}>A/P Ageing Summary</Link></td>
                                                  <td style={{verticalAlign : 'middle'}}>
                                                      
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                                  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingSix">
                              <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                   <span className="oi oi-caret-bottom"></span> For My Accountant
                                </button>
                              </h5>
                            </div>
                            <div id="collapseSix" className="collapse show" aria-labelledby="headingSix" data-parent="#accordionExample">
                              <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5">
                                        
                                        <table className="table table-hover table-sm table-report" >
                                            <tbody >
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content_acc`}>Account List</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/BalanceSheetComparisonByDate`}>Balance Sheet Comparison</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/BalanceSheetByDate`}>Balance Sheet</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/General_Ledger_by_date`}>General Ledger</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/General_Ledger_by_date`}>Ledger By Supplier</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/General_Ledger_by_date`}>Ledger By Customer</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/General_Ledger_by_date`}>Ledger By Employee</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content_j`}>Journal</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-5">
                                        <table className="table table-hover table-sm table-report" >
                                            <tbody >
                                                
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content_recent`}>Recent Transaction</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                               
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/TransactionListByDateDate`}>Transaction List by Date</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/Trial_balance_by_date`}>Trial Balance</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/ledger_for_desc_by_date`}>Summary of Chart of Accounts Description</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/MovementinEquityByDate`}>Movements in Equity</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} ><Link className="btn btn-link" to={`report_content/VAT_List_By_Date`}>VAT Relief</Link></td>
                                                    <td style={{verticalAlign : 'middle'}}>
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                              </div>
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

export default Reports;