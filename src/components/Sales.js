import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import $ from 'jquery';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import { number_format } from '../Helper';

class Sales extends React.Component{
    state ={
        customers: [],
        products_and_services: [],
        sales_setting: [],
        prod: 0,
        prod2: 0,
        prod_id : '',
        prod_name : '',
        prod_sku : '',
        prod_category : '',
        prod_desc : '',
        prod_price : '',
        prod_cost : '',
        prod_qty : 0,
        prod_reorder_point : 0,
        sales_transaction: [],
        total_invoice_count :0,
        total_invoice_data :0,
        total_estimate_count :0,
        total_estimate_data :0,
        total_paid_count :0,
        total_paid_data :0,

    }
    
    getSalesTransactionPageInfo= async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getSalesTransactionPageInfo',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({customers : response.data.customers});
        this.setState({products_and_services : response.data.products_and_services});
        this.setState({sales_setting : response.data.sales_setting});
        this.setState({prod : response.data.prod});
        this.setState({prod2 : response.data.prod2});
        this.setState({sales_transaction : response.data.sales_transaction});
        this.setState({total_invoice_count : response.data.total_invoice_count});
        this.setState({total_invoice_data : response.data.total_invoice_data});
        this.setState({total_estimate_count : response.data.total_estimate_count});
        this.setState({total_estimate_data : response.data.total_estimate_data});
        this.setState({total_paid_count : response.data.total_paid_count});
        this.setState({total_paid_data : response.data.total_paid_data});
        
    }
    setEditProduct =(prod_id,prod_name,prod_sku,prod_category,prod_desc,prod_price,prod_cost,prod_qty,prod_reorder_point)=>{
        console.log(prod_id,prod_name,prod_sku,prod_category,prod_desc,prod_price,prod_cost,prod_qty,prod_reorder_point);
        this.setState({prod_id : prod_id});
        this.setState({prod_name : prod_name});
        this.setState({prod_sku : prod_sku});
        this.setState({prod_category : prod_category});
        this.setState({prod_desc : prod_desc});
        this.setState({prod_price : prod_price});
        this.setState({prod_cost : prod_cost});
        this.setState({prod_qty : prod_qty});
        this.setState({prod_reorder_point : prod_reorder_point});
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        this.getSalesTransactionPageInfo();
        
        
    }
    SubmitNewProduct = async (event) =>{
        event.preventDefault();
        var bodyFormData = new FormData(event.target);
        console.log(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/save_product_services',bodyFormData);
        alert('Successfully added Product/Services.');
        document.getElementById('cleardataform_productservices').click();
        this.getSalesTransactionPageInfo();
    }
    SubmitEditProduct = async (event) =>{
        event.preventDefault();
        var bodyFormData = new FormData(event.target);
        console.log(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_product',bodyFormData);
        alert('Successfully added Product/Services update request.');
        this.clearEditProdState();
        this.getSalesTransactionPageInfo();
    }
    cancelentry= async (type,id,locationss,invoice_type) =>{
        console.log(type+" "+id+" "+locationss+" "+invoice_type);
        var Reason = prompt("Reason for Cancellation of Entry", "");
        if (Reason != null) {
            var bodyFormData = new FormData();
                bodyFormData.set('type', type);
                bodyFormData.set('id', id);
                bodyFormData.set('locationss', locationss);
                bodyFormData.set('invoice_type', invoice_type);
                bodyFormData.set('Reason', Reason);
                const response = await axios.post('http://localhost/Accounting_modified/public/api/cancel_entry',bodyFormData);
                console.log(response.data);
                window.location.reload();
        }else{
            alert('Action Cancelled');
        }
    }
    clearEditProdState=()=>{
        this.setState({prod_id : ''});
        this.setState({prod_name : ''});
        this.setState({prod_sku : ''});
        this.setState({prod_category : ''});
        this.setState({prod_desc : ''});
        this.setState({prod_price : ''});
        this.setState({prod_cost : ''});
        this.setState({prod_qty : 0});
        this.setState({prod_reorder_point : 0});
        document.getElementById('editprod_close_button').click();
    }
    UploadMassCustomer = async ()=>{
        
        var bodyFormData = new FormData();
        var imagefile = document.querySelector('#excel-upload-customer');
        bodyFormData.append("theFile", imagefile.files[0]);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/UploadMassCustomer',bodyFormData);

        var LOG="";
        if(response.data.Error_Log!=""){
        LOG=" \n\nSkip Log : \n"+response.data.Error_Log;
        }
        alert("Total number Of Data : "+response.data.Total+"\nData Saved : "+response.data.Success+" \nData Skipped : "+response.data.Skiped+LOG);
        window.location.reload();
    }
    render(){
        const customer_list=this.state.customers.map((dat,index) =>{
            return[
                <tr key={index}>
                    <td class="pt-3-half" style={{textAlign : 'left'}}><a className="btn btn-link" href="#">{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name}</a></td>
                    <td class="pt-3-half">{dat.phone}</td>
                    <td class="pt-3-half">{dat.email}</td>
                    <td class="pt-3-half">{number_format(dat.opening_balance,2)}</td>
                </tr>
            ]
        });
        const product_list=this.state.products_and_services.map((dat,index) =>{
            return[
                <tr key={index}>
                    <td class="pt-3-half">{dat.product_name}</td>
                    <td class={`pt-3-half ${this.state.sales_setting.sales_show_sku_column=="On"? '' : 'hiddendesigntemplate'}`} >{dat.product_sku}</td>
                    <td style={{display : 'none'}} class="pt-3-half">{dat.product_type}</td>
                    <td class="pt-3-half">{dat.product_sales_description}</td>
                    <td class={`pt-3-half ${this.state.sales_setting.sales_track_quantity_and_price=="On"? '' : 'hiddendesigntemplate'}`}>PHP {number_format(dat.product_sales_price,2)}</td>
                    <td class={`pt-3-half ${this.state.sales_setting.sales_track_quantity_and_price=="On"? '' : 'hiddendesigntemplate'}`}>PHP {number_format(dat.product_cost,2)}</td>                                            
                    <td class={`pt-3-half ${this.state.sales_setting.sales_track_quantity_on_hand=="On"? '' : 'hiddendesigntemplate'}`}>{dat.product_qty}</td>
                    <td class={`pt-3-half ${this.state.sales_setting.sales_track_quantity_on_hand=="On"? '' : 'hiddendesigntemplate'}`}>{dat.product_reorder_point}</td>
                    <td>
                        <span class="table-add mb-3 mr-2"><a href="#" class="text-info"  data-toggle="modal" data-target="#editprod_modal" onClick={()=>this.setEditProduct(dat.product_id,dat.product_name,dat.product_sku,dat.product_type,dat.product_sales_description,dat.product_sales_price,dat.product_cost,dat.product_qty,dat.product_reorder_point)} ><i aria-hidden="true">Edit</i></a></span>
                    </td>
                </tr>
            ]
        });
        
        const sales_transaction_list=this.state.sales_transaction.map((dat,index) =>{
            if(dat.st_type=="Invoice"){
                var d1 = new Date();
                var d2 = new Date(dat.st_due_date);
                var style="";
                var fontcolor="";
                if(d1>=d2 && (dat.st_status=="Open" || dat.st_status=="Partially paid") && dat.remark!='Cancelled'){
                    style='table-danger';
                    fontcolor="font-red";
                } 
                return [
                    <tr key={index} className={` ${style}`}>
                        <td style={{verticalAlign : 'middle'}}>{moment(dat.st_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_location+" "+dat.st_invoice_type}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_no}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name }</td>
                        <td style={{verticalAlign : 'middle'}} className={`${fontcolor}`}>{moment(dat.st_due_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.st_balance,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.invoice_total,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_status}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_status=="Paid"? 'N/A' : (dat.remark!="Cancelled"? 'actions' : '' ) }</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.remark!="Cancelled"? (dat.st_balance==dat.invoice_total? <button class="btn btn-xs btn-link" type="buton" onClick={()=>this.cancelentry(dat.st_type,dat.st_no,dat.st_location,dat.st_invoice_type)} ><span class="fa fa-ban"></span></button> : '')  : 'Cancelled'}</td>
                    </tr>
                ]
            }
            else if(dat.st_type=="Sales Receipt"){
                return [
                    <tr key={index}>
                        <td style={{verticalAlign : 'middle'}}>{moment(dat.st_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_type}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_no}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name }</td>
                        <td style={{verticalAlign : 'middle'}}>N/A</td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.st_balance,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.st_amount_paid,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_status}</td>
                        <td style={{verticalAlign : 'middle'}}>No Template</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.remark!="Cancelled"? <button class="btn btn-xs btn-link" type="buton" onClick={()=>this.cancelentry(dat.st_type,dat.st_no,dat.st_location,dat.st_invoice_type)} ><span class="fa fa-ban"></span></button> : 'Cancelled'}</td>
                    </tr>
                ]
            }
        });
        // const data=this.state.sales_transaction_list.map((dat) =>{
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
                                    <h1>Sales</h1>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">All Sales</a>
                                </li>
                                <li class="nav-item" style={{display: 'none'}}>
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Invoices</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Customers</a>
                                </li>
                                <li class="nav-item" >
                                    <a class="nav-link" id="extra-tab" data-toggle="tab" href="#extra" role="tab" aria-controls="extra" aria-selected="false">Products and Services</a>
                                </li>
                            </ul>
                            <div class="tab-content pl-3 p-1" id="myTabContentSales">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <h3 class="mt-2">Sales Transactions</h3>
                                    <div class="mb-5 mt-3">
                                        
                                        <a class="btn btn-success mr-1" href="#" data-toggle="modal" data-target="#import_invoice_modal">Import Invoices</a>
                                        <a class="btn btn-success mr-1" href="#" data-toggle="modal" data-target="#invoicemodal">Invoice</a>
                                        <a class="btn btn-success mr-1" href="#"  data-toggle="modal" data-target="#estimatemodal">Estimate</a>
                                        <a class="btn btn-success" href="#" data-toggle="modal" data-target="#creditnotemodal">Credit Note</a>
                                        
                                    </div>
                                    <div id="table" class="table-editable">
                                        <div class="col-md-12 text-white p-0 mb-5">
                                            <div class="col-md-2 bg-ltblue pb-0">
                                                <h4  class="estimate_total">PHP {number_format(this.state.total_estimate_data,2)}</h4>
                                                <p class="font14 estimate_count">{this.state.total_estimate_count} ESTIMATE</p>
                                            </div>
                                            <div class="col-md-2 bg-blue">
                                                <h4>PHP 0.00</h4>
                                                <p class="font14">0 Unbilled Activity</p>
                                            </div>
                                            <div class="col-md-2 bg-orange">
                                                <h4>PHP 0.00</h4>
                                                <p class="font14">0 OVERDUE</p>
                                            </div>
                                            <div class="col-md-3 bg-grey">
                                                <h4 class="invoice_total">PHP {number_format(this.state.total_invoice_data,2)}</h4>
                                                <p class="font14 invoice_count">{this.state.total_invoice_count} OPEN INVOICE</p>
                                            </div>
                                            <div class="col-md-3 bg-ltgreen">
                                                <h4 class="paid_total">PHP {number_format(this.state.total_paid_data,2)}</h4>
                                                <p class="font14 paid_count">{this.state.total_paid_count} PAID </p>
                                            </div>
                                        </div>
                                        <table id="salestable" style={{backgroundColor : '#ccc'}} class="table table-bordered table-responsive-md  text-center font14" width="100%">
                                            <thead>
                                                
                                                <th class="text-center">DATE</th>
                                                <th class="text-center">TYPE</th>
                                                <th class="text-center">NO.</th>
                                                <th class="text-center">CUSTOMER</th>
                                                <th class="text-center">DUE-DATE</th>
                                                <th class="text-center">BALANCE</th>
                                                <th class="text-center">TOTAL</th>
                                                <th class="text-center">STATUS</th>
                                                <th class="text-center">ACTION</th>
                                                <th class="text-center"></th>
                                            </thead>
                                            <tbody style={{backgroundColor : 'white'}}>
                                                {sales_transaction_list}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                </div>
                                <div class="tab-pane fade show" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                    <h3 class="mt-2">Customers</h3>
                                    <div id="table" class="table-editable">
                                        <div class="mr-2 mb-5 mt-3">
                                            <a href="#" class="btn btn-success mr-1" data-target='#addcustomermodal' data-toggle="modal">New Customer</a>
                                            <a href="#" class="btn btn-success" data-target='#ImportCustomerModal' data-toggle="modal">Import Customers</a>
                                        </div>
                                        <table id="customertable" style={{cursor : 'pointer',backgroundColor : '#ccc'}} class="table table-bordered table-responsive-md text-center font14" width="100%">
                                            <thead>
                                                <th class="text-center">CUSTOMER/COMPANY</th>
                                                <th class="text-center">PHONE</th>
                                                <th class="text-center">EMAIL</th>
                                                <th class="text-center">OPEN BALANCE</th>
                                            </thead>
                                            <tbody style={{backgroundColor : 'white'}}>
                                                {customer_list}
                                            </tbody>
                                                
                                            
                                            
                                        </table>
                                        <div class="modal fade" id="ImportCustomerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog  modal-sm" role="document">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Import Customer</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body" style={{textAlign : 'center'}}>
                                                
                                                <input id="excel-upload-customer" onChange={()=>this.UploadMassCustomer()}  type="file"  accept=".xlsx" />
                                                <label for="excel-upload-customer" style={{opacity : '1', cursor : 'pointer', borderRadius : '10px'}} id="FIleImportExcelLabel" class="custom-excel-upload btn btn-primary">
                                                <span class="glyphicon glyphicon-user">IMPORT FROM EXCEL</span>
                                                </label>
                                                
                                            </div>
                                            <div class="modal-footer">
                                                <a class="btn btn-success" href="http://localhost/Accounting_modified/public/api/GetCustomerTemplateExcel">Download Excel Template</a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade show" id="extra" role="tabpanel" aria-labelledby="extra-tab">
                                    <h3 class="mt-2">Products and Services</h3>
                                    <div class="col-md-12 mb-5 mt-3 p-0">
                                        <a class="btn btn-success" href="#" data-toggle="modal" data-target="#addproductmodal">New Product/Services</a>   
                                        <div class="modal fade p-0" id="addproductmodal" tabindex="-1" role="dialog" aria-hidden="true" >
                                            <div class="modal-dialog" role="document" >
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Products/Services</h5>
                                                        <button type="button" class="close" id="product_services_closee_btn" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <form method="POST" onSubmit={this.SubmitNewProduct}>
                                                        
                                                    <div class="modal-body p-4" id="result">
                                                        <div class="col-md-12">
                                                            
                                                                <p>Name</p>
                                                                <textarea name="prod_name" class="form-control" required></textarea>
                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            
                                                            <p>SKU</p>
                                                            <input type="text" name="prod_sku" class="form-control" />
                                                        
                                                        </div>
                                                        <div class="col-md-6">
                                                            
                                                            <p>Category</p>
                                                            <input type="text" name="prod_category" class="form-control" />
                                                        
                                                        </div>
                                                        <div class="col-md-12">
                                                            
                                                                <p>Description</p>
                                                                <textarea class="form-control" name="prod_desc"></textarea>
                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>Price</p>
                                                            <input type="number" name="prod_price" class="form-control" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>Cost</p>
                                                            <input type="number" name="prod_cost" class="form-control" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>QTY</p>
                                                            <input type="number" name="prod_qty" defaultValue="1" class="form-control" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>Reorder Point</p>
                                                            <input type="number" name="prod_reorder_point" defaultValue="1" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="reset" class="btn btn-secondary rounded" id="cleardataform_productservices" onClick={()=>document.getElementById('product_services_closee_btn').click()} >Clear</button>
                                                        <button type="submit" class="btn btn-success rounded" >Save</button>
                                                    </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 bg-white" style={{marginBottom : '10px'}}>
                                        <div class="col-md-6">
                                            <div class=" center-content my-3">
                                                <img src={process.env.PUBLIC_URL + 'images/lowstock.png'} class="w-25 h-25" />
                                                <div class="d-inline-flex">
                                                    <h5 class="ml-2 text-orange">{this.state.prod2}</h5>
                                                    <h5 class="ml-1">LOW STOCK</h5>
                                                </div>
                                            </div>
                                        </div>
                    
                                        <div class="col-md-6">
                                            <div class=" center-content my-3">
                                                <img src={process.env.PUBLIC_URL + 'images/nostock.png'} class="w-25 h-25" />
                                                <div class="d-inline-flex">
                                                    <h5 class="ml-2 text-red">{this.state.prod}</h5>
                                                    <h5 class="ml-1">NO STOCK</h5>
                                                </div>
                                            </div>
                                        </div>
                    
                    
                                    </div> 
                                    <div id="table" class="table-editable" style={{marginTop :'10px'}}>
                                    <table style={{width : '100%',backgroundColor : '#ccc'}} class="table table-bordered table-responsive-md  text-center font14" id="productandservicestale">
                                        <thead>
                                        <tr>
                                            <th class="text-center">NAME</th>
                                            <th  class="text-center">SKU</th>
                                            <th class="text-center" style={{display : 'none'}}>TYPE</th>
                                            <th class="text-center">SALES DESC.</th>
                                            
                                            <th class="text-center">SALES PRICE</th>
                                            <th class="text-center">COST</th>
                                            
                                            <th class="text-center">QTY ON HAND</th>
                                            <th class="text-center">REORDER POINT</th>
                                            
                                            <th class="text-center">ACTION</th>
                                        </tr>
                                        </thead>
                                        <tbody style={{backgroundColor : 'white'}}>
                                        {product_list}
                                        </tbody>
                                    </table>
                                    <div class="modal fade p-0" id="editprod_modal" tabindex="-1" role="dialog" aria-hidden="true" >
                                        <div class="modal-dialog" role="document" >
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Inventory</h5>
                                                    <button type="button" class="close" id="editprod_close_button" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <form method="POST" onSubmit={this.SubmitEditProduct}>
                                                <input type="hidden" name="prod_id" value={this.state.prod_id}  />
                                                <div class="modal-body p-4" id="result">
                                                    {this.state.prod_name}
                                                    <div class="col-md-12">
                                                        <p>Name</p>
                                                        <textarea name="prod_name" value={this.state.prod_name} onChange={(event)=>this.setState({prod_name : event.target.value})} class="form-control"></textarea>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>SKU</p>
                                                        <input type="text" name="prod_sku"  class="form-control" value={this.state.prod_sku} onChange={(event)=>this.setState({prod_sku : event.target.value})} />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>Category</p>
                                                        <input type="text"  name="prod_category" class="form-control" value={this.state.prod_category} onChange={(event)=>this.setState({prod_category : event.target.value})} />
                                                    </div>
                                                    <div class="col-md-12">
                                                        <p>Description</p>
                                                        <textarea class="form-control" name="prod_desc" value={this.state.prod_desc} onChange={(event)=>this.setState({prod_desc : event.target.value})}></textarea>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>Price</p>
                                                        <input type="number" name="prod_price"  class="form-control" value={this.state.prod_price} onChange={(event)=>this.setState({prod_price : event.target.value})} />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>Cost</p>
                                                        <input type="number" name="prod_cost"  class="form-control" value={this.state.prod_cost} onChange={(event)=>this.setState({prod_cost : event.target.value})} />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>QTY</p>
                                                        <input type="number" name="prod_qty" class="form-control" value={this.state.prod_qty} onChange={(event)=>this.setState({prod_qty : event.target.value})} />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>Reorder Point</p>
                                                        <input type="number" name="prod_reorder_point"  class="form-control" value={this.state.prod_reorder_point} onChange={(event)=>this.setState({prod_reorder_point : event.target.value})} />
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary rounded" onClick={()=>this.clearEditProdState()}>Cancel</button>
                                                    <button type="submit" class="btn btn-success rounded" >Save</button>
                                                </div>
                                                </form>
                                            </div>
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

export default Sales;