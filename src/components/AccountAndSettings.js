import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/index.css';
import '../css/setting.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import {number_format} from '../Helper';
class AccountAndSettings extends React.Component{
    state ={
        bank_list : [],
        company_setting: [],
        update_counter : 1,
        tab : 1,
        data: [],
        coa_list: [],
        term : '',
        company_name : '',
        legal_name : '',
        business_id_no : '',
        com_tin_no : '',
        tax_form : '',
        industry : '',
        company_email : '',
        customer_facing_email : '',
        company_phone : '',
        website : '',
        company_address : '',
        postal1 : '',
        customer_facing_address : '',
        postal2 : '',
        legal_address : '',
        postal3 : '',
        shipping : '',
        show_product_column : 'Off',
        preferred_bedit_cheque_account : '25',
        show_sku_column: '',
        track_quantity_and_price : '',
        track_quantity_on_hand : '',
        show_items_table : '',
        track_expense_and_item_by_customer : '',
        billable: '',
        bill_payment_terms : '',
        use_purchase_order : '',
        purchase_order_email_message : '',
        numbering_sales_exp: '1001',
        numbering_bill_invoice_main: '1001',
        numbering_sales_invoice_branch: '1001',
        numbering_bill_invoice_branch: '1001',
        numbering_estimate: '1001',
        numbering_credit_note: '1001',
        numbering_sales_receipt: '1001',
        numbering_bill: '1001',
        numbering_suppliers_credit: '1001',
        numbering_cash_voucher: '1',
        numbering_cheque_voucher: '1',
        useCostCenter: 'On',
        first_month_of_fiscal_year: 'January',
        first_month_of_tax_year: 'January',
        accounting_method: 'Accrual',
        close_book: 'On',
        end_month_of_fiscal_year: 'December',
        ad_beg_bal_shown: '0.00',
        ad_beg_bal: '0',
        enable_acc_number: 'On',
        date_format: 'mm-dd-yyy',
        number_format: '123,456.00',
        inactive_time: '30',
        BankNameInput : '',
        BankBranchInput : '',
        BankCodeInput : '',
        AccountNoInput : '',
        RemarkTextAreaBank : '',
        BankNoHidden : '',
        BankNameInputedit : '',
        BankBranchInputEdit : '',
        BankCodeInputedit : '',
        AccountNoInputedit : '',
        RemarkTextAreaBankedit : '',
    }
    submitCompanySetting = async (event) =>{
        event.preventDefault();
        console.log('company form submitted');
        var bodyFormData = new FormData();
        bodyFormData.set('company_name', this.state.company_name);
        bodyFormData.set('legal_name', this.state.legal_name);
        bodyFormData.set('business_id_no', this.state.business_id_no);
        bodyFormData.set('com_tin_no', this.state.com_tin_no);
        bodyFormData.set('tax_form', this.state.tax_form);
        bodyFormData.set('industry', this.state.industry);
        bodyFormData.set('company_email', this.state.company_email);
        bodyFormData.set('customer_facing_email', this.state.customer_facing_email);
        bodyFormData.set('company_phone', this.state.company_phone);
        bodyFormData.set('website', this.state.website);
        bodyFormData.set('company_address', this.state.company_address);
        bodyFormData.set('postal1', this.state.postal1);
        bodyFormData.set('customer_facing_address', this.state.customer_facing_address);
        bodyFormData.set('postal2', this.state.postal2);
        bodyFormData.set('legal_address', this.state.legal_address);
        bodyFormData.set('postal3', this.state.postal3);
        var imagefile = document.querySelector('#esignatory');
        bodyFormData.append("esignatory", imagefile.files[0]);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_setting_company',bodyFormData);
        console.log(response.data);
        this.setState({tab : 1, update_counter: this.state.update_counter++})
        document.getElementById('reset_default').click();
    }
    submitSalesSetting = async (event) =>{
        event.preventDefault();
        console.log('sales form submitted');
        var bodyFormData = new FormData();
        bodyFormData.set('show_product_column', this.state.show_product_column);
        bodyFormData.set('preferred_bedit_cheque_account', this.state.preferred_bedit_cheque_account);
        bodyFormData.set('show_sku_column', this.state.show_sku_column);
        bodyFormData.set('track_quantity_and_price', this.state.track_quantity_and_price);
        bodyFormData.set('track_quantity_on_hand', this.state.track_quantity_on_hand);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_setting_sales',bodyFormData);
        console.log(response.data);
        this.setState({tab : 2, update_counter: this.state.update_counter++})
        document.getElementById('reset_default').click();
    }
    submitExpenseSetting = async (event) =>{
        event.preventDefault();
        console.log('sales form submitted');
        var bodyFormData = new FormData();
        bodyFormData.set('show_items_table', this.state.show_items_table);
        bodyFormData.set('track_expense_and_item_by_customer', this.state.track_expense_and_item_by_customer);
        bodyFormData.set('billable', this.state.billable);
        bodyFormData.set('bill_payment_terms', this.state.bill_payment_terms);
        bodyFormData.set('use_purchase_order', this.state.use_purchase_order);
        bodyFormData.set('purchase_order_email_message', this.state.purchase_order_email_message);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_setting_expense',bodyFormData);
        console.log(response.data);
        
        this.setState({tab : 3, update_counter: this.state.update_counter++})
        document.getElementById('reset_default').click();
    }
    submitAdvanceSetting = async (event) =>{
        event.preventDefault();
        console.log('advance form submitted');
        var bodyFormData = new FormData();
        bodyFormData.set('numbering_sales_exp', this.state.numbering_sales_exp);
        bodyFormData.set('numbering_bill_invoice_main', this.state.numbering_bill_invoice_main);
        bodyFormData.set('numbering_sales_invoice_branch', this.state.numbering_sales_invoice_branch);
        bodyFormData.set('numbering_bill_invoice_branch', this.state.numbering_bill_invoice_branch);
        bodyFormData.set('numbering_estimate', this.state.numbering_estimate);
        bodyFormData.set('numbering_credit_note', this.state.numbering_credit_note);
        bodyFormData.set('numbering_sales_receipt', this.state.numbering_sales_receipt);
        bodyFormData.set('numbering_bill', this.state.numbering_bill);
        bodyFormData.set('numbering_suppliers_credit', this.state.numbering_suppliers_credit);
        bodyFormData.set('numbering_cash_voucher', this.state.numbering_cash_voucher);
        bodyFormData.set('numbering_cheque_voucher', this.state.numbering_cheque_voucher);
        bodyFormData.set('useCostCenter', this.state.useCostCenter);
        bodyFormData.set('first_month_of_fiscal_year', this.state.first_month_of_fiscal_year);
        bodyFormData.set('first_month_of_tax_year', this.state.first_month_of_tax_year);
        bodyFormData.set('accounting_method', this.state.accounting_method);
        bodyFormData.set('close_book', this.state.close_book);
        bodyFormData.set('end_month_of_fiscal_year', this.state.end_month_of_fiscal_year);
        bodyFormData.set('ad_beg_bal_shown', this.state.ad_beg_bal_shown);
        bodyFormData.set('ad_beg_bal', this.state.ad_beg_bal);
        bodyFormData.set('enable_acc_number', this.state.enable_acc_number);
        bodyFormData.set('date_format', this.state.date_format);
        bodyFormData.set('number_format', this.state.number_format);
        bodyFormData.set('inactive_time', this.state.inactive_time);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_setting_advance',bodyFormData);
        console.log(response.data);
        
        this.setState({tab : 4, update_counter: this.state.update_counter++})
        document.getElementById('reset_default').click();
    }
    save_new_bank = async (event) =>{
        event.preventDefault();
        console.log('Bank form submitted');
        var bodyFormData = new FormData();
        bodyFormData.set('BankNameInput', this.state.BankNameInput);
        bodyFormData.set('BankBranchInput', this.state.BankBranchInput);
        bodyFormData.set('BankCodeInput', this.state.BankCodeInput);
        bodyFormData.set('AccountNoInput', this.state.AccountNoInput);
        bodyFormData.set('RemarkTextAreaBank', this.state.RemarkTextAreaBank);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/add_bank',bodyFormData);
        console.log(response.data);
        
        this.setState({tab : 5, update_counter: this.state.update_counter++})
        document.getElementById('newbankreset').click();
        document.getElementById('reset_default').click();
    }
    save_edited_bank_info = async (event) =>{
        event.preventDefault();
        console.log('Bank edit form submitted');
        var bodyFormData = new FormData();
        bodyFormData.set('BankNoHidden', this.state.BankNoHidden);
        bodyFormData.set('BankNameInputedit', this.state.BankNameInputedit);
        bodyFormData.set('BankBranchInputEdit', this.state.BankBranchInputEdit);
        bodyFormData.set('BankCodeInputedit', this.state.BankCodeInputedit);
        bodyFormData.set('AccountNoInputedit', this.state.AccountNoInputedit);
        bodyFormData.set('RemarkTextAreaBankedit', this.state.RemarkTextAreaBankedit);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_bank',bodyFormData);
        console.log(response.data);
        
        this.setState({tab : 5, update_counter: this.state.update_counter++})
        alert('Bank Info Update Successfully Requested');
        document.getElementById('EditBankCloseBtn').click();
    }
    delete_bank = async (bank_id) => {
        var bodyFormData = new FormData();
        bodyFormData.set('bank_id', bank_id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_bank',bodyFormData);
        
        alert('Bank Delete Reqeust successfully submitted');
        
        
    }
    getCOADebitCheque = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getAccount',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({coa_list : response.data});
        document.getElementById('refresh_debit_cheque_account_select').click();
       
        
    }
    getSettingCompany = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getSettingCompany',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({company_name : response.data.company_name});
        this.setState({legal_name : response.data.company_legal_name});
        this.setState({business_id_no : response.data.company_business_id_no});
        this.setState({com_tin_no : response.data.company_tin_no});
        this.setState({tax_form : response.data.company_tax_form});
        this.setState({industry : response.data.company_industry});
        this.setState({company_email : response.data.company_email});
        this.setState({customer_facing_email : response.data.company_customer_facing_email});
        this.setState({company_phone : response.data.company_phone});
        this.setState({website : response.data.company_website});
        this.setState({company_address : response.data.company_address});
        this.setState({postal1 : response.data.company_address_postal});
        this.setState({customer_facing_address : response.data.company_customer_facing_address});
        this.setState({postal2 : response.data.facing_postal});
        this.setState({legal_address : response.data.company_legal_address});
        this.setState({postal3 : response.data.legal_postal});
    }
    getSettingSales = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getSettingSales',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({show_product_column : response.data.sales_show_product_column});
        this.setState({preferred_bedit_cheque_account : response.data.sales_sales_receipt_preferred_debit_cheque_account});
        this.setState({show_sku_column : response.data.sales_show_sku_column});
        this.setState({track_quantity_and_price : response.data.sales_track_quantity_and_price});
        this.setState({track_quantity_on_hand : response.data.sales_track_quantity_on_hand});
        document.getElementById('refresh_debit_cheque_account_select').click();
    }
    getSettingExpense = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getSettingExpense',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({show_items_table : response.data.expenses_show_items_table});
        this.setState({track_expense_and_item_by_customer : response.data.expenses_track_expense_and_item_by_customer});
        this.setState({billable : response.data.expenses_billable});
        this.setState({bill_payment_terms : response.data.expenses_bill_payment_terms});
        this.setState({use_purchase_order : response.data.expenses_use_purchase_order});
        this.setState({purchase_order_email_message : response.data.expenses_purchase_order_email_message});
        
    }
    getSettingAdvance = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getSettingAdvance',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({first_month_of_fiscal_year : response.data.advance_first_month_of_fiscal_year});
        this.setState({first_month_of_tax_year : response.data.advance_first_month_of_tax_year});
        this.setState({accounting_method : response.data.advance_accounting_method});
        this.setState({close_book : response.data.advance_close_book});
        this.setState({end_month_of_fiscal_year : response.data.advance_end_month_of_fiscal_year});
        this.setState({ad_beg_bal_shown : number_format(response.data.advance_beginning_balance,2)});
        this.setState({ad_beg_bal : response.data.advance_beginning_balance});
        this.setState({enable_acc_number : response.data.advance_enable_acc_number});
        this.setState({date_format : response.data.advance_date_format});
        this.setState({number_format : response.data.advance_number_format});
        this.setState({inactive_time : response.data.advance_inactive_time}); 
    }
    getSettingAdvanceNumberring = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getSettingAdvanceNumberring',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({numbering_sales_exp : response.data.sales_exp_start_no});
        this.setState({numbering_bill_invoice_main : response.data.numbering_bill_invoice_main});
        this.setState({numbering_sales_invoice_branch : response.data.numbering_sales_invoice_branch});
        this.setState({numbering_bill_invoice_branch : response.data.numbering_bill_invoice_branch});
        this.setState({numbering_estimate : response.data.estimate_start_no});
        this.setState({numbering_credit_note : response.data.credit_note_start_no});
        this.setState({numbering_sales_receipt : response.data.sales_receipt_start_no});
        this.setState({numbering_bill : response.data.bill_start_no});
        this.setState({numbering_suppliers_credit : response.data.suppliers_credit_start_no});
        this.setState({numbering_cash_voucher : response.data.cash_voucher_start_no});
        this.setState({numbering_cheque_voucher : response.data.cheque_voucher_start_no});
        this.setState({useCostCenter : response.data.use_cost_center});
    }
    getBankList = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getBanks',{
            params:{
                query: props
            },
            crossDomain: true
        });
        this.setState({bank_list : response.data});
        this.setState({BankNameInput : ''});
        this.setState({BankBranchInput : ''});
        this.setState({BankCodeInput : ''});
        this.setState({AccountNoInput : ''});
        this.setState({RemarkTextAreaBank : ''});
        
    }
    getBankInfo = async (bank_id) =>{
        
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getBankInfo',{
            params:{
                bank_id: bank_id
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({BankNoHidden : response.data.bank_no});
        this.setState({BankNameInputedit :  response.data.bank_name});
        this.setState({BankBranchInputEdit :  response.data.bank_branch});
        this.setState({BankCodeInputedit :  response.data.bank_code});
        this.setState({AccountNoInputedit : response.data.bank_account_no});
        this.setState({RemarkTextAreaBankedit :  response.data.bank_remark});
    }
    componentDidUpdate(prevProps, prevState){
        
        if(prevState.update_counter!== this.state.update_counter){
            console.log(prevState.update_counter + " compare to " + this.state.update_counter);
            this.getSettingCompany();
            this.getSettingSales();
            this.getSettingExpense();
            this.getSettingAdvanceNumberring();
            this.getSettingAdvance();
            this.getBankList();
        }
    }
    componentDidMount(){
        console.log('component mounted');
        this.getCOADebitCheque(); 
        this.getSettingCompany();
        this.getSettingSales();
        this.getSettingExpense();
        this.getSettingAdvanceNumberring();
        this.getSettingAdvance();
        this.getBankList();
    }

    render(){
        const coalist=this.state.coa_list.map((item) =>{ 
            return <option key={item.id} value={item.id}>{item.coa_name}</option>
        });
        const banklist=this.state.bank_list.map((item)=>{
            return  [
                <tr key={item.bank_no}>
                    <td style={{verticalAlign : 'middle'}}>{item.bank_name}</td>
                    <td style={{verticalAlign : 'middle'}}>{item.bank_branch}</td>
                    <td style={{verticalAlign : 'middle'}}>{item.bank_code}</td>
                    <td style={{verticalAlign : 'middle'}}>{item.bank_account_no}</td>
                    <td style={{verticalAlign : 'middle'}} >{item.bank_remark}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'center'}} >
                        <div className="btn-group" role="group">
                            <button id="btnGroupDrop1" type="button" className="btn btn-link " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-ellipsis-v"></i>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            
                            <a className="dropdown-item" data-toggle="modal" data-target="#EditBankModal" onClick={() => this.getBankInfo(item.bank_no)} href="#" >Edit</a>
                            <a className="dropdown-item"  onClick={() => this.delete_bank(item.bank_no)} href="#" >Delete</a>
                            
                            </div>
                        </div>
                    </td>
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
                    <div className="SettingsDiv">
                    <div className="breadcrumbs">
                        <div className="page-header float-left">
                            <div className="page-title">
                            <h1>System Settings</h1>
                            <button style={{display: 'none'}} id="reset_default"></button>
                            </div>
                        </div>
                    </div>

                        <div className="card-body">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className={`nav-link ${this.state.tab===1? 'active' : ''}`} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Company</a>
                                </li>
                                
                                <li className="nav-item">
                                    <a className={`nav-link ${this.state.tab===2? 'active' : ''}`} id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Sales</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${this.state.tab===3? 'active' : ''}`} id="extra-tab" data-toggle="tab" href="#extra" role="tab" aria-controls="extra" aria-selected="false">Expenses</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${this.state.tab===4? 'active' : ''}`} id="advance-tab" data-toggle="tab" href="#advance" role="tab" aria-controls="advance" aria-selected="false">Advance</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${this.state.tab===5? 'active' : ''}`} id="advance-tab" data-toggle="tab" href="#bank" role="tab" aria-controls="advance" aria-selected="false">Bank</a>
                                </li>
                            </ul>
                            <div className="tab-content pl-3 p-1" id="myTabContent">
                                <div className={`tab-pane fade show ${this.state.tab===1? 'active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                                <form onSubmit={this.submitCompanySetting} className="form-horizontal" id="company_form" method="POST" encType="multipart/form-data">
                                <div className="col-md-12 mt-3">
                                    <div className="col-md-3">
                                        <p className="text-dark">Company Name</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-dark">Company Name</p>
                                        <p className="text-dark">Legal Name</p>
                                        <p className="text-dark">Business ID No.</p>
                                        <p className="text-dark">TIN No.</p>
                                        <p className="text-dark">E Signatory</p>
                                    </div>
                                    <div className="col-md-4">
                                        <input className="text-dark input-custom" id="company_name" name="company_name" type="text" value={this.state.company_name} onChange={(event)=> this.setState({company_name: event.target.value})} />
                                        <input className="text-dark input-custom" id="legal_name" name="legal_name" type="text" value={this.state.legal_name} onChange={(event)=> this.setState({legal_name: event.target.value})} />
                                        <input className="text-dark input-custom" id="business_id_no" name="business_id_no" type="text" value={this.state.business_id_no} onChange={(event)=> this.setState({business_id_no: event.target.value})} />
                                        <input className="text-dark input-custom" id="com_tin_no" name="com_tin_no" type="text" value={this.state.com_tin_no} onChange={(event)=> this.setState({com_tin_no: event.target.value})} maxLength="9" />
                                        <input className="text-dark input-custom" id="esignatory" name="esignatory" type="file" />
                                    </div>
                                    <div className="col-md-1">
                                        <a href="#" id="toggle_edit_company_name" className="far fa-edit"></a>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                <div className="col-md-12 mt-3">
                                    <div className="col-md-3">
                                        <p className="text-dark">Company Type</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-dark">Tax Form</p>
                                        <p className="text-dark">Industry</p>
                                    </div>
                                    <div className="col-md-4">
                                        
                                        <input list="tax_forms_list" className="text-dark input-custom" id="tax_form" name="tax_form" type="text" value={this.state.tax_form} onChange={(event)=> this.setState({tax_form: event.target.value})} />
                                       
                                        <datalist id="tax_forms_list">
                                            <option>Sole proprietor (Form 1040)</option>
                                            <option>Partnership or limited liability company (Form 1065)</option>
                                            <option>Small business corporation, two or more owners (Form 11205)</option>
                                            <option>Corporation, one or more shareholders (Form 1120)</option>
                                            <option>Nonprofit organization (Form 990)</option>
                                            <option>Limited liability</option>
                                            <option>Not sure/Other/None</option>
                                        </datalist> 
                                        
                                        <input className="text-dark input-custom" id="industry" name="industry" type="text" value={this.state.industry} onChange={(event)=> this.setState({industry: event.target.value})} />
                                        
                                    </div>
                                    <div className="col-md-1">
                                        <a href="#" id="toggle_edit_company_type" className="far fa-edit"></a>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                <div className="col-md-12 mt-3">
                                    <div className="col-md-3">
                                        <p className="text-dark">Contact Info</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-dark">Company Email</p>
                                        <p className="text-dark" style={{display:'none'}}>Customer-facing Email</p>
                                        <p className="text-dark">Company Phone</p>
                                        <p className="text-dark">Website</p>
                                    </div>
                                    <div className="col-md-4">
                                        
                                        <input className="text-dark input-custom" id="company_email" name="company_email" type="email" value={this.state.company_email} onChange={(event)=> this.setState({company_email: event.target.value})} />
                                        <input className="text-dark input-custom" style={{display:'none'}} id="customer_facing_email" name="customer_facing_email" type="hidden" value={this.state.customer_facing_email} onChange={(event)=> this.setState({customer_facing_email: event.target.value})} />
                                        <input className="text-dark input-custom" id="company_phone" name="company_phone" type="tel" value={this.state.company_phone} onChange={(event)=> this.setState({company_phone: event.target.value})} />
                                        <input className="text-dark input-custom" id="website" name="website" type="url" value={this.state.website} onChange={(event)=> this.setState({website: event.target.value})} />
                                        
                                    </div>
                                    <div className="col-md-1">
                                        <a href="#" id="toggle_edit_contact_info" className="far fa-edit"></a>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                <div className="col-md-12 mt-3">
                                    <div className="col-md-3">
                                        <p className="text-dark">Address</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-dark">Company Address</p>
                                        <p className="text-dark" style={{display:'none'}}>Customer-facing Address</p>
                                        <p className="text-dark">Legal Address</p>
                                    </div>
                                    <div className="col-md-4">
                                        
                                        <input className="text-dark input-custom half" placeholder="Address" id="company_address" name="company_address" type="text" value={this.state.company_address} onChange={(event)=> this.setState({company_address: event.target.value})} />
                                        <input placeholder="Postal" id="postal1" name="postal1" className="text-dark input-custom half" type="text" value={this.state.postal1} onChange={(event)=> this.setState({postal1: event.target.value})} />  
                                        <input className="text-dark input-custom half" style={{display:'none'}} id="customer_facing_address" name="customer_facing_address" type="hidden" value={this.state.customer_facing_address} onChange={(event)=> this.setState({customer_facing_address: event.target.value})} />
                                        <input style={{display:'none'}} id="postal2" name="postal2" className="text-dark input-custom half" type="hidden" value={this.state.postal2} onChange={(event)=> this.setState({postal2: event.target.value})} />  
                                        <input className="text-dark input-custom half" placeholder="Address" id="legal_address" name="legal_address" type="text" value={this.state.legal_address} onChange={(event)=> this.setState({legal_address: event.target.value})} />
                                        <input id="postal3" name="postal3" placeholder="Postal Code" className="text-dark input-custom half" type="text" value={this.state.postal3} onChange={(event)=> this.setState({postal3: event.target.value})} />  
                                        
                                    </div>
                                    <div className="col-md-1">
                                        <a href="#" id="toggle_edit_address" className="far fa-edit"></a>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                <div className="col-md-12 mt-3" style={{display:'none'}}>
                                    <div className="col-md-3">
                                        <p className="text-dark">Communications with Intuit</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-info"><a href="https://c17.qbo.intuit.com/qbo17/redir/privacy" className="text-info">View Privacy Statement</a></p>
                                    </div>
                                </div>
                                <div className="float-right mb-5">
                                    <button type="submit" id="update_company" className="btn btn-success rounded">Save</button>
                                </div>
                                </form>
                                </div>
                                <div className={`tab-pane fade show ${this.state.tab===2? 'active' : ''}`} id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <form action="#" className="form-horizontal " id="sales_form"  onSubmit={this.submitSalesSetting}>
                                <div className="col-md-12 mt-3">
                                    <div className="col-md-3">
                                        <p className="text-dark">Customise</p>
                                    </div>
                                    <div className="col-md-5">
                                        <p className="text-dark">Customise the way forms look to your customers</p>
                                    </div>
                                    <div className="col-md-4">
                                    <a href="customformstyles" className="btn btn-success px-3 font-weight-bold rounded">Customise look and feel</a>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                <div className="col-md-12 mt-3">
                                    <div className="col-md-3">
                                        <p className="text-dark">Sales Receipt</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-dark">Preferred Debit Cheque Account</p>
                                        
                                    </div>
                                    <div className="col-md-4 font-weight-bold">
                                        <button type="button" style={{display :'none'}} id="refresh_debit_cheque_account_select"></button>
                                        <select className="text-dark font-weight-bold select-custom selectpicker w-100" data-live-search="true" id="preferred_bedit_cheque_account" name="preferred_bedit_cheque_account" value={this.state.preferred_bedit_cheque_account} onChange={(event)=> this.setState({preferred_bedit_cheque_account: event.target.value})}>
                                            <option value="">--Select Account--</option>
                                            {coalist}
                                        </select>
                                    </div>
                                    <div className="col-md-1">
                                        <a href="#" id="toggle_sales_receiptsetting" className="far fa-edit"></a>
                                    </div>
                                </div>
                                
                                <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                <div className="col-md-12 mt-3">
                                    <div className="col-md-3">
                                        <p className="text-dark">Product and Services</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-dark">Show Product/Service tab on sales</p>
                                        <p className="text-dark ml-3">Show SKU column</p>
                                        <p className="text-dark">Track price/rate</p>
                                        <p className="text-dark">Track inventory quantity on hand</p>
                                    </div>
                                    <div className="col-md-4 font-weight-bold">
                                        
                                        <select className="text-dark font-weight-bold select-custom" id="show_product_column" name="show_product_column" value={this.state.show_product_column} onChange={(event)=> this.setState({show_product_column: event.target.value})}>
                                            <option value="On" >On</option>
                                            <option value="Off" >Off</option>
                                        </select>
                                        
                                        <select  className="text-dark font-weight-bold select-custom" id="show_sku_column" name="show_sku_column" value={this.state.show_sku_column} onChange={(event)=> this.setState({show_sku_column: event.target.value})}>
                                            <option value="On" >On</option>
                                            
                                        </select>
                                        
                                        <select  className="text-dark font-weight-bold select-custom" id="track_quantity_and_price" name="track_quantity_and_price" value={this.state.track_quantity_and_price} onChange={(event)=> this.setState({track_quantity_and_price: event.target.value})}>
                                            <option value="On" >On</option>
                                            <option value="Off" >Off</option>
                                        </select>
                                        
                                        <select  className="text-dark font-weight-bold select-custom" id="track_quantity_on_hand" name="track_quantity_on_hand" value={this.state.track_quantity_on_hand} onChange={(event)=> this.setState({track_quantity_on_hand: event.target.value})}>
                                            <option value="On" >On</option>
                                            <option value="Off">Off</option>
                                        </select>
                                    </div>
                                    <div className="col-md-1">
                                        <a href="#" id="toggle_edit_products_and_services" className="far fa-edit"></a>
                                    </div>
                                </div>
                                
                                
                                <div className="col-md-12 mt-3 mb-4"></div>
                                <div className="float-right mb-5">
                                    <button type="submit" id="update_sales" className="btn btn-success rounded">Save</button>
                                </div>
                                </form>
                                </div>
                                <div className={`tab-pane fade show ${this.state.tab===3? 'active' : ''}`} id="extra" role="tabpanel" aria-labelledby="extra-tab">
                                    <form action="#" className="form-horizontal " id="expenses_form" onSubmit={this.submitExpenseSetting}>
                                    <div className="col-md-12 mt-3">
                                        <div className="col-md-3">
                                            <p className="text-dark">Bills and Expenses</p>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="text-dark">Show Items table on the expense and purchase forms</p>
                                            <p className="text-dark">Track expense and items by customer</p>
                                            <p className="text-dark">Make expense and items billable</p>
                                            <p className="text-dark">Default bill payment terms</p>
                                        </div>
                                        <div className="col-md-4 font-weight-bold">
                                            <select className="text-dark font-weight-bold select-custom" id="show_items_table" name="show_items_table"  value={this.state.show_items_table} onChange={(event)=> this.setState({show_items_table: event.target.value})}>
                                                <option value="On" >On</option>
                                                <option value="Off" >Off</option>
                                            </select>
                                            <select  className="text-dark font-weight-bold select-custom" id="track_expense_and_item_by_customer" name="track_expense_and_item_by_customer" value={this.state.track_expense_and_item_by_customer} onChange={(event)=> this.setState({track_expense_and_item_by_customer: event.target.value})}>
                                                <option value="On" >On</option>
                                                <option value="Off" >Off</option>
                                            </select>
                                            
                                            <select  className="text-dark font-weight-bold select-custom" id="billable" name="billable" value={this.state.billable} onChange={(event)=> this.setState({billable: event.target.value})}>
                                                <option value="On" >On</option>
                                                <option value="Off" >Off</option>
                                            </select>
                                            
                                            <input  className="text-dark input-custom" id="bill_payment_terms" list="terms_list" name="bill_payment_terms" type="text" value={this.state.bill_payment_terms} onChange={(event)=> this.setState({bill_payment_terms: event.target.value})} />
                                            
                                        </div>
                                        <div className="col-md-1">
                                            <a href="#" id="toggle_edit_bills_and_expenses" className="far fa-edit"></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                    <div className="col-md-12 mt-3">
                                        <div className="col-md-3">
                                            <p className="text-dark">Purchase orders</p>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="text-dark">Use purchase orders</p>
                                        </div>
                                        <div className="col-md-4 font-weight-bold">
                                            <select className="text-dark font-weight-bold  select-custom" id="use_purchase_order" name="use_purchase_order" value={this.state.use_purchase_order} onChange={(event)=> this.setState({use_purchase_order: event.target.value})}>
                                                <option value="On" >On</option>
                                                <option value="Off" >Off</option>
                                            </select>
                                        </div>
                                        <div className="col-md-1">
                                            <a href="#" id="toggle_edit_purchase_orders" className="far fa-edit"></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                    <div className="col-md-12 mt-3">
                                        <div className="col-md-3">
                                            <p className="text-dark">Messages</p>
                                        </div>
                                        <div className="col-md-4">
                                            <input className="text-dark input-custom" id="purchase_order_email_message" name="purchase_order_email_message" type="text" value={this.state.purchase_order_email_message} onChange={(event)=> this.setState({purchase_order_email_message: event.target.value})} />
                                        </div>
                                        <div className="col-md-4 font-weight-bold">
                                        </div>
                                        <div className="col-md-1">
                                            <a href="#" id="toggle_edit_expense_messages" className="far fa-edit"></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3 mb-4"></div>
                                    <div className="float-right mb-5">
                                        <button id="update_expenses" type="submit" className="btn btn-success rounded">Save</button>
                                    </div>
                                    </form>
                                </div>
                                <div className={`tab-pane fade show ${this.state.tab===4? 'active' : ''}`} id="advance" role="tabpanel" aria-labelledby="advance-tab">
                                    <form action="#" className="form-horizontal " id="advance_form" onSubmit={this.submitAdvanceSetting}>
                                    <div className="col-md-12 mt-3">
                                        <div className="col-md-3">
                                            <p className="text-dark">Numbering</p>
                                        </div>
                                        <div className="col-md-4">
                                            
                                            <p className="text-dark">Main : Sales Invoice</p>
                                            <p className="text-dark">Main : Bill Invoice</p>
                                            
                                            <p className="text-dark">Branch : Sales Invoice</p>
                                            <p className="text-dark">Branch : Bill Invoice</p>
                                            
                                            <p className="text-dark">Estimate</p>
                                            <p className="text-dark">Credit Note</p>
                                            <p className="text-dark">Sales Receipt</p>
                                            <p className="text-dark">Bill</p>
                                            <p className="text-dark">Suppliers Credit</p>
                                            <p className="text-dark">Cash Voucher</p>
                                            <p className="text-dark">Cheque Voucher</p>
                                        </div>
                                        <div className="col-md-4 font-weight-bold">
                                            
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_sales_exp" name="numbering_sales_exp" value={this.state.numbering_sales_exp} onChange={(event)=> this.setState({numbering_sales_exp: event.target.value})} /> 
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_bill_invoice_main" name="numbering_bill_invoice_main" value={this.state.numbering_bill_invoice_main} onChange={(event)=> this.setState({numbering_bill_invoice_main: event.target.value})} /> 
                                            
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_sales_invoice_branch" name="numbering_sales_invoice_branch" value={this.state.numbering_sales_invoice_branch} onChange={(event)=> this.setState({numbering_sales_invoice_branch: event.target.value})} /> 
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_bill_invoice_branch" name="numbering_bill_invoice_branch" value={this.state.numbering_bill_invoice_branch} onChange={(event)=> this.setState({numbering_bill_invoice_branch: event.target.value})} />    
                                            
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_estimate" name="numbering_estimate" value={this.state.numbering_estimate} onChange={(event)=> this.setState({numbering_estimate: event.target.value})} />
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_credit_note" name="numbering_credit_note" value={this.state.numbering_credit_note} onChange={(event)=> this.setState({numbering_credit_note: event.target.value})} /> 
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_sales_receipt" name="numbering_sales_receipt" value={this.state.numbering_sales_receipt} onChange={(event)=> this.setState({numbering_sales_receipt: event.target.value})} /> 
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_bill" name="numbering_bill" value={this.state.numbering_bill} onChange={(event)=> this.setState({numbering_bill: event.target.value})} /> 
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_suppliers_credit" name="numbering_suppliers_credit" value={this.state.numbering_suppliers_credit} onChange={(event)=> this.setState({numbering_suppliers_credit: event.target.value})} /> 

                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_cash_voucher" name="numbering_cash_voucher" value={this.state.numbering_cash_voucher} onChange={(event)=> this.setState({numbering_cash_voucher: event.target.value})} /> 
                                            <input type="number" step="1" className="text-dark input-custom" id="numbering_cheque_voucher" name="numbering_cheque_voucher" value={this.state.numbering_cheque_voucher} onChange={(event)=> this.setState({numbering_cheque_voucher: event.target.value})} /> 
                                            
                                        </div>
                                        <div className="col-md-1">
                                            <a href="#" id="toggle_edit_numbering" className="far fa-edit"></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="col-md-3">
                                            <p className="text-dark">Cost Center</p>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="text-dark">Use Cost Center</p>
                                        </div>
                                        <div className="col-md-4 font-weight-bold">
                                            <select className="text-dark font-weight-bold select-custom" id="useCostCenter" name="useCostCenter" value={this.state.useCostCenter} onChange={(event)=> this.setState({useCostCenter: event.target.value})}>
                                                    <option value="On" >On</option>
                                                    <option value="Off" >Off</option>
                                            </select>
                                        </div>
                                        <div className="col-md-1">
                                            <a href="#" id="toggle_edit_cost_center" className="far fa-edit"></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                        <div className="col-md-12 mt-3">
                                            <div className="col-md-3">
                                                <p className="text-dark">Accounting</p>
                                            </div>
                                            <div className="col-md-4">
                                                <p className="text-dark">First month of Fiscal year</p>
                                                <p className="text-dark">First month of tax year</p>
                                                <p className="text-dark">Accounting method</p>
                                                <p className="text-dark">Close the books</p>
                                                <p className="text-dark">End Month of Fiscal Year</p>
                                            </div>
                                            <div className="col-md-4 font-weight-bold">
                                                
                                                <select className="text-dark font-weight-bold select-custom" id="first_month_of_fiscal_year" name="first_month_of_fiscal_year"  value={this.state.first_month_of_fiscal_year} onChange={(event)=> this.setState({first_month_of_fiscal_year: event.target.value})}>
                                                    <option value="January" >January</option>
                                                    <option value="February" >February</option>
                                                    <option value="March" >March</option>
                                                    <option value="April" >April</option>
                                                    <option value="May" >May</option>
                                                    <option value="June" >June</option>
                                                    <option value="July" >July</option>
                                                    <option value="August" >August</option>
                                                    <option value="September" >September</option>
                                                    <option value="October" >October</option>
                                                    <option value="November" >November</option>
                                                    <option value="December" >December</option>
                                                </select>
                                                
                                                <select  className="text-dark font-weight-bold select-custom" id="first_month_of_tax_year" name="first_month_of_tax_year" value={this.state.first_month_of_tax_year} onChange={(event)=> this.setState({first_month_of_tax_year: event.target.value})}>
                                                <option value="January" >January</option>
                                                    <option value="February" >February</option>
                                                    <option value="March" >March</option>
                                                    <option value="April" >April</option>
                                                    <option value="May" >May</option>
                                                    <option value="June" >June</option>
                                                    <option value="July" >July</option>
                                                    <option value="August" >August</option>
                                                    <option value="September" >September</option>
                                                    <option value="October" >October</option>
                                                    <option value="November" >November</option>
                                                    <option value="December" >December</option>
                                                </select>
                                                
                                                <select style={{marginTop: '15px'}} className="text-dark font-weight-bold select-custom" id="accounting_method" name="accounting_method" value={this.state.accounting_method} onChange={(event)=> this.setState({accounting_method: event.target.value})}>
                                                    <option value="Accrual" >Accrual</option>
                                                    <option value="Cash" >Cash</option>
                                                </select>
                                                
                                                <select style={{marginTop: '15px'}} className="text-dark font-weight-bold select-custom" id="close_book" name="close_book" value={this.state.close_book} onChange={(event)=> this.setState({close_book: event.target.value})}>
                                                    <option value="On" >On</option>
                                                    <option value="Off" >Off</option>
                                                </select>
                                                <select className="text-dark font-weight-bold select-custom" id="end_month_of_fiscal_year" name="end_month_of_fiscal_year" value={this.state.end_month_of_fiscal_year} onChange={(event)=> this.setState({end_month_of_fiscal_year: event.target.value})}>
                                                    <option value="December" >December</option>
                                                    <option value="January" >January</option>
                                                    <option value="February" >February</option>
                                                    <option value="March" >March</option>
                                                    <option value="April" >April</option>
                                                    <option value="May" >May</option>
                                                    <option value="June" >June</option>
                                                    <option value="July" >July</option>
                                                    <option value="August" >August</option>
                                                    <option value="September" >September</option>
                                                    <option value="October" >October</option>
                                                    <option value="November" >November</option>
                                                    
                                                </select>
                                            </div>
                                            <div className="col-md-1">
                                                <a href="#" id="toggle_edit_accounting" className="far fa-edit"></a>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                        <div className="col-md-12 mt-3" >
                                            <div className="col-md-3">
                                                <p className="text-dark">Retained Earnings</p>
                                            </div>
                                            <div className="col-md-4">
                                                <p className="text-dark">Beginning Balance</p>
                                            </div>
                                            <div className="col-md-4 font-weight-bold">
                                                    <input type="text" className="text-dark input-custom" value={this.state.ad_beg_bal_shown} onChange={(event)=> this.setState({ad_beg_bal_shown: event.target.value})} id="ad_beg_bal_shown" name="ad_beg_bal_shown" />
                                                    <input type="hidden" className="text-dark input-custom" value={this.state.ad_beg_bal} onChange={(event)=> this.setState({ad_beg_bal: event.target.value})} id="ad_beg_bal" name="ad_beg_bal" />
                                            </div>
                                            <div className="col-md-1">
                                                <a href="#" id="toggle_beginning_balance" className="far fa-edit"></a>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3  border border-bottom border-light"></div>
                                        <div className="col-md-12 mt-3">
                                            <div className="col-md-3">
                                                <p className="text-dark">Chart of Accounts</p>
                                            </div>
                                            <div className="col-md-4">
                                                <p className="text-dark">Enable account numbers</p>
                                            </div>
                                            <div className="col-md-4 font-weight-bold">
                                                <select className="text-dark font-weight-bold select-custom" id="enable_acc_number" name="enable_acc_number" value={this.state.enable_acc_number} onChange={(event)=> this.setState({enable_acc_number: event.target.value})}>
                                                    <option value="On" >On</option>
                                                </select>
                                            </div>
                                            <div className="col-md-1">
                                                <a href="#" id="toggle_edit_chart_of_accounts" className="far fa-edit"></a>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3">    
                                            <div className="col-md-3">
                                                <p className="text-dark">Other preferences</p>
                                            </div>
                                            <div className="col-md-4">
                                                <p className="text-dark">Date format</p>
                                                <p className="text-dark">Number format</p>
                                                
                                                <p className="text-dark">Sign me out if inactive for</p>
                                            </div>
                                            <div className="col-md-4 font-weight-bold">
                                                <select className="text-dark font-weight-bold select-custom" id="date_format" name="date_format" value={this.state.date_format} onChange={(event)=> this.setState({date_format: event.target.value})}>
                                                    <option value="mm-dd-yyyy" >mm-dd-yyyy</option>
                                                </select>
                                                
                                                <select style={{marginTop: '15px'}} className="text-dark font-weight-bold select-custom" id="number_format" name="number_format" value={this.state.number_format} onChange={(event)=> this.setState({number_format: event.target.value})}>
                                                    <option value="123,456.00" >123,456.00</option>
                                                </select>
                                                
                                                <select style={{marginTop: '15px'}} className="text-dark font-weight-bold select-custom" id="inactive_time" name="inactive_time" value={this.state.inactive_time} onChange={(event)=> this.setState({inactive_time: event.target.value})}>
                                                    <option value="15" >15 minutes</option>
                                                    <option value="30" >30 minutes</option>
                                                    <option value="45" >45 minutes</option>
                                                    <option value="1" >1 Hour</option>
                                                    <option value="2" >2 Hours</option>
                                                    <option value="3" >3 Hours</option>
                                                </select>
                                            </div>
                                            <div className="col-md-1">
                                                <a href="#" id="toggle_edit_other_preferences" className="far fa-edit"></a>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3 mb-4"></div>
                                        <div className="float-right mb-5">
                                            <button id="update_advance" type="submit" className="btn btn-success rounded">Save</button>
                                        </div>
                                    </form>
                                </div>
                                <div className={`tab-pane fade show ${this.state.tab===5? 'active' : ''}`} id="bank" role="tabpanel" aria-labelledby="bank-tab">
                                <div className="modal fade" id="AddBankModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        
                                        <form id="add_bank_form" action="#" onSubmit={this.save_new_bank}>
                                        <div className="modal-content" >
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add new Bank</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="BankNameInput">Bank Name</label>
                                                <input type="text" className="form-control" id="BankNameInput" aria-describedby="emailHelp" required placeholder="Enter Bank Name" value={this.state.BankNameInput} onChange={(event)=> this.setState({BankNameInput: event.target.value})} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="BankBranchInput">Bank Branch</label>
                                                <input type="text" className="form-control" id="BankBranchInput" aria-describedby="emailHelp" required placeholder="Enter Bank Branch" value={this.state.BankBranchInput} onChange={(event)=> this.setState({BankBranchInput: event.target.value})} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="BankCodeInput">Bank Code</label>
                                                <input type="text" className="form-control" id="BankCodeInput" aria-describedby="emailHelp" required placeholder="Enter Bank Code" value={this.state.BankCodeInput} onChange={(event)=> this.setState({BankCodeInput: event.target.value})} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="AccountNoInput">Account No</label>
                                                <input type="text" className="form-control" id="AccountNoInput" aria-describedby="emailHelp" required placeholder="Enter Account No" value={this.state.AccountNoInput} onChange={(event)=> this.setState({AccountNoInput: event.target.value})} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="RemarkTextAreaBank">Remark</label>
                                                <textarea type="text" className="form-control" id="RemarkTextAreaBank" value={this.state.RemarkTextAreaBank} onChange={(event)=> this.setState({RemarkTextAreaBank: event.target.value})}></textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="reset" className="btn btn-secondary" id="newbankreset" data-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                        
                                        </div>
                                        </form>
                                    </div>
                                    </div>
                                    <div class="modal fade" id="EditBankModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <form id="edit_bank_form" action="#" onSubmit={this.save_edited_bank_info}>
                                        <div class="modal-content" >
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Edit Bank</h5>
                                            <button type="button" class="close" id="EditBankCloseBtn" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="form-group">
                                                <input type="hidden" id="BankNoHidden" value={this.state.BankNoHidden} onChange={(event)=> this.setState({BankNoHidden: event.target.value})} />
                                                <label htmlFor="BankNameInputedit">Bank Name</label>
                                                <input type="text" class="form-control" id="BankNameInputedit" aria-describedby="emailHelp" required placeholder="Enter Bank Name" value={this.state.BankNameInputedit} onChange={(event)=> this.setState({BankNameInputedit: event.target.value})} />
                                            </div>
                                            <div class="form-group">
                                                <label htmlFor="BankBranchInputEdit">Bank Branch</label>
                                                <input type="text" class="form-control" id="BankBranchInputEdit" aria-describedby="emailHelp" required placeholder="Enter Bank Branch" value={this.state.BankBranchInputEdit} onChange={(event)=> this.setState({BankBranchInputEdit: event.target.value})} />
                                            </div>
                                            <div class="form-group">
                                                <label htmlFor="BankCodeInputedit">Bank Code</label>
                                                <input type="text" class="form-control" id="BankCodeInputedit" aria-describedby="emailHelp" required placeholder="Enter Bank Code" value={this.state.BankCodeInputedit} onChange={(event)=> this.setState({BankCodeInputedit: event.target.value})} />
                                            </div>
                                            <div class="form-group">
                                                <label htmlFor="AccountNoInputedit">Account No</label>
                                                <input type="text" class="form-control" id="AccountNoInputedit" aria-describedby="emailHelp" required placeholder="Enter Account No" value={this.state.AccountNoInputedit} onChange={(event)=> this.setState({AccountNoInputedit: event.target.value})} />
                                            </div>
                                            <div class="form-group">
                                                <label htmlFor="RemarkTextAreaBankedit">Remark</label>
                                                <textarea type="text" class="form-control" id="RemarkTextAreaBankedit" value={this.state.RemarkTextAreaBankedit} onChange={(event)=> this.setState({RemarkTextAreaBankedit: event.target.value})}></textarea>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="reset" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary">Save</button>
                                        </div>
                                        
                                        </div>
                                        </form>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-12" style={{textAlign : 'right', marginTop: '10px', marginBottom :'10px'}}>
                                        <button className="btn btn-primary" data-toggle="modal" data-target="#AddBankModal">Add New Bank</button>
                                    </div>
                                    </div>
                                    <table className="table table-bordered">
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{verticalAlign : 'middle'}}>Bank Name</th>
                                                <th style={{verticalAlign : 'middle'}}>Branch</th>
                                                <th style={{verticalAlign : 'middle'}}>Bank Code</th>
                                                <th style={{verticalAlign : 'middle'}}>Account No</th>
                                                <th style={{verticalAlign : 'middle'}}>Remark</th>
                                                <th style={{verticalAlign : 'middle'}}></th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-light">
                                            {banklist}
                                            
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

export default AccountAndSettings;