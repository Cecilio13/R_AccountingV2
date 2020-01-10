import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../css/index.css';
import {number_format} from '../../Helper';

class COAModal extends React.Component{
    state ={data: [],cost_center_llql: ''}
    changelistlineitem = () =>{
        var e=document.getElementById('coatitle');
        var input_item_line=document.getElementById('customaccount');
        if(e.value=="Assets"){
            input_item_line.setAttribute('list','line_item_choices_list_asset');
        }
        if(e.value=="Liabilities"){
            input_item_line.setAttribute('list','line_item_choices_list_liability');
        }
        if(e.value=="Equity"){
            input_item_line.setAttribute('list','line_item_choices_list_equity');
        }
        if(e.value=="Revenues"){
            input_item_line.setAttribute('list','line_item_choices_list_revenue');
        }
        if(e.value=="Expenses"){
            input_item_line.setAttribute('list','line_item_choices_list_expense');
        }
    }
    changelistlineitemedit = () =>{
        var e=document.getElementById('coatitleedit');
        var input_item_line=document.getElementById('customaccountedit');
        if(e.value=="Assets"){
            input_item_line.setAttribute('list','line_item_choices_list_asset');
        }
        if(e.value=="Liabilities"){
            input_item_line.setAttribute('list','line_item_choices_list_liability');
        }
        if(e.value=="Equity"){
            input_item_line.setAttribute('list','line_item_choices_list_equity');
        }
        if(e.value=="Revenues"){
            input_item_line.setAttribute('list','line_item_choices_list_revenue');
        }
        if(e.value=="Expenses"){
            input_item_line.setAttribute('list','line_item_choices_list_expense');
        }
    }
    save_coa_form = async (event) =>{
        event.preventDefault();
        const bodyFormData = new FormData(event.target);
        console.log(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/SaveCOA',bodyFormData);
        alert('Chart of Account saved..');
        window.location.reload();
    }
    update_coa_form = async (event) =>{
        event.preventDefault();
        const bodyFormData = new FormData(event.target);
        console.log(event.target);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/update_coa',bodyFormData);
        alert('Chart of Account Edit Request Submitted');
        window.location.reload();
    }
    
    componentDidUpdate(prev,prevstate){
        if(prev.COA_edit_data.coa_cc!=this.props.COA_edit_data.coa_cc){
            this.setState({cost_center_llql : this.props.COA_edit_data.coa_cc});
        }
    }
    render(){
        
        const cost_center_list=this.props.cost_center_list.map((dat,index) =>{
            return [
                <option value={dat.cc_no} key={index}>{dat.cc_name}</option>
            ]
        });
        return (
            <div>
                <div className="modal fade" id="chartofaccountsmodaledit" tabIndex="-1" role="dialog" aria-labelledby="salesModalLabel" aria-hidden="true" data-backdrop="static">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="salesModalLabeledit">Account</h5>
                            <button type="button" className="close" id="coa_close_btnedit" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="coa_formedit" method="POST" onSubmit={this.update_coa_form}>
                        <input type="hidden" name="coa_id" value={this.props.COA_edit_data.id} />
                        <div className="modal-body">    
                            <div className="col-md-6 p-1">
                                <div className="mb-3" style={{display : 'none'}}>
                                    <select className="w-100 pt-1" id="accounttypeTypeedit" >
                                    <option value="default">Default</option>
                                    <option value="defined">Company Defined Account Type</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <p>Account Classification</p>
                                    <select id="coatitleedit" value={this.props.COA_edit_data.coa_title} list="account_title_datalist" type="text" name="coatitle"  className="w-100"  onChange={()=>this.changelistlineitemedit()}>
                                        <option>Assets</option>
                                        <option>Liabilities</option>
                                        <option>Equity</option>
                                        <option>Revenues</option>
                                        <option>Expenses</option>
                                    </select>
                                    <datalist id="account_title_datalist">
                                        <option>Assets</option>
                                        <option>Liabilities</option>
                                        <option>Equity</option>
                                        <option>Revenues</option>
                                        <option>Expenses</option>
                                    </datalist>
                                </div>
                                <div className="mb-3">
                                    <p>Line Item</p>
                                    <select id="coaAccountTypeedit" value="Custom" name="ACCType" className="w-100 pt-1" required style={{display : 'none'}}>
                                        <option>Bank</option>
                                        <option>Accounts receivable (A/R)</option>
                                        <option>Other Current Assets</option>
                                        <option>Fixed Assets</option>
                                        <option>Other Assets</option>
                                        <option>Accounts Payable (A/P)</option>
                                        <option>Credit Card</option>
                                        <option>Other Current Liabilities</option>
                                        <option>Long Term Liabilities</option>
                                        <option>Equity</option>
                                        <option>Income</option>
                                        <option>Cost of Goods Sales</option>
                                        <option>Expenses</option>
                                        <option>Other Income</option>
                                        <option>Other Expenses</option>
                                        <option >Custom</option>
                                    </select>
                                    
                                    <input type="text" name="customaccounttype" id="customaccountedit" defaultValue={this.props.COA_edit_data.coa_account_type}  className="w-100" list="line_item_choices_list_asset" />
                                    <datalist id="line_item_choices_list_asset">
                                        <option>Current Asset</option>
                                        <option>Non-Current Asset</option>
                                        <option>Other Current Assets</option>
                                        <option>Fixed Assets</option>
                                        <option>Other Assets</option>
                                    </datalist>
                                    <datalist id="line_item_choices_list_liability">
                                        <option>Current Liabilities</option>
                                        <option>Other Current Liabilities</option>
                                        <option>Long Term Liabilities</option>
                                    </datalist>
                                    <datalist id="line_item_choices_list_equity">
                                        <option>Equity</option>
                                    </datalist>
                                    <datalist id="line_item_choices_list_revenue">
                                        <option>Revenue</option>
                                    </datalist>
                                    <datalist id="line_item_choices_list_expense">
                                        <option>Expense</option>
                                        <option>Other Expenses</option>
                                    </datalist>
                                </div>
                                
                                <div className="mb-3">
                                    <p>Account Title</p>
                                    <select id="coaDetailTypeedit" style={{display : 'none'}} name="DetType" className="w-100 pt-1" onchange="ChangeTypeDesc()">
                                        <option>Cash on hand</option>
                                        <option>Checking</option>
                                        <option>Money Market</option>
                                        <option>Rents Held in Trust</option>
                                        <option>Savings</option>
                                        <option>Trust Account</option>
                                    </select>
                                    <input type="text"  className="w-100" name="customdetailtyep" required id="customdetailedit" defaultValue={this.props.COA_edit_data.coa_name} /> 
                                </div>
                                <div className="mb-3">
                                    <p>Description</p>
                                    <textarea id="coaDescedit" type="text" name="COADesc" className="w-100" defaultValue={this.props.COA_edit_data.coa_description}></textarea>
                                </div>
                                <textarea style={{display : 'none'}} rows="7" id="TypeDescriptionTextAreaedit" className="w-100 mt-3" readonly>Use a Cash on hand account to track cash your company keeps for occasional expenses, also called petty cash.\nTo track cash from sales that have not been deposited yet, use a pre-created account called Undeposited funds, instead.</textarea>
                            </div>
                            <div className="col-md-6 p-1">
                                <div className="mb-3" style={{display : 'none'}}>
                                    <p>Name</p>
                                    <input id="coaNameedit" name="COAName" type="text" value="Name" className="w-100" />
                                </div>
                                
                                <div className="mb-3">
                                        <p>Code</p>
                                        <input id="coaCodeedit" type="text" name="COACode" defaultValue={this.props.COA_edit_data.coa_code} className="w-100" required />
                                    </div>
                                    <div className="mb-3">
                                        <p>Normal Balance</p>
                                        <select id="coaNormalBalanceedit" name="COANormalBalance" defaultValue={this.props.COA_edit_data.normal_balance} className="w-100">
                                            <option>Credit</option>
                                            <option>Debit</option>
                                        </select>
                                        
                        
                                    </div>
                                    
                                <div className="pt-2 mb-3" style={{display : 'none'}}>
                                    <div className="custom-control custom-checkbox mb-2">
                                        <input type="checkbox" name="COASubAcc" className="custom-control-input" onclick="parentACC()" id="defaultUncheckededit" />
                                        
                                        <label className="custom-control-label" for="defaultUnchecked">Is sub-account</label>
                                    </div>
                                    <input type="text" id="parentAccedit" readonly name="COAParentAcc" placeholder="Enter parent account" className="w-100" />
                                </div>
                                <div className="col-md-12 p-1" style={{display : 'none'}}>
                                    <p>Sub Account</p>
                                    <select id="sub_accoinmtedit"name="sub_accoinmt"className="w-100">
                                        <option></option>
                                        <option>Bank</option>
                                        <option>Cash on Hand</option>
                                        <option>Receivable Accounts</option>
                                        <option>Inventories</option>
                                        <option >Prepayments</option>
                                    </select>
                                </div>
                                <div className="col-md-6 p-1" style={{display : 'none'}}>
                                    <p>Balance</p>
                                    <input id="coaBalanceedit" type="number" name="COABalance" value="0" min="0" step="0.01" className="w-100" />
                                    
                                </div>
                                <div className="col-md-6 p-1" style={{display : 'none'}}>
                                    <p>as of</p>
                                    <input type="date" name="COAAsof" className="w-100" />
                                </div>
                                <div className="col-md-12 p-1" id="coastcenterdivcoiasadsdweq">
                                    <p>Cost Center</p>
                                    <select id="coa_ccedit" value={this.state.cost_center_llql} onChange={(event)=>this.setState({cost_center_llql : event.value})} name="coa_cc"className="w-100 selectpicker" data-live-search="true">
                                        <option value="">--Select Cost Center--</option>
                                        {cost_center_list}
                                    </select>
                                    
                                </div>
                            </div>
                        </div>
                        </form> 
                        <div className="modal-footer">
                            <input form="coa_formedit" type="reset" className="btn rounded btn-secondary"  value="Cancel" onClick={()=>document.getElementById('coa_close_btnedit').click()} />
                            <input form="coa_formedit" type="submit" className="btn rounded btn-success" id="coaaddedit" value="Save" />
                        </div>
                        
                    </div>
                </div>
            </div> 

              <div className="modal fade" id="chartofaccountsmodal" tabIndex="-1" role="dialog" aria-labelledby="salesModalLabel" aria-hidden="true" data-backdrop="static">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="salesModalLabel">Account</h5>
                            <button type="button" className="close" id="coa_close_btn" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="coa_form" method="POST" onSubmit={this.save_coa_form}>
                        <div className="modal-body">    
                            <div className="col-md-6 p-1">
                                <div className="mb-3" style={{display : 'none'}}>
                                    <select className="w-100 pt-1" id="accounttypeType" >
                                    <option value="default">Default</option>
                                    <option value="defined">Company Defined Account Type</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <p>Account Classification</p>
                                    <select id="coatitle" list="account_title_datalist" type="text" name="coatitle"  className="w-100"  onChange={()=>this.changelistlineitem()}>
                                        <option>Assets</option>
                                        <option>Liabilities</option>
                                        <option>Equity</option>
                                        <option>Revenues</option>
                                        <option>Expenses</option>
                                    </select>
                                    <datalist id="account_title_datalist">
                                        <option>Assets</option>
                                        <option>Liabilities</option>
                                        <option>Equity</option>
                                        <option>Revenues</option>
                                        <option>Expenses</option>
                                    </datalist>
                                </div>
                                <div className="mb-3">
                                    <p>Line Item</p>
                                    <select id="coaAccountType" value="Custom" name="ACCType" className="w-100 pt-1" required style={{display : 'none'}}>
                                        <option>Bank</option>
                                        <option>Accounts receivable (A/R)</option>
                                        <option>Other Current Assets</option>
                                        <option>Fixed Assets</option>
                                        <option>Other Assets</option>
                                        <option>Accounts Payable (A/P)</option>
                                        <option>Credit Card</option>
                                        <option>Other Current Liabilities</option>
                                        <option>Long Term Liabilities</option>
                                        <option>Equity</option>
                                        <option>Income</option>
                                        <option>Cost of Goods Sales</option>
                                        <option>Expenses</option>
                                        <option>Other Income</option>
                                        <option>Other Expenses</option>
                                        <option >Custom</option>
                                    </select>
                                    
                                    <input type="text" name="customaccounttype" id="customaccount"  className="w-100" list="line_item_choices_list_asset" />
                                    <datalist id="line_item_choices_list_asset">
                                        <option>Current Asset</option>
                                        <option>Non-Current Asset</option>
                                        <option>Other Current Assets</option>
                                        <option>Fixed Assets</option>
                                        <option>Other Assets</option>
                                    </datalist>
                                    <datalist id="line_item_choices_list_liability">
                                        <option>Current Liabilities</option>
                                        <option>Other Current Liabilities</option>
                                        <option>Long Term Liabilities</option>
                                    </datalist>
                                    <datalist id="line_item_choices_list_equity">
                                        <option>Equity</option>
                                    </datalist>
                                    <datalist id="line_item_choices_list_revenue">
                                        <option>Revenue</option>
                                    </datalist>
                                    <datalist id="line_item_choices_list_expense">
                                        <option>Expense</option>
                                        <option>Other Expenses</option>
                                    </datalist>
                                </div>
                                
                                <div className="mb-3">
                                    <p>Account Title</p>
                                    <select id="coaDetailType" style={{display : 'none'}} name="DetType" className="w-100 pt-1" onchange="ChangeTypeDesc()">
                                        <option>Cash on hand</option>
                                        <option>Checking</option>
                                        <option>Money Market</option>
                                        <option>Rents Held in Trust</option>
                                        <option>Savings</option>
                                        <option>Trust Account</option>
                                    </select>
                                    <input type="text"  className="w-100" name="customdetailtyep" required id="customdetail" /> 
                                </div>
                                <div className="mb-3">
                                    <p>Description</p>
                                    <textarea id="coaDesc" type="text" name="COADesc" className="w-100"></textarea>
                                </div>
                                <textarea style={{display : 'none'}} rows="7" id="TypeDescriptionTextArea" className="w-100 mt-3" readonly>Use a Cash on hand account to track cash your company keeps for occasional expenses, also called petty cash.\nTo track cash from sales that have not been deposited yet, use a pre-created account called Undeposited funds, instead.</textarea>
                            </div>
                            <div className="col-md-6 p-1">
                                <div className="mb-3" style={{display : 'none'}}>
                                    <p>Name</p>
                                    <input id="coaName" name="COAName" type="text" value="Name" className="w-100" />
                                </div>
                                
                                <div className="mb-3">
                                        <p>Code</p>
                                        <input id="coaCode" type="text" name="COACode" className="w-100" required />
                                    </div>
                                    <div className="mb-3">
                                        <p>Normal Balance</p>
                                        <select id="coaNormalBalance" name="COANormalBalance" value="" className="w-100">
                                            <option>Credit</option>
                                            <option>Debit</option>
                                        </select>
                                        
                        
                                    </div>
                                    
                                <div className="pt-2 mb-3" style={{display : 'none'}}>
                                    <div className="custom-control custom-checkbox mb-2">
                                        <input type="checkbox" name="COASubAcc" className="custom-control-input" onclick="parentACC()" id="defaultUnchecked" />
                                        
                                        <label className="custom-control-label" for="defaultUnchecked">Is sub-account</label>
                                    </div>
                                    <input type="text" id="parentAcc" readonly name="COAParentAcc" placeholder="Enter parent account" className="w-100" />
                                </div>
                                <div className="col-md-12 p-1" style={{display : 'none'}}>
                                    <p>Sub Account</p>
                                    <select id="sub_accoinmt"name="sub_accoinmt"className="w-100">
                                        <option></option>
                                        <option>Bank</option>
                                        <option>Cash on Hand</option>
                                        <option>Receivable Accounts</option>
                                        <option>Inventories</option>
                                        <option >Prepayments</option>
                                    </select>
                                </div>
                                <div className="col-md-6 p-1" style={{display : 'none'}}>
                                    <p>Balance</p>
                                    <input id="coaBalance" type="number" name="COABalance" value="0" min="0" step="0.01" className="w-100" />
                                    
                                </div>
                                <div className="col-md-6 p-1" style={{display : 'none'}}>
                                    <p>as of</p>
                                    <input type="date" name="COAAsof" className="w-100" />
                                </div>
                                <div className="col-md-12 p-1" >
                                    <p>Cost Center</p>
                                    <select id="coa_cc" name="coa_cc"className="w-100 selectpicker" data-live-search="true" >
                                        <option value="">--Select Cost Center--</option>
                                        {cost_center_list}
                                    </select>
                                </div>
                            </div>
                        </div>
                        </form> 
                        <div className="modal-footer">
                            <input form="coa_form" type="reset" className="btn rounded btn-secondary"  value="Cancel" onClick={()=>document.getElementById('coa_close_btn').click()} />
                            <input form="coa_form" type="submit" className="btn rounded btn-success" id="coaadd" value="Save" />
                        </div>
                        
                    </div>
                </div>
            </div>  
            </div>
        );
    }
}

export default COAModal;

