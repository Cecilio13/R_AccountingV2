import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import '../../css/index.css';
import { number_format,addCommas } from '../../Helper';
var invoice_row=1;
var estimate_row=1;
var credit_note_row=1;
var sales_receipt_row=1;
var sales_receipt_cash_row=1;
var rerenderselectpickerinvoice=0;
var rerenderselectpickersaelsreceipt=0;
var rerenderselectpickerestimate=0;
var rerenderselectpickercreditnote=0;
var AdditionalCashAccountCount=0;
var cashaccount_select=0;
var refresh_pay_bills_modal=0;
var bill_row=1;
var rerenderselectpickerbill=0;
class Modal extends React.Component{
    state ={
        invoice_table_row : [],
        estimate_table_row : [],
        invoice_table_journal_row : [],
        sales_receipt_account_table_row : [],
        data: [],
        expense_setting : [],
        ETran : [],
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
        estimate_item_count : 0,
        estimate_no_state :0,
        credit_note_no_state : 0,
        credit_note_item_count : 0,
        credit_note_table_row : [],
        sales_receipt_count : 0,
        sales_receipt_no_state : 0,
        bill_no_state : 0,
        sales_receipt_table_row :[],
        sales_receipt_item_count : 0,
        sales_receipt_cash_account_count : 0,
        supplier_credit_no_state : '',
        bill_transaction_count : [],
        bill_transaction_count_new : [],
        bill_table_row : [],
        bill_item_count : 0,
    }
    
    rerenderselectpickerbill =() =>{
        if(rerenderselectpickerbill==1){
            document.getElementById('rerenderselectpickerbill').click();
            document.getElementById('bill_modal_refreshbtn').click();
            rerenderselectpickerbill=0;
        }
        
    }
    refreshselecpickerselectsinvoice =() =>{
        if(rerenderselectpickerinvoice==1){
            document.getElementById('setselectpickerbuttoninvoice').click();
            document.getElementById('rerenderbuttoninvoice').click();
            rerenderselectpickerinvoice=0;
        }
        
    }
    refreshselecpickerselectssales_receipt = () =>{
        if(rerenderselectpickersaelsreceipt==1){
            document.getElementById('rerenderbuttonsalesreceipt').click();
            rerenderselectpickersaelsreceipt=0;
        }
    }
    refreshselecpickerselectsestimate =() =>{
        if(rerenderselectpickerestimate==1){
            document.getElementById('setselectpickerbuttonestimate').click();
            document.getElementById('rerenderbuttonestimate').click();
            rerenderselectpickerestimate=0;
        }
        
    }
    refreshselecpickerselectscreditnote =() =>{
        if(rerenderselectpickercreditnote==1){
            document.getElementById('setselectpickerbuttoncreditnote').click();
            document.getElementById('rerenderbuttoncreditnote').click();
            rerenderselectpickercreditnote=0;
        }
        
    }
    GenerateAdditionalCashAccountsSalesReceipt = (event) =>{
        event.preventDefault();
        const item = AdditionalCashAccountCount;
        this.setState({sales_receipt_account_table_row: [...this.state.sales_receipt_account_table_row, item],sales_receipt_cash_account_count :this.state.sales_receipt_cash_account_count+1
        });
        AdditionalCashAccountCount++;
        document.getElementById('additional_count_cash_account').value=AdditionalCashAccountCount;
    }
    add_invoice_table_row =(event) =>{
        event.preventDefault();
        const item = invoice_row;
        this.setState({invoice_table_row: [...this.state.invoice_table_row, item],invoice_table_journal_row : [...this.state.invoice_table_journal_row, item],invoice_item_count :this.state.invoice_item_count+1
        });                     
        invoice_row++;
    }
    add_sales_receipt_table_row = (event) =>{
        event.preventDefault();
        console.log('sales receipt table row add');
        const item = sales_receipt_row;
        this.setState({sales_receipt_table_row: [...this.state.sales_receipt_table_row, item],sales_receipt_item_count :this.state.sales_receipt_item_count+1
        });                     
        sales_receipt_row++;
    }
    add_lines_bill_account = (event) =>{
        document.getElementById('destroybilltabledatatable').click();
        event.preventDefault();
        const item = bill_row;
        document.getElementById('account_count_bills').value=this.state.bill_item_count+1;
        this.setState({bill_table_row: [...this.state.bill_table_row, item],bill_item_count :this.state.bill_item_count+1
        });          
        bill_row++;
    }
    add_item_estimate = (event) =>{
        event.preventDefault();
        const item = estimate_row;
        this.setState({
            estimate_table_row: [...this.state.estimate_table_row, item],
            estimate_item_count :this.state.estimate_item_count+1
        });                     
        estimate_row++;
    }
    add_item_credit_note = (event)=>{
        event.preventDefault();
        const item = credit_note_row;
        this.setState({
            credit_note_table_row: [...this.state.credit_note_table_row, item],
            credit_note_item_count :this.state.credit_note_item_count+1
        });
        credit_note_row++;
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
    UploadMassBill = async ()=>{
        
        var bodyFormData = new FormData();
        var imagefile = document.querySelector('#excel-uploadbill');
        bodyFormData.append("theFile", imagefile.files[0]);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/UploadMassBill',bodyFormData);

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
            estimate_count : response.data.estimate_count,
            credit_note_count : response.data.credit_note_count,
            sales_receipt_count : response.data.sales_receipt_count,
            ETran : response.data.ETran,
            expense_setting : response.data.expense_setting,
            bill_transaction_count_new : response.data.bill_transaction_count_new,
            bill_transaction_count : response.data.bill_transaction_count,
            
        })
        this.setState({
            invoice_no_state : parseFloat(this.state.invoice_count)+parseFloat(this.state.numbering.sales_exp_start_no),
            estimate_no_state : parseFloat(this.state.estimate_count)+parseFloat(this.state.numbering.estimate_start_no),
            credit_note_no_state : parseFloat(this.state.credit_note_count)+parseFloat(this.state.numbering.credit_note_start_no),
            sales_receipt_no_state : parseFloat(this.state.sales_receipt_count)+parseFloat(this.state.numbering.sales_receipt_start_no),
            bill_no_state : parseFloat(this.state.bill_transaction_count)+parseFloat(this.state.bill_transaction_count_new)+parseFloat(this.state.numbering.bill_start_no),
        })
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
    setestimate_no_new = async () =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/check_estimate_no',{
            params:{
                invoice_no_field: this.state.estimate_no_state,
            },
            crossDomain: true
        });
        if(response.data>0){
            document.getElementById('estimate_no').style.border="1px solid red";
            document.getElementById('estimateadd').disabled=true;
        }else{
            document.getElementById('estimate_no').style.border="1px solid green";
            document.getElementById('estimateadd').disabled=false;
        }
    }
    setcredit_note_no_new = async ()=>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/check_credit_note_no',{
            params:{
                invoice_no_field: this.state.credit_note_no_state,
            },
            crossDomain: true
        });
        if(response.data>0){
            document.getElementById('credit_note_no').style.border="1px solid red";
            document.getElementById('creditnadd').disabled=true;
        }else{
            document.getElementById('credit_note_no').style.border="1px solid green";
            document.getElementById('creditnadd').disabled=false;
        }
    }
    set_sales_receipt_no_new = async () =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/check_sales_receipt_no',{
            params:{
                invoice_no_field: this.state.sales_receipt_no_state,
            },
            crossDomain: true
        });
        if(response.data>0){
            document.getElementById('sales_receipt_no').style.border="1px solid red";
            document.getElementById('salesradd').disabled=true;
        }else{
            document.getElementById('sales_receipt_no').style.border="1px solid green";
            document.getElementById('salesradd').disabled=false;
        }
    }
    setSupplierCredit_no_new = async () =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/check_supplier_credit_no',{
            params:{
                invoice_no_field: this.state.supplier_credit_no_state,
            },
            crossDomain: true
        });
        if(response.data>0){
            document.getElementById('suppliers_credit_no').style.border="1px solid red";
            document.getElementById('supplier_credit_button').disabled=true;
        }else{
            document.getElementById('suppliers_credit_no').style.border="1px solid green";
            document.getElementById('supplier_credit_button').disabled=false;
        }
    }
    set_bill_no_state_no_new = async (event) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/check_bill_no',{
            params:{
                invoice_no_field: this.state.bill_no_state,
            },
            crossDomain: true
        });
        if(response.data>0){
            document.getElementById('bill_bill_no2').style.border="1px solid red";
            document.getElementById('billadd').disabled=true;
        }else{
            document.getElementById('bill_bill_no2').style.border="1px solid green";
            document.getElementById('billadd').disabled=false;
        }
    }
    set_estimate_no = (event) =>{
        this.setState({estimate_no_state : event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}, function() { this.setestimate_no_new()}.bind(this));
        
    }
    set_credit_note_no = (event) =>{
        this.setState({credit_note_no_state : event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}, function() { this.setcredit_note_no_new()}.bind(this));
    }
    set_invoice_no = (event) =>{
        this.setState({invoice_no_state : event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}, function() { this.setInvoice_no_new()}.bind(this));
        
    }
    set_supplier_credit_no = (event) =>{
        this.setState({supplier_credit_no_state : event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}, function() { this.setSupplierCredit_no_new()}.bind(this));
    }
    set_sales_receipt_no = (event) =>{
        this.setState({sales_receipt_no_state : event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}, function() { this.set_sales_receipt_no_new()}.bind(this));
    }
    set_bill_no = (event) => {
        this.setState({bill_no_state : event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}, function() { this.set_bill_no_state_no_new()}.bind(this));
    }
    fetch_customer_info = async (address,terms,email,value,big,small) =>{
        console.log('fetching customer info');
        const response = await axios.get('http://localhost/Accounting_modified/public/api/fetch_customer_info',{
            params:{
                value: value,
            },
            crossDomain: true
        });
        console.log(response.data);
        if(response.data.customers!=null){
            if(address!=""){
                document.getElementById(address).value=response.data.customers.street+" "+response.data.customers.city+" "+response.data.customers.state+" "+response.data.customers.postal_code+" "+response.data.customers.country;
                document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
                document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
                document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
                document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
                document.getElementById(address).value= document.getElementById(address).value.replace(' null','');
                document.getElementById(address).value= document.getElementById(address).value.replace('null','');
                document.getElementById(address).value= document.getElementById(address).value.replace('null','');
                if(address=="sr_bill_address"){
                    document.getElementById('tin_no_sr').value=response.data.customers.tin_no;
                    document.getElementById('business_style_sr').value=response.data.customers.business_style;
                    document.getElementById('sr_payment_method').value=response.data.customers.payment_method!=null && response.data.customers.payment_method!=''? response.data.customers.payment_method : 'Cash' ;
                }
            }
            if(big!=""){
                document.getElementById(big).innerHTML= "PHP "+number_format(response.data.customers.opening_balance,2);
            }
            if(small!=""){
                document.getElementById(small).innerHTML= "PHP "+number_format(response.data.customers.opening_balance,2);
            }
            if(terms!=""){
                document.getElementById(terms).value=response.data.customers.terms;
                if(terms=="term"){
                    this.apply_term();
                }
            }
            if(email!=""){
                document.getElementById(email).value=response.data.customers.email;
            }
        }
        
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
    changeduedatemin_bill = (e) =>{
        if(e.value!=""){
            document.getElementById('bill_due_date_bill').setAttribute("min", e.value);
        }
        this.apply_term_bill();
    }
    apply_term_bill= () =>{
        var term = document.getElementById('bill_terms').value;
        if(document.getElementById('bill_date_bill').value==""){
            var new_date=moment();
            var day = new_date.format('DD');
            var month = new_date.format('MM');
            var year = new_date.format('YYYY');
            document.getElementById('bill_date_bill').value=year + '-' + month + '-' + day;
        }
        if(term=="Due on receipt"){
            document.getElementById('bill_due_date_bill').value=document.getElementById('bill_date_bill').value;
        }else if(term=="Net 15"){
            var new_date=moment(document.getElementById('bill_date_bill').value, "YYYY-MM-DD").add(15, 'days');
            var day = new_date.format('DD');
            var month = new_date.format('MM');
            var year = new_date.format('YYYY');
            document.getElementById('bill_due_date_bill').value=year + '-' + month + '-' + day;
           
        }else if(term=="Net 30"){
            var new_date=moment(document.getElementById('bill_date_bill').value, "YYYY-MM-DD").add(30, 'days');
            var day = new_date.format('DD');
            var month = new_date.format('MM');
            var year = new_date.format('YYYY');
            console.log(year + '-' + month + '-' + day);
            document.getElementById('bill_due_date_bill').value=year + '-' + month + '-' + day;
            
        }else if(term=="Net 60"){
            var new_date=moment(document.getElementById('bill_date_bill').value, "YYYY-MM-DD").add(60, 'days');
            var day = new_date.format('DD');
            var month = new_date.format('MM');
            var year = new_date.format('YYYY');
            document.getElementById('bill_due_date_bill').value=year + '-' + month + '-' + day;
            
        }else{
            document.getElementById('bill_due_date_bill').value=document.getElementById('bill_date_bill').value;
        }
    }
    settermsinvoice = (e) =>{
        if(e.value!=""){
            document.getElementById('term').value="";
        }
        
    }
    setbill_terms(e){
        if(e.value!=""){
            document.getElementById('bill_terms').value="";
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
    deleteItemestimate = (index) =>{
        document.getElementById('destroyestimatetabledatatable').click();
        this.setState({
            estimate_table_row: this.state.estimate_table_row.slice(0, -1),
            estimate_item_count : this.state.estimate_item_count-1
        });
    }
    deleteItemebill = (index) =>{
        document.getElementById('destroybilltabledatatable').click();
        document.getElementById('account_count_bills').value=this.state.bill_item_count-1;
        this.setState({
            bill_table_row : this.state.bill_table_row.slice(0, -1),
            bill_item_count : this.state.bill_item_count-1
        });
    }
    deleteItemecredit_note = (index) =>{
        document.getElementById('destroycreditnotetabledatatable').click();
        
        this.setState({
           credit_note_table_row: this.state.credit_note_table_row.slice(0, -1),
           credit_note_item_count : this.state.credit_note_item_count-1
        });
    }
    deletealliteminvoice = ()=>{
        document.getElementById('destroyinvoicetabledatatable').click();
        this.setState({invoice_table_row : [],invoice_table_journal_row : [], invoice_item_count : 0});

    }
    
    delete_all_lines_bill = ()=>{
        document.getElementById('destroybilltabledatatable').click();
        this.setState({bill_table_row : [], bill_item_count : 0});
        document.getElementById('account_count_bills').value=0;
    }
    deleteallitemsales_receipt = ()=>{
        document.getElementById('destroysales_receipttabledatatable').click();
        this.setState({sales_receipt_table_row : [], sales_receipt_item_count : 0});

    }
    deleteallitemestimate = ()=>{
        document.getElementById('destroyestimatetabledatatable').click();
        this.setState({estimate_table_row : [], estimate_item_count : 0});

    }
    deleteallitemcredit_note = ()=>{
        document.getElementById('destroycreditnotetabledatatable').click();
        this.setState({credit_note_table_row : [], credit_note_item_count : 0});

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
    computeEstimateItemTotal = (row) =>{
        
        var qty= document.getElementById('product_qty_estimate'+row).value;
        var amount= document.getElementById('select_product_rate_estimate'+row).value;
        document.getElementById('total_amount_estimate'+row).innerHTML=number_format(parseFloat(amount)*parseFloat(qty),2);
        document.getElementById('total_amount_estimate'+row).setAttribute('title',parseFloat(amount)*parseFloat(qty));
        var total_all_item=0;
        for(var c=1;c<=this.state.estimate_item_count;c++){
            
            var qty= document.getElementById('product_qty_estimate'+c).value;
            var amount= document.getElementById('select_product_rate_estimate'+c).value;
            console.log(c+"<= c "+"amount : "+amount);
            total_all_item=parseFloat(total_all_item)+parseFloat(amount)*parseFloat(qty);
        }
        document.getElementById('total_balance_estimate').value=total_all_item;
        document.getElementById('estimatetotal').innerHTML="PHP "+number_format(total_all_item,2);
    }
    computeCreditNoteItemTotal = (row) =>{
        var qty= document.getElementById('product_qty_credit_note'+row).value;
        var amount= document.getElementById('select_product_rate_credit_note'+row).value;
        document.getElementById('total_amount_credit_note'+row).innerHTML=number_format(parseFloat(amount)*parseFloat(qty),2);
        document.getElementById('total_amount_credit_note'+row).setAttribute('title',parseFloat(amount)*parseFloat(qty));
        var total_all_item=0;
        for(var c=1;c<=this.state.credit_note_item_count;c++){
            
            var qty= document.getElementById('product_qty_credit_note'+c).value;
            var amount= document.getElementById('select_product_rate_credit_note'+c).value;
            console.log(c+"<= c "+"amount : "+amount);
            total_all_item=parseFloat(total_all_item)+parseFloat(amount)*parseFloat(qty);
        }
        document.getElementById('total_balance_credit_note').value=total_all_item;
        document.getElementById('credit_notetotal').innerHTML="PHP "+number_format(total_all_item,2);
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
    maskamountinputsales_receipt = (row,formatted,unformated) =>{
        
        document.getElementById(formatted+row).value=document.getElementById(formatted+row).value.match(/[0-9.,-]*/);
        
        var num = document.getElementById(formatted+row).value;
        var comma = /,/g;
        num = num.replace(comma,'');
        document.getElementById(unformated+row).value=num;
        document.getElementById(unformated+row).setAttribute('title',num);
        var numCommas = addCommas(num);
        console.log(" numCommas "+numCommas+" row : "+row);
        document.getElementById(formatted+row).value=numCommas;
       
    }
    AddInvoice = async (event) =>{
        event.preventDefault();
        if(this.state.invoice_item_count>=1){
            var total_all_item=0;
            for(var c=1;c<=this.state.invoice_item_count;c++){
            
                var qty= document.getElementById('product_qty'+c).value;
                var amount= document.getElementById('select_product_rate'+c).value;
                console.log(c+"<= c "+"amount : "+amount);
                total_all_item=parseFloat(total_all_item)+parseFloat(amount)*parseFloat(qty);
            }
            document.getElementById('total_balance').value=total_all_item;
            document.getElementById('invoicetotal').innerHTML="PHP "+number_format(total_all_item,2);
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
    AddEstimate = async (event) =>{
        event.preventDefault();
        if(this.state.estimate_item_count>=1){
            
            const bodyFormData = new FormData(event.target);
            console.log(event.target);
            const response = await axios.post('http://localhost/Accounting_modified/public/api/addestimate',bodyFormData);
            console.log(response.data);
            alert('successfully added new estimate');
            window.location.reload();
        }else{
           alert('Please add some items.');
        }
    }
    addCreditNote = async (event) =>{
        event.preventDefault();
        if(this.state.credit_note_item_count>=1){
            
            const bodyFormData = new FormData(event.target);
            console.log(event.target);
            const response = await axios.post('http://localhost/Accounting_modified/public/api/addcreditnote',bodyFormData);
            console.log(response.data);
            alert('successfully added new credit note');
            window.location.reload();
        }else{
           alert('Please add some items.');
        }
    }
    addSalesReceipt =async (event) =>{
        event.preventDefault();

        document.getElementById('salesrcustomer').disabled=false;
        document.getElementById('sales_receipt_location_top').disabled=false;
        document.getElementById('sales_receipt_type_top').disabled=false;
        document.getElementById('CostCenterSalesReceipt').disabled=false;

        const bodyFormData = new FormData(event.target);
        console.log(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/add_sales_receipt',bodyFormData);
        console.log(response.data);
        alert('successfully added new Sales Receipt');
        document.getElementById('salesrcustomer').disabled=true;
        document.getElementById('sales_receipt_location_top').disabled=true;
        document.getElementById('sales_receipt_type_top').disabled=true;
        document.getElementById('CostCenterSalesReceipt').disabled=true;
        window.location.reload();
        
        
    }
    set_bill_account_code_account =(origin,destination) =>{
        var code=document.getElementById(origin).value;
        document.getElementById(destination).value=code;
        if(destination=="bill_account_credit_account"){
            document.getElementById('bill_credit_account_account_button').click();
        }else{
            document.getElementById('bill_credit_account_code_button').click();
        }
        
    }
    swap_amounts = (mask,type) =>{
        console.log(mask+" "+type);
        document.getElementById(mask).value="0";
        document.getElementById(type).value="0";
        document.getElementById(type).setAttribute('title','0');
       
    }
    cashaccount_select =() =>{
        if(cashaccount_select==1){
            document.getElementById('cashaccount_select').click();
            cashaccount_select=0;
        }
        
    }
    computeoutstanding = () =>{
        var totalpayment=0;
        var amountreceived_sr=document.getElementById('amountreceived_sr').value;
            
        for(var c=1;c<=AdditionalCashAccountCount;c++){
            
            totalpayment=parseFloat(totalpayment)+parseFloat(document.getElementById('additionalCashAmount'+c).value);
            console.log(" totalpayment "+totalpayment);
        }
        
        totalpayment=parseFloat(totalpayment)+parseFloat(amountreceived_sr);
        
        document.getElementById('sales_receiptbalance').innerHTML=number_format(totalpayment,2);
        var sales_receiptbalance=document.getElementById('big_sales_receiptbalance').getAttribute('title');
        var totaloutstanding=parseFloat(sales_receiptbalance)-parseFloat(totalpayment);
        document.getElementById('sales_receiptoutstandingbalance').innerHTML=number_format(totaloutstanding,2);
        document.getElementById('TotalDebitSalesReceiptTD').innerHTML='Total : '+number_format(totalpayment,2);
        document.getElementById('hiddentotaldebitamountsalesreceipt').value=totalpayment;
        var totalpayment=0;
        var amountreceived_sr_c=document.getElementById('amountreceived_sr_c').value;
        
        for(var c=1;c<=AdditionalCashAccountCount;c++){
            totalpayment=parseFloat(totalpayment)+parseFloat(document.getElementById('additionalCashAmount_c'+c).value);
        }
        totalpayment=parseFloat(totalpayment)+parseFloat(amountreceived_sr_c);
        var sales_receiptbalance=document.getElementById('big_sales_receiptbalance').getAttribute('title');
        var totaloutstanding2=parseFloat(sales_receiptbalance)-parseFloat(totalpayment);
        document.getElementById('TotalCreditSalesReceiptTD').innerHTML='Total : '+number_format(totalpayment,2);
        document.getElementById('hiddentotalcredtiamountsalesreceipt').value=totalpayment;
        if(totaloutstanding<0 || totaloutstanding2<0){
            document.getElementById('salesradd').disabled=true;
            
        }else{
            if(document.getElementById('hiddentotaldebitamountsalesreceipt').value==document.getElementById('hiddentotalcredtiamountsalesreceipt').value){
                document.getElementById('salesradd').disabled=false;
            }else{
                document.getElementById('salesradd').disabled=true;
            }
            
            
        }

    }
    
    computeoutstanding_c = () =>{
        var totalpayment=0;
        var amountreceived_sr_c=document.getElementById('amountreceived_sr_c').value;
        
        for(var c=1;c<=AdditionalCashAccountCount;c++){
            totalpayment=parseFloat(totalpayment)+parseFloat(document.getElementById('additionalCashAmount_c'+c).value);
        }
        totalpayment=parseFloat(totalpayment)+parseFloat(amountreceived_sr_c);
        var sales_receiptbalance=document.getElementById('big_sales_receiptbalance').getAttribute('title');
        var totaloutstanding=parseFloat(sales_receiptbalance)-parseFloat(totalpayment);
        document.getElementById('TotalCreditSalesReceiptTD').innerHTML='Total : '+number_format(totalpayment,2);
        document.getElementById('hiddentotalcredtiamountsalesreceipt').value=totalpayment;
        var totalpayment=0;
        var amountreceived_sr=document.getElementById('amountreceived_sr').value;
        
        for(var c=1;c<=AdditionalCashAccountCount;c++){
            totalpayment=parseFloat(totalpayment)+parseFloat(document.getElementById('additionalCashAmount'+c).value);
        }
        
        totalpayment=parseFloat(totalpayment)+parseFloat(amountreceived_sr);
        
        document.getElementById('sales_receiptbalance').innerHTML=number_format(totalpayment,2);
        var sales_receiptbalance=document.getElementById('big_sales_receiptbalance').getAttribute('title');
        var totaloutstanding2=parseFloat(sales_receiptbalance)-parseFloat(totalpayment);
        document.getElementById('sales_receiptoutstandingbalance').innerHTML=number_format(totaloutstanding,2);
        document.getElementById('TotalDebitSalesReceiptTD').innerHTML='Total : '+number_format(totalpayment,2);
        document.getElementById('hiddentotaldebitamountsalesreceipt').value=totalpayment;
        if(totaloutstanding<0 || totaloutstanding2<0){
            document.getElementById('salesradd').disabled=true;
            
        }else{
            document.getElementById('salesradd').disabled=false;
            
        }
    }
    refresh_pay_bills_modal =(event) =>{
        if(refresh_pay_bills_modal==1){
            refresh_pay_bills_modal=0;
            document.getElementById('refresh_pay_bills_modal').click();
           
        }
    }
    componentDidMount(){
        this.getInvoiceModalInfo();
    }
    Setactualamountpaymentbill=()=>{
        console.log('set actual amount payment');
        var count=document.getElementById('paybillrowcount').value;
        var paybilltotalpayment=0;
        for(var c=1;c<=count;c++){
            if(document.getElementById('paybillcheckbox'+c).checked==true){
                //document.getElementById('paybillactualpaymentamount'+c).value;
                document.getElementById('paybilltotalamount'+c).innerHTML=number_format(document.getElementById('paybillactualpaymentamount'+c).value,2);
                paybilltotalpayment=(parseFloat(paybilltotalpayment)+ parseFloat(document.getElementById('paybillactualpaymentamount'+c).value) );
            }else{

            }
        }
        
        document.getElementById('paybilltotalpaymenttotal').innerHTML="PHP "+number_format(paybilltotalpayment,2);
    }
    Setpaybilltotalamount= () =>{
        var count=document.getElementById('paybillrowcount').value;
        var paybilltotalpayment=0;
        for(var c=1;c<=count;c++){
            if(document.getElementById('paybillcheckbox'+c).checked==true){
                document.getElementById("paybill_paymentdate"+c).required = true;
                
                paybilltotalpayment=(parseFloat(paybilltotalpayment)+ parseFloat(document.getElementById('paybilltotalbalance'+c).getAttribute('title')) );
                document.getElementById('paybilltotalamount'+c).innerHTML=number_format(document.getElementById('paybilltotalbalance'+c).getAttribute('title'),2);
                
                document.getElementById('paybillactualpaymentamount'+c).value=document.getElementById('paybilltotalbalance'+c).getAttribute('title');
            }else{
                document.getElementById('paybilltotalamount'+c).innerHTML="0.00";
                document.getElementById('paybillactualpaymentamount'+c).value="0";
                document.getElementById("paybill_paymentdate"+c).required = false;
                
            }
        }
        
        document.getElementById('paybilltotalpaymenttotal').innerHTML="PHP "+number_format(paybilltotalpayment,2);
        
    }
    save_pay_bill = async (event) =>{
        event.preventDefault();
        var paybill_paymentaccount=document.getElementById('paybill_paymentaccount').value;
        var paybillrowcount=document.getElementById('paybillrowcount').value;
        var checked=[];
        var bank=[];
        var paymentdate=[];
        var paymentamount=[];
        var paybilltotalbalance=[];
        var usevoucher_question=[];
        for(var c=1;c<=paybillrowcount;c++){      
            if(document.getElementById('paybillcheckbox'+c).checked==true){
            checked.push(document.getElementById('paybillcheckbox'+c).value);   
            bank.push("");   
            paymentdate.push(document.getElementById('paybill_paymentdate'+c).value);   
            paymentamount.push(document.getElementById('paybillactualpaymentamount'+c).value); 
            paybilltotalbalance.push(document.getElementById('paybilltotalbalance'+c).getAttribute('title')); 
            usevoucher_question.push(document.getElementById('usevoucher_question'+c).value); 
            }
        }
        console.log(checked);
        
        const response = await axios.get('http://localhost/Accounting_modified/public/api/add_pay_bill',{
            params:{
                usevoucher_question:usevoucher_question,
                paybilltotalbalance:paybilltotalbalance,
                paymentamount:paymentamount,
                paybill_bank_account:bank,
                paybill_paymentaccount:paybill_paymentaccount,
                checked:checked,
                paybill_paymentdate:paymentdate,
            },
            crossDomain: true
        });
        console.log(response.data);
        window.location.reload();
    }
    addBill = async (event) =>{
        event.preventDefault();
        const bodyFormData = new FormData(event.target);
        console.log(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/add_bill',bodyFormData);
        console.log(response.data);
        alert('Successfully Added new Bill Request');
        window.location.reload();
    }
    addSupplierCredit = async (event) =>{
        event.preventDefault();
        document.getElementById('supplier_credit_account_debit_account').disabled=false;
        document.getElementById('sc_customer').disabled=false;
        document.getElementById('CostCenterSupplierCredit').disabled=false;
        document.getElementById('sc_reference_no').disabled=false;
        document.getElementById('sc_mail_address').disabled=false;
        document.getElementById('sc_reference_no_po').disabled=false;
        document.getElementById('sc_reference_no_ci').disabled=false;
        var count=document.getElementById('account_count_scs').value;
        console.log(count);
        for(var c=1;c<=count;c++){
            console.log('select_account_sc'+c);
            document.getElementById('select_account_sc'+c).disabled=false;
            document.getElementById('select_description_sc'+c).disabled=false;
            document.getElementById('select_sc_amount'+c).disabled=false;
            
        }
        const bodyFormData = new FormData(event.target);
        console.log(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/add_supplier_credit',bodyFormData);
        console.log(response.data);
        alert('Added supplier credit');
         document.getElementById('disable_supplier_credit_form_input').click();
        window.location.reload();
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
        const ETran_list=this.state.ETran.map((dat,index)=>{
            if(this.state.ETran.length==parseFloat(index)+parseFloat(1)){
                document.getElementById('destroy_pay_bills_modal').click();
            }
            
            refresh_pay_bills_modal=1;
            var row_count=parseFloat(index)+parseFloat(1);
            document.getElementById('paybillrowcount').value=row_count;
            return [
                <tr key={row_count} onMouseOver={()=>this.refresh_pay_bills_modal()}>
                    <td style={{verticalAlign : 'middle',textAlign :'center'}}>{row_count}</td>
                    <td className="pt-3-half" style={{verticalAlign : 'middle',textAlign : 'center',paddingRight : '5px',paddingTop : '5px'}}>
                    <input onChange={this.Setpaybilltotalamount} type="checkbox" value={dat.et_no} id={`paybillcheckbox${row_count}`} />
                    </td>
                    <td style={{verticalAlign : 'middle'}}>{dat.et_no}</td>
                    <td style={{verticalAlign : 'middle'}}>
                    <input type="text" readOnly id={`paybill_bank_inputtext${row_count}`} class="w-100 background-White" />
                    </td>
                    <td style={{verticalAlign : 'middle'}}>
                        <input type="date" name="" id={`paybill_paymentdate${row_count}`}  class="w-100" />
                    </td>
                    <td style={{verticalAlign : 'middle'}}>
                        {dat.display_name!=""? (dat.display_name!=null? dat.display_name : dat.f_name+" "+dat.l_name) : dat.f_name+" "+dat.l_name}
                    </td>
                    <td style={{verticalAlign : 'middle', paddingRight : '5px'}}>{dat.et_shipping_address}</td>
                    <td style={{verticalAlign : 'middle', paddingRight : '5px'}}>{dat.et_shipping_to}</td>
                    <td style={{verticalAlign : 'middle', paddingRight : '5px'}}>{dat.et_shipping_via}</td>
                    <td style={{verticalAlign : 'middle'}}>
                        <select  id={`usevoucher_question${row_count}`} name={`usevoucher_question${row_count}`}  class="w-100 border-0">
                            <option value="">No</option>
                            <option value="Cash">Generate Cash Voucher</option>
                            <option value="Cheque">Generate Cheque Voucher</option>
                        </select>
                    </td>
                    <td style={{verticalAlign : 'middle'}}>{dat.et_due_date!="" && dat.et_due_date!=null? moment(dat.et_due_date).format('MM-DD-YYYY') : ''}</td>
                    <td style={{verticalAlign : 'middle', paddingRight : '5px',textAlign : 'right'}} id={`paybilltotalbalance${row_count}`} title={dat.bill_balance} >{number_format(dat.bill_balance,2)}</td>
                    <td style={{verticalAlign : 'middle', }}>
                        <input type="number" class="w-100" onChange={this.Setactualamountpaymentbill} id={`paybillactualpaymentamount${row_count}`}  min="0" step="0.01" max={dat.bill_balance} />
                    </td>
                    <td style={{verticalAlign : 'middle', paddingRight : '5px',textAlign : 'right'}} id={`paybilltotalamount${row_count}`}>0.00</td>
                </tr>
            ]
            
        });
        var supplier_credit_table_rows_list="";
        if(this.props.supplier_credit_table_rows){
            supplier_credit_table_rows_list=this.props.supplier_credit_table_rows.map((dat,ind) =>{
                var row_count=parseFloat(ind)+parseFloat(1);
                document.getElementById('account_count_scs').value=row_count;
                if(dat.et_ad_rate=="1"){
                    return [
                        <tr key={row_count} id={`sc_line_account${row_count}`}>
                            
                            <td style={{verticalAlign : 'middle'}}>
                                <input type="checkbox"   name="return_item_sc[]" id={`return_item_sc${row_count}`} value={dat.et_ad_id} />
                                <input type="hidden" id={`hiddenet_ad_id${row_count}`} name={`hiddenet_ad_id${row_count}`} value={dat.et_ad_id} />
                            </td>
                            <td style={{verticalAlign : 'middle'}}>{row_count}</td>
                            <td style={{verticalAlign : 'middle'}}>
                            <select style={{border: '0', width : "100%"}} value={dat.et_ad_product} class="sc_data account_select_sc form-control" disabled id={`select_account_sc${row_count}`} name={`select_account_sc${row_count}`} ><option value="">--Select Account--</option>{COA_list}</select>
                            </td>
                            <td style={{verticalAlign : 'middle'}}>
                            
                            <select style={{border: '0', width : "100%"}} value={dat.et_cost_center} class="sc_data  form-control" disabled id={`select_costcenter_sc${row_count}`} name={`select_costcenter_sc${row_count}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select>
                            </td>
                            <td style={{verticalAlign : 'middle'}}>
                                <input class="sc_data description_select_sc form-control" value={dat.et_ad_desc} disabled name={`select_description_sc${row_count}`} id={`select_description_sc${row_count}`}  style={{border : '0'}} />
                            </td>
                            <td style={{verticalAlign : 'middle'}}>
                                <input type="number" step="0.01" value={dat.et_ad_total} disabled class="sc_data amount_select_sc form-control" id={`select_sc_amount${row_count}`} name={`select_sc_amount${row_count}`} style={{border :'0', textAlign : 'right'}} />
                            </td>
                        </tr>
                    ]
                }else{
                    return [
                        <tr key={row_count} id={`sc_line_account${row_count}`}>
                            
                            <td style={{verticalAlign : 'middle'}}>
                                <input type="checkbox" style={{display : 'none'}}  name="return_item_sc[]" id={`return_item_sc${row_count}`} value={dat.et_ad_id} />
                                <input type="hidden" id={`hiddenet_ad_id${row_count}`} name={`hiddenet_ad_id${row_count}`} value={dat.et_ad_id} />
                            </td>
                            <td style={{verticalAlign : 'middle'}}>{row_count}</td>
                            <td style={{verticalAlign : 'middle'}}>
                            <select style={{border: '0', width : "100%"}} value={dat.et_ad_product} class="sc_data account_select_sc form-control" disabled name={`select_account_sc${row_count}`} id={`select_account_sc${row_count}`} ><option value="">--Select Account--</option>{COA_list}</select>
                            </td>
                            <td style={{verticalAlign : 'middle'}}>
                            
                            <select style={{border: '0', width : "100%"}} value={dat.et_cost_center} class="sc_data  form-control" disabled id={`select_costcenter_sc${row_count}`} name={`select_costcenter_sc${row_count}`} ><option value="">--Select Account--</option>{cost_center_list}</select>
                            </td>
                            <td style={{verticalAlign : 'middle'}}>
                                <input class="sc_data description_select_sc form-control" value={dat.et_ad_desc} disabled id={`select_description_sc${row_count}`} name={`select_description_sc${row_count}`}  style={{border : '0'}} />
                            </td>
                            <td style={{verticalAlign : 'middle'}}>
                                <input type="number" step="0.01" value={dat.et_ad_total}  disabled class="sc_data amount_select_sc form-control" id={`select_sc_amount${row_count}`} name={`select_sc_amount${row_count}`} style={{border :'0', textAlign : 'right'}} />
                            </td>
                        </tr>
                    ]
                }
                
            });
        }
        
        // const data=this.state.data.map((dat) =>{
        //     return <div key={dat.id}>{dat.id+" "+dat.name+" "+dat.position}</div>
        // });
        return (
            <div>
                <div class="modal fade p-0" id="billmodal" tabindex="-1" role="dialog" aria-hidden="true" >
                <button type="button" style={{display: 'none'}} id="destroybilltabledatatable"></button>
                <form action="#" class="form-horizontal " id="add_bill_form" onSubmit={this.addBill} >
                
                <input id="item_count_bills" name="item_count_bills" value="0" hidden />
                <input id="account_count_bills" name="account_count_bills" hidden />
                    <div class="modal-dialog modal-full" role="document" style={{minWidth : '100%',margin : '0'}}>
                        <div class="modal-content" style={{minHeight : '100vh'}}>
                            <div class="modal-header">
                                <h5 class="modal-title">Bill</h5>
                                <button type="button" class="close" id="billmodalclosebutton" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body p-4" id="result">
                                <div class="col-md-12 p-0 mb-4">
                                    <div class="col-md-12 p-0" >
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Bill No.</p>
                                            <input type="text" value={this.state.bill_no_state} onChange={(event)=>this.set_bill_no(event)} id="bill_bill_no2" name="bill_bill_no" class="w-100 form-control" required />
                                            
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Bill Date</p>
                                            <input type="date" name="bill_date" onChange={(event)=>this.changeduedatemin_bill(event.target)} id="bill_date_bill" class="w-100 form-control" required />
                                            
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Due Date</p>
                                            <input type="date"  onChange={(event)=>this.setbill_terms(event.target)}o id="bill_due_date_bill" name="bill_due_date" class="w-100 form-control" required />
                                        </div>
                                        
                                    </div>
                                    <div class="col-md-12 p-0">
                                        
                                        <div class="col-md-4 p-0 pr-3" >
                                            <p>Cost Center</p>
                                            <select name="CostCenterBill" id="CostCenterBill" onchange="EnableBillInput(this)" class="w-100 selectpicker CostCenterBill" data-live-search="true" >
                                                <option value="">--Select Cost Center--</option>
                                                {cost_center_list}
                                                </select>
                                        </div>
                                        
                                    </div>
                                    <div class="col-md-12 p-0">
                                         <div class="col-md-4 p-0 pr-3">
                                             <p>Name</p>
                                             <select id="billpayee" type="text" onChange={(event)=>this.fetch_customer_info('bill_billing_address','bill_terms','',event.target.value,'bill_BIG_balance','')}  name="bill_customer" class="w-100 selectpicker" data-live-search="true" required>
                                             <option value="">--Select Name--</option>
                                             {customer_list}
                                             </select>
                                         </div>
                                         
                                    </div>
                                    
                                    
                                    
                                    
                                    <div class="col-md-12 p-0 d-inline-flex">
                                        <div class="col-md-4 p-0 pr-3">
                                            <p>Billing Address</p>
                                            <input type="text" name="bill_billing_address" id="bill_billing_address" class="w-100 form-control" />
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Terms</p>
                                            <input type="text" list="terms_list" defaultValue={this.state.expense_setting.expenses_bill_payment_terms!=""? this.state.expense_setting.expenses_bill_payment_terms : '' } name="bill_terms" id="bill_terms" class="w-100 form-control" onChange={(event)=>this.apply_term_bill()} />
                                            
                                        </div>
                                        
                                    </div>
                                    <div class="col-md-12 p-0 d-inline-flex">
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>RF</p>
                                            <input type="text" name="RF_bill" id="RF_bill" placeholder="Request Form" class="w-100 form-control" required />
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>PO</p>
                                            <input type="text" name="PO_bill" id="PO_bill" placeholder="Purchase Order" class="w-100 form-control" required />
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>CI</p>
                                            <input type="text" name="CI_bill" id="CI_bill" placeholder="Charge Invoice" class="w-100 form-control"  required />
                                        </div>
                                    </div>
                                    <div class="col-md-12 p-0 d-inline-flex justify-content-end" style={{float: 'right', marginRight : '5%'}}>
                                        <h4 class="mr-2">BALANCE DUE: </h4>
                                        <h4 class="mr-1" id="bill_BIG_balance">PHP 0.00</h4>
                                    </div>
                                    <div class="col-md-12 mb-1 mt-3" style={{paddingLeft :'0px'}}>
                                        <h4>Account Details</h4>
                                    </div>
                                    <button type="button" id="bill_modal_refreshbtn" style={{display : 'none'}}></button>
                                    <button type="button" id="rerenderselectpickerbill" style={{display : 'none'}}></button>
                                    
                                    <table class="table table-bordered table-responsive-md table-sm text-left font14" id="bill_account_table">
                                        <thead>
                                            <tr>
                                                <th class="text-left" width="5%">#</th>
                                                <th class="text-left" width="20%">ACCOUNT</th>
                                                <th class="text-left" width="20%">COST CENTER</th>
                                                <th class="text-left" width="">DESCRIPTION</th>
                                                <th class="text-left" width="20%">AMOUNT</th>
                                                <th class="text-center" width="5%"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="bill_account_table_tbody">
                                            {this.state.bill_table_row.map((item, idx) => {
                                                var row_count=parseFloat(idx)+parseFloat(1);
                                                if(this.state.bill_table_row.length==parseFloat(idx)+parseFloat(1)){
                                                    document.getElementById('destroybilltabledatatable').click();
                                                }
                                                
                                                rerenderselectpickerbill=1;
                                                var a ="";
                                                var b ="";
                                                var c ="";
                                                var d ="";
                                                var e ="";
                                                var f ="";
                                                
                                                
                                                var table = document.getElementById("bill_account_table");
                                                a =table.rows[0].cells[0].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : a;
                                                b =table.rows[0].cells[1].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : b;
                                                c =table.rows[0].cells[2].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : c;
                                                d =table.rows[0].cells[3].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : d;
                                                e =table.rows[0].cells[4].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : e;
                                                f =table.rows[0].cells[5].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : e;
                                                
                                                a =table.rows[0].cells[0].innerHTML=="ACCOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_account_select selectpicker" data-live-search="true" name={`select_account_bill${row_count}`} id={`select_account_bill${row_count}`}><option value="">--Select Account--</option>{COA_list}</select></td> : a;
                                                b =table.rows[0].cells[1].innerHTML=="ACCOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_account_select selectpicker" data-live-search="true" name={`select_account_bill${row_count}`} id={`select_account_bill${row_count}`}><option value="">--Select Account--</option>{COA_list}</select></td> : b;
                                                c =table.rows[0].cells[2].innerHTML=="ACCOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_account_select selectpicker" data-live-search="true" name={`select_account_bill${row_count}`} id={`select_account_bill${row_count}`}><option value="">--Select Account--</option>{COA_list}</select></td> : c;
                                                d =table.rows[0].cells[3].innerHTML=="ACCOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_account_select selectpicker" data-live-search="true" name={`select_account_bill${row_count}`} id={`select_account_bill${row_count}`}><option value="">--Select Account--</option>{COA_list}</select></td> : d;
                                                e =table.rows[0].cells[4].innerHTML=="ACCOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_account_select selectpicker" data-live-search="true" name={`select_account_bill${row_count}`} id={`select_account_bill${row_count}`}><option value="">--Select Account--</option>{COA_list}</select></td> : e;
                                                f =table.rows[0].cells[5].innerHTML=="ACCOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_account_select selectpicker" data-live-search="true" name={`select_account_bill${row_count}`} id={`select_account_bill${row_count}`}><option value="">--Select Account--</option>{COA_list}</select></td> : e;

                                                a =table.rows[0].cells[0].innerHTML=="COST CENTER"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_cost_center_select selectpicker" data-live-search="true" name={`select_cost_center_bill${row_count}`} id={`select_cost_center_bill${row_count}`}><option value="">--Select Account--</option>{cost_center_list}</select></td> : a;
                                                b =table.rows[0].cells[1].innerHTML=="COST CENTER"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_cost_center_select selectpicker" data-live-search="true" name={`select_cost_center_bill${row_count}`} id={`select_cost_center_bill${row_count}`}><option value="">--Select Account--</option>{cost_center_list}</select></td> : b;
                                                c =table.rows[0].cells[2].innerHTML=="COST CENTER"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_cost_center_select selectpicker" data-live-search="true" name={`select_cost_center_bill${row_count}`} id={`select_cost_center_bill${row_count}`}><option value="">--Select Account--</option>{cost_center_list}</select></td> : c;
                                                d =table.rows[0].cells[3].innerHTML=="COST CENTER"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_cost_center_select selectpicker" data-live-search="true" name={`select_cost_center_bill${row_count}`} id={`select_cost_center_bill${row_count}`}><option value="">--Select Account--</option>{cost_center_list}</select></td> : d;
                                                e =table.rows[0].cells[4].innerHTML=="COST CENTER"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_cost_center_select selectpicker" data-live-search="true" name={`select_cost_center_bill${row_count}`} id={`select_cost_center_bill${row_count}`}><option value="">--Select Account--</option>{cost_center_list}</select></td> : e;
                                                f =table.rows[0].cells[5].innerHTML=="COST CENTER"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{border : '0', width : '100%'}} class="form-control bill_cost_center_select selectpicker" data-live-search="true" name={`select_cost_center_bill${row_count}`} id={`select_cost_center_bill${row_count}`}><option value="">--Select Account--</option>{cost_center_list}</select></td> : e;

                                                a =table.rows[0].cells[0].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input class="bill_data description_select_bill form-control" id={`select_description_bill${row_count}`} name={`select_description_bill${row_count}`} style={{border : '0'}} /></td> : a;
                                                b =table.rows[0].cells[1].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input class="bill_data description_select_bill form-control" id={`select_description_bill${row_count}`} name={`select_description_bill${row_count}`} style={{border : '0'}} /></td> : b;
                                                c =table.rows[0].cells[2].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input class="bill_data description_select_bill form-control" id={`select_description_bill${row_count}`} name={`select_description_bill${row_count}`} style={{border : '0'}} /></td> : c;
                                                d =table.rows[0].cells[3].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input class="bill_data description_select_bill form-control" id={`select_description_bill${row_count}`} name={`select_description_bill${row_count}`} style={{border : '0'}} /></td> : d;
                                                e =table.rows[0].cells[4].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input class="bill_data description_select_bill form-control" id={`select_description_bill${row_count}`} name={`select_description_bill${row_count}`} style={{border : '0'}} /></td> : e;
                                                f =table.rows[0].cells[5].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input class="bill_data description_select_bill form-control" id={`select_description_bill${row_count}`} name={`select_description_bill${row_count}`} style={{border : '0'}} /></td> : e;

                                                a =table.rows[0].cells[0].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="form-control" id={`unformated_select_bill_amount${row_count}`} style={{border : '0', textAlign : 'right'}} defaultValue="0.00" onChange={(event)=>this.maskamountinputsales_receipt(row_count,'unformated_select_bill_amount','select_bill_amount')} /><input type="hidden" class="bill_data amount_select_bill"  id={`select_bill_amount${row_count}`}  name={`select_bill_amount${row_count}`} style={{textAlign : 'center', border :'0'}} /></td> : a;
                                                b =table.rows[0].cells[1].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="form-control" id={`unformated_select_bill_amount${row_count}`} style={{border : '0', textAlign : 'right'}} defaultValue="0.00" onChange={(event)=>this.maskamountinputsales_receipt(row_count,'unformated_select_bill_amount','select_bill_amount')} /><input type="hidden" class="bill_data amount_select_bill"  id={`select_bill_amount${row_count}`}  name={`select_bill_amount${row_count}`} style={{textAlign : 'center', border :'0'}} /></td> : b;
                                                c =table.rows[0].cells[2].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="form-control" id={`unformated_select_bill_amount${row_count}`} style={{border : '0', textAlign : 'right'}} defaultValue="0.00" onChange={(event)=>this.maskamountinputsales_receipt(row_count,'unformated_select_bill_amount','select_bill_amount')} /><input type="hidden" class="bill_data amount_select_bill"  id={`select_bill_amount${row_count}`}  name={`select_bill_amount${row_count}`} style={{textAlign : 'center', border :'0'}} /></td> : c;
                                                d =table.rows[0].cells[3].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="form-control" id={`unformated_select_bill_amount${row_count}`} style={{border : '0', textAlign : 'right'}} defaultValue="0.00" onChange={(event)=>this.maskamountinputsales_receipt(row_count,'unformated_select_bill_amount','select_bill_amount')} /><input type="hidden" class="bill_data amount_select_bill"  id={`select_bill_amount${row_count}`}  name={`select_bill_amount${row_count}`} style={{textAlign : 'center', border :'0'}} /></td> : d;
                                                e =table.rows[0].cells[4].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="form-control" id={`unformated_select_bill_amount${row_count}`} style={{border : '0', textAlign : 'right'}} defaultValue="0.00" onChange={(event)=>this.maskamountinputsales_receipt(row_count,'unformated_select_bill_amount','select_bill_amount')} /><input type="hidden" class="bill_data amount_select_bill"  id={`select_bill_amount${row_count}`}  name={`select_bill_amount${row_count}`} style={{textAlign : 'center', border :'0'}} /></td> : e;
                                                f =table.rows[0].cells[5].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" class="form-control" id={`unformated_select_bill_amount${row_count}`} style={{border : '0', textAlign : 'right'}} defaultValue="0.00" onChange={(event)=>this.maskamountinputsales_receipt(row_count,'unformated_select_bill_amount','select_bill_amount')} /><input type="hidden" class="bill_data amount_select_bill"  id={`select_bill_amount${row_count}`}  name={`select_bill_amount${row_count}`} style={{textAlign : 'center', border :'0'}} /></td> : e;

                                                a =table.rows[0].cells[0].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.bill_table_row.length?<a href="#" onClick={()=>this.deleteItemebill(idx)}   id={`delete_account_bill${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_account_bill"></span></a> : '' }</td> : a;
                                                b =table.rows[0].cells[1].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.bill_table_row.length?<a href="#" onClick={()=>this.deleteItemebill(idx)}   id={`delete_account_bill${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_account_bill"></span></a> : '' }</td> : b;
                                                c =table.rows[0].cells[2].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.bill_table_row.length?<a href="#" onClick={()=>this.deleteItemebill(idx)}   id={`delete_account_bill${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_account_bill"></span></a> : '' }</td> : c;
                                                d =table.rows[0].cells[3].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.bill_table_row.length?<a href="#" onClick={()=>this.deleteItemebill(idx)}   id={`delete_account_bill${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_account_bill"></span></a> : '' }</td> : d;
                                                e =table.rows[0].cells[4].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.bill_table_row.length?<a href="#" onClick={()=>this.deleteItemebill(idx)}   id={`delete_account_bill${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_account_bill"></span></a> : '' }</td> : e;
                                                f =table.rows[0].cells[5].innerHTML==""? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.bill_table_row.length?<a href="#" onClick={()=>this.deleteItemebill(idx)}   id={`delete_account_bill${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_account_bill"></span></a> : '' }</td> : e;

                                                return[
                                                    <tr key={idx} onMouseOver={this.rerenderselectpickerbill}>
                                                    {a}
                                                    {b}
                                                    {c}
                                                    {d}
                                                    {e}
                                                    {f}
                                                    </tr>
                                                ]
                                            })}
                                        </tbody>
                                    </table>
                                    <div class="col-md-12 p-0 mt-4">
                                        <div class="float-left">
                                            <div class="d-inline-flex">
                                                <button type="button" class="btn btn-outline-dark rounded mr-1 font14" onClick={this.add_lines_bill_account} id="add_lines_bill_account">Add Items</button>
                                                <button type="button" class="btn btn-outline-dark rounded mr-1 font14" onClick={this.delete_all_lines_bill} id="clear_lines_bill_account">Clear All Items</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-12 p-0 mt-4">
                                        <div class="col-md-6 pl-0">
                                            <p>Memo</p>
                                            <textarea rows="3" class="w-100 form-control" name="bill_memo"></textarea>
                                        </div>
                                        
                                    </div>
                                    <div class="col-md-4 p-0 mt-4">
                                        <table class="table table-light  mb-0">
                                            <thead class="thead-light  table-sm">
                                                <tr>
                                                    <th colspan="2" style={{verticalAlign : 'middle',textAlign : 'center'}}>Credit</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        <button type="button" style={{display : 'none'}} id="bill_credit_account_code_button"></button>
                                        <button type="button" style={{display : 'none'}} id="bill_credit_account_account_button"></button>
                                        
                                        <table class="table table-light table-sm" id="tableexpensebill_credit_account_table">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th style={{verticalAlign : 'middle',textAlign : 'center'}} width="30%">Code</th>
                                                    <th style={{verticalAlign : 'middle',textAlign : 'center'}} width="70%">Account</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tableexpensebill_credit_account_table_body">
                                                <tr>
                                                    <td style={{verticalAlign : 'middle',textAlign : 'center'}}>
                                                        <select class="form-control selectpicker" onChange={()=>this.set_bill_account_code_account('bill_account_credit_account_code','bill_account_credit_account')}  data-live-search="true" name="bill_account_credit_account_code"  id="bill_account_credit_account_code" required>
                                                        <option value="">--Select Account--</option>
                                                        {COA_code_list}
                                                        </select>
                                                    </td>
                                                    <td style={{verticalAlign : 'middle'}} class="pr-0">
                                                        <select class="form-control selectpicker" onChange={()=>this.set_bill_account_code_account('bill_account_credit_account','bill_account_credit_account_code')}  data-live-search="true" name="bill_account_credit_account"  id="bill_account_credit_account" required>
                                                        <option value="">--Select Account--</option>
                                                        {COA_list}
                                                        </select>
                                                        
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div> 
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Cancel</button>
                                <button id="billadd" class="btn btn-success rounded" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
                <div class="modal fade p-0" id="suppliercreditmodal" tabindex="-1" role="dialog" aria-hidden="true" >
                <button style={{display : 'none'}} id="disable_supplier_credit_form_input"></button>
                <form action="#" class="form-horizontal " id="add_supplier_credit_form" onSubmit={this.addSupplierCredit} >
                
                <input id="item_count_scs" name="item_count_scs" value="0" hidden />
                <input id="account_count_scs" name="account_count_scs"  hidden />
                    <div class="modal-dialog modal-full" role="document" style={{minWidth : '100%', margin :'0'}}>
                        <div class="modal-content" style={{minHeight : '100vh'}}>
                            <div class="modal-header">
                                <h5 class="modal-title">Supplier Credit</h5>
                                <button type="button" class="close" id="suppliercreditclosemodalbutton" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body p-4" id="result">
                                <div class="col-md-12 p-0 mb-4">
                                    <div class="my-3 p-0">
                                        <div class="col-md-3 p-0  pr-3">
                                            <p>Supplier Credit No.</p>
                                            <input type="hidden" name="supplier_credit_bill_no" id="supplier_credit_bill_no" oninput="fetch_bill_info()" />
                                            <input type="text" name="suppliers_credit_no" id="suppliers_credit_no" required class="form-control" value={this.state.supplier_credit_no_state} onChange={(event)=>this.set_supplier_credit_no(event)} /> 
                                            
                                        </div>
                                        <div class="col-md-3 p-0 pr-3">
                                            <p>Name</p>
                                            <select  name="sc_customer"  id="sc_customer" class="w-100 form-control" disabled>
                                            <option value="">--Select Customer--</option>
                                            {customer_list}
                                            </select>
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Cost Center</p>
                                            <select class="form-control" name="CostCenterSupplierCredit" onchange="EnableSupplierCreditInput(this)" id="CostCenterSupplierCredit" style={{width : '90%'}} disabled>
                                                <option value="">--Select Cost Center--</option>
                                                {cost_center_list}
                                                </select>
                                        </div>
                                        
                                        <div class="col-md-4 p-0" style={{textAlign : 'center'}}>
                                            <h5 class="mr-3" style={{float:"right"}}>CREDIT AMOUNT: PHP 0.00</h5>
                                            
                                        </div>
                                    </div>
                                    <div class="col-md-12 p-0 mt-4 d-inline-flex">
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Mailing Address</p>
                                            <input type="text" name="sc_mail_address" id="sc_mail_address" class="w-100 form-control" disabled />
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Payment Date</p>
                                            <input type="date" name="sc_date" class="w-100 form-control" required />
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Request Form</p>
                                            <input type="text" id="sc_reference_no" name="sc_reference_no" class="w-100 form-control" disabled />
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Purchase Order</p>
                                            <input type="text" name="sc_reference_no_po" id="sc_reference_no_po" class="w-100 form-control" disabled />
                                        </div>
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Charge Invoice</p>
                                            <input type="text" name="sc_reference_no_ci" id="sc_reference_no_ci" class="w-100 form-control" disabled />
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-1 mt-3">
                                        <h5 class="mt-2 mb-2">Account Details</h5>
                                    </div>
                                    <table class="table table-bordered table-responsive-md table-sm text-left font14" id="sc_account_table">
                                        <tr>
                                            <th width="3%" class="text-center"></th>
                                            <th width="4%" class="text-left">#</th>
                                            <th width="20%" class="text-left">ACCOUNT</th>
                                            <th width="20%" class="text-left">COST CENTER</th>
                                            <th width="40%" class="text-left">DESCRIPTION</th>
                                            <th width="20%" class="text-left">AMOUNT</th>
                                        </tr>
                                        {this.props.supplier_credit_table_rows? supplier_credit_table_rows_list : ''}
            
            
                                    </table>
                                    
                                    <div class="col-md-12 p-0 mt-4">
                                        <div class="col-md-6 pl-0">
                                            <p>Memo</p>
                                            <textarea rows="3" name="sc_memo" id="sc_memo" class="w-100 form-control" required></textarea>
                                        </div>
                                        
                                    </div>
                                    <div class="col-md-4 p-0 mt-4">
                                        <table class="table table-light">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th colspan="2" style={{verticalAlign : 'middle',textAlign :'center'}}>Accounts</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle',textAlign :'center'}}>Debit</td>
                                                    <td style={{verticalAlign : 'middle'}} class="pr-0">
                                                        <select class="form-control "  name="supplier_credit_account_debit_account"  id="supplier_credit_account_debit_account" required disabled>
                                                        <option value="" selected>--Select Account--</option>
                                                        {COA_list}
                                                        </select>
                                                        
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div> 
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Cancel</button>
                                <button class="btn btn-success rounded" id="supplier_credit_button" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                <div class="modal fade p-0" id="paybillsmodal" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-full" role="document" style={{minWidth : '100%',margin : '0'}}>
                    <button type="button" id="refresh_pay_bills_modal" style={{display : 'none'}}>qqq</button>
                    <button type="button" id="destroy_pay_bills_modal" style={{display : 'none'}}></button>
                    <form action="#" id="pay_bill_form" onSubmit={this.save_pay_bill}>
                        <div class="modal-content" style={{minHeight : '100vh'}}>
                            <div class="modal-header">
                                <h5 class="modal-title">Pay Bills</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body p-4" id="result">
                                <div class="col-md-12 p-0 mb-4">
                                    <div class="my-3 p-0">
                                        <div class="col-md-2 p-0 pr-3">
                                            <p>Source of Fund</p>
                                            
                                            <select class="selectpicker form-control" data-live-search="true" id="paybill_paymentaccount" required onchange="ChangeBankRowValue()">
                                                <option value="">--Select Account--</option>
                                                {COA_list}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-2"></div>
                                    <table class="table table-bordered table-responsive-md table-light  text-left font14 table-sm" id="table_pay_bills_modal_tabel"> 
                                        <thead class="thead-light">
                                        <tr>
                                            <th></th>
                                            <th class="text-center"><input type="hidden" id="paybillrowcount" /></th>
                                            <th class="text-left">Bill No</th>
                                            <th class="text-left">Bank</th>
                                            <th class="text-left">Payment Date</th>
                                            <th class="text-left">Payee</th>
                                            <th class="text-left">RF</th>
                                            <th class="text-left">PO</th>
                                            <th class="text-left">CI</th>
                                            <th class="text-left">Voucher</th>
                                            <th class="text-left">Due Date</th>
                                            <th class="text-left">Open Balance</th>
                                            <th class="text-left" width="12%">Actual Payment Amount</th>
                                            <th class="text-left">Total Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody id="pay_bills_table_tbody">
                                            {ETran_list}
                                        </tbody>
                                    </table>
                                    
                                    <div class="col-md-12 p-0">
                                        <div class="float-right">
                                            <div class="d-inline-flex mr-2">
                                                <p class="pr-4 text-dark font-weight-bold">TOTAL PAYMENT</p>
                                                <p class="text-dark font-weight-bold" id="paybilltotalpaymenttotal">PHP 0.00</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Cancel</button>
                                <button class="btn btn-success rounded" type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                <div class="modal fade" id="import_bill_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog  modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Import Bill</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style={{textAlign : 'center'}}>
                        <style>
                        
                        </style>
                        <input id="excel-uploadbill" type="file" onChange={()=>this.UploadMassBill()}  accept=".xlsx" />
                        <label for="excel-uploadbill" style={{opacity : '1', cursor :'pointer', borderRadius : '10px'}} id="FIleImportExcelLabel" class="custom-excel-upload btn btn-primary">
                        <span class="glyphicon glyphicon-user"> IMPORT FROM EXCEL</span>
                        </label>
                        
                    </div>
                    <div class="modal-footer">
                        <a class="btn btn-success" href="https://localhost/Accounting_modified/public/api/GetInvoiceExcelTemplateBill">Download Excel Template</a>
                        
                    </div>
                    </div>
                </div>
                </div>
                <div class="modal fade p-0" id="salesreceiptmodal" tabindex="-1" role="dialog" aria-hidden="true" >
                    
                <form class="form-horizontal " id="add_sales_receipt_form" onSubmit={this.addSalesReceipt} >
                    
                        <input type="hidden" id="reload_sr" name="reload_sr" value="0" />
                        <input id="transaction_type_sales_receipt" name="transaction_type_sales_receipt" value="Sales Receipt" hidden />
                        <input type="number" id="total_balance_sales_receipt" step="0.01" name="total_balance_sales_receipt" value="0" hidden />
                        <input id="product_count_sales_receipt" name="product_count_sales_receipt" value="0" hidden />
                        <div class="modal-dialog modal-full" role="document" style={{minWidth : '100%', margin : '0'}}>
                            <div class="modal-content" style={{minHeight : '100vh'}}>
                                <div class="modal-header">
                                    <h5 class="modal-title">Sales Receipt</h5>
                                    <button type="button" class="close" data-dismiss="modal" id="sales_receipt_modalclose" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div class="modal-body p-4" id="result">
                                    <div class="col-md-12 p-0 mb-4">
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Location</p>
                                                <select class="w-100 form-control" id="sales_receipt_location_top" name="sales_receipt_location_top" disabled>
                                                    <option value="Main">Main</option>
                                                    <option value="Branch">Branch</option>
                                                </select>
                                            </div>
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Type</p>
                                                <select class="w-100 form-control" id="sales_receipt_type_top" name="sales_receipt_type_top" disabled>
                                                    <option >Sales Invoice</option>
                                                    <option >Bill Invoice</option>
                                                </select>
                                            </div>
                                        </div>
                                    <div class="col-md-12 p-0">
                                        <div class="col-md-4 p-0 pr-3">
                                            <p>Sales Receipt No</p>
                                            <input type="text" name="sales_receipt_no" id="sales_receipt_no" value={this.state.sales_receipt_no_state} onChange={(event)=>this.set_sales_receipt_no(event)} class="w-100 form-control" required />
                                            
                                        </div>
                                        <div class="col-md-2 p-0 pr-3 ">
                                            <p>Sales Receipt Date</p>
                                            <input type="date" name="sr_date" id="sr_date" class="w-100 form-control" required />
                                        </div>
                                    </div>
                                    <div class="col-md-12 p-0">
                                        <div class="my-3 p-0 ">
                                            <div class="col-md-4 p-0 pr-3  mb-4">
                                                <p>Customer</p>
                                                <select id="salesrcustomer" onChange={(event)=>this.fetch_customer_info('sr_bill_address','','sr_email',event.target.value,'big_sales_receiptbalance','sales_receiptbalance')} type="text" name="sr_customer" class="w-100 form-control" required disabled>
                                                        <option value="">--Select Name--</option>
                                                        {customer_list}
                                                </select>
                                            </div>
                                            <div class="col-md-2 p-0" style={{ display : 'none'}}>
                                                <p>Email</p>
                                                <input type="text" name="sr_email" id="sr_email" placeholder="Email (Separate emails with a comma)" class="w-100" />
                                                
                                                <div class="float-left">
                                                    <input type="checkbox" name="sr_send_later" /> Send Now
                                                </div>
                                                <div class="float-right">
                                                    <p class="text-info" style={{marginBottom :'0px'}}></p>
                                                </div>
                                            </div>
                                            <div class="col-md-2 p-0 pr-3" style={{ display : 'none'}} >
                                                <p>Cost Center</p>
                                                <select name="CostCenterSalesReceipt" class="form-control"  id="CostCenterSalesReceipt" style={{width : '90%'}}  disabled>
                                                    <option value="">--Select Cost Center--</option>
                                                    {cost_center_list}
                                                </select>
                                            </div>
                                            <div class="col-md-2 p-0">
                                                <p>Find Invoice</p>
                                                <input type="text" class="form-control" readOnly id="invoiceno_sr"  name="invoiceno_sr" placeholder="Find by Invoice No" />
                                                <input type="hidden" name="invoice_location" id="invoice_location" />
                                                <input type="hidden" name="invoice_type" id="invoice_type" />
                                                <input type="hidden" name="invoice_item_no" id="invoice_item_no" />
                                                
                                            </div>
                                            
                                        </div>
                                        <div class="col-md-12 p-0 " >
                                            <div class="col-md-4 p-0 pr-3">
                                                <p>Billing Address</p>
                                                <input type="text" name="sr_bill_address" id="sr_bill_address" class="w-100 form-control" readOnly />
                                            </div>
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>TIN No.</p>
                                                <input type="text" name="tin_no_sr" id="tin_no_sr" class="w-100 form-control" readOnly />
                                            </div>
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Business Style</p>
                                                <input type="text" name="business_style_sr" id="business_style_sr" class="w-100 form-control" readOnly />
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="col-md-12 p-0 mt-3">
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Job Order</p>
                                                <input type="text" name="job_order_sales_receipt" id="job_order_sales_receipt" class="w-100 form-control" readOnly />
                                            </div>
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Work No</p>
                                                <input type="text" name="work_no_sales_receipt" id="work_no_sales_receipt" class="w-100 form-control" readOnly />
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="col-md-12 p-0 mt-3 d-inline-flex" style={{marginBottom : '20px'}}>
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Payment Method</p>
                                                <select  name="sr_payment_method" id="sr_payment_method" class="w-100 form-control" required>
                                                <option selected>Cash</option>
                                                <option>Cheque</option>
                                                <option>Cash & Cheque</option>
                                                </select>
                                                <input type="hidden" name="additional_count" value="0" id="additional_count" />
                                                <input type="text" name="additional_count_cash_account"  id="additional_count_cash_account" defaultValue="0" />
                                                
                                                <div id="NoOfChequeDivb" style={{ display : 'none'}}><button type="button" onclick="GenerateFieldSalesReceipt()" class="btn btn-secondary btn-sm mt-1">Additional cheque</button></div>
                                            </div>
                                            
                                            <div class="col-md-2 p-0 pr-3 " >
                                                <div class="ChequeColumnssc" style={{ display : 'none'}}>
                                                    <p>Bank</p>
                                                    <select name="sr_reference_no" id="sr_reference_no" class="w-100 mb-1 form-control">
                                                        <option value="">--Select Bank--</option>
                                                        
                                                    </select>
                                                    <div id="BankAdditionalDiv">
                                                        
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="col-md-2 p-0 pr-3 " >
                                                <div class="ChequeColumnssc" style={{ display : 'none'}}>
                                                    <p>Cheque No</p>
                                                    <input type="text"  name="sr_deposit_to" id="sr_deposit_to" class="w-100 mb-1 form-control" />
                                                    <div id="BankChequeNoAdditionalDiv">
                                                        
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="col-md-6 p-0 d-inline-flex justify-content-end pr-5" style={{ textAlign : 'right'}}>
                                                <h4 class="mr-2">BALANCE DUE: </h4>
                                                <h4 id="big_sales_receiptbalance">PHP 0.00</h4>
                                            </div>
                                        </div>
                                        <button type="button" style={{display: 'none'}} id="destroysales_receipttabledatatable"></button>
                                        <button type="button" style={{display: 'none'}} onClick={()=>this.refreshselecpickerselectssales_receipt()} id="renderSalesReceiptTable"></button>
                                        
                                        <table class="table table-light table-bordered table-responsive-sm table-sm text-left font14" id="sales_receipt_table">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th class="text-center" width="5%">#</th>
                                                    <th class="text-center"   width="10%">PARTICULARS</th>
                                                    <th class="text-center"   width="10%">ITEMS</th>
                                                    <th class="text-center">DESCRIPTION</th>
                                                    <th class="text-center"  width="5%">QTY</th>
                                                    <th class="text-center"   width="10%">RATE</th>
                                                    <th class="text-center"   width="10%">AMOUNT</th>
                                                    <th class="text-center" style={{ display : 'none'}}></th>
                                                </tr>
                                            </thead>
                                            <tbody id="sales_receipt_table_tbody">
                                            {this.state.sales_receipt_table_row.map((item, idx) => {
                                                    if(item!=""){
                                                        document.getElementById('destroysales_receipttabledatatable').click();
                                                        rerenderselectpickersaelsreceipt=1;
                                                        var a ="";
                                                        var b ="";
                                                        var c ="";
                                                        var d ="";
                                                        var e ="";
                                                        var f ="";
                                                        var g ="";
                                                        
                                                        var table = document.getElementById("sales_receipt_table");
                                                        a =table.rows[0].cells[0].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : g;
                                                        

                                                        a =table.rows[0].cells[0].innerHTML=="PARTICULARS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px',backgroundColor : 'white !important'}}  id={`ParticularSalesReceipt${parseFloat(idx)+parseFloat(1)}`} disabled  data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100"><option>Cost Center</option><option>Product/Service</option></select></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="PARTICULARS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px',backgroundColor : 'white !important'}}  id={`ParticularSalesReceipt${parseFloat(idx)+parseFloat(1)}`} disabled  data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100"><option>Cost Center</option><option>Product/Service</option></select></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="PARTICULARS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px',backgroundColor : 'white !important'}}  id={`ParticularSalesReceipt${parseFloat(idx)+parseFloat(1)}`} disabled  data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100"><option>Cost Center</option><option>Product/Service</option></select></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="PARTICULARS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px',backgroundColor : 'white !important'}}  id={`ParticularSalesReceipt${parseFloat(idx)+parseFloat(1)}`} disabled  data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100"><option>Cost Center</option><option>Product/Service</option></select></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="PARTICULARS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px',backgroundColor : 'white !important'}}  id={`ParticularSalesReceipt${parseFloat(idx)+parseFloat(1)}`} disabled  data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100"><option>Cost Center</option><option>Product/Service</option></select></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="PARTICULARS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px',backgroundColor : 'white !important'}}  id={`ParticularSalesReceipt${parseFloat(idx)+parseFloat(1)}`} disabled  data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100"><option>Cost Center</option><option>Product/Service</option></select></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="PARTICULARS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><select style={{height : '40px',backgroundColor : 'white !important'}}  id={`ParticularSalesReceipt${parseFloat(idx)+parseFloat(1)}`} disabled  data-columncount={parseFloat(idx)+parseFloat(1)} class="w-100"><option>Cost Center</option><option>Product/Service</option></select></td> : g;
                                                       
                                                        a =table.rows[0].cells[0].innerHTML=="ITEMS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><input type="text" style={{backgroundColor : 'white !important'}} readOnly class="form-control"  id={`cost_center_sales_creciept${parseFloat(idx)+parseFloat(1)}`} /></div></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="ITEMS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><input type="text" style={{backgroundColor : 'white !important'}} readOnly class="form-control"  id={`cost_center_sales_creciept${parseFloat(idx)+parseFloat(1)}`} /></div></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="ITEMS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><input type="text" style={{backgroundColor : 'white !important'}} readOnly class="form-control"  id={`cost_center_sales_creciept${parseFloat(idx)+parseFloat(1)}`} /></div></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="ITEMS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><input type="text" style={{backgroundColor : 'white !important'}} readOnly class="form-control"  id={`cost_center_sales_creciept${parseFloat(idx)+parseFloat(1)}`} /></div></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="ITEMS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><input type="text" style={{backgroundColor : 'white !important'}} readOnly class="form-control"  id={`cost_center_sales_creciept${parseFloat(idx)+parseFloat(1)}`} /></div></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="ITEMS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><input type="text" style={{backgroundColor : 'white !important'}} readOnly class="form-control"  id={`cost_center_sales_creciept${parseFloat(idx)+parseFloat(1)}`} /></div></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="ITEMS"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><input type="text" style={{backgroundColor : 'white !important'}} readOnly class="form-control"  id={`cost_center_sales_creciept${parseFloat(idx)+parseFloat(1)}`} /></div></td> : g;
                                                        
                                                        a =table.rows[0].cells[0].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" readOnly id={`select_product_description_sales_receipt${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0' }}></textarea></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" readOnly id={`select_product_description_sales_receipt${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0' }}></textarea></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" readOnly id={`select_product_description_sales_receipt${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0' }}></textarea></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" readOnly id={`select_product_description_sales_receipt${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0' }}></textarea></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" readOnly id={`select_product_description_sales_receipt${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0' }}></textarea></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" readOnly id={`select_product_description_sales_receipt${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0' }}></textarea></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><textarea class=" w-100" readOnly id={`select_product_description_sales_receipt${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0' }}></textarea></td> : g;
                                                        
                                                        a =table.rows[0].cells[0].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input readOnly type="number" class="form-control"  id={`product_qty_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center',backgroundColor : 'white !important'}} min="1" defaultValue="1" /></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input readOnly type="number" class="form-control"  id={`product_qty_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center',backgroundColor : 'white !important'}} min="1" defaultValue="1" /></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input readOnly type="number" class="form-control"  id={`product_qty_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center',backgroundColor : 'white !important'}} min="1" defaultValue="1" /></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input readOnly type="number" class="form-control"  id={`product_qty_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center',backgroundColor : 'white !important'}} min="1" defaultValue="1" /></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input readOnly type="number" class="form-control"  id={`product_qty_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center',backgroundColor : 'white !important'}} min="1" defaultValue="1" /></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input readOnly type="number" class="form-control"  id={`product_qty_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center',backgroundColor : 'white !important'}} min="1" defaultValue="1" /></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="QTY"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input readOnly type="number" class="form-control"  id={`product_qty_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center',backgroundColor : 'white !important'}} min="1" defaultValue="1" /></td> : g;
                                                        
                                                        a =table.rows[0].cells[0].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" readOnly class="form-control" defaultValue="0" id={`select_product_rate_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px',backgroundColor : 'white'}} required /></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" readOnly class="form-control" defaultValue="0" id={`select_product_rate_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px',backgroundColor : 'white'}} required /></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" readOnly class="form-control" defaultValue="0" id={`select_product_rate_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px',backgroundColor : 'white'}} required /></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" readOnly class="form-control" defaultValue="0" id={`select_product_rate_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px',backgroundColor : 'white'}} required /></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" readOnly class="form-control" defaultValue="0" id={`select_product_rate_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px',backgroundColor : 'white'}} required /></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" readOnly class="form-control" defaultValue="0" id={`select_product_rate_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px',backgroundColor : 'white'}} required /></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="RATE"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><input type="text" readOnly class="form-control" defaultValue="0" id={`select_product_rate_sales_receipt${parseFloat(idx)+parseFloat(1)}`} style={{border : '0',textAlign : 'right', width : '100%', paddingRight : '10px',backgroundColor : 'white'}} required /></td> : g;
                                                        
                                                        a =table.rows[0].cells[0].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount_sales_receipt${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount_sales_receipt${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount_sales_receipt${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount_sales_receipt${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount_sales_receipt${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount_sales_receipt${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="AMOUNT"? <td style={{verticalAlign :'middle',textAlign : 'center'}} title="0.00" id={`total_amount_sales_receipt${parseFloat(idx)+parseFloat(1)}`}>0.00</td> : g;
                                                        
                                                        return[
                                                            <tr key={idx} >
                                                            {a}
                                                            {b}
                                                            {c}
                                                            {d}
                                                            {e}
                                                            {f}
                                                            {g}
                                                            
                                                            </tr>
                                                        ]
                                                    }
                                                })}
                                            </tbody>
                                            
                                        </table>
                                        
                                        <div class="col-md-10 p-0" style={{ textAlign : 'right'}}>
                                            
                                        </div>
                                        <div class="col-md-2 p-0">
                                            <div class="float-left" style={{ display : 'none'}}>
                                                <div class="d-inline-flex">
                                                    <button type="button" class="btn btn-outline-dark rounded mr-1 font14" onClick={this.add_sales_receipt_table_row} id="add_lines_sales_receipt">Add Items</button>
                                                    <button type="button" class="btn btn-outline-dark rounded mr-1 font14" onClick={this.deleteallitemsales_receipt} id="clear_lines_sales_receipt">Clear All Items</button>
                                                </div>
                                            </div>
                                            <div class="float-right mr-5">
                                                <div class="d-inline-flex mr-4">
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-8 p-0" style={{ textAlign : 'right'}}>
                                        </div>
                                        <div class="col-md-4" style={{ textAlign : 'right'}}>
                                            <table class="table table-borderless table-sm">
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}} width="80%"><p class="mb-0 pr-4 text-dark font-weight-bold">Amount Due</p></td>
                                                    <td style={{verticalAlign : 'middle'}} width="20%"><p class="mb-0 text-dark font-weight-bold" id="sales_receipttotal">PHP 0.00</p></td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}}><p class="mb-0 pr-4 text-dark font-weight-bold">Last Payment</p></td>
                                                    <td style={{verticalAlign : 'middle'}}><p class="mb-0 text-dark font-weight-bold" id="last_payment">PHP 0.00</p></td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}}><p class="pr-4 text-dark font-weight-bold">Total</p></td>
                                                    <td style={{verticalAlign : 'middle'}}><p class="text-dark font-weight-bold" id="sales_receiptbalance">PHP 0.00</p></td>
                                                </tr>
                                                <tr>
                                                    <td style={{verticalAlign : 'middle'}}><p class="pr-4 text-dark font-weight-bold">Outstanding Balance</p></td>
                                                    <td style={{verticalAlign : 'middle'}}><p class="text-dark font-weight-bold" id="sales_receiptoutstandingbalance">PHP 0.00</p></td>
                                                </tr>
                                            </table>
                                        </div>
                                                <button type="button" style={{display: 'none'}} id="cashaccount_select"></button>
                                        <div class="col-md-12 p-0 mt-4"  id="CashAccountDivSalesReceipt">
                                            <table class="table table-light">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th colspan="3" style={{verticalAlign : 'middle', textAlign : 'center'}}>Accounts</th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{verticalAlign : 'middle', textAlign : 'center', width : '40%'}}>Account</th>
                                                        <th style={{verticalAlign : 'middle', textAlign : 'center', width : '30%',borderRight : '1px solid #ccc'}}>Debit</th>
                                                        <th style={{verticalAlign : 'middle', textAlign : 'center', width : '30%',borderRight : '1px solid #ccc'}}>Credit</th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        
                                                        <td style={{verticalAlign : 'middle'}} class="p-0">
                                                            <select class="form-control selectpicker" data-live-search="true" name="sales_receipt_account_debit_account"  id="sales_receipt_account_debit_account" required>
                                                            <option value="">--Select--</option>
                                                            {COA_list}
                                                            </select>
                                                            
                                                        </td>
                                                        
                                                        <td style={{verticalAlign : 'middle'}} id="CashAccountFirstTD" class="p-0">
                                                            
                                                            <input type="text" style={{textAlign : 'right'}} id="amountreceived_sr_mask" class="form-control" name="amountreceived_sr_mask" onChange={()=> {this.swap_amounts('amountreceived_sr_mask_c','amountreceived_sr_c');this.maskamountinputsales_receipt('','amountreceived_sr_mask','amountreceived_sr');this.computeoutstanding()}}  placeholder="0.00" defaultValue='0' required />
                                                            
                                                            <input type="hidden"  id="amountreceived_sr"  onChange={()=>this.computeoutstanding()}  name="sr_amount_paid" placeholder="0.00" required />
                                                        </td>
                                                        <td style={{verticalAlign : 'middle'}} class="p-0">
                                                            <input type="text" style={{textAlign : 'right'}} id="amountreceived_sr_mask_c" class="form-control" name="amountreceived_sr_mask_c" onChange={()=> {this.swap_amounts('amountreceived_sr_mask','amountreceived_sr');this.maskamountinputsales_receipt('','amountreceived_sr_mask_c','amountreceived_sr_c');this.computeoutstanding_c()}} placeholder="0.00" defaultValue='0' required />

                                                            <input type="hidden"  id="amountreceived_sr_c" onChange={()=>this.computeoutstanding_c()} defaultValue="0" name="amountreceived_sr_c" placeholder="0.00" required />
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                                <tbody id="additionalCashSalesReceiptTbody">
                                                    
                                                    {this.state.sales_receipt_account_table_row.map((item, idx) => {
                                                        cashaccount_select=1;
                                                        return [
                                                        <tr id={`AdditionalCashTD${parseFloat(idx)+parseFloat(1)}`} key={idx} onMouseOver={()=>this.cashaccount_select()}>
                                                            <td style={{verticalAlign : 'middle'}} class="pl-0">
                                                                <select required class="form-control selectpicker cashaccount_select" data-live-search="true" id={`additionalcashDebitAccount${parseFloat(idx)+parseFloat(1)}`} name={`additionalcashDebitAccount${parseFloat(idx)+parseFloat(1)}`}>
                                                                <option value="">--Select--</option>
                                                                {COA_list}
                                                                </select>
                                                            </td>
                                                            <td style={{textAlign : 'right',verticalAlign : 'middle'}} class="pr-0">
                                                            <input style={{textAlign : 'right'}} class="form-control" onChange={()=> {this.swap_amounts('additionalCashAmount_mask_c'+(parseFloat(idx)+parseFloat(1)),'additionalCashAmount_c'+(parseFloat(idx)+parseFloat(1)));this.maskamountinputsales_receipt('','additionalCashAmount_mask'+(parseFloat(idx)+parseFloat(1)),'additionalCashAmount'+(parseFloat(idx)+parseFloat(1)));this.computeoutstanding()}} type="text" id={`additionalCashAmount_mask${parseFloat(idx)+parseFloat(1)}`} name={`additionalCashAmount_mask${parseFloat(idx)+parseFloat(1)}`}  placeholder="0.00" defaultValue="0" required />

                                                            <input type="hidden" onChange={()=>this.computeoutstanding()} id={`additionalCashAmount${parseFloat(idx)+parseFloat(1)}`} name={`additionalCashAmount${parseFloat(idx)+parseFloat(1)}`} placeholder="0.00"   required />
                                                            </td>
                                                            <td style={{textAlign : 'right',verticalAlign : 'middle'}} class="pr-0">
                                                            <input style={{textAlign : 'right'}} onChange={()=> {this.swap_amounts('additionalCashAmount_mask'+(parseFloat(idx)+parseFloat(1)),'additionalCashAmount'+(parseFloat(idx)+parseFloat(1)));this.maskamountinputsales_receipt('','additionalCashAmount_mask_c'+(parseFloat(idx)+parseFloat(1)),'additionalCashAmount_c'+(parseFloat(idx)+parseFloat(1)));this.computeoutstanding()}} class="form-control" type="text" id={`additionalCashAmount_mask_c${parseFloat(idx)+parseFloat(1)}`} name={`additionalCashAmount_mask_c${parseFloat(idx)+parseFloat(1)}`}  placeholder="0.00" defaultValue="0" required />

                                                            <input type="hidden"  onChange={()=>this.computeoutstanding_c()} id={`additionalCashAmount_c${parseFloat(idx)+parseFloat(1)}`} name={`additionalCashAmount_c${parseFloat(idx)+parseFloat(1)}`} placeholder="0.00"  required />
                                                            </td>
                                                        </tr>
                                                        ]
                                                        

                                                    })}
                                                </tbody>
                                                <tbody>
                                                    <tr>
                                                        <td  style={{verticalAlign : 'middle'}}>
                                                            <input type="hidden" id="hiddentotaldebitamountsalesreceipt" name="hiddentotaldebitamountsalesreceipt" />
                                                            <input type="hidden" id="hiddentotalcredtiamountsalesreceipt" name="hiddentotalcredtiamountsalesreceipt" />
                                                            <button type="button" onClick={this.GenerateAdditionalCashAccountsSalesReceipt} class="btn btn-primary">Add Account</button>
                                                        </td>
                                                        <td  style={{verticalAlign :'middle', textAlign : 'right', fontSize : 'large', fontWeight : 'bold'}} id="TotalDebitSalesReceiptTD">
                                                            Total : 0.00
                                                        </td>
                                                        <td  style={{verticalAlign :'middle', textAlign : 'right', fontSize : 'large', fontWeight : 'bold'}} id="TotalCreditSalesReceiptTD">
                                                            Total : 0.00
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                    
                                        </div> 
                                        
                                        <div class="col-md-12 p-0">
                                            <div class="col-md-6 pl-0">
                                                <p>Message Displayed on Sales Receipt</p>
                                                <textarea rows="3" class="w-100 form-control" name="sr_message"></textarea>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <p>Memo</p>
                                                <textarea rows="3" class="w-100 form-control" name="sr_memo"></textarea>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Cancel</button>
                                    <button id="salesradd" class="btn btn-success rounded" type="submit">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                <div class="modal fade p-0" id="creditnotemodal" tabindex="-1" role="dialog" aria-hidden="true">
                    <button type="button" id="destroycreditnotetabledatatable" style={{display :'none'}}></button>
                    <button type="button" id="setselectpickerbuttoncreditnote" style={{display :'none'}}></button>
                    <button type="button" id="rerenderbuttoncreditnote" style={{display :'none'}}></button>
                    <form onSubmit={this.addCreditNote} class="form-horizontal " id="add_credit_note_form"  autocomplete="off">
                    
                        <input id="transaction_type_credit_note" name="transaction_type_credit_note" value="Credit Note" hidden />
                        <input type="number" id="total_balance_credit_note" step="0.01" name="total_balance_credit_note" hidden />
                        <input id="product_count_credit_note" name="product_count_credit_note" value={this.state.credit_note_item_count} hidden  />
                        <div class="modal-dialog modal-full" role="document" style={{minWidth : '100%',margin : '0'}}>
                            <div class="modal-content" style={{minHeight : '100vh'}}>
                                <div class="modal-header">
                                    <h5 class="modal-title">Credit Note</h5>
                                    <button type="button" class="close" data-dismiss="modal" id="creditnotemodalclose" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div class="modal-body p-4" id="result">
                                    <div class="col-md-12 p-0 mb-4">
                                        <div class="col-md-12 p-0 " style={{marginBottom : '20px'}}>
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Credit Note No</p>
                                                <input type="text" value={this.state.credit_note_no_state} onChange={(event)=>this.set_credit_note_no(event)} name="credit_note_no" id="credit_note_no" class="w-100 form-control" required />
                                                
                                            </div>
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Credit Note Date</p>
                                                <input type="date" name="cn_date" id="cn_date" class="w-100 form-control" required />
                                            </div>
                                            <div class="col-md-8 p-0 d-inline-flex justify-content-end" style={{textAlign : 'center'}}>
                                                <h4 class="mr-2">BALANCE DUE: </h4>
                                                <h4 id="big_credit_notebalance" style={{paddingRight : '5%'}}>PHP 0.00</h4>
                                            </div>
                                        </div>
                                        <div class="my-3 p-0">
                                            <div class="col-md-3 p-0 pr-3">
                                                <p>Customer</p>
                                                <select id="creditncustomer" onChange={(event)=>this.fetch_customer_info('cn_bill_address','','cn_email',event.target.value,'big_credit_notebalance','credit_notebalance')} name="cn_customer" class=" form-control selectpicker " data-live-search="true" required>
                                                <option value="">--Select Name--</option>
                                                    {customer_list}
                                                </select>
                                            </div>
                                            <div class="col-md-3 p-0 pr-3" style={{display : 'none'}}>
                                                <p>Email</p>
                                                <input type="text" name="cn_email" id="cn_email" placeholder="Email (Separate emails with a comma)" class="w-100" />
                                                
                                                <div class="float-left">
                                                    <input type="checkbox" name="cn_send_later" /> Send Now
                                                </div>
                                                <div class="float-right">
                                                    <p class="text-info" ></p>
                                                </div>
                                            </div>
                                            <div class="col-md-2 p-0 pr-3" >
                                                <p>Cost Center</p>
                                                <select name="CostCenterCreditNote" onchange="EnableCreditNoteInput(this)" id="CostCenterCreditNote" class="w-100 form-control selectpicker"  data-live-search="true">
                                                    <option value="">--Select Cost Center--</option>
                                                    {cost_center_list}
                                                </select>
                                            </div>
                                            
                                            
                                        </div>
                                        
                                        <div class="col-md-12 p-0 " style={{marginBottom : '20px'}}>
                                            <div class="col-md-4 p-0 pr-3">
                                                <p>Billing Address</p>
                                                <input type="text" name="cn_bill_address" id="cn_bill_address" class="w-100 form-control" required />
                                            </div>
                                            
                                            
                                            
                                        </div>
                                        <table class="table table-bordered table-responsive-md table-light text-left font14" id="credit_note_table">
                                            <thead className="header-light">
                                                <tr>
                                                    <th class="text-center">#</th>
                                                    <th class="text-center">PRODUCT/SERVICE</th>
                                                    <th class="text-center" width="30%">DESCRIPTION</th>
                                                    <th class="text-center" width="10%">QTY</th>
                                                    <th class="text-center" width="15%">RATE</th>
                                                    <th class="text-center" width="15%">AMOUNT</th>
                                                    <th class="text-center"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="credit_note_table_tbody">
                                                {this.state.credit_note_table_row.map((item, idx) => {
                                                    var a ="";
                                                    var b ="";
                                                    var c ="";
                                                    var d ="";
                                                    var e ="";
                                                    var f ="";
                                                    var g ="";
                                                    var table = document.getElementById("credit_note_table");
                                                    document.getElementById('destroycreditnotetabledatatable').click();
                                                    rerenderselectpickercreditnote=1;
                                                    a =table.rows[0].cells[0].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : g;
                                                    
                                                    a =table.rows[0].cells[0].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="form-control" data-live-search="true" id={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="form-control" data-live-search="true" id={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="form-control" data-live-search="true" id={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="form-control" data-live-search="true" id={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="form-control" data-live-search="true" id={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="form-control" data-live-search="true" id={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="form-control" data-live-search="true" id={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_credit_note${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : g;

                                                    a =table.rows[0].cells[0].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : g;

                                                    a =table.rows[0].cells[0].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_credit_note${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : g;
                                                    
                                                    a =table.rows[0].cells[0].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeCreditNoteItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : g;

                                                    a =table.rows[0].cells[0].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_credit_note${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : g;

                                                    a =table.rows[0].cells[0].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.credit_note_table_row.length?<a href="#" onClick={()=>this.deleteItemecredit_note(idx)}   id={`delete_product_credit_note${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : a;
                                                    b =table.rows[0].cells[1].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.credit_note_table_row.length?<a href="#" onClick={()=>this.deleteItemecredit_note(idx)}   id={`delete_product_credit_note${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : b;
                                                    c =table.rows[0].cells[2].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.credit_note_table_row.length?<a href="#" onClick={()=>this.deleteItemecredit_note(idx)}   id={`delete_product_credit_note${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : c;
                                                    d =table.rows[0].cells[3].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.credit_note_table_row.length?<a href="#" onClick={()=>this.deleteItemecredit_note(idx)}   id={`delete_product_credit_note${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : d;
                                                    e =table.rows[0].cells[4].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.credit_note_table_row.length?<a href="#" onClick={()=>this.deleteItemecredit_note(idx)}   id={`delete_product_credit_note${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : e;
                                                    f =table.rows[0].cells[5].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.credit_note_table_row.length?<a href="#" onClick={()=>this.deleteItemecredit_note(idx)}   id={`delete_product_credit_note${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : f;
                                                    g =table.rows[0].cells[6].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.credit_note_table_row.length?<a href="#" onClick={()=>this.deleteItemecredit_note(idx)}   id={`delete_product_credit_note${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : g;
                                                    
                                                    return [
                                                        <tr key={idx} onMouseMove={()=>this.refreshselecpickerselectscreditnote()}>
                                                            {a}
                                                            {b}
                                                            {c}
                                                            {d}
                                                            {e}
                                                            {f}
                                                            {g}
                                                        </tr>
                                                    ]
                                                })}
                                            </tbody>
                                        </table>
                                        <div class="col-md-12 p-0 mt-2">
                                            <div class="float-left">
                                                <div class="d-inline-flex">
                                                    <button type="button" class="btn btn-outline-dark rounded mr-1 font14" onClick={this.add_item_credit_note} id="add_lines_credit_note">Add Items</button>
                                                    <button type="button" class="btn btn-outline-dark rounded mr-1 font14" onClick={this.deleteallitemcredit_note} id="clear_lines_credit_note">Clear All Items</button>
                                                </div>
                                            </div>
                                            <div class="float-right mr-5">
                                                <div class="d-inline-flex mr-4">
                                                    <p class="mb-0 pr-4 text-dark font-weight-bold">TOTAL</p>
                                                    <p class="mb-0 text-dark font-weight-bold" id="credit_notetotal">PHP 0.00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 p-0">
                                            <div class="float-right mr-5">
                                                <div class="d-inline-flex mr-4">
                                                    <p class="pr-4 text-dark font-weight-bold">BALANCE DUE</p>
                                                    <p class="text-dark font-weight-bold" id="credit_notebalance">PHP 0.00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 p-0">
                                            <div class="col-md-6 pl-0">
                                                <p>Message Displayed on Credit Note</p>
                                                <textarea rows="3" class="w-100 form-control" name="cn_message"></textarea>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <p>Memo</p>
                                                <textarea rows="3" class="w-100 form-control" name="cn_memo"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-12 p-0 mt-4">
                                            <table class="table table-light">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th colspan="2" style={{verticalAlign :'middle', textAlign : 'center'}}>Accounts</th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{verticalAlign :'middle', textAlign : 'center',borderRight : '1px solid #ccc'}}>Debit</th>
                                                        <th style={{verticalAlign :'middle', textAlign : 'center'}}>Credit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{verticalAlign :'middle'}} class="pl-0">
                                                            <select class="form-control selectpicker"  data-live-search="true" name="credit_note_account_debit_account"  id="credit_note_account_debit_account" required>
                                                            <option value="">--Select Account--</option>
                                                            {COA_list}
                                                            </select>
                                                        </td>
                                                        <td style={{verticalAlign :'middle'}} class="pr-0">
                                                            <select class="form-control selectpicker"  data-live-search="true" name="credit_note_account_credit_account"  id="credit_note_account_credit_account" required>
                                                            <option value="">--Select Account--</option>
                                                            {COA_list}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div> 
                                        
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Cancel</button>
                                    <button type="submit" id="creditnadd" class="btn btn-success rounded" type="submit">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                <div class="modal fade p-0" id="estimatemodal" tabindex="-1" role="dialog" aria-hidden="true">
                    <button type="button" id="destroyestimatetabledatatable" style={{display :'none'}}></button>
                    <button type="button" id="setselectpickerbuttonestimate" style={{display :'none'}}></button>
                    <button type="button" id="rerenderbuttonestimate" style={{display :'none'}}></button>
                    
		            
                    <form onSubmit={this.AddEstimate} class="form-horizontal " id="add_estimate_form">
                    
                        <input id="transaction_type_estimate" name="transaction_type_estimate" value="Estimate" hidden />
                        <input id="product_count_estimate" name="product_count_estimate" value={this.state.estimate_item_count} hidden />
                        <input type="number" id="total_balance_estimate" step="0.01" name="total_balance_estimate"  hidden />
                        <div class="modal-dialog modal-full" role="document" style={{minWidth : '100%', margin : '0'}}>
                            <div class="modal-content" style={{minHeight : '100vh'}}>
                                <div class="modal-header">
                                    <h5 class="modal-title">Estimate</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div class="modal-body p-4" id="result">
                                    <div class="col-md-12 p-0 mb-4">
                                        <div class="col-md-12 p-0 " style={{marginBottom : '20px'}}>
                                            <div class="col-md-2 p-0 pr-3"> 
                                                <p>Estimate No</p>
                                                
                                                <input id="estimate_no" type="text" value={this.state.estimate_no_state} onChange={(event)=>this.set_estimate_no(event)} name="estimate_no" class="w-100 form-control"  required />
                                                
                                            </div>
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Estimate Date</p>
                                                <input type="date" name="e_date" id="e_date" class="w-100 form-control" required />
                                            </div>
                                            <div class="col-md-2 p-0 pr-3">
                                                <p>Expiration Date</p>
                                                <input type="date" name="e_due_date" id="e_due_date" class="w-100 form-control" required />
                                            </div>
                                            
                                            <div class="col-md-6 p-0 d-inline-flex justify-content-end" style={{textAlign : 'center'}}>
                                                <h4 class="mr-2">BALANCE DUE: </h4>
                                                <h3 id="big_estimatebalance" style={{paddingRight : '5%'}}>PHP 0.00</h3>
                                            </div>
                                        </div>
                                        <div class="my-3 p-0">
                                            <div class="col-md-3 p-0 pr-3">
                                                <p>Customer</p>
                                                <select id="estimatecustomer" onChange={(event)=>this.fetch_customer_info('e_bill_address','','e_email',event.target.value,'big_estimatebalance','estimatebalance')}  name="e_customer" class="w-100 selectpicker " data-live-search="true" required >
                                                <option value="">--Select Name--</option>
                                                    {customer_list}
                                                </select>
                                                
                                            </div>
                                            <div class="col-md-3 p-0 pr-3" style={{display : 'none'}}>
                                                <p>Email</p>
                                                <input type="text" name="e_email" id="e_email" placeholder="Email (Separate emails with a comma)" class="w-100" />
                                                
                                                <div class="float-left">
                                                    <input type="checkbox" name="e_send_later" id="e_send_later" /> Send Now
                                                </div>
                                                <div class="float-right">
                                                    <p class="text-info" style={{marginBottom : '0px'}}></p>
                                                </div>
                                            </div>
                                            <div class="col-md-4 p-0 pr-3" style={{marginBottom : '20px'}}>
                                                <p>Billing Address</p>
                                                <input type="text" name="e_bill_address" id="e_bill_address" class="w-100 form-control" required />
                                            </div>
                                        </div>
                                        
                                        <table class="table table-bordered table-light table-responsive-md text-left font14" id="estimate_table">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th class="text-left">#</th>
                                                    <th class="text-left">PRODUCT/SERVICE</th>
                                                    <th class="text-left" width="40%">DESCRIPTION</th>
                                                    <th class="text-center" width="10%">QTY</th>
                                                    <th class="text-left" width="15%">RATE</th>
                                                    <th class="text-left" width="15%">AMOUNT</th>
                                                    <th class="text-center"></th>
                                                </tr>
                                            </thead>
                                            <tbody  id="estimate_table_tbody">
                                                {this.state.estimate_table_row.map((item, idx) => {
                                                    var a ="";
                                                    var b ="";
                                                    var c ="";
                                                    var d ="";
                                                    var e ="";
                                                    var f ="";
                                                    var g ="";
                                                    var table = document.getElementById("estimate_table");
                                                    document.getElementById('destroyestimatetabledatatable').click();
                                                    rerenderselectpickerestimate=1;
                                                    a =table.rows[0].cells[0].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="#"? <td style={{verticalAlign :'middle',textAlign : 'center'}}>{parseFloat(idx)+parseFloat(1)}</td> : g;
                                                    
                                                    a =table.rows[0].cells[0].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="selectpicker" data-live-search="true" id={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="selectpicker" data-live-search="true" id={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="selectpicker" data-live-search="true" id={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="selectpicker" data-live-search="true" id={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="selectpicker" data-live-search="true" id={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="selectpicker" data-live-search="true" id={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="PRODUCT/SERVICE"? <td style={{verticalAlign :'middle'}}><select style={{border : '0',width : '100%'}} class="selectpicker" data-live-search="true" id={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name_estimate${parseFloat(idx)+parseFloat(1)}`}><option value=""></option>{products_and_services_list}</select></td> : g;

                                                    a =table.rows[0].cells[0].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="DESCRIPTION"? <td style={{verticalAlign :'middle'}}><input class="form-control" id={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_description_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0'}} /></td> : g;

                                                    a =table.rows[0].cells[0].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="QTY"? <td style={{verticalAlign :'middle'}}><input type="number" class=" form-control" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} name={`product_qty_estimate${parseFloat(idx)+parseFloat(1)}`} style={{border : '0', textAlign : 'center'}} defaultValue="1" /></td> : g;
                                                    
                                                    a =table.rows[0].cells[0].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="RATE"? <td style={{verticalAlign :'middle'}}><input class="form-control estimate_data product_rate_estimate" defaultValue="0" onChange={()=>this.computeEstimateItemTotal(parseFloat(idx)+parseFloat(1))} id={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`} name={`select_product_rate_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{border : '0', textAlign : 'right', backgroundColor : 'white !important'}}/></td> : g;

                                                    a =table.rows[0].cells[0].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : a;
                                                    b =table.rows[0].cells[1].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : b;
                                                    c =table.rows[0].cells[2].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : c;
                                                    d =table.rows[0].cells[3].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : d;
                                                    e =table.rows[0].cells[4].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : e;
                                                    f =table.rows[0].cells[5].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : f;
                                                    g =table.rows[0].cells[6].innerHTML=="AMOUNT"? <td className="text-right pt-3-half pr-3" title="0.00"  id={`total_amount_estimate${parseFloat(idx)+parseFloat(1)}`}  style={{verticalAlign :'middle'}}>0.00</td> : g;

                                                    a =table.rows[0].cells[0].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.estimate_table_row.length?<a href="#" onClick={()=>this.deleteItemestimate(idx)}   id={`delete_product_estimate${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : a;
                                                    b =table.rows[0].cells[1].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.estimate_table_row.length?<a href="#" onClick={()=>this.deleteItemestimate(idx)}   id={`delete_product_estimate${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : b;
                                                    c =table.rows[0].cells[2].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.estimate_table_row.length?<a href="#" onClick={()=>this.deleteItemestimate(idx)}   id={`delete_product_estimate${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : c;
                                                    d =table.rows[0].cells[3].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.estimate_table_row.length?<a href="#" onClick={()=>this.deleteItemestimate(idx)}   id={`delete_product_estimate${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : d;
                                                    e =table.rows[0].cells[4].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.estimate_table_row.length?<a href="#" onClick={()=>this.deleteItemestimate(idx)}   id={`delete_product_estimate${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : e;
                                                    f =table.rows[0].cells[5].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.estimate_table_row.length?<a href="#" onClick={()=>this.deleteItemestimate(idx)}   id={`delete_product_estimate${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : f;
                                                    g =table.rows[0].cells[6].innerHTML==""? <td style={{verticalAlign :'middle', textAlign :'center'}}>{parseFloat(idx)+parseFloat(1)==this.state.estimate_table_row.length?<a href="#" onClick={()=>this.deleteItemestimate(idx)}   id={`delete_product_estimate${parseFloat(idx)+parseFloat(1)}`} ><span class="fa fa-trash delete_product_estimate"></span></a> : '' }</td> : g;
                                                    
                                                    return [
                                                        <tr key={idx} onMouseMove={()=>this.refreshselecpickerselectsestimate()}>
                                                            {a}
                                                            {b}
                                                            {c}
                                                            {d}
                                                            {e}
                                                            {f}
                                                            {g}
                                                        </tr>
                                                    ]
                                                })}
                                            </tbody>
                                            
                                        </table>
                                        <div class="col-md-12 p-0 mt-2">
                                            <div class="float-left">
                                                <div class="d-inline-flex">
                                                    <button type="button" class="btn btn-outline-dark rounded mr-1 font14" onClick={this.add_item_estimate} id="add_lines_estimate">Add Items</button>
                                                    <button type="button" class="btn btn-outline-dark rounded mr-1 font14" onClick={this.deleteallitemestimate} id="clear_lines_estimate">Clear All Items</button>
                                                    
                                                </div>
                                            </div>
                                            <div class="float-right mr-5">
                                                <div class="d-inline-flex mr-4">
                                                    <p class="mb-0 pr-4 text-dark font-weight-bold">TOTAL</p>
                                                    <p class="mb-0 text-dark font-weight-bold" id="estimatetotal">PHP 0.00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 p-0">
                                            <div class="float-right mr-5">
                                                <div class="d-inline-flex mr-4">
                                                    <p class="pr-4 text-dark font-weight-bold">BALANCE DUE</p>
                                                    <p class="text-dark font-weight-bold" id="estimatebalance">PHP 0.00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 p-0">
                                            <div class="col-md-6 pl-0">
                                                <p>Message Displayed on Estimate</p>
                                                <textarea rows="3" class="w-100 form-control" name="e_note" id="e_note"></textarea>
                                            </div>
                                            <div class="col-md-6 pr-0">
                                                <p>Memo</p>
                                                <textarea rows="3" class="w-100 form-control" name="e_memo" id="e_memo"></textarea>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary rounded" data-dismiss="modal">Cancel</button>
                                    <button id="estimateadd" class="btn btn-success rounded" type="submit">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                <div className="modal fade p-0" id="invoicemodal" tabindex="-1" role="dialog" aria-hidden="true" >
                <button type="button" style={{display : 'none'}} id="setselectpickerbuttoninvoice"></button>
                <button type="button" style={{display : 'none'}} id="rerenderbuttoninvoice"></button>
                <button type="button" style={{display : 'none'}} id="rerenderbuttonsalesreceipt"></button>
                
                <button type="button" style={{display : 'none'}} id="setselectpickerinvoicedebitcode"></button>
                            <button type="button" style={{display : 'none'}} id="setselectpickerinvoicedebitcodecode"></button>
                            <button type="button" style={{display : 'none'}} id="setselectpickerinvoicecredtitcode"></button>
                            <button type="button" style={{display : 'none'}} id="setselectpickerinvoicecredtitcodecode"></button>
                            <button type="button" style={{display : 'none'}} id="estimatetoinvoicebtn"></button>
                            
                    <form onSubmit={this.AddInvoice} className="form-horizontal " id="add_invoice_form" >
                            
                        <input id="transaction_type" name="transaction_type" value="Invoice" hidden />
                        <input id="product_count" name="product_count" value={this.state.invoice_item_count} hidden />
                        <input type="number" step="0.01" id="total_balance" name="total_balance"  hidden />
                        <input type="number" id="sales_transaction_number_estimate" name="sales_transaction_number_estimate"  hidden />
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

                                                        a =table.rows[0].cells[0].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker select_product_name" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : a;
                                                        b =table.rows[0].cells[1].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker select_product_name" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : b;
                                                        c =table.rows[0].cells[2].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker select_product_name" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : c;
                                                        d =table.rows[0].cells[3].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker select_product_name" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : d;
                                                        e =table.rows[0].cells[4].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker select_product_name" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : e;
                                                        f =table.rows[0].cells[5].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker select_product_name" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : f;
                                                        g =table.rows[0].cells[6].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker select_product_name" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : g;
                                                        h =table.rows[0].cells[7].innerHTML=="ITEM"? <td style={{verticalAlign :'middle',textAlign : 'center'}}><div class="ProductServicesInvoiceItemDivClass" id={`ProductServicesInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} style={{display :'none'}}><select style={{border : '0', width :'100%'}} class="selectpicker select_product_name" data-live-search="true" id={`select_product_name${parseFloat(idx)+parseFloat(1)}`} name={`select_product_name${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select--</option>{products_and_services_list}</select></div><div id={`CostCenterInvoiceItemDiv${parseFloat(idx)+parseFloat(1)}`} class="CostCenterInvoiceItemDivClass"><select required name={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} class="w-100 selectpicker" data-live-search="true" id={`CostCenterInvoice${parseFloat(idx)+parseFloat(1)}`} ><option value="">--Select Cost Center--</option>{cost_center_list}</select></div></td> : h;

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
                                                <tbody>
                                                <tr>
                                                    
                                                    <td style={{verticalAlign : 'middle', textAlign : 'right', fontSize : '1em'}}><p style={{fontSize :'1.3em !important'}} className="mb-0 pr-4 text-dark font-weight-bold">TOTAL</p></td>
                                                    <td style={{verticalAlign : 'middle', textAlign : 'right', fontSize : '1em'}}><p style={{fontSize :'1.3em !important'}} id="invoicetotal" className="mb-0 text-dark font-weight-bold">PHP 0.00</p></td>
                                                    
                                                </tr>
                                                <tr>
                                                    
                                                    <td style={{verticalAlign : 'middle', textAlign : 'right', fontSize : '1em'}}><p style={{fontSize :'1.3em !important'}}className="pr-4 text-dark font-weight-bold">BALANCE DUE</p></td>
                                                    <td style={{verticalAlign : 'middle', textAlign : 'right', fontSize : '1em'}}><p style={{fontSize :'1.3em !important'}} id="invoicebalance" className="text-dark font-weight-bold">PHP 0.00</p></td>
                                                    
                                                </tr>
                                                </tbody>
                                                
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

