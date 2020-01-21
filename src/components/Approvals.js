import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import {number_format} from '../Helper';
class Approval extends React.Component{
    state ={
        access : [],
        bankedits : [],
        bankeditscount :'',
        costcenteredit: [],
        costcentereditcount : '',
        budgetedit: [],
        budgeteditcount : '',
        coaedits: [],
        coaeditscount : '',
        productservicesedit: [],
        productserviceseditcount :'',
        customeredit: [],
        supplieredit: [],
        customereditcount : '',
        suppliereditcount :'',
        etNew: [],
        etNewcount : '',
        etitemdetailedit: [],
        etaccdetailedit: [],
        stinvoiceedit: [],
        salestransactioneditedit: [],
        salestransactionediteditcount : '',
        expensetransactionedit: [],
        expensetransactioneditcount : '',
        etaNewcount: '',
        etaNew : [],
        etaNewTotalAmount : [],
        stinvoiceeditTotalAmount : [],
        etaccdetailedittotal_amount : [],
        PendingCancelEntrycount : '',
        PendingCancelEntry : [],
        journalentries: [],
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
    getApprovalsData= async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/get_all_pending_transaction_request',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({bankedits : response.data.bankedits});
        this.setState({bankeditscount : response.data.bankeditscount==0? '' : response.data.bankeditscount});
        this.setState({costcenteredit : response.data.costcenteredit});
        this.setState({costcentereditcount : response.data.costcentereditcount==0? '' : response.data.costcentereditcount});
        this.setState({budgetedit : response.data.budgetedit});
        this.setState({budgeteditcount : response.data.budgeteditcount==0? '' : response.data.budgeteditcount});
        this.setState({coaedits : response.data.coaedits});
        this.setState({coaeditscount : response.data.coaeditscount==0? '' : response.data.coaeditscount});
        this.setState({productservicesedit : response.data.productservicesedit});
        this.setState({productserviceseditcount : response.data.productserviceseditcount==0? '' : response.data.productserviceseditcount});
        this.setState({customeredit : response.data.customeredit});
        this.setState({supplieredit : response.data.supplieredit});
        this.setState({customereditcount : response.data.customereditcount==0? '' : response.data.customereditcount});
        this.setState({suppliereditcount : response.data.suppliereditcount==0? '' : response.data.suppliereditcount});
        this.setState({etNew : response.data.etNew});
        this.setState({etNewcount : response.data.etNewcount==0? '' : response.data.etNewcount});
        this.setState({etitemdetailedit : response.data.etitemdetailedit});
        this.setState({etaccdetailedit : response.data.etaccdetailedit});
        this.setState({stinvoiceedit : response.data.stinvoiceedit});
        this.setState({salestransactioneditedit : response.data.salestransactioneditedit});
        this.setState({salestransactionediteditcount : response.data.salestransactionediteditcount==0? '' : response.data.salestransactionediteditcount});
        this.setState({expensetransactionedit : response.data.expensetransactionedit});
        this.setState({expensetransactioneditcount : response.data.expensetransactioneditcount==0? '' : response.data.expensetransactioneditcount});
        this.setState({etaNewcount : response.data.etaNewcount==0? '' : response.data.etaNewcount});
        this.setState({etaNew : response.data.etaNew});
        this.setState({etaNewTotalAmount : response.data.etaNewTotalAmount});
        this.setState({stinvoiceeditTotalAmount : response.data.stinvoiceeditTotalAmount});
        this.setState({etaccdetailedittotal_amount : response.data.etaccdetailedittotal_amount});
        this.setState({PendingCancelEntry : response.data.PendingCancelEntry});
        this.setState({PendingCancelEntrycount : response.data.PendingCancelEntrycount});
        this.setState({journalentries : response.data.journalentries});
        
    }
    approveBillRequest = async (id)=>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/approve_pending_bill',bodyFormData);
        this.getApprovalsData();
    }
    denyBillRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/deny_pending_bill',bodyFormData);
        this.getApprovalsData();
    }
    approveBankRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_bank_edit',bodyFormData);
        this.getApprovalsData();
    }
    denyBankRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_bank_edit',bodyFormData);
        this.getApprovalsData();
    }
    approveCOARequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_COA_edit',bodyFormData);
        this.getApprovalsData();
    }
    denyCOARequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_COA_edit',bodyFormData);
        this.getApprovalsData();
    }
    approveCCRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_CC_edit',bodyFormData);
        this.getApprovalsData();
    }
    denyCCRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_CC_edit',bodyFormData);
        this.getApprovalsData();
    }
    approveCustomerRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_Customer_edit',bodyFormData);
        this.getApprovalsData();
    }
    denyCustomerRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_Customer_edit',bodyFormData);
        this.getApprovalsData();
    }
    approveSupplierRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_Supplier_edit',bodyFormData);
        this.getApprovalsData();
    }
    denySupplierRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_Supplier_edit',bodyFormData);
        this.getApprovalsData();
    }
    approveprodRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_prod_edit',bodyFormData);
        this.getApprovalsData();
    }
    denyprodRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_prod_edit',bodyFormData);
        this.getApprovalsData();
    }
    approveInvoiceRequest = async (id,location,type) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        bodyFormData.set('location', location);
        bodyFormData.set('type', type);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_invoice_edit2',bodyFormData);
        this.getApprovalsData();
    }
    denyInvoiceRequest = async (id,location,type) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        bodyFormData.set('location', location);
        bodyFormData.set('type', type);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_invoice_edit',bodyFormData);
        this.getApprovalsData();
    }
    approveCreditNoteRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_credit_note_edit2',bodyFormData);
        this.getApprovalsData();
    }
    denyCreditNoteRequest = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_credit_note_edit',bodyFormData);
        this.getApprovalsData();
    }
    approveexpenseRequest = async (id,type) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        bodyFormData.set('type', type);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_expense_edit',bodyFormData);
        this.getApprovalsData();
    }
    denyexpenseRequest = async (id,type) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        bodyFormData.set('type', type);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_expense_edit',bodyFormData);
        this.getApprovalsData();
    }
    update_budget = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_credit_note_edit2',bodyFormData);
        this.getApprovalsData();
    }
    delete_budget_request = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_credit_note_edit',bodyFormData);
        this.getApprovalsData();
    }
    delete_entry_request = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_entry_request',bodyFormData);
        this.getApprovalsData();
    }
    update_entry = async (id) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', id);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_entry',bodyFormData);
        this.getApprovalsData();
    }
    get_cancel_entry_desc = async (id) =>{
        return [
            <div>
                {"asdasd"}
            </div>
        ]
    }
    componentDidMount(){
        this.getApprovalsData();
        this.getUserAccess();
    }

    render(){
        const pending_bills_list=this.state.etNew.map((dat,index) =>{
            var overduecomponent="";
            var overduetitle="";
            if(moment().diff(dat.et_due_date, 'days')>0 && dat.et_bil_status!="Paid"){
                overduecomponent="OverDue";
                overduetitle="Over Due";
            }
            return [
            <tr key={index}>
                <td style={{verticalAlign: 'middle'}}>
                {moment(dat.et_date).format('MM-DD-YYYY')}
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                 {dat.et_no}
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                   {dat.et_shipping_address}
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    {dat.et_shipping_to}
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                   {dat.et_shipping_via}
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    {dat.display_name!=''? dat.display_name : dat.first_name+" "+dat.last_name }
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    <span title={`${overduetitle}`} className={`${overduecomponent}`}>{dat.et_due_date!=""? moment(dat.et_due_date).format('MM-DD-YYYY') : ''}</span>
                    
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    {this.state.etaNewTotalAmount.map((totalamount,index) =>{
                      if(totalamount.et_ad_no==dat.et_no){
                        return  number_format(totalamount.total_expense,2)
                      }
                         
                    })}
                
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=> this.approveBillRequest(dat.et_no)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=> this.denyBillRequest(dat.et_no)} title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                    </div>
                </td>
                
            </tr>
            ]
        });
        const bank_edits_list=this.state.bankedits.map((dat,index) =>{
            return [
                <tr key={index}>
                    <td style={{verticalAlign : 'middle'}}>{dat.bank_no}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.bank_name}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.bank_branch}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.bank_code}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.bank_account_no}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.bank_remark}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>
                        <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=>this.approveBankRequest(dat.bank_no)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=>this.denyBankRequest(dat.bank_no)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                        </div>
                    </td>
                </tr>
            ]
        });
        const coa_edits_list=this.state.coaedits.map((dat,index) =>{
            return [
                <tr key={index}>
                    <td style={{verticalAlign : 'middle'}}>{dat.id}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.coa_title}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.coa_account_type}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.coa_detail_type}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>{dat.coa_code}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.coa_description}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>
                        <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=>this.approveCOARequest(dat.id)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=>this.denyCOARequest(dat.id)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                        </div>
                    </td>
                </tr>
            ]
        });
        const cc_edit_list=this.state.costcenteredit.map((dat,index) =>{
            return [
                <tr key={index}>
                    <td style={{verticalAlign : 'middle'}}>{dat.cc_no}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.cc_name_code}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.cc_type+"("+dat.cc_type_code+")"}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.cc_name}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>
                        <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=>this.approveCCRequest(dat.cc_no)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=>this.denyCCRequest(dat.cc_no)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                        </div>
                    </td>
                </tr>
            ]
        });
        const customer_edit_list=this.state.customeredit.map((dat,index) =>{
            return [
                <tr key={index}>
                    <td style={{verticalAlign : 'middle'}}>{dat.customer_id}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.f_name+" "+dat.l_name}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.company}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.display_name}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.email}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.phone}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.street}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.tin_no}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>
                        <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=>this.approveCustomerRequest(dat.customer_id)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=>this.denyCustomerRequest(dat.customer_id)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                        </div>
                    </td>
                </tr>
            ]
        });
        const supplier_edit_list=this.state.supplieredit.map((dat,index) =>{
            return [
                <tr key={index}>
                    <td style={{verticalAlign : 'middle'}}>{dat.customer_id}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.f_name+" "+dat.l_name}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.company}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.display_name}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.email}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.phone}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.street}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.tin_no}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>
                        <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=>this.approveSupplierRequest(dat.customer_id)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=>this.denySupplierRequest(dat.customer_id)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                        </div>
                    </td>
                </tr>
            ]
        });
        const product_edits_list=this.state.productservicesedit.map((dat,index) =>{
            return [
                <tr key={index}>
                    <td style={{verticalAlign : 'middle'}}>{dat.product_id}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.product_name}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.product_sku}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.product_type}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.product_sales_description}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.product_sales_price}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.product_cost}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.product_qty}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.product_reorder_point}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>
                        <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=>this.approveprodRequest(dat.product_id)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=>this.denyprodRequest(dat.product_id)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                        </div>
                    </td>
                </tr>
            ]
        });
        const sales_trans_edit_list=this.state.salestransactioneditedit.map((dat,index) =>{
            if(dat.st_type=="Invoice"){
                return [
                    <tr key={index}>
                        <td style={{verticalAlign : 'middle'}}>{moment(dat.st_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_type}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_no}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.display_name!=''? dat.display_name : dat.first_name+" "+dat.last_name }</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_due_date!=""? moment(dat.st_due_date).format('MM-DD-YYYY') : ''}</td>
                        <td style={{verticalAlign : 'middle',textAlign: 'right'}}>
                        {this.state.stinvoiceeditTotalAmount.map((totalamount,index) =>{
                        if(totalamount.st_i_no==dat.st_no && totalamount.st_p_invoice_type==dat.st_invoice_type && totalamount.st_p_location==dat.st_location){
                            return  number_format(totalamount.total_sale,2)
                        }
                            
                        })}
                        
                        </td>
                        <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>
                            <div class="btn-group btn-group-sm" role="group" aria-label="">
                            <button title="Approve" onClick={()=>this.approveInvoiceRequest(dat.st_no,dat.st_location,dat.st_invoice_type)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                            <button type="button" onClick={()=>this.denyInvoiceRequest(dat.st_no,dat.st_location,dat.st_invoice_type)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                            </div>
                        </td>
                    </tr>
                ]
            }else{
                return [
                    <tr key={index}>
                        <td style={{verticalAlign : 'middle'}}>{moment(dat.st_date).format('MM-DD-YYYY')}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_type}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_no}</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.display_name!=''? dat.display_name : dat.first_name+" "+dat.last_name }</td>
                        <td style={{verticalAlign : 'middle'}}>{dat.st_due_date!=""? moment(dat.st_due_date).format('MM-DD-YYYY') : ''}</td>
                        <td style={{verticalAlign : 'middle',textAlign: 'right'}}>{number_format(dat.st_amount_paid,2)}</td>
                        <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>
                            <div class="btn-group btn-group-sm" role="group" aria-label="">
                            <button title="Approve" onClick={()=>this.approveCreditNoteRequest(dat.st_no)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                            <button type="button" onClick={()=>this.denyCreditNoteRequest(dat.st_no)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                            </div>
                        </td>
                    </tr>
                ]
            }
            
        });
        const pending_bill_edit_list=this.state.expensetransactionedit.map((dat,index) =>{
            var overduecomponent="";
            var overduetitle="";
            if(moment().diff(dat.et_due_date, 'days')>0 && dat.et_bil_status!="Paid"){
                overduecomponent="OverDue";
                overduetitle="Over Due";
            }
            return [
            <tr key={index}>
                <td style={{verticalAlign: 'middle'}}>
                    {moment(dat.et_date).format('MM-DD-YYYY')}
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    {dat.et_type}
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    {dat.et_no}
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    {dat.display_name!=''? dat.display_name : dat.first_name+" "+dat.last_name }
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    <span title={`${overduetitle}`} className={`${overduecomponent}`}>{dat.et_due_date!=""? moment(dat.et_due_date).format('MM-DD-YYYY') : ''}</span>
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    {this.state.etaccdetailedit.map((totalamount,index) =>{
                      if(totalamount.et_ad_no==dat.et_no){
                        return  <span className="mt-2">{totalamount.coa_name}</span>
                      }
                         
                    })}
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    {this.state.etaccdetailedittotal_amount.map((totalamount,index) =>{
                      if(totalamount.et_ad_no==dat.et_no){
                        return  "PHP "+number_format(totalamount.total_expense,2)
                      }
                         
                    })}
                
                </td>
                <td class="pt-3-half"  style={{verticalAlign: 'middle'}}>
                    <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=> this.approveexpenseRequest(dat.et_no,dat.et_type)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=> this.denyexpenseRequest(dat.et_no,dat.et_type)} title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                    </div>
                </td>
                
            </tr>
            ]
        });
        const boq_edit_list=this.state.budgetedit.map((dat,index) =>{
            return [
                <tr key={index}>
                    <td style={{verticalAlign : 'middle'}}>{moment(dat.updated_at).format('MM-DD-YYYY')}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.cc_name_code}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.cc_name}</td>
                    <td style={{verticalAlign : 'middle'}}>{number_format(dat.budget_month,2)}</td>
                    <td style={{verticalAlign : 'middle', textAlign : 'middle'}}>
                        <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=>this.update_budget(dat.budget_no)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=>this.delete_budget_request(dat.budget_no)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                        </div>
                    </td>
                </tr>
            ]
        });
        const PendingCancelEntryList = this.state.PendingCancelEntry.map((dat,index) => {
            return [
                <tr key={index}>
                    <td style={{verticalAlign : 'middle'}}>{moment(dat.created_at).format('MM-DD-YYYY')}</td>
                    <td style={{verticalAlign : 'middle',textAlign : 'center'}}>{dat.entry_id.replace("Journal-", "")}</td>
                    <td style={{verticalAlign : 'middle'}}>{dat.type=="Invoice"? dat.locationss+" "+dat.invoice_type : dat.type}</td>
                    <td style={{verticalAlign : 'middle'}}>
                        {this.state.journalentries.map((coa,inn)=>{
                            if(dat.type=="Invoice" || dat.type=="Sales Receipt"){
                                if(coa.other_no==dat.entry_id && coa.je_transaction_type==dat.type && coa.je_invoice_location_and_type==dat.locationss+" "+dat.invoice_type){
                                    return [
                                        <div>
                                            {coa.je_desc+" \n"}
                                        </div> 
                                    ]
                                }
                            }else{
                                if(coa.other_no==dat.entry_id && coa.je_transaction_type==dat.type && coa.je_invoice_location_and_type==null){
                                    return [
                                        <div>
                                            {coa.je_desc+" \n"}
                                        </div>
                                    ]
                                }
                            }
                            
                        })}
                    
                    </td>
                    <td style={{verticalAlign : 'middle'}}>{dat.Reason}</td>
                    <td style={{verticalAlign : 'middle',textAlign : 'center'}}>
                        <div class="btn-group btn-group-sm" role="group" aria-label="">
                        <button title="Approve" onClick={()=>this.update_entry(dat.id)} type="button" class="btn btn-success"><span class="fa fa-check"></span></button>
                        <button type="button" onClick={()=>this.delete_entry_request(dat.id)}  title="Deny" class="btn btn-danger"><span class="fa fa-times"></span></button>
                        </div>
                    </td>
                </tr>
            ]
        })
        // const data=this.state.data.map((dat) =>{
        //     return []
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
                                    <h1>Approval</h1>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <ul class="nav nav-tabs" id="myTabApprovals" role="tablist">
                                {this.state.access!=null && this.state.access.approval_pending_bills=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link " id="pending_bill_tab-tab" data-toggle="tab" href="#pending_bill_tab" role="tab" aria-controls="profile" aria-selected="false">Pending Bill <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.etNewcount}</span></a>
                                </li>
                                : ''}
                                {this.state.access!=null && this.state.access.approval_bank=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link " id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Bank <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.bankeditscount}</span></a>
                                </li>
                                : ''}
                                {this.state.access!=null && this.state.access.approval_coa=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link" id="coa_tab-tab" data-toggle="tab" href="#coa_tab" role="tab" aria-controls="profile" aria-selected="false">Chart of Accounts <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.coaeditscount}</span></a>
                                </li>
                                : ''}
                                {this.state.access!=null && this.state.access.approval_cc=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link" id="cc_tab-tab" data-toggle="tab" href="#cc_tab" role="tab" aria-controls="profile" aria-selected="false">Cost Center <span style={{borderRadius : '10rem'}}class="badge badge-pill badge-danger">{this.state.costcentereditcount}</span></a>
                                </li>
                                : ''}
                                {this.state.access!=null && this.state.access.approval_customer=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link" id="customer_tab-tab" data-toggle="tab" href="#customer_tab" role="tab" aria-controls="profile" aria-selected="false">Customer <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.customereditcount}</span></a>
                                </li>
                                : ''}
                                {this.state.access!=null && this.state.access.approval_supplier=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link" id="supplier_tab-tab" data-toggle="tab" href="#supplier_tab" role="tab" aria-controls="profile" aria-selected="false">Supplier <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.suppliereditcount}</span></a>
                                </li>
                                : ''}
                                {this.state.access!=null && this.state.access.approval_product_services=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link" id="product_tab-tab" data-toggle="tab" href="#product_tab" role="tab" aria-controls="profile" aria-selected="false">Products and Services <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.productserviceseditcount}</span></a>
                                </li>
                                : ''}
                                {this.state.access!=null && this.state.access.approval_sales=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link" id="sales_tab-tab" data-toggle="tab" href="#sales_tab" role="tab" aria-controls="profile" aria-selected="false">Sales Transaction <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.salestransactionediteditcount}</span></a>
                                </li>
                                : ''}
                                {this.state.access!=null && this.state.access.approval_expense=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link" id="expense_transaction_tab-tab" data-toggle="tab" href="#expense_transaction_tab" role="tab" aria-controls="profile" aria-selected="false">Expense Transaction <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.expensetransactioneditcount}</span></a>
                                </li>
                                : ''}
                                {this.state.access!=null && this.state.access.approval_boq=="1"? 
                                <li class="nav-item">
                                    <a class="nav-link" id="bid_of_quotation_tab-tab" data-toggle="tab" href="#bid_of_quotation_tab" role="tab" aria-controls="profile" aria-selected="false">Bid of Quotation <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.budgeteditcount}</span></a>
                                </li>
                                : ''}
                                <li class="nav-item">
                                    <a class="nav-link" id="entry-tab" data-toggle="tab" href="#entry_tab" role="tab" aria-controls="profile" aria-selected="false">Cancelled Entries <span style={{borderRadius : '10rem'}} class="badge badge-pill badge-danger">{this.state.PendingCancelEntrycount}</span></a>
                                </li>
                            </ul>
                            <div class="tab-content pl-3 p-1" id="myTabContent">
                                <div class="tab-pane fade show " id="entry_tab" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="mt-2">Cancelled Entries</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_entry_approval">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th style={{verticalAlign : 'middle'}}>Request Date</th>
                                                <th style={{verticalAlign : 'middle'}}>Entry No</th>
                                                <th style={{verticalAlign : 'middle'}}>Type</th>
                                                <th style={{verticalAlign : 'middle'}}>Description</th>
                                                <th style={{verticalAlign : 'middle'}}>Reason for Cancellation</th>
                                                <th style={{verticalAlign : 'middle'}}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PendingCancelEntryList}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show " id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="mt-2">Bank</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_coa_approval">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th style={{verticalAlign : 'middle'}}>ID</th>
                                                <th style={{verticalAlign : 'middle'}}>Account Classification</th>
                                                <th style={{verticalAlign : 'middle'}}>Account Type</th>
                                                <th style={{verticalAlign : 'middle'}}>Account Title</th>
                                                <th style={{verticalAlign : 'middle'}}>Account Code</th>
                                                <th width="40%" style={{verticalAlign : 'middle'}}>Description</th>
                                                <th style={{verticalAlign : 'middle'}}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bank_edits_list}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show" id="coa_tab" role="tabpanel" aria-labelledby="coa_tab-tab">
                                    <h3 class="mt-2">Chart of Accounts</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_coa_approval">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>ID</th>
                                            <th style={{verticalAlign : 'middle'}}>Account Classification</th>
                                            <th style={{verticalAlign : 'middle'}}>Account Type</th>
                                            <th style={{verticalAlign : 'middle'}}>Account Title</th>
                                            <th style={{verticalAlign : 'middle'}}>Account Code</th>
                                            <th width="40%" style={{verticalAlign : 'middle'}}>Description</th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coa_edits_list}
                                    </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show" id="cc_tab" role="tabpanel" aria-labelledby="cc_tab-tab">
                                    <h3 class="mt-2">Cost Center</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_cc_approval">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>#</th>
                                            <th style={{verticalAlign : 'middle'}}>Code</th>
                                            <th style={{verticalAlign : 'middle'}}>Type</th>
                                            <th style={{verticalAlign : 'middle'}}>Category</th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cc_edit_list}
                                    </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show" id="customer_tab" role="tabpanel" aria-labelledby="customer_tab-tab">
                                    <h3 class="mt-2">Customer</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_customer_approval">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>Customer ID</th>
                                            <th style={{verticalAlign : 'middle'}}>Name</th>
                                            <th style={{verticalAlign : 'middle'}}>Company</th>
                                            <th style={{verticalAlign : 'middle'}}>Display Name</th>
                                            <th style={{verticalAlign : 'middle'}}>Email</th>
                                            <th style={{verticalAlign : 'middle'}}>Phone</th>
                                            <th style={{verticalAlign : 'middle'}}>Address</th>
                                            <th style={{verticalAlign : 'middle'}}>TIN No.</th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customer_edit_list}
                                    </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show" id="supplier_tab" role="tabpanel" aria-labelledby="supplier_tab-tab">
                                    <h3 class="mt-2">Supplier</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_supplier_approval">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>Supplier ID</th>
                                            <th style={{verticalAlign : 'middle'}}>Name</th>
                                            <th style={{verticalAlign : 'middle'}}>Company</th>
                                            <th style={{verticalAlign : 'middle'}}>Display Name</th>
                                            <th style={{verticalAlign : 'middle'}}>Email</th>
                                            <th style={{verticalAlign : 'middle'}}>Phone</th>
                                            <th style={{verticalAlign : 'middle'}}>Address</th>
                                            <th style={{verticalAlign : 'middle'}}>TIN No.</th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {supplier_edit_list}
                                    </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show" id="product_tab" role="tabpanel" aria-labelledby="product_tab-tab">
                                    <h3 class="mt-2">Product and Services</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_product_approval">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>ID</th>
                                            <th style={{verticalAlign : 'middle'}}>Name</th>
                                            <th style={{verticalAlign : 'middle'}}>Sku</th>
                                            <th style={{verticalAlign : 'middle'}}>Type</th>
                                            <th style={{verticalAlign : 'middle'}}>Description</th>
                                            <th style={{verticalAlign : 'middle'}}>Sale Price</th>
                                            <th style={{verticalAlign : 'middle'}}>Cost</th>
                                            <th style={{verticalAlign : 'middle'}}>Quantity</th>
                                            <th style={{verticalAlign : 'middle'}}>Reorder Point</th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product_edits_list}
                                    </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show" id="sales_tab" role="tabpanel" aria-labelledby="sales_tab-tab">
                                <h3 class="mt-2">Sales Transaction</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_sales_exp_approval">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>Date</th>
                                            <th style={{verticalAlign : 'middle'}}>Type</th>
                                            <th style={{verticalAlign : 'middle'}}>No.</th>
                                            <th style={{verticalAlign : 'middle'}}>Customer</th>
                                            <th style={{verticalAlign : 'middle'}}>Due Date</th>
                                            
                                            <th style={{verticalAlign : 'middle',textAlign : 'center'}}>Total</th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales_trans_edit_list}
                                    </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show" id="expense_transaction_tab" role="tabpanel" aria-labelledby="expense_transaction_tab-tab">
                                <h3 class="mt-2">Expense Transaction</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_expense_exp_approval">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>Date</th>
                                            <th style={{verticalAlign : 'middle'}}>Type</th>
                                            <th style={{verticalAlign : 'middle'}}>No.</th>
                                            <th style={{verticalAlign : 'middle'}}>Payee</th>
                                            <th style={{verticalAlign : 'middle'}}>Due Date</th>
                                            <th style={{verticalAlign : 'middle'}}  width="30%">Category</th>
                                            <th style={{verticalAlign : 'middle'}}>Total</th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pending_bill_edit_list}
                                    </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show " id="pending_bill_tab" role="tabpanel" aria-labelledby="pending_bill_tab-tab">
                                <h3 class="mt-2">Pending Bill</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_pending_bill">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>Date</th>
                                            
                                            <th style={{verticalAlign : 'middle'}}>No.</th>
                                            <th style={{verticalAlign : 'middle'}}>RF</th>
                                            <th style={{verticalAlign : 'middle'}}>PO</th>
                                            <th style={{verticalAlign : 'middle'}}>CI</th>
                                            <th style={{verticalAlign : 'middle'}}>Payee</th>
                                            <th style={{verticalAlign : 'middle'}}>Due Date</th>
                                            
                                            <th style={{verticalAlign : 'middle'}}>Total Amount</th>
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pending_bills_list}
                                    </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade show" id="bid_of_quotation_tab" role="tabpanel"   aria-labelledby="bid_of_quotation_tab-tab">
                                <h3 class="mt-2">Bid of Quotation</h3>
                                    <table class="table table-bordered" style={{backgroundColor : 'white'}} id="table_pending_bill">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{verticalAlign : 'middle'}}>Date</th>
                                            
                                            <th style={{verticalAlign : 'middle'}}>Cost Center Code</th>
                                            <th style={{verticalAlign : 'middle'}}>Cost Center</th>
                                            <th style={{verticalAlign : 'middle'}}>Amount</th>
                                            
                                            <th style={{verticalAlign : 'middle'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {boq_edit_list}
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

export default Approval;