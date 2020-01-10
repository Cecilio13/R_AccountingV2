import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import '../../css/index.css';
import { number_format,addCommas } from '../../Helper';
var invoice_row=1;
var rerenderselectpickerinvoice=0;
class Modal extends React.Component{
    state ={
        invoice_table_row : [],
        invoice_table_journal_row : [],
        data: [],
        customers: [],
        products_and_services: [],
        COA: [],
        cost_center_list: [],
        numbering: [],
        branch_Sales_invoice_count : 0,
        branch_Bill_invoice_count : 0,
        main_Bill_invoice_count : 0,
        invoice_count : 0,
        invoice_no_state : 0,
        invoice_item_count : 0,
    }
    refreshselecpickerselectsinvoice =() =>{
        if(rerenderselectpickerinvoice==1){
            document.getElementById('setselectpickerbuttoninvoice').click();
            document.getElementById('rerenderbuttoninvoice').click();
            rerenderselectpickerinvoice=0;
        }
        
    }
    add_invoice_table_row =(event) =>{
        event.preventDefault();
        const item = invoice_row;
        this.setState({invoice_table_row: [...this.state.invoice_table_row, item],invoice_table_journal_row : [...this.state.invoice_table_journal_row, item],invoice_item_count :this.state.invoice_item_count+1
        });                     
        invoice_row++;
    }
    submitCustomer= async (event) =>{
        event.preventDefault();
        var bodyFormData = new FormData(event.target);
        console.log(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/add_customer',bodyFormData);
        alert('Successfully added new Customer');
        document.getElementById('add_customer_modal_reset_button').click();
        window.location.reload();
    }
    saveSupplier = async (event) =>{
        event.preventDefault();
        var bodyFormData = new FormData(event.target);
        console.log(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/add_supplier',bodyFormData);
        alert('Successfully added new Supplier');
        document.getElementById('add_supplier_modal_reset_button').click();
        window.location.reload();
    }
    hidevatvalue = (e) =>{
        if(e=="VAT"){
            document.getElementById('vatvaluediv').style.display="block";
        }else{
            
            document.getElementById('vatvaluediv').style.display="none";
        }
    }
    UploadMassInvoice = async ()=>{
        
        var bodyFormData = new FormData();
        var imagefile = document.querySelector('#excel-uploadinvoice');
        bodyFormData.append("theFile", imagefile.files[0]);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/UploadMassInvoice',bodyFormData);

        var LOG="";
        if(response.data.Error_Log!=""){
        LOG=" \n\nSkip Log : \n"+response.data.Error_Log;
        }
        alert("Total number Of Data : "+response.data.Total+"\nData Saved : "+response.data.Success+" \nData Skipped : "+response.data.Skiped+LOG);
        window.location.reload();
    }
    getInvoiceModalInfo = async ()=>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getInvoiceModalInfo',{
            params:{
                query: ''
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({
            customers: response.data.customers,
            products_and_services:response.data.products_and_services,
            COA:response.data.COA,
            cost_center_list:response.data.cost_center_list,
            numbering: response.data.numbering,
            branch_Sales_invoice_count : response.data.branch_Sales_invoice_count,
            branch_Bill_invoice_count :response.data.branch_Bill_invoice_count,
            main_Bill_invoice_count : response.data.main_Bill_invoice_count,
            invoice_count : response.data.invoice_count,
        })
        this.setState({invoice_no_state : parseFloat(this.state.invoice_count)+parseFloat(this.state.numbering.sales_exp_start_no)})
    }
    setInvoice_no_new = async () =>{
        var invoice_location_top=document.getElementById('invoice_location_top').value;
        var invoice_type_top=document.getElementById('invoice_type_top').value;
        const response = await axios.get('http://localhost/Accounting_modified/public/api/check_invoice_no',{
            params:{
                invoice_location_top: invoice_location_top,
                invoice_type_top: invoice_type_top,
                invoice_no_field: this.state.invoice_no_state,
            },
            crossDomain: true
        });
        if(response.data>0){
            document.getElementById('invoice_invoiceno').style.border="1px solid red";
            document.getElementById('invoice_add_button').disabled=true;
        }else{
            document.getElementById('invoice_invoiceno').style.border="1px solid green";
            document.getElementById('invoice_add_button').disabled=false;
        }
    }
    set_invoice_no = (event) =>{
        this.setState({invoice_no_state : event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}, function() { this.setInvoice_no_new()}.bind(this));
        
    }
    fetch_customer_info = async (address,terms,email,value,big,small) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/fetch_customer_info',{
            params:{
                value: value,
            },
            crossDomain: true
        });
        console.log(response.data);
        document.getElementById(address).value=response.data.customers.street+" "+response.data.customers.city+" "+response.data.customers.state+" "+response.data.customers.postal_code+" "+response.data.customers.country;
        document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
        document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
        document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
        document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
        document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
        document.getElementById(address).value= document.getElementById(address).value.replace('null','');
        document.getElementById(address).value= document.getElementById(address).value.replace('null','');

        document.getElementById(big).innerHTML= "PHP "+number_format(response.data.customers.opening_balance,2);
        document.getElementById(small).innerHTML= "PHP "+number_format(response.data.customers.opening_balance,2);
        document.getElementById(terms).value=response.data.customers.terms;
        document.getElementById(email).value=response.data.customers.email;
        this.apply_term();
    }
    changeduedatemin = (e) =>{
        if(e.value!=""){
            document.getElementById('invoiceduedate').setAttribute("min", e.value);
        }
        this.apply_term();
    }
    apply_term= () =>{
        var term = document.getElementById('term').value;
        if(document.getElementById('invoicedate').value==""){
            var new_date=moment();
            var day = new_date.format('DD');
            var month = new_date.format('MM');
            var year = new_date.format('YYYY');
            document.getElementById('invoicedate').value=year + '-' + month + '-' + day;
        }
        if(term=="Due on receipt"){
            document.getElementById('invoiceduedate').value=document.getElementById('invoicedate').value;
        }else if(term=="Net 15"){
            var new_date=moment(document.getElementById('invoicedate').value, "YYYY-MM-DD").add(15, 'days');
            var day = new_date.format('DD');
            var month = new_date.format('MM');
            var year = new_date.format('YYYY');
            document.getElementById('invoiceduedate').value=year + '-' + month + '-' + day;
           
        }else if(term=="Net 30"){
            var new_date=moment(document.getElementById('invoicedate').value, "YYYY-MM-DD").add(30, 'days');
            var day = new_date.format('DD');
            var month = new_date.format('MM');
            var year = new_date.format('YYYY');
            console.log(year + '-' + month + '-' + day);
            document.getElementById('invoiceduedate').value=year + '-' + month + '-' + day;
            
        }else if(term=="Net 60"){
            var new_date=moment(document.getElementById('invoicedate').value, "YYYY-MM-DD").add(60, 'days');
            var day = new_date.format('DD');
            var month = new_date.format('MM');
            var year = new_date.format('YYYY');
            document.getElementById('invoiceduedate').value=year + '-' + month + '-' + day;
            
        }else{
            document.getElementById('invoiceduedate').value=document.getElementById('invoicedate').value;
        }
    }
    settermsinvoice = (e) =>{
        if(e.value!=""){
            document.getElementById('term').value="";
        }
        
    }
    ChangeParticularInvoice =(obj) =>{
        console.log(obj.getAttribute('data-columncount'));
        if(obj.value=="Cost Center"){
            document.getElementById('CostCenterInvoiceItemDiv'+obj.getAttribute("data-columncount")).style.display="inline";
            document.getElementById('ProductServicesInvoiceItemDiv'+obj.getAttribute("data-columncount")).style.display="none";
            document.getElementById("CostCenterInvoice"+obj.getAttribute("data-columncount")).required = true;
            document.getElementById("select_product_name"+obj.getAttribute("data-columncount")).required = false;
            
        }else{
            document.getElementById('ProductServicesInvoiceItemDiv'+obj.getAttribute("data-columncount")).style.display="inline";
            document.getElementById('CostCenterInvoiceItemDiv'+obj.getAttribute("data-columncount")).style.display="none";
            document.getElementById("CostCenterInvoice"+obj.getAttribute("data-columncount")).required = false;
            document.getElementById("select_product_name"+obj.getAttribute("data-columncount")).required = true;
        }

        document.getElementById('select_product_name'+obj.getAttribute("data-columncount")).value="";
        document.getElementById('CostCenterInvoice'+obj.getAttribute("data-columncount")).value="";
    }
    deleteItem = (index) =>{
        document.getElementById('destroyinvoicetabledatatable').click();
        console.log('this.state.invoice_item_count'+ this.state.invoice_item_count);
        this.setState({
            invoice_table_row: this.state.invoice_table_row.slice(0, -1),
            invoice_table_journal_row : this.state.invoice_table_journal_row.slice(0, -1),
            invoice_item_count : this.state.invoice_item_count-1
        });
        
    }
    deletealliteminvoice = ()=>{
        document.getElementById('destroyinvoicetabledatatable').click();
        this.setState({invoice_table_row : [],invoice_table_journal_row : [], invoice_item_count : 0});

    }
    setAccount_and_Code =(row) =>{
        
        var position = row;
        var code=document.getElementById('invoice_account_debit_account_code'+position).value;
        document.getElementById('invoice_account_debit_account'+position).value=code;
        document.getElementById('setselectpickerinvoicedebitcode').setAttribute('data-value',position);
        document.getElementById('setselectpickerinvoicedebitcode').click();
       
    }
    setAccount_and_Code_code =(row) =>{
        
        var position = row;
        var code=document.getElementById('invoice_account_debit_account'+position).value;
        document.getElementById('invoice_account_debit_account_code'+position).value=code;
        document.getElementById('setselectpickerinvoicedebitcodecode').setAttribute('data-value',position);
        document.getElementById('setselectpickerinvoicedebitcodecode').click();
        
    }
    setAccount_and_Code2 =(row)=>{
        
        var position = row;
        var code=document.getElementById('invoice_account_credit_account_code'+position).value;
        document.getElementById('invoice_account_credit_account'+position).value=code;
        document.getElementById('setselectpickerinvoicecredtitcode').setAttribute('data-value',position);
        document.getElementById('setselectpickerinvoicecredtitcode').click();
       
    }
    setAccount_and_Code_code2 =(row)=>{
        
        var position =row;
        var code=document.getElementById('invoice_account_credit_account'+position).value;
        document.getElementById('invoice_account_credit_account_code'+position).value=code;
        document.getElementById('setselectpickerinvoicecredtitcodecode').setAttribute('data-value',position);
        document.getElementById('setselectpickerinvoicecredtitcodecode').click();
        
    }
    computeTotal = (row) =>{
        var qty= document.getElementById('product_qty'+row).value;
        var amount= document.getElementById('select_product_rate'+row).value;
        document.getElementById('total_amount'+row).innerHTML=number_format(parseFloat(amount)*parseFloat(qty),2);
        document.getElementById('total_amount'+row).setAttribute('title',parseFloat(amount)*parseFloat(qty));
        var total_all_item=0;
        for(var c=1;c<=this.state.invoice_item_count;c++){
            
            var qty= document.getElementById('product_qty'+c).value;
            var amount= document.getElementById('select_product_rate'+c).value;
            console.log(c+"<= c "+"amount : "+amount);
            total_all_item=parseFloat(total_all_item)+parseFloat(amount)*parseFloat(qty);
        }
        document.getElementById('total_balance').value=total_all_item;
        document.getElementById('invoicetotal').innerHTML="PHP "+number_format(total_all_item,2);
        
    }
    maskamountinput = (row,formatted,unformated) =>{
        
        document.getElementById(formatted+row).value=document.getElementById(formatted+row).value.match(/[0-9.,-]*/);
        
        var num = document.getElementById(formatted+row).value;
        var comma = /,/g;
        num = num.replace(comma,'');
        document.getElementById(unformated+row).value=num;
        document.getElementById(unformated+row).setAttribute('title',num);
        var numCommas = addCommas(num);
        console.log(" numCommas "+numCommas+" row : "+row);
        document.getElementById(formatted+row).value=numCommas;
        this.computeTotal(row);
    }
    AddInvoice = async (event) =>{
        event.preventDefault();
        if(this.state.invoice_item_count>=1){
            
            const bodyFormData = new FormData(event.target);
            console.log(event.target);
            const response = await axios.post('http://localhost/Accounting_modified/public/api/AddInvoice',bodyFormData);
            console.log(response.data);
            alert('successfully added new invoice');
            window.location.reload();
        }else{
           alert('Please add some items.');
        }
        
    }
    componentDidMount(){
        this.getInvoiceModalInfo();
    }
    render(){
        const customer_list=this.state.customers.map((dat,index)=>{
            return [
                <option key={index} value={dat.customer_id}>{dat.display_name!=""? (dat.display_name!=null? dat.display_name :  dat.f_name+" "+dat.l_name ) : dat.f_name+" "+dat.l_name }</option>
            ]
            
        });
        const COA_list=this.state.COA.map((dat,index)=>{
            return [
                <option key={index} value={dat.id}>{dat.coa_name}</option>
            ]
            
        });
        const COA_code_list=this.state.COA.map((dat,index)=>{
            return [
                <option key={index} value={dat.id}>{dat.coa_code}</option>
            ]
            
        });
        const cost_center_list=this.state.cost_center_list.map((dat,index)=>{
            return [
                <option key={index} value={dat.cc_no}>{dat.cc_name_code+" - "+dat.cc_name}</option>
            ]
            
        });
        const products_and_services_list=this.state.products_and_services.map((dat,index)=>{
            return [
                <option key={index} value={dat.product_id}>{dat.product_name}</option>
            ]
            
        });
        
        // const data=this.state.data.map((dat) =>{
        //     return <div key={dat.id}>{dat.id+" "+dat.name+" "+dat.position}</div>
        // });
        return (
            <div>
                <div className="modal fade p-0" id="invoicemodal" tabindex="-1" role="dialog" aria-hidden="true" >
                <button type="button" style={{display : 'none'}} id="setselectpickerbuttoninvoice"></button>
                <button type="button" style={{display : 'none'}} id="rerenderbuttoninvoice"></button>
                <button type="button" style={{display : 'none'}} id="setselectpickerinvoicedebitcode"></button>
                            <button type="button" style={{display : 'none'}} id="setselectpickerinvoicedebitcodecode"></button>
                            <button type="button" style={{display : 'none'}} id="setselectpickerinvoicecredtitcode"></button>
                            <button type="button" style={{display : 'none'}} id="setselectpickerinvoicecredtitcodecode"></button>
                    <form onSubmit={this.AddInvoice} className="form-horizontal " id="add_invoice_form" >
                            
                        <input id="transaction_type" name="transaction_type" value="Invoice" hidden />
                        <input id="product_count" name="product_count" value={this.state.invoice_item_count} hidden />
                        <input type="number" step="0.01" id="total_balance" name="total_balance"  hidden />
                        <input type="number" id="sales_transaction_number_estimate" name="sales_transaction_number_estimate" value="0" hidden />
                        <input type="number" id="sales_transaction_number_delayed_charge" name="sales_transaction_number_delayed_charge" value="0" hidden />
                        <input type="number" id="sales_transaction_number_delayed_credit" name="sales_transaction_number_delayed_credit" value="0" hidden />
                        <div className="modal-dialog modal-full" role="document" style={{minWidth : '100%', margin : '0'}}>
                            <div className="modal-content" style={{minHeight : '100vh'}}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Invoice</h5>
                                    <button type="button" className="close" id="invoicemodalclose" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body p-4" id="result">
                                    <div className="col-md-12 p-0 mb-4">
                                        <div className="col-md-12 p-0 mb-4">
                                            <div className="col-md-2 p-0 pr-3">
                                                <p>Location</p>
                                                {this.state.invoice_table_row}
                                                <select className="w-100 form-control" id="invoice_location_top" name="invoice_location_top" onChange={()=>this.setInvoice_no_new()}>
                                                    <option value="Main">Main</option>
                                                    <option value="Branch">Branch</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2 p-0 pr-3">
                                                <p>Type</p>
                                                <select className="w-100 form-control" id="invoice_type_top" name="invoice_type_top" onChange={()=>this.setInvoice_no_new()}>
                                                    <option >Sales Invoice</option>
                                                    <option >Bill Invoice</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12 p-0 mb-4">
                                            <div className="col-md-2 p-0 pr-3">
                                                <p>Invoice No</p>
                                                <input id="invoice_invoiceno" type="text"  value={this.state.invoice_no_state} onChange={(event)=>this.set_invoice_no(event)} name="invoice_invoiceno" className="w-100 form-control"  required />
                                            </div>
                                            <div className="col-md-2 p-0 pr-3">
                                                <p>Invoice Date</p>
                                                <input id="invoicedate" type="date" name="date" className="w-100 form-control" required onChange={(event)=>this.changeduedatemin(event.target)} />
                                                
                                            </div>
                                            <div className="col-md-2 p-0 pr-3">
                                                <p>Due Date</p>
                                                <input id="invoiceduedate" onchange="settermsinvoice(this)" type="date" name="due_date" onChange={(event)=>this.settermsinvoice(event.target)} className="w-100 form-control" />
                                            </div>
                                            
                                        </div>
                                        <div className="col-md-12 p-0 mb-4" style={{display : 'none'}}>
                                            <div className="col-md-4 p-0 pr-3" >
                                                
                                                <p>Cost Center</p>
                                                <input type="text" list="cost_center_list_invoice" name="CostCenterInvoice" className="w-100 form-control" onchange="EnableInvoiceInput(this)" id="CostCenterInvoice"   value="OFF" style={{display : 'none'}} />
                                                    <datalist id="cost_center_list_invoice">
                                                    <option value="">--Select Cost Center--</option>
                                                    
                                                    </datalist>
                                                
                                            </div>
                                        </div>
                                        <div className="my-3 p-0 mb-4">
                                            <div className="col-md-4 p-0 pr-3  mb-4">
                                                <p>Customer</p>
                                                <select id="invoicecustomer" onChange={(event)=>this.fetch_customer_info('bill_address','term','email',event.target.value,'big_invoicebalance','invoicebalance')} name="customer" className="form-control selectpicker" data-live-search="true" required>
                                                <option value="">--Select Name--</option>
                                                {customer_list}
                                                </select>
                                            </div>
                                            
                                            
                                            
                                        </div>
                                        
                                        <div className="col-md-12 p-0 mb-4">
                                            <div className="col-md-4 p-0 pr-3">
                                                <p>Billing Address</p>
                                                <input type="text" name="bill_address" id="bill_address" className="w-100 form-control"/>
                                            </div>
                                            <div className="col-md-2 p-0 pr-3">
                                                <p>Terms</p>
                                                <input className="w-100 form-control" list="terms_list" name="term" id="term" onChange={this.apply_term} />
                                                <datalist id="terms_list">
                                                    <option>Due on receipt</option>
                                                    <option>Net 15</option>
                                                    <option>Net 30</option>
                                                    <option>Net 60</option>
                                                </datalist>
                                            </div>
                                        </div>
                                        <div className="col-md-12 p-0 mb-4">
                                            <div className="col-md-2 p-0 pr-3">
                                                <p>Job Order</p>
                                                <input type="text" name="job_order_invoice" id="job_order_invoice" className="w-100 form-control" />
                                            </div>
                                            <div className="col-md-2 p-0 pr-3">
                                                <p style={{display : 'none'}}>Work No</p>
                                                <input type="text" name="work_no_invoice" id="work_no_invoice" className="w-100 form-control" style={{display : 'none'}} />
                                            </div>
                                            
                                            
                                        </div>
                                        <div className="col-md-12 p-0 ">
                                        <div className="col-md-3 p-0 pr-3">
                                                    <p>Email</p>
                                                <input type="text" id="email" name="email" placeholder="Email (Separate emails with a comma)" className="w-100 mb-2 form-control" />
                                                
                                        </div>
                                        <div className="col-md-3 p-0 pr-3 pt-4" >
                                                
                                                <div className="float-left" style={{display :'none'}}>
                                                    <input type="checkbox" name="send_later" value="yes" /> Send Now
                                                </div>
                                                <div className="float-left"style={{paddingLeft : '40px',display :'none'}}>
                                                    <input type="checkbox" name="generate_file_invoice_journal" /> Generate PDF
                                                </div>
                                                
                                        </div>
                                        
                                        </div>
                                        <div className="col-md-12 p-0"  style={{marginBottom : '20px'}}>
                                            <table className="table-borderless table-sm" style={{marginRight : '5%', float : 'right'}}> 
                                                <tr>
                                                    
                                                    <td style={{verticalAlign :'middle', textAlign : 'right'}}>
                                                        <div className="col-md-12 p-0 d-inline-flex justify-content-end" style={{textAlign : 'right', marginRight : '5%'}}>
                                                            <h4 className="mr-2">BALANCE DUE: </h4>
                                                            <h4 id="big_invoicebalance">PHP 0.00</h4>
                                                        </div>
                                                    </td>
                                                </tr>
                                                
                                            </table>
                                        </div>
                                        <button type="button" style={{display: 'none'}} id="destroyinvoicetabledatatable"></button>
                                        <table id="main_invoice_table" className="table table-bordered table-responsive-md text-left font14 table-sm">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="text-center" width="5%">#</th>
                                                    <th className="text-center" width="10%">PARTICULAR</th>
                                                    <th className="text-center" width="10%">ITEM</th>
                                                    <th className="text-center">DESCRIPTION</th>
                                                    <th className="text-center" width="5%">QTY</th>
                                                    <th className="text-center"  width="10%">RATE</th>
                                                    <th className="text-center"  width="10%">AMOUNT</th>
                                                    <th className="text-center" width="5%"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="invoice_table">
                                                {this.state.invoice_table_row.map((item, idx) => {
                                                    if(item!=""){
                                                        
                                                        var a ="";
                                                        var b ="";
                                                        var c ="";
                                                        var d ="";
                                                        var e ="";
                                                        var f ="";
                                                        var g ="";
                                                        var h ="";
                                                        var table = document.getElementById("main_invoice_table");
                                                        a =table.rows[0].cells[0].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : g;
                                                        h =table.rows[0].cells[7].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : h;

                                                        a =table.rows[0].cells[0].innerHTML=="PARTICULAR"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px'}} onChange={(event)=>this.ChangeParticularInvoice(event.target)} id={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} name={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100  invoice_particular"><option>Cost Center</option><option>Product/Service</option></select></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="PARTICULAR"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px'}} onChange={(event)=>this.ChangeParticularInvoice(event.target)} id={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} name={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100  invoice_particular"><option>Cost Center</option><option>Product/Service</option></select></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="PARTICULAR"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px'}} onChange={(event)=>this.ChangeParticularInvoice(event.target)} id={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} name={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100  invoice_particular"><option>Cost Center</option><option>Product/Service</option></select></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="PARTICULAR"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px'}} onChange={(event)=>this.ChangeParticularInvoice(event.target)} id={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} name={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100  invoice_particular"><option>Cost Center</option><option>Product/Service</option></select></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="PARTICULAR"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px'}} onChange={(event)=>this.ChangeParticularInvoice(event.target)} id={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} name={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100  invoice_particular"><option>Cost Center</option><option>Product/Service</option></select></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="PARTICULAR"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px'}} onChange={(event)=>this.ChangeParticularInvoice(event.target)} id={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} name={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100  invoice_particular"><option>Cost Center</option><option>Product/Service</option></select></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="PARTICULAR"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px'}} onChange={(event)=>this.ChangeParticularInvoice(event.target)} id={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} name={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100  invoice_particular"><option>Cost Center</option><option>Product/Service</option></select></td> : g;
                                                        h =table.rows[0].cells[7].innerHTML=="PARTICULAR"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px'}} onChange={(event)=>this.ChangeParticularInvoice(event.target)} id={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} name={`ParticularInvoice${parseFloat(idx)+parseFloat(1)}`} data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100  invoice_particular"><option>Cost Center</option><option>Product/Service</option></select></td> : h;

                                                        a =table.rows[0].cells[0].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : g;
                                                        h =table.rows[0].cells[7].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : h;

                                                        a =table.rows[0].cells[0].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" id={`select_product_description${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description${parseFloat(idx)+parseFloat(1)}`} style={{border : '0' }}></textarea></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" id={`select_product_description${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description${parseFloat(idx)+parseFloat(1)}`} style={{border : '0' }}></textarea></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" id={`select_product_description${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description${parseFloat(idx)+parseFloat(1)}`} style={{border : '0' }}></textarea></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" id={`select_product_description${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description${parseFloat(idx)+parseFloat(1)}`} style={{border : '0' }}></textarea></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" id={`select_product_description${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description${parseFloat(idx)+parseFloat(1)}`} style={{border : '0' }}></textarea></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" id={`select_product_description${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description${parseFloat(idx)+parseFloat(1)}`} style={{border : '0' }}></textarea></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" id={`select_product_description${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description${parseFloat(idx)+parseFloat(1)}`} style={{border : '0' }}></textarea></td> : g;
                                                        h =table.rows[0].cells[7].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" id={`select_product_description${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description${parseFloat(idx)+parseFloat(1)}`} style={{border : '0' }}></textarea></td> : h;

                                                        a =table.rows[0].cells[0].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input required type="number" class="" onChange={()=>this.computeTotal(parseFloat(idx)+parseFloat(1))}  name={`product_qty${parseFloat(idx)+parseFloat(1)}`} id={`product_qty${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} min="1" defaultValue="1" /></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input required type="number" class="" onChange={()=>this.computeTotal(parseFloat(idx)+parseFloat(1))}  name={`product_qty${parseFloat(idx)+parseFloat(1)}`} id={`product_qty${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} min="1" defaultValue="1" /></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input required type="number" class="" onChange={()=>this.computeTotal(parseFloat(idx)+parseFloat(1))}  name={`product_qty${parseFloat(idx)+parseFloat(1)}`} id={`product_qty${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} min="1" defaultValue="1" /></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input required type="number" class="" onChange={()=>this.computeTotal(parseFloat(idx)+parseFloat(1))}  name={`product_qty${parseFloat(idx)+parseFloat(1)}`} id={`product_qty${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} min="1" defaultValue="1" /></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input required type="number" class="" onChange={()=>this.computeTotal(parseFloat(idx)+parseFloat(1))}  name={`product_qty${parseFloat(idx)+parseFloat(1)}`} id={`product_qty${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} min="1" defaultValue="1" /></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input required type="number" class="" onChange={()=>this.computeTotal(parseFloat(idx)+parseFloat(1))}  name={`product_qty${parseFloat(idx)+parseFloat(1)}`} id={`product_qty${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} min="1" defaultValue="1" /></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input required type="number" class="" onChange={()=>this.computeTotal(parseFloat(idx)+parseFloat(1))}  name={`product_qty${parseFloat(idx)+parseFloat(1)}`} id={`product_qty${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} min="1" defaultValue="1" /></td> : g;
                                                        h =table.rows[0].cells[7].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input required type="number" class="" onChange={()=>this.computeTotal(parseFloat(idx)+parseFloat(1))}  name={`product_qty${parseFloat(idx)+parseFloat(1)}`} id={`product_qty${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} min="1" defaultValue="1" /></td> : h;

                                                        a =table.rows[0].cells[0].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="" defaultValue="0" onChange={(event)=>this.maskamountinput(parseFloat(idx)+parseFloat(1),'unformated_select_sales_rate','select_product_rate')} id={`unformated_select_sales_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px'}} required /><input type="hidden" class="" id={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0'}} /></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="" defaultValue="0" onChange={(event)=>this.maskamountinput(parseFloat(idx)+parseFloat(1),'unformated_select_sales_rate','select_product_rate')} id={`unformated_select_sales_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px'}} required /><input type="hidden" class="" id={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0'}} /></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="" defaultValue="0" onChange={(event)=>this.maskamountinput(parseFloat(idx)+parseFloat(1),'unformated_select_sales_rate','select_product_rate')} id={`unformated_select_sales_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px'}} required /><input type="hidden" class="" id={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0'}} /></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="" defaultValue="0" onChange={(event)=>this.maskamountinput(parseFloat(idx)+parseFloat(1),'unformated_select_sales_rate','select_product_rate')} id={`unformated_select_sales_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px'}} required /><input type="hidden" class="" id={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0'}} /></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="" defaultValue="0" onChange={(event)=>this.maskamountinput(parseFloat(idx)+parseFloat(1),'unformated_select_sales_rate','select_product_rate')} id={`unformated_select_sales_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px'}} required /><input type="hidden" class="" id={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0'}} /></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="" defaultValue="0" onChange={(event)=>this.maskamountinput(parseFloat(idx)+parseFloat(1),'unformated_select_sales_rate','select_product_rate')} id={`unformated_select_sales_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px'}} required /><input type="hidden" class="" id={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0'}} /></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="" defaultValue="0" onChange={(event)=>this.maskamountinput(parseFloat(idx)+parseFloat(1),'unformated_select_sales_rate','select_product_rate')} id={`unformated_select_sales_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px'}} required /><input type="hidden" class="" id={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0'}} /></td> : g;
                                                        h =table.rows[0].cells[7].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="" defaultValue="0" onChange={(event)=>this.maskamountinput(parseFloat(idx)+parseFloat(1),'unformated_select_sales_rate','select_product_rate')} id={`unformated_select_sales_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px'}} required /><input type="hidden" class="" id={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0'}} /></td> : h;

                                                        a =table.rows[0].cells[0].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : g;
                                                        h =table.rows[0].cells[7].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : h;

                                                        a =table.rows[0].cells[0].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.invoice_table_row.length?<a href="#" onClick={()=>this.deleteItem(idx)}   id={`delete_product${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product"></span></a> : '' }</td> : a;
                                                        b =table.rows[0].cells[1].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.invoice_table_row.length?<a href="#" onClick={()=>this.deleteItem(idx)}   id={`delete_product${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product"></span></a> : '' }</td> : b;
                                                        c =table.rows[0].cells[2].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.invoice_table_row.length?<a href="#" onClick={()=>this.deleteItem(idx)}   id={`delete_product${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product"></span></a> : '' }</td> : c;
                                                        d =table.rows[0].cells[3].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.invoice_table_row.length?<a href="#" onClick={()=>this.deleteItem(idx)}   id={`delete_product${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product"></span></a> : '' }</td> : d;
                                                        e =table.rows[0].cells[4].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.invoice_table_row.length?<a href="#" onClick={()=>this.deleteItem(idx)}   id={`delete_product${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product"></span></a> : '' }</td> : e;
                                                        f =table.rows[0].cells[5].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.invoice_table_row.length?<a href="#" onClick={()=>this.deleteItem(idx)}   id={`delete_product${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product"></span></a> : '' }</td> : f;
                                                        g =table.rows[0].cells[6].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.invoice_table_row.length?<a href="#" onClick={()=>this.deleteItem(idx)}   id={`delete_product${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product"></span></a> : '' }</td> : g;
                                                        h =table.rows[0].cells[7].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.invoice_table_row.length?<a href="#" onClick={()=>this.deleteItem(idx)}   id={`delete_product${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product"></span></a> : '' }</td> : h;

                                                        return[
                                                            <tr key={idx} onMouseMove={()=>this.refreshselecpickerselectsinvoice()}>
                                                            {a}
                                                            {b}
                                                            {c}
                                                            {d}
                                                            {e}
                                                            {f}
                                                            {g}
                                                            {h}
                                                            </tr>
                                                        ]
                                                    }
                                                })}
                                            </tbody>
                                            
                                        </table>
                                        <div className="col-md-12 p-0 mt-4">
                                            <div className="float-left">
                                                <div className="d-inline-flex">
                                                    <button type="button" className="btn btn-outline-dark rounded mr-1 font14" onClick={this.add_invoice_table_row} id="add_lines_invoice">Add Items</button>
                                                    <button type="button" className="btn btn-outline-dark rounded mr-1 font14" onClick={this.deletealliteminvoice} id="clear_lines_invoice">Clear All Items</button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                        <div className="col-md-12 p-0">
                                            <table className="table-borderless table-sm" style={{marginRight : '5%', float : 'right'}}> 
                                                <tr>
                                                    
                                                    <td style={{verticalAlign : 'middle', textAlign : 'right', fontSize : '1em'}}><p style={{fontSize :'1.3em !important'}} className="mb-0 pr-4 text-dark font-weight-bold">TOTAL</p></td>
                                                    <td style={{verticalAlign : 'middle', textAlign : 'right', fontSize : '1em'}}><p style={{fontSize :'1.3em !important'}} id="invoicetotal" className="mb-0 text-dark font-weight-bold">PHP 0.00</p></td>
                                                    
                                                </tr>
                                                <tr>
                                                    
                                                    <td style={{verticalAlign : 'middle', textAlign : 'right', fontSize : '1em'}}><p style={{fontSize :'1.3em !important'}}className="pr-4 text-dark font-weight-bold">BALANCE DUE</p></td>
                                                    <td style={{verticalAlign : 'middle', textAlign : 'right', fontSize : '1em'}}><p style={{fontSize :'1.3em !important'}} id="invoicebalance" className="text-dark font-weight-bold">PHP 0.00</p></td>
                                                    
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="col-md-12 p-0">
                                            <div className="col-md-6 pl-0">
                                                <p>Message Displayed on Invoice</p>
                                                <textarea rows="3" className="w-100 form-control" name="note" id="note" ></textarea>
                                            </div>
                                            <div className="col-md-6 pr-0">
                                                <p>Message Displayed on Statement</p>
                                                <textarea rows="3" className="w-100 form-control" name="memo" id="memo" ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12 p-0 mt-4">
                                            <table className="table table-light table-sm bordered-top-table" style={{marginBottom : '0px'}}>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th colspan="3" style={{verticalAlign : 'middle', textAlign : 'center'}}>Accounts</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <table className="table table-light table-sm" id="main_invoice_table_journal_account">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th style={{verticalAlign : 'middle', textAlign : 'center',borderRight : '1px solid #ccc'}} width="5%">#</th>
                                                        <th style={{verticalAlign : 'middle', textAlign : 'center',borderRight : '1px solid #ccc'}} width="12%">Code</th>
                                                        <th style={{verticalAlign : 'middle', textAlign : 'center',borderRight : '1px solid #ccc', width : '40%'}}>Debit</th>
                                                        <th style={{verticalAlign : 'middle', textAlign : 'center',borderRight : '1px solid #ccc'}} width="12%">Code</th>
                                                        <th style={{verticalAlign : 'middle', textAlign : 'center'}} width="40%">Credit</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="InvoiceAccountTBody">
                                                {this.state.invoice_table_journal_row.map((item, idx) => {
                                                    document.getElementById('destroyinvoicetabledatatable').click();
                                                    rerenderselectpickerinvoice=1;
                                                    return [
                                                    <tr key={idx} onMouseMove={()=>this.refreshselecpickerselectsinvoice()}>
                                                        <td style={{textAlign : 'center'}} id="number_tag_invoice_acc">{parseFloat(idx)+parseFloat(1)}</td>
                                                        <td >
                                                            <select onChange={()=>this.setAccount_and_Code(parseFloat(idx)+parseFloat(1))} id={`invoice_account_debit_account_code${parseFloat(idx)+parseFloat(1)}`} name={`invoice_account_debit_account_code${parseFloat(idx)+parseFloat(1)}`}  class="w-100 selectpicker " data-live-search="true" required>
                                                                <option value="">--Select--</option>
                                                                {COA_code_list}
                                                            </select>
                                                        </td>
                                                        <td >
                                                            <select onChange={()=>this.setAccount_and_Code_code(parseFloat(idx)+parseFloat(1))} id={`invoice_account_debit_account${parseFloat(idx)+parseFloat(1)}`} name={`invoice_account_debit_account${parseFloat(idx)+parseFloat(1)}`}  class="w-100 selectpicker " data-live-search="true" required>
                                                                <option value="">--Select--</option>
                                                                {COA_list}
                                                            </select>
                                                        </td>
                                                        <td >
                                                            <select onChange={()=>this.setAccount_and_Code2(parseFloat(idx)+parseFloat(1))} id={`invoice_account_credit_account_code${parseFloat(idx)+parseFloat(1)}`} name={`invoice_account_credit_account_code${parseFloat(idx)+parseFloat(1)}`}  class="w-100 selectpicker " data-live-search="true" required>
                                                                <option value="">--Select--</option>
                                                                {COA_code_list}
                                                            </select>
                                                        </td>
                                                        <td >
                                                            <select onChange={()=>this.setAccount_and_Code_code2(parseFloat(idx)+parseFloat(1))} id={`invoice_account_credit_account${parseFloat(idx)+parseFloat(1)}`} name={`invoice_account_credit_account${parseFloat(idx)+parseFloat(1)}`}  class="w-100 selectpicker " data-live-search="true" required>
                                                                <option value="">--Select--</option>
                                                                {COA_list}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    ]
                                                    

                                                
                                                })}   
                                                </tbody>
                                            </table>
                                            
                                        </div>  
                                        
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary rounded" data-dismiss="modal">Cancel</button>
                                    <button type="Submit" className="btn btn-success rounded" id="invoice_add_button">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                <div className="modal fade" id="import_invoice_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-sm" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Import Invoices</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{textAlign : 'center'}}>
                        <style>
                       
                        </style>
                        <input id="excel-uploadinvoice" type="file" onChange={()=>this.UploadMassInvoice()}  accept=".xlsx" />
                        <label for="excel-uploadinvoice" style={{opacity : '1',cursor : 'pointer', borderRadius : '10px'}} id="FIleImportExcelLabel" className="custom-excel-upload btn btn-primary">
                        <span className="glyphicon glyphicon-user"> IMPORT FROM EXCEL</span>
                        </label>
                        
                    </div>
                    <div className="modal-footer">
                        <a className="btn btn-success" href="http://localhost/Accounting_modified/public/api/GetInvoiceExcelTemplate">Download Excel Template</a>
                        
                    </div>
                    </div>
                </div>
                </div>
                <div className="modal fade" id="supplierModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="static">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticModalLabel">Add New Supplier</h5>
                                <button type="button" className="close" id="add_supplier_modal_close_button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <form  autocomplete="off" id="add_supplier_form" onSubmit={this.saveSupplier} >
                            <input type="hidden" id="hidden_add_customer_status" name="hidden_add_customer_status" value="" />
                            <div className="modal-body">
                                <div className="col-md-6">
                                    <div className="col-md-6 p-0">
                                        <p>First Name</p>
                                        <input type="text" name="fname" className="w-100" />
                                    </div>
                                    <div className="col-md-6 p-0 pl-1">
                                        <p>Last Name</p>
                                    <input type="text" name="lname" className="w-100" />
                                    </div>

                                    <div className="col-md-12 p-0">
                                        <p>Company</p>
                                        <input type="text" name="company" className="w-100" />
                                    </div>
                                    <div className="col-md-12 p-0">
                                            <p>Business Style</p>
                                            <input type="text" name="business_style" className="w-100" />
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <p>Display name as</p>
                                        <input id="suppliername" required type="text" name="displayname" className="w-100" />
                                    </div>
                                    
                                    <div className="col-md-12 p-0">
                                        <p>Address</p>
                                        <textarea rows="2" className="w-100" name="street" placeholder="Street"></textarea>
                                    </div>

                                    <div className="col-md-6 p-0 pb-1">
                                        <input type="text" name="city" placeholder="City/Town" className="w-100" />
                                    </div>
                                    <div className="col-md-6 p-0 pl-1 pb-1">
                                        <input type="text" name="state" placeholder="State/Province" className="w-100" />
                                    </div>
                                    <div className="col-md-6 p-0">
                                        <input type="text" name="postalcode" placeholder="Postal Code" className="w-100" />
                                    </div>
                                    <div className="col-md-6 p-0 pl-1" >
                                        <input type="text" name="country" placeholder="Country" className="w-100" />
                                    </div>

                                    <div className="col-md-12 p-0">
                                        <p>Notes</p>
                                        <textarea rows="2" name="notes" className="w-100"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="col-md-12 p-0">
                                        <p>Email</p>
                                        <input type="email" name="email" className="w-100" placeholder="separate multiple emails with commas" />
                                    </div>

                                    <div className="col-md-12 p-0">
                                        <div className="col-md-4 p-0 pr-1">
                                            <p>Phone</p>
                                            <input id="supplierphone" type="text" name="phone" className="w-100" />
                                        </div>
                                        <div className="col-md-4 p-0 pr-1">
                                            <p>Mobile</p>
                                            <input type="text" name="mobile" className="w-100" />
                                        </div>
                                        <div className="col-md-4 p-0">
                                            <p>Fax</p>
                                            <input type="text" name="fax" className="w-100" />
                                        </div>
                                    </div>

                                    <div className="col-md-12 p-0">
                                        <div className="col-md-4 p-0 pr-1">
                                            <p>Other</p>
                                            <input type="text" name="other" className="w-100" />
                                        </div>
                                        <div className="col-md-8 p-0">
                                            <p>Website</p>
                                            <input type="text" name="website" className="w-100" />
                                        </div>
                                    </div>

                                    <div className="col-md-12 p-0">
                                        <div className="col-md-6 p-0 pr-1">
                                            <p>Billing rate (/hr)</p>
                                            <input type="number" name="billingrate" className="w-100" />
                                        </div>

                                        <div className="col-md-6 p-0">
                                            <p>Terms</p>
                                            <input type="text" name="terms" className="w-100" />
                                        </div>
                                    </div>

                                    <div className="col-md-12 p-0">
                                        <div className="col-md-6 p-0 pr-1">
                                            <p>Opening balance</p>
                                            <input type="number" name="balance" className="w-100" value='0' />
                                        </div>

                                        <div className="col-md-6 p-0">
                                            <p>as of</p>
                                            <input type="date" name="asof" className="w-100" />
                                        </div>
                                    </div>

                                    <div className="col-md-12 p-0">
                                        <div className="col-md-6 p-0 pr-1">
                                            <p>Account No. </p>
                                            <input type="text" name="accountno" className="w-100" />
                                        </div>

                                        <div className="col-md-6 p-0">
                                            <p>Business ID No. </p>
                                            <input type="text" name="businessno" className="w-100" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 p-0">
                                            <div className="col-md-12 p-0 pr-1">
                                                <p>TIN No. </p>
                                                <input type="text" name="tin_no" className="w-100" required />
                                            </div>
                                        </div>
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-6 p-0 pr-1">
                                        <p>Tax</p>
                                        <select name="tax_type" className="w-100" required onChange={(event)=>this.hidevatvalue(event.target.value)}  >
                                        <option>VAT</option>
                                        <option>NON-VAT</option>
                                        </select>
                                        
                                        </div>
                                        <div className="col-md-6 p-0 pr-1" id="vatvaluediv">
                                        <p>VAT value</p>
                                        <input type="text" name="vat_value" value="12" min="0" max="100" step="0.01" style={{width : '80%'}} required /> %
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="reset" className="btn btn-secondary rounded" id="add_supplier_modal_reset_button" onClick={()=>document.getElementById('add_supplier_modal_close_button').click()}>Cancel</button>
                                <button id="supplieradd" type="submit" className="btn btn-success rounded">Save</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="addcustomermodal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="static">
                    <form action="#" className="form-horizontal " id="add_customer_form" onSubmit={this.submitCustomer}  autocomplete="off">
                    
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticModalLabel">Add New Customer</h5>
                                <button type="button" className="close" data-dismiss="modal" id="add_customer_modal_close_button" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="col-md-6 pr-0">
                                    <div className="col-md-6 p-0 pr-0">
                                        <p>First Name</p>
                                        <input type="text" name="f_name" className="w-100" />
                                    </div>
                                    <div className="col-md-6 p-0 pl-1">
                                        <p>Last Name</p>
                                        <input type="text" name="l_name" className="w-100" />
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <p>Company</p>
                                        <input type="text" name="company" className="w-100" required />
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <p>Business Style</p>
                                        <input type="text" name="business_style" className="w-100" />
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <p>Display name as</p>
                                        <input id="customername" required type="text" name="display_name" className="w-100" />
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <p>Address</p>
                                        <textarea rows="2" className="w-100" name="street" placeholder="Street" ></textarea>
                                    </div>
                                    <div className="col-md-6 p-0 pr-1 pb-1">
                                        <input type="text" name="city" placeholder="City/Town" className="w-100" />
                                    </div>
                                    <div className="col-md-6 p-0 pl-0 pb-1">
                                        <input type="text" name="state" placeholder="State/Province" className="w-100" />
                                    </div>
                                    <div className="col-md-6 p-0 pr-1">
                                        <input type="text" name="postal_code" placeholder="Postal Code" className="w-100" />
                                    </div>
                                    <div className="col-md-6 p-0 pl-0" >
                                        <input type="text" name="country" placeholder="Country" className="w-100" />
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <p>Notes</p>
                                        <textarea rows="2" name="notes" className="w-100"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-12 p-0">
                                        <p>Email</p>
                                        <input type="email" name="email" className="w-100" placeholder="separate multiple emails with commas" />
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-4 p-0 pr-1">
                                            <p>Phone</p>
                                            <input id="customerphone" type="tel" name="phone" className="w-100" />
                                        </div>
                                        <div className="col-md-4 p-0 pr-1">
                                            <p>Mobile</p>
                                            <input type="tel" name="mobile" className="w-100" />
                                        </div>
                                        <div className="col-md-4 p-0">
                                            <p>Fax</p>
                                            <input type="tel" name="fax" className="w-100" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-4 p-0 pr-1">
                                            <p>Other</p>
                                            <input type="text" name="other" className="w-100" />
                                        </div>
                                        <div className="col-md-8 p-0">
                                            <p>Website</p>
                                            <input type="text" name="website" className="w-100" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-6 p-0 pr-1">
                                            <p>Payment Method</p>
                                            <input type="text" list="payment_method_list" name="payment_method" className="w-100" />
                                        </div>
                                        <div className="col-md-6 p-0">
                                            <p>Terms</p>
                                            <input type="text" list="terms_list" name="terms" id="terms" className="w-100" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-6 p-0 pr-1">
                                            <p>Opening balance</p>
                                            <input id="customerbalance" type="number" name="opening_balance" className="w-100" defaultValue="0" />
                                        </div>
                                        <div className="col-md-6 p-0">
                                            <p>as of</p>
                                            <input type="date" name="as_of_date" className="w-100" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-6 p-0 pr-1">
                                            <p>Account No. </p>
                                            <input type="tel" name="account_no" className="w-100" />
                                        </div>
                                        <div className="col-md-6 p-0">
                                            <p>Business ID No. </p>
                                            <input type="tel" name="business_id_no" className="w-100" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-6 p-0 pr-1">
                                            <p>TIN No. </p>
                                            <input type="text" name="tin_no" className="w-100" />
                                        </div>
                                        <div className="col-md-6 p-0 pr-1">
                                            <p>Withholding Tax</p>
                                            <input type="number" name="withholdingtax" min="0" max="100" step="0.01" defaultValue="2" style={{width : '80%'}} required /> %
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn btn-secondary rounded" id="add_customer_modal_reset_button" onClick={()=>document.getElementById('add_customer_modal_close_button').click()}>Cancel</button>
                                <button id="customeradd" type="submit" className="btn btn-success rounded">Save</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                <datalist id="terms_list">
                    <option>Due on receipt</option>
                    <option>Net 15</option>
                    <option>Net 30</option>
                    <option>Net 60</option>
                </datalist>
                <datalist id="payment_method_list">
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>Cash & Cheque</option>
                </datalist>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Modal;

