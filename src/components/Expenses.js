import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import { number_format } from '../Helper';
var refresh_expense_table=0;
var refresh_pay_bills_table=0;
class Expense extends React.Component{
    state ={
        supplierss: [],
        YearSelected : moment().format('YYYY'),
        //YearSelected : 2019,
        year_beg : '',
        year_end : '',
        yyyyy : '',
        expense_transactions : [],
        et_new : [],
        et_acc : [],
        ETANew: [],
        totalexp : 0,
        ETANewTotal : [],
        PayBill : [],
        supplier_credit_table_rows : [],
    }
    
    getExpenseTransactionPage= async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getExpenseTransactionPage',{
            params:{
                year: this.state.YearSelected
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({supplierss : response.data.supplierss});
        this.setState({year_beg : response.data.year_beg});
        this.setState({year_end : response.data.year_end});
        this.setState({yyyyy : response.data.yyyyy});
        this.setState({YearSelected : response.data.yyyyy});
        this.setState({expense_transactions : response.data.expense_transactions});
        this.setState({et_new : response.data.et_new});
        this.setState({et_acc : response.data.et_acc});
        this.setState({totalexp : response.data.totalexp});
        this.setState({ETANew : response.data.ETANew});
        this.setState({ETANewTotal : response.data.ETANewTotal});
        this.setState({PayBill : response.data.PayBill});
        
    }

    componentDidMount(){
        this.getExpenseTransactionPage();
        this.setState({YearSelected : moment().format('YYYY')})
        
    }
    UploadMassSupplier = async () =>{
        var bodyFormData = new FormData();
        var imagefile = document.querySelector('#excel-upload-supplier');
        bodyFormData.append("theFile", imagefile.files[0]);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/UploadMassSupplier',bodyFormData);

        var LOG="";
        if(response.data.Error_Log!=""){
        LOG=" \n\nSkip Log : \n"+response.data.Error_Log;
        }
        alert("Total number Of Data : "+response.data.Total+"\nData Saved : "+response.data.Success+" \nData Skipped : "+response.data.Skiped+LOG);
        window.location.reload();
    }
    refresh_expense_table =(event) =>{
        if(refresh_expense_table==1){
            refresh_expense_table=0;
            document.getElementById('refresh_expense_table').click();
           
        }
    }
    refresh_pay_bills_table =(event) =>{
        if(refresh_pay_bills_table==1){
            refresh_pay_bills_table=0;
            document.getElementById('refresh_pay_bills_table').click();
           
        }
    }
    
    createSelectItems() {
        let items = [];         
        for (let i = moment().format('YYYY'); i >=2019 ; i--) {             
             items.push(<option key={i} value={i}>{i}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    }
    add_note_to_bill_payment = async (target,id)=>{
        var bodyFormData = new FormData();
            bodyFormData.set('note', target.value);
            bodyFormData.set('id', id);
            const response = await axios.post('http://localhost/Accounting_modified/public/api/update_pay_bill_note',bodyFormData);
            console.log(response.data);
            if(response.data=="1"){
                alert('Bill Payment Remark updated');
            }else{
                alert('Failed to update Bill Payment Remark');
            }
    }
    supplier_credit_modal_open =async (id) =>{
        if(id!=""){
            document.getElementById('supplier_credit_bill_no').value=id;
            const response = await axios.get('http://localhost/Accounting_modified/public/api/get_bill_info_for_supplier_credit',{
                params:{
                    supplier_credit_bill_no: id
                },
                crossDomain: true
            });
            document.getElementById('sc_customer').value=response.data.bill_info.et_customer;
            document.getElementById('sc_reference_no').value=response.data.bill_info.et_shipping_address;
            document.getElementById('sc_reference_no_po').value=response.data.bill_info.et_shipping_to;
            document.getElementById('sc_reference_no_ci').value=response.data.bill_info.et_shipping_via;
            document.getElementById('sc_memo').value=response.data.bill_info.et_memo;
            document.getElementById('supplier_credit_account_debit_account').value=response.data.bill_info.et_credit_account;
            for(var c=0;c<response.data.JournalEntry.length;c++){
                document.getElementById('CostCenterSupplierCredit').value=response.data.JournalEntry[c].je_cost_center;
                console.log('cost center '+response.data.JournalEntry[c].je_cost_center);
            }
            const response2 = await axios.get('http://localhost/Accounting_modified/public/api/get_bill_account_detail',{
                params:{
                    supplier_credit_bill_no: id
                },
                crossDomain: true
            });
            this.setState({supplier_credit_table_rows : response2.data});
            
        }
    }
    render(){
        const supplier_list=this.state.supplierss.map((dat) =>{
            return [
                <tr>
                    <td class="pt-3-half" style={{verticalAlign : 'middle', textAlign : 'left'}} ><a class="text-info" href="#">{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name}</a></td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.phone}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.email}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >PHP {number_format(dat.opening_balance,2)}</td>
               </tr>
            ]
        });
        const expense_transactions_list=this.state.expense_transactions.map((dat,ind) =>{
            
            if(dat.et_type==dat.et_ad_type){
                if(this.state.expense_transactions.length==parseFloat(ind)+parseFloat(1)){
                    console.log('destroy');
                    document.getElementById('destroy_expense_table').click();
                }
                
                refresh_expense_table=1;
                var overduetransaction="";
                var text="";
                if(dat.et_due_date!="" && dat.et_due_date!=null)
                var d1 = new Date();
                var d2 = new Date(dat.et_due_date);
                if(d1>=d2 && dat.et_bil_status!="Paid"){
                    overduetransaction="table-danger";
                    text="font-red";
                }
                return [
                    <tr className={`${overduetransaction}`} key={ind} onMouseOver={()=>this.refresh_expense_table()}>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_date!="" && dat.et_date!=null? moment(dat.et_date).format('MM-DD-YYYY') : ''}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_type}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_no}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_shipping_address}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_shipping_to}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_shipping_via}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_ad_desc}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} className={`${text}`}>{dat.et_due_date!="" && dat.et_due_date!=null? moment(dat.et_due_date).format('MM-DD-YYYY') : ''}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.cc_name}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_memo}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >PHP {number_format(dat.et_ad_total,2)}</td>
                        <td class="pt-3-half" style={{verticalAlign : 'middle'}} >
                            {dat.et_type=="Bill" && dat.et_ad_rate=="1"? (dat.et_bil_status=="Paid"? 'Paid' : <button class="btn btn-link" title="Supplier Credit" onClick={(event)=>this.supplier_credit_modal_open(dat.et_no)} data-toggle="modal" data-target="#suppliercreditmodal"><span class="fa fa-history"></span></button>) : ''}
                        </td>
                   </tr>
                ]
            }
            
        });
        const et_new_list=this.state.et_new.map((dat,ind) =>{
            if(this.state.et_new.length==parseFloat(ind)+parseFloat(1)){
                console.log('destroy');
                document.getElementById('destroy_expense_table').click();
            }
            
            refresh_expense_table=1;
            var overduetransaction="";
                var text="";
                if(dat.et_due_date!="" && dat.et_due_date!=null)
                var d1 = new Date();
                var d2 = new Date(dat.et_due_date);
                if(d1>=d2 && dat.et_bil_status!="Paid"){
                    overduetransaction="table-danger";
                    text="font-red";
                }
            return [
                <tr key={ind} onMouseOver={()=>this.refresh_expense_table()}>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_date!="" && dat.et_date!=null? moment(dat.et_date).format('MM-DD-YYYY') : ''}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_type}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_no}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_shipping_address}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_shipping_to}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_shipping_via}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >
                    {this.state.ETANew.map((eta,inn)=>{
                        if (eta.et_ad_no==eta.et_no){
                            return [
                                eta.et_ad_desc+"\n"
                            ]
                            
                        }
                    })}
                    </td>
                    <td style={{verticalAlign : 'middle'}} className={`pt-3-half ${text}`}>{dat.et_due_date!="" && dat.et_due_date!=null? moment(dat.et_due_date).format('MM-DD-YYYY') : ''}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >
                    {this.state.ETANew.map((eta,inn)=>{
                        if (eta.et_ad_no==eta.et_no){
                            return [
                                eta.cc_name+"\n"
                            ]
                            
                        }
                    })}
                    </td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_memo}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >
                    {this.state.ETANewTotal.map((eta,inn)=>{
                        
                        if (eta.et_ad_no==dat.et_no){
                            return [
                            <div>
                                {"PHP "+number_format(eta.pending_total,2)}
                            </div>
                            
                            ]
                        }
                        
                    })}
                    
                        </td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >
                        Pending
                    </td>
               </tr>
            ]
        });
        const PayBill_list=this.state.PayBill.map((dat,ind) =>{
            if(this.state.PayBill.length==parseFloat(ind)+parseFloat(1)){
                console.log('destroy');
                document.getElementById('destroy_pay_bills_table').click();
            }
            
            refresh_pay_bills_table=1;
            
            return [
                <tr key={ind} onMouseOver={()=>this.refresh_pay_bills_table()}>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.pay_bill_no}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.payment_date!="" && dat.payment_date!=null? moment(dat.payment_date).format('MM-DD-YYYY') : ''}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.bill_no}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_shipping_address}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_shipping_to}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.et_shipping_via}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle',textAlign : 'right'}} >{number_format(dat.bill_payment_amount,2)}</td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >
                        <textarea placeholder="add remarks" onBlur={(event)=>this.add_note_to_bill_payment(event.target,dat.pay_bill_no)} id="pay_bills_remarks_in_list" defaultValue={dat.payment_remark}></textarea>
                      
                    </td>
                    <td class="pt-3-half" style={{verticalAlign : 'middle'}} >{dat.voucher_link_id!="" && dat.voucher_link_id!=null? <a href="#" onclick="setVoucherContent('{{$pb->pay_bill_no}}')" class="btn btn-link" data-toggle="modal" data-target="#vouchermodal">View Voucher</a> : '' }</td>                    
               </tr>
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
                        <div class="breadcrumbs">
                            <div class="page-header float-left">
                                <div class="page-title">
                                    <button type="button" id="refresh_expense_table" style={{display : 'none'}}>qqq</button>
                                    <button type="button" id="destroy_expense_table" style={{display : 'none'}}></button>
                                    <button type="button" id="refresh_pay_bills_table" style={{display : 'none'}}>qqq</button>
                                    <button type="button" id="destroy_pay_bills_table" style={{display : 'none'}}></button>
                                    
                                    <h1>Expense Transaction</h1>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Expenses</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Suppliers</a>
                            </li>
                        </ul>
                        <div class="tab-content pl-3 p-1" id="myTabContentExpense">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="col-md-12 mb-1 p-0">
                                    <h3 class="mt-2">Expense Transactions</h3>
                                </div>
                                <div class="col-md-10 mb-5 mt-3 p-0">
                                    <a class="btn btn-success mr-1" href="#" data-toggle="modal" data-target="#import_bill_modal">Import Bill</a>
                                    <a class="btn btn-success mr-1" href="#" data-toggle="modal" data-target="#billmodal" onclick="ResetBills()">Bill</a>
                                    <a class="btn btn-success mr-1" href="#" data-toggle="modal" data-target="#paybillsmodal">Pay Bill</a>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group mb-3">
                                        <input type="number" class="form-control" id="yearSSSEELLEECCRTTED" style={{float: 'right'}} value={this.state.YearSelected} onChange={(event)=>this.setState({YearSelected : event.target.value})} />
                                        
                                        <div class="input-group-prepend">
                                            <button class="btn btn-secondary" onClick={()=>this.getExpenseTransactionPage()}>GO</button>
                                        </div>
                                    </div>
                                    {/* <select class="form-control" style={{float: 'right'}} value={this.state.YearSelected} onChange={(event)=>this.setState({YearSelected : event.target.value}, function() { this.getExpenseTransactionPage()}.bind(this))}>
                                        {this.createSelectItems()}
                                    </select>  */}
                                </div>
                                <div id="table" class="table-editable pt-5">
                                <table style={{marginTop : '10px'}} id="expensetable" class="table table-bordered table-responsive-md table-light text-center font14">
                                    <thead className="thead-light">
                                    <tr>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center">DATE</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center" >TYPE</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center">NO.</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center">RF</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center">PO</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center">CI</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center">PAYEE</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center" width="10%">DESCRIPTION</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center">Due Date</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center"  width="20%">CATEGORY</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center" width="10%">MEMO</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center">TOTAL</th>
                                        <th  style={{verticalAlign : 'middle'}} class="text-center"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {expense_transactions_list}
                                        {et_new_list}
                                    </tbody>
                                </table>
                                <table id="expensetable" class="table  table-responsive-md table-striped text-center font14">
                                    <tr>
                                        <td class="pt-3-half" style={{verticalAlign : 'middle'}}></td>
                                        <td class="pt-3-half" style={{verticalAlign : 'middle'}}></td>
                                        <th class="pt-3-half" style={{verticalAlign : 'middle'}}>TOTAL: </th>
                                        <td class="pt-3-half" style={{verticalAlign : 'middle'}}></td>
                                        <td class="pt-3-half" style={{verticalAlign : 'middle'}}></td>
                                        <td class="pt-3-half" style={{verticalAlign : 'middle'}}></td>
                                        <th class="pt-3-half" style={{verticalAlign : 'middle'}}>PHP {number_format(this.state.totalexp,2)}
                                        </th>
                                        <td></td>
                                    </tr>
                                </table>
                                <div class="col-md-12 p-0">
                                    <h3 class="float-left">Bill Payments</h3>
                                </div>
                                <table id="bill_payment_table" class="table table-bordered table-responsive-md table-light text-center font14 table-sm">
                                    <thead class="thead-light">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>#</th>
                                            <th style={{verticalAlign : 'middle'}}>Date</th>
                                            <th style={{verticalAlign : 'middle'}}>Bill #</th>
                                            <th style={{verticalAlign : 'middle'}}>RF</th>
                                            <th style={{verticalAlign : 'middle'}}>PO</th>
                                            <th style={{verticalAlign : 'middle'}}>CI</th>
                                            <th style={{verticalAlign : 'middle'}}>Payment Amount</th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PayBill_list}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h3 class="mt-2">Suppliers</h3>
                                <div class="modal fade" id="ImportSupplierModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog  modal-sm" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Import Suppliers</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body" style={{textAlign : 'center'}}>
                                        
                                        <input id="excel-upload-supplier" onChange={()=>this.UploadMassSupplier()} type="file"  accept=".xlsx" />
                                        <label for="excel-upload-supplier" style={{opacity : '1', cursor : 'pointer', borderRadius : '10px'}} id="FIleImportExcelLabel" class="custom-excel-upload btn btn-primary">
                                        <span class="glyphicon glyphicon-user"> IMPORT FROM EXCEL</span>
                                        </label>
                                        
                                    </div>
                                    <div class="modal-footer">
                                        <a class="btn btn-success" href="https://localhost/Accounting_modified/public/api/GetSupplierTemplateExcel">Download Excel Template</a>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="col-md-12 mb-5 p-0 mt-3">
                                    <a href="#" class="btn btn-success mr-1"data-target='#supplierModal' data-toggle="modal">New Supplier</a>
                                    <a href="#" class="btn btn-success"data-target='#ImportSupplierModal' data-toggle="modal">Import Supplier</a>
                                    
                                </div>
                                <div id="table" class="table-editable">
                                    <table id="suppliertable" style={{backgroundColor : '#ccc'}} class="table table-bordered table-responsive-md  text-center font14">
                                        <thead>
                                        <tr>
                                            <th class="text-center">SUPPLIER/COMPANY</th>
                                            <th class="text-center">PHONE</th>
                                            <th class="text-center">EMAIL</th>
                                            <th class="text-center">OPEN BALANCE</th>
                                        </tr>
                                        </thead>
                                        <tbody  style={{backgroundColor : 'white'}}>
                                            {supplier_list}
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <Modal supplier_credit_table_rows={this.state.supplier_credit_table_rows} />
                </div>
                
            </div>
        );
    }
}

export default Expense;