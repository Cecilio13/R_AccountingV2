import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import $ from 'jquery';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import DropDown from './inc/options_receive_payment.js';

import { number_format } from '../Helper';
var refresh_sales_table=0;
var refresh_product_table=1;
var refresh_customer_table=1;
class Sales extends React.Component{
    state ={
        customers: [],
        access : [],
        products_and_services: [],
        sales_setting: [],
        STInvoice : [],
        sales_receipt_list: [],
        st_invoice_data : [],
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
        YearSelected : moment().format('YYYY'),
        year_beg : '',
        year_end : '',
        yyyyy : '',

    }
    getUserAccess= async (event) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/get_access',{
            params:{
                id: sessionStorage.getItem('Accounting_App_id'),
            },
            crossDomain: true
        });
        console.log(response.data.access);
        this.setState({access : response.data.access});
    }
    refresh_sales_table =(event) =>{
        if(refresh_sales_table==1){
            refresh_sales_table=0;
            document.getElementById('refresh_sales_table').click();
           
        }
    }
    refresh_customer_table = (event) =>{
        if(refresh_customer_table==1){
            refresh_customer_table=0;
            document.getElementById('refresh_customer_table').click();
           
        }
    }
    refresh_product_table = (event) =>{
        if(refresh_product_table==1){
            refresh_product_table=0;
            document.getElementById('refresh_product_table').click();
           
        }
    }
    getSalesTransactionPageInfo= async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getSalesTransactionPageInfo',{
            params:{
                year: this.state.YearSelected
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
        this.setState({STInvoice : response.data.STInvoice});
        this.setState({year_beg : response.data.year_beg});
        this.setState({year_end : response.data.year_end});
        this.setState({yyyyy : response.data.yyyyy});
        this.setState({YearSelected : response.data.yyyyy});
        this.setState({sales_receipt_list : response.data.sales_receipt_list});
        this.setState({st_invoice_data : response.data.st_invoice_data});
        
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
        this.getUserAccess();
        
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
                bodyFormData.set('locationss', locationss!=null? locationss : '');
                bodyFormData.set('invoice_type', invoice_type!=null? invoice_type : '');
                bodyFormData.set('Reason', Reason);
                const response = await axios.post('http://localhost/Accounting_modified/public/api/cancel_entry',bodyFormData);
                console.log(response.data);
                //window.location.reload();
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
    onReceivePaymentClick = async (event) =>{
        document.getElementById('clear_lines_sales_receipt').click();
        console.log("invoice item no "+event.target.getAttribute('data-invoice_item_no'));
        console.log("invoice location "+event.target.getAttribute('data-invoice_location'));
        console.log("invoice type "+event.target.getAttribute('data-invoice_type'));
        console.log("invoice st no "+event.target.getAttribute('data-st_no'));
        console.log("st_customer_id "+event.target.getAttribute('data-st_customer_id'));
        console.log("st_invoice_job_order "+event.target.getAttribute('data-st_invoice_job_order'));
        console.log("st_invoice_work_no "+event.target.getAttribute('data-st_invoice_work_no'));

        document.getElementById('invoice_location').value=event.target.getAttribute('data-invoice_location');
        document.getElementById('invoice_type').value=event.target.getAttribute('data-invoice_type');
        document.getElementById('invoiceno_sr').value=event.target.getAttribute('data-st_no');
        document.getElementById('invoice_item_no').value=event.target.getAttribute('data-invoice_item_no');
        document.getElementById('salesrcustomer').value='';
        document.getElementById('CostCenterSalesReceipt').value='';
        
        document.getElementById('salesradd').disabled=true;
        document.getElementById('amountreceived_sr').value="0";
        document.getElementById('last_payment').innerHTML='0.00';

        var ev = new Event('change', { bubbles: true});
        ev.simulated = true;
        document.getElementById('salesrcustomer').dispatchEvent(ev);
        document.getElementById('sales_receiptbalance').innerHTML='PHP 0.00';
        document.getElementById('big_sales_receiptbalance').innerHTML='PHP 0.00';

        var value=document.getElementById('invoiceno_sr').value;
        var location_invoice=document.getElementById('invoice_location').value;
        var type_invoice=document.getElementById('invoice_type').value;
        var invoice_item_no=document.getElementById('invoice_item_no').value;
        var typematched=0;
        document.getElementById('sales_receipt_location_top').value=location_invoice;
        
        document.getElementById('sales_receipt_type_top').value=type_invoice;

        document.getElementById('salesrcustomer').value=event.target.getAttribute('data-st_customer_id');
        document.getElementById('job_order_sales_receipt').value=event.target.getAttribute('data-st_invoice_job_order');
        document.getElementById('work_no_sales_receipt').value=event.target.getAttribute('data-st_invoice_work_no');
        var ev = new Event('change', { bubbles: true});
        ev.simulated = true;
        document.getElementById('salesrcustomer').dispatchEvent(ev);
        for(var ind=0;ind<this.state.sales_transaction.length;ind++){
            if(this.state.sales_transaction[ind].customer_id==event.target.getAttribute('data-st_customer_id') && this.state.sales_transaction[ind]=="Sales Receipt" && value==this.state.sales_transaction[ind].st_payment_for){
                document.getElementById('last_payment').innerHTML=number_format(this.state.sales_transaction[ind].st_amount_paid,2);
            }
        }

        //document.getElementById('add_lines_sales_receipt').click();
        var sd=1;
        var totalamount=0;
        console.log(this.state.STInvoice.length+" length");
        for(var ind=0;ind<this.state.STInvoice.length;ind++){
            if(this.state.STInvoice[ind].st_i_no==value && this.state.STInvoice[ind].st_p_location==location_invoice && this.state.STInvoice[ind].st_p_invoice_type==type_invoice && this.state.STInvoice[ind].st_i_item_no==invoice_item_no){
                
                setTimeout((ind) =>{
                    console.log(this.state.STInvoice[ind].product_name);
                    document.getElementById('add_lines_sales_receipt').click();
                    document.getElementById('cost_center_sales_creciept'+sd).value=this.state.STInvoice[ind].product_name;
                    if(document.getElementById('cost_center_sales_creciept'+sd).value==""){
                        document.getElementById('ParticularSalesReceipt'+sd).value="Cost Center";
                        document.getElementById('cost_center_sales_creciept'+sd).value=this.state.STInvoice[ind].cc_name;
                    }else{
                        document.getElementById('ParticularSalesReceipt'+sd).value="Product/Service";
                    }
                    document.getElementById('select_product_description_sales_receipt'+sd).value=this.state.STInvoice[ind].st_i_desc;
                    document.getElementById('product_qty_sales_receipt'+sd).value=this.state.STInvoice[ind].st_i_qty;
                    document.getElementById('select_product_rate_sales_receipt'+sd).value=number_format(this.state.STInvoice[ind].st_i_rate,2);
                    document.getElementById('select_product_rate_sales_receipt'+sd).title=this.state.STInvoice[ind].st_i_rate;
                    document.getElementById('total_amount_sales_receipt'+sd).innerHTML=number_format(this.state.STInvoice[ind].st_i_total,2);
                    document.getElementById('total_amount_sales_receipt'+sd).title=this.state.STInvoice[ind].st_i_total;
                    totalamount=(parseFloat(totalamount)+(parseFloat(this.state.STInvoice[ind].st_i_total)-parseFloat(this.state.STInvoice[ind].st_p_amount)));
                    sd++;
                    document.getElementById('big_sales_receiptbalance').setAttribute('title',totalamount);
                    document.getElementById('big_sales_receiptbalance').innerHTML="PHP "+number_format(totalamount,2);
                    document.getElementById('amountreceived_sr').value=totalamount;
                    document.getElementById('amountreceived_sr_mask').value=number_format(totalamount,2);
                    document.getElementById('TotalDebitSalesReceiptTD').innerHTML="Total : "+number_format(totalamount,2);
                    document.getElementById('hiddentotaldebitamountsalesreceipt').value=totalamount;
                    document.getElementById('sales_receiptbalance').innerHTML="PHP "+number_format(totalamount,2);
                    
                    document.getElementById('amountreceived_sr').max=totalamount;
                    document.getElementById('amountreceived_sr_mask').max=totalamount;
    
                    document.getElementById('sales_receipttotal').innerHTML=number_format(totalamount,2);
                    document.getElementById('sales_receipttotal').setAttribute('title',totalamount);
                } , 500,ind);
                //document.getElementById('cost_center_sales_creciept'+sd).value=this.state.STInvoice[ind].st_i_product;
               
            }
            
            
        }
        document.getElementById('salesradd').disabled=false;
        document.getElementById('renderSalesReceiptTable').click();

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
    crete_invoice = async (array)=>{
        console.log(array);
        const response = await axios.get('http://localhost/Accounting_modified/public/api/get_all_estimates',{
            params:{
                id: array.st_no
            },
            crossDomain: true
        });
        document.getElementById('sales_transaction_number_estimate').value=array.st_no;
        document.getElementById('invoicecustomer').value=array.st_customer_id;
        document.getElementById('bill_address').value=array.st_bill_address;
        document.getElementById('term').value=array.st_term;
        document.getElementById('invoicedate').value=array.st_date;
        document.getElementById('invoiceduedate').value=array.st_due_date;
        document.getElementById('note').value=array.st_note;
        document.getElementById('memo').value=array.st_memo;
        document.getElementById('invoicebalance').innerHTML="PHP "+number_format(array.opening_balance,2);
        document.getElementById('big_invoicebalance').innerHTML="PHP "+number_format(array.opening_balance,2);
        for(var index=0; index<response.data.length;index++){
            setTimeout(() => document.getElementById('add_lines_invoice').click(), 500);
            
            var countrow=index+1;
            document.getElementById('ParticularInvoice'+countrow).value="Product/Service";
            document.getElementById("CostCenterInvoice"+countrow).required = false;
            document.getElementById("select_product_name"+countrow).required = true;
            document.getElementById('CostCenterInvoiceItemDiv'+countrow).style.display="none";
            document.getElementById('ProductServicesInvoiceItemDiv'+countrow).style.display="block";
            document.getElementById('select_product_name'+countrow).value=response.data[index].st_e_product;
            document.getElementById('select_product_description'+countrow).value=response.data[index].st_e_desc;
            document.getElementById('unformated_select_sales_rate'+countrow).setAttribute('title',response.data[index].st_e_rate);
            document.getElementById('unformated_select_sales_rate'+countrow).value=number_format(response.data[index].st_e_rate,2);
            document.getElementById('select_product_rate'+countrow).setAttribute('title',response.data[index].st_e_rate);
            document.getElementById('select_product_rate'+countrow).value=response.data[index].st_e_rate;
            document.getElementById('total_amount'+countrow).innerHTML=response.data[index].st_e_total;
            document.getElementById('total_amount'+countrow).setAttribute('title',response.data[index].st_e_total);
            console.log(response.data[index].st_e_no+" "+response.data[index].st_e_rate);
        }
        var ev = new Event('change', { bubbles: true});
        ev.simulated = true;
        document.getElementById('invoicecustomer').dispatchEvent(ev);
        document.getElementById('estimatetoinvoicebtn').click();
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
        //sales_receipt_list
        const sales_transaction_list=this.state.sales_transaction.map((dat,index) =>{
            if(dat.st_type=="Invoice"){
                document.getElementById('destroy_sales_table').click();
                refresh_sales_table=1;
                var d1 = new Date();
                var d2 = new Date(dat.st_due_date);
                var style="";
                var fontcolor="";
                if(d1>=d2 && (dat.st_status=="Open" || dat.st_status=="Partially paid") && dat.remark!='Cancelled'){
                    style='table-danger';
                    fontcolor="font-red";
                }
                
                return [
                    <tr key={index} className={`${style}`} onMouseOver={()=>this.refresh_sales_table()}>
                        <td style={{verticalAlign : 'middle'}}>{moment(dat.st_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_location+" "+dat.st_invoice_type}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_no}</td>
                        <td style={{verticalAlign : 'middle'}}>
                        {this.state.st_invoice_data.map((coa,inn)=>{
                            if(dat.st_no==coa.st_i_no && dat.st_location==coa.st_p_location && dat.st_invoice_type==coa.st_p_invoice_type && coa.st_p_reference_no==dat.st_i_attachment){
                                return[
                                    <div>
                                        {coa.cc_name+" \n"}
                                    </div>
                                ]
                            }
                            
                        })}
                        
                        </td>
                        <td style={{verticalAlign : 'middle'}}>{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name }</td>
                        <td style={{verticalAlign : 'middle'}} className={`${fontcolor}`}>{moment(dat.st_due_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>
                            {dat.cancellation_reason==null? 
                            this.state.sales_receipt_list.map((coa,inn)=>{
                                if(coa.st_payment_for==dat.st_no && dat.st_location==coa.st_location && dat.st_invoice_type==coa.st_invoice_type){
                                    return [
                                        <div>
                                            {coa.st_no}
                                        </div>
                                    ]
                                }
                            })
                            : ''}
                        </td>
                        <td style={{verticalAlign : 'middle'}}>
                            {dat.cancellation_reason==null? 
                            this.state.sales_receipt_list.map((coa,inn)=>{
                                if(coa.st_payment_for==dat.st_no && dat.st_location==coa.st_location && dat.st_invoice_type==coa.st_invoice_type){
                                    return [
                                        <div>
                                            {moment(dat.st_date).format('MM-DD-YYYY')}
                                        </div>
                                    ]
                                }
                            })
                            : ''}
                        </td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.st_balance,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.invoice_total,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_status}</td>
                        <td style={{verticalAlign : 'middle'}}>
                            {dat.st_status=="Paid"? 'N/A' : 
                                (dat.remark!="Cancelled"? 

                                <div class="dropdown"><button class="btn btn-link btn-sm" style={{fontSize : '11px'}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Receive Payment
                                </button>
                                <div class="dropdown-menu"> <DropDown onClick={this.onReceivePaymentClick} dat={dat} STInvoice={this.state.STInvoice} /></div></div>
                                 :
                                '' 
                                )
                            }
                            </td>
                        <td style={{verticalAlign : 'middle'}}>{dat.remark!="Cancelled"? (dat.st_balance==dat.invoice_total? <button class="btn btn-xs btn-link" type="buton" onClick={()=>this.cancelentry(dat.st_type,dat.st_no,dat.st_location,dat.st_invoice_type)} ><span class="fa fa-ban"></span></button> : '')  : 'Cancelled'}</td>
                    </tr>
                ]
            }
            else if(dat.st_type=="Sales Receipt"){
                document.getElementById('destroy_sales_table').click();
                refresh_sales_table=1;
                return [
                    <tr key={index} onMouseOver={()=>this.refresh_sales_table()}>
                        <td style={{verticalAlign : 'middle'}}>{moment(dat.st_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_type}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_no}</td>
                        <td style={{verticalAlign : 'middle'}}></td>
                        <td style={{verticalAlign : 'middle'}}>{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name }</td>
                        <td style={{verticalAlign : 'middle'}}>N/A</td>
                        <td style={{verticalAlign : 'middle'}}></td>
                        <td style={{verticalAlign : 'middle'}}></td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.st_balance,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.st_amount_paid,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_status}</td>
                        <td style={{verticalAlign : 'middle'}}>No Template</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.remark!="Cancelled"? <button class="btn btn-xs btn-link" type="buton" onClick={()=>this.cancelentry(dat.st_type,dat.st_no,dat.st_location,dat.st_invoice_type)} ><span class="fa fa-ban"></span></button> : 'Cancelled'}</td>
                    </tr>
                ]
            }
            else if(dat.st_type=="Credit Note"){
                document.getElementById('destroy_sales_table').click();
                refresh_sales_table=1;
                return [
                    <tr key={index} onMouseOver={()=>this.refresh_sales_table()}>
                        <td style={{verticalAlign : 'middle'}}>{moment(dat.st_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_type}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_no}</td>
                        <td style={{verticalAlign : 'middle'}}></td>
                        <td style={{verticalAlign : 'middle'}}>{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name }</td>
                        <td style={{verticalAlign : 'middle'}}>N/A</td>
                        <td style={{verticalAlign : 'middle'}}></td>
                        <td style={{verticalAlign : 'middle'}}></td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.st_balance,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.st_amount_paid,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_status}</td>
                        <td style={{verticalAlign : 'middle'}}>N/A</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.remark!="Cancelled"? <button class="btn btn-xs btn-link" type="buton" onClick={()=>this.cancelentry(dat.st_type,dat.st_no,dat.st_location,dat.st_invoice_type)} ><span class="fa fa-ban"></span></button> : 'Cancelled'}</td>
                    </tr>
                ]
            }
            else if(dat.st_type=="Estimate"){
                document.getElementById('destroy_sales_table').click();
                refresh_sales_table=1;
                return [
                    <tr key={index} onMouseOver={()=>this.refresh_sales_table()}>
                        <td style={{verticalAlign : 'middle'}}>{moment(dat.st_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_type}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_no}</td>
                        <td style={{verticalAlign : 'middle'}}></td>
                        <td style={{verticalAlign : 'middle'}}>{dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name }</td>
                        <td style={{verticalAlign : 'middle'}}>N/A</td>
                        <td style={{verticalAlign : 'middle'}}></td>
                        <td style={{verticalAlign : 'middle'}}></td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.st_balance,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{number_format(dat.estimate_total,2)}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_status}</td>
                        <td style={{verticalAlign : 'middle'}}>{
                        dat.st_status=="Pending"? (dat.st_type=="Estimate"? (dat.remark=="" || dat.remark==null? <span class="table-add mb-3 mr-2"><a class="btn btn-link text-info create_invoice_estimate" id={`estimate${dat.st_no}`} href="#" data-toggle="modal" data-target="#invoicemodal" onClick={()=>this.crete_invoice(dat)}><i aria-hidden="true">Create Invoice</i></a></span>  : 'N/A') : 'N/A' ) : 'N/A'
                        }</td>
                        <td style={{verticalAlign : 'middle'}}></td>
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
                                    <button type="button" id="refresh_sales_table" style={{display : 'none'}}>qqq</button>
                                    <button type="button" id="destroy_sales_table" style={{display : 'none'}}></button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" >
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
                                    <div className ="col-md-10">
                                        <div class="mb-5 mt-3">
                                        {this.state.access!=null && this.state.access.invoice=="1"? 
                                            <a class="btn btn-success mr-1" href="#" data-toggle="modal" data-target="#import_invoice_modal">Import Invoices</a>
                                            
                                            
                                            : ''}
                                        {this.state.access!=null && this.state.access.invoice=="1"? 
                                            <a class="btn btn-success mr-1" href="#" data-toggle="modal" data-target="#invoicemodal">Invoice</a>
                                            
                                            
                                            : ''}
                                            {this.state.access!=null && this.state.access.estimate=="1"? 
                                            <a class="btn btn-success mr-1" href="#"  data-toggle="modal" data-target="#estimatemodal">Estimate</a>
                                            : ''}
                                            {this.state.access!=null && this.state.access.credit_note=="1"? 
                                            <a class="btn btn-success" href="#" data-toggle="modal" data-target="#creditnotemodal">Credit Note</a>
                                            : ''}
                                            
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div class="input-group mb-3">
                                            <input type="number" class="form-control" id="yearSSSEELLEECCRTTED" style={{float: 'right'}} value={this.state.YearSelected} onChange={(event)=>this.setState({YearSelected : event.target.value})} />
                                            
                                            <div class="input-group-prepend">
                                                <button class="btn btn-secondary" onClick={()=>this.getSalesTransactionPageInfo()}>GO</button>
                                            </div>
                                        </div>
                                        
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
                                                <tr>
                                                <th class="text-center">DATE</th>
                                                <th class="text-center">TYPE</th>
                                                <th class="text-center">NO.</th>
                                                <th class="text-center">COST CENTER</th>
                                                <th class="text-center">CUSTOMER</th>
                                                <th class="text-center">DUE-DATE</th>
                                                <th class="text-center">OR NO</th>
                                                <th class="text-center">OR DATE</th>
                                                <th class="text-center">BALANCE</th>
                                                <th class="text-center">TOTAL</th>
                                                <th class="text-center">STATUS</th>
                                                <th class="text-center">ACTION</th>
                                                <th class="text-center"></th>
                                                </tr>
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
                                        <button style={{display : 'none'}} id="refresh_customer_table"></button>
                                        <table id="customertable" style={{cursor : 'pointer',backgroundColor : '#ccc'}} class="table table-bordered table-sm table-responsive-md text-center font14" width="100%" onMouseOver={()=>this.refresh_customer_table()}>
                                            <thead>
                                                <tr>
                                                <th class="text-center">CUSTOMER/COMPANY</th>
                                                <th class="text-center">PHONE</th>
                                                <th class="text-center">EMAIL</th>
                                                <th class="text-center">OPEN BALANCE</th>
                                                </tr>
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
                                                <img src={process.env.PUBLIC_URL + '/images/lowstock.png'} class="w-25 h-25" />
                                                <div class="d-inline-flex">
                                                    <h5 class="ml-2 text-orange">{this.state.prod2}</h5>
                                                    <h5 class="ml-1">LOW STOCK</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class=" center-content my-3">
                                                <img src={process.env.PUBLIC_URL + '/images/nostock.png'} class="w-25 h-25" />
                                                <div class="d-inline-flex">
                                                    <h5 class="ml-2 text-red">{this.state.prod}</h5>
                                                    <h5 class="ml-1">NO STOCK</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    <button style={{display : 'none'}} id="refresh_product_table"></button>
                                    <div id="table" class="table-editable" style={{marginTop :'10px'}}>
                                    <table style={{width : '100%',backgroundColor : '#ccc'}} class="table table-bordered table-responsive-md  text-center font14" id="productandservicestale" onMouseOver={()=>this.refresh_product_table()}>
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