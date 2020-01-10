import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../css/index.css';
import {number_format} from '../../Helper';

class CCModal extends React.Component{
    state ={data: [],cost_center_llql: '',CostCenterTypeCode: '',costcentercategory:'',CostCenterCategory: '',costcentercategoryEdit:'',CostCenterCategoryEdit: '',CostCenterHiddenNoEdit :''}
    UploadMassBIDQuot = async () =>{
        var bodyFormData = new FormData();
        var imagefile = document.querySelector('#excel-upload-bid');
        bodyFormData.append("theFile", imagefile.files[0]);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/UploadMassBIDQuot',bodyFormData);

        var LOG="";
        if(response.data.Error_Log!=""){
        LOG=" \n\nSkip Log : \n"+response.data.Error_Log;
        }
        alert("Total number Of Data : "+response.data.Total+"\nData Saved : "+response.data.Success+" \nData Skipped : "+response.data.Skiped+LOG);
        window.location.reload();
    }
    UploadMassBudget = async ()=>{
        var ids=this.props.budget_cost_center_no;
        var bodyFormData = new FormData();
        var imagefile = document.querySelector('#excel-upload-budget');
        bodyFormData.append("theFile", imagefile.files[0]);
        bodyFormData.append('ids', ids);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/UploadMassBudget',bodyFormData);

        var LOG="";
        if(response.data.Error_Log!=""){
        LOG=" \n\nSkip Log : \n"+response.data.Error_Log;
        }
        alert("Total number Of Data : "+response.data.Total+"\nData Saved : "+response.data.Success+" \nData Skipped : "+response.data.Skiped+LOG);
        window.location.reload();
    }
    openpromptcost_center_type = async () =>{
        var name = prompt("New Cost Center Type", "");
        if (name != null) {
            const response = await axios.get('http://localhost/Accounting_modified/public/api/check_cost_center_type',{
                params:{
                    name: name
                },
                crossDomain: true
            });
            console.log(response.data);
            if(response.data<1){
                var code = prompt("New Cost Center Type Code", "");
                if (code != null) {
                    const response = await axios.get('http://localhost/Accounting_modified/public/api/check_cost_center_code',{
                        params:{
                            name: code
                        },
                        crossDomain: true
                    });
                    console.log(response.data);
                    if(response.data<1){
                        var bodyFormData = new FormData();
                        bodyFormData.set('typename', name);
                        bodyFormData.set('typecode', code);
                        const response = await axios.post('http://localhost/Accounting_modified/public/api/save_cc_type',bodyFormData);
                        alert('Successfully Added Cost Center Type.');
                        window.location.reload();
                    }else{
                        alert('Cost Center Code already exist.');
                    }
                }else{
                    alert('Action Cancelled');
                }
            }else{
                alert('Cost Center Type already exist.');
            }
        }else{
            alert('Action Cancelled');
        }
    }
    checkcostcentercategory = async (type_code) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/GetCodeCostCenter',{
            params:{
                type_code: type_code
            },
            crossDomain: true
        });
        if(response.data=="0"){
            document.getElementById('SaveCostCenterButton').disabled=false;
            document.getElementById('SaveCostCenterButton').title='';
            document.getElementById('CostCenterCategoryCode').style.borderColor="Green";
        }
        if(response.data=="1"){
            document.getElementById('SaveCostCenterButton').disabled=true;
            document.getElementById('SaveCostCenterButton').title='Duplicate Category';
            document.getElementById('CostCenterCategoryCode').style.borderColor="Red";
        }
    }
    checkcostcentercategoryedit = async (type_code) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/GetCodeCostCenterEdit',{
            params:{
                type_code: type_code,
                no : this.props.CostCenterHiddenNoEdit
            },
            crossDomain: true
        });
        if(response.data=="0"){
            document.getElementById('SaveCostCenterButtonEdit').disabled=false;
            document.getElementById('SaveCostCenterButtonEdit').title='';
            document.getElementById('CostCenterCategoryCodeEdit').style.borderColor="Green";
        }
        if(response.data=="1"){
            document.getElementById('SaveCostCenterButtonEdit').disabled=true;
            document.getElementById('SaveCostCenterButtonEdit').title='Duplicate Category';
            document.getElementById('CostCenterCategoryCodeEdit').style.borderColor="Red";
        }
        
    }
    
    SaveCostCenter = async () =>{
        if(this.state.CostCenterTypeCode+"-"==this.state.costcentercategory){
            alert('Enter Category Code');
        }else{
            if(this.state.CostCenterCategory!=""){
                var e=document.getElementById('CostCenterType');
                document.getElementById('CostCenterTypeName').value=e.options[e.selectedIndex].innerHTML;
                var CostCenterTypeName=document.getElementById('CostCenterTypeName').value;
                // CostCenterTypeCode
                // costcentercategory
                // CostCenterCategory
                var bodyFormData = new FormData();
                
                bodyFormData.append('CostCenterTypeName', CostCenterTypeName);
                bodyFormData.append('Type_Code', this.state.CostCenterTypeCode);
                bodyFormData.append('Category_Code', this.state.costcentercategory);
                bodyFormData.append('CostCenterCategory', this.state.CostCenterCategory);
                
                
                const response = await axios.post('http://localhost/Accounting_modified/public/api/SetCostCenter',bodyFormData);
                alert('Successfully Added new Cost Center');
                window.location.reload();
            }else{
                alert('Enter Category');
            }
        }
    }
    SaveCostCenterEdit= async () =>{
        if(this.state.CostCenterTypeCodeEdit+"-"==this.state.costcentercategoryEdit){
            alert('Enter Category Code');
        }else{
            if(this.state.CostCenterCategoryEdit!=""){
                var e=document.getElementById('CostCenterType');
                document.getElementById('CostCenterTypeName').value=e.options[e.selectedIndex].innerHTML;
                var CostCenterTypeNameEdit=document.getElementById('CostCenterTypeNameEdit').value;
                // CostCenterTypeCodeEdit
                // costcentercategoryEdit
                // CostCenterCategory
                var bodyFormData = new FormData();
                
                bodyFormData.append('CostCenterTypeName', CostCenterTypeNameEdit);
                bodyFormData.append('Type_Code', this.state.CostCenterTypeCodeEdit);
                bodyFormData.append('Category_Code', this.state.costcentercategoryEdit);
                bodyFormData.append('CostCenterCategory', this.state.CostCenterCategoryEdit);
                bodyFormData.append('no', this.props.CostCenterHiddenNoEdit);
                const response = await axios.post('http://localhost/Accounting_modified/public/api/SetCostCenterEdit',bodyFormData);
                alert('Successfully submited new Cost Center update request');
                window.location.reload();
            }else{
                alert('Enter Category');
            }
        }
    }
    componentDidUpdate(prev,prevstate){
        if(prev.cc_type_code!=this.props.cc_type_code){
            this.setState({CostCenterTypeCodeEdit : this.props.cc_type_code});
        }
        if(prev.cc_name!=this.props.cc_name){
            this.setState({CostCenterCategoryEdit : this.props.cc_name});
        }
        if(prev.cc_name_code!=this.props.cc_name_code){
            this.setState({costcentercategoryEdit : this.props.cc_name_code});
        }
        
    }
    render(){
        
        const CC_Types_list=this.props.CC_Types_list.map((dat,index) =>{
            return [
                <option key={index} value={dat.cc_code}>{dat.cc_type}</option>

            ]
        });
        return (
            <div>
                <div class="modal fade" id="CostCenterModalEdit" tabIndex="-1" role="dialog" aria-labelledby="CostCenterModalLabelEdit" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CostCenterModalLabelEdit">Edit Cost Center</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="col-md-12">
                            <p>Cost Center Type : </p>    
                            </div>
                            
                            <div class="col-md-8">
                            
                            <select class="form-control form-control-sm chosen-select" id="CostCenterTypeEdit" value={this.state.CostCenterTypeCodeEdit} onChange={(event)=>this.setState({CostCenterTypeCodeEdit : event.target.value,costcentercategoryEdit : event.target.value+"-"})}>
                            <option value="">--Select Cost Center--</option>
                            {CC_Types_list}
                            </select>
                            </div>
                            <div class="col-md-4">
                                <input type="hidden" id="CostCenterTypeNameEdit" value={this.props.cc_type} />
                                <input type="hidden" id="CostCenterHiddenNoEdit" value={this.props.CostCenterHiddenNoEdit} />
                                <input type="text" id="CostCenterCodePreviewEdit" readOnly  value={this.state.CostCenterTypeCodeEdit} class="form-control form-control-sm" />
                            </div>

                            <div class="col-md-8" style={{marginTop : '10px'}}>
                                <p>Cost Center Category</p>
                            </div>
                            <div class="col-md-4" style={{marginTop : '10px'}}>
                                <p>Code</p>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="CostCenterCategoryEdit" value={this.state.CostCenterCategoryEdit} onChange={(event)=>this.setState({CostCenterCategoryEdit : event.target.value})} class="form-control form-control-sm" />
                            </div>
                            <div class="col-md-4">
                                <input type="text" onKeyUp={(event)=>this.checkcostcentercategoryedit(event.target.value)} value={this.state.costcentercategoryEdit} onChange={(event)=>this.setState({costcentercategoryEdit : event.target.value})} id="CostCenterCategoryCodeEdit" class="form-control form-control-sm" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" id="edit_modal_cost_center" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="SaveCostCenterButtonEdit" onClick={()=>this.SaveCostCenterEdit()}>Save</button>
                        </div>
                        </div>
                    </div>
                    </div>
                <div class="modal fade" id="ImportBIDOFQUOTATIONModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog  modal-sm" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Import Bid of Quotation</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style={{textAlign : 'center'}} >
                            
                            <input id="excel-upload-bid" type="file" onChange={()=>this.UploadMassBIDQuot()}  accept=".xlsx" />
                            <label for="excel-upload-bid" style={{opacity : '1', cursor : 'pointer', borderRadius : '10px'}} id="FIleImportExcelLabelBid" class="custom-excel-upload btn btn-primary">
                            <span class="glyphicon glyphicon-user"> IMPORT FROM EXCEL</span>
                            </label>
                            
                        </div>
                        <div class="modal-footer">
                            
                            <a class="btn btn-success" href="http://localhost/Accounting_modified/public/api/GetBudgetTemplateExcel_Bid_of_Quotation" >Download Bid of Account Excel Template</a>
                                                                
                        </div>
                        </div>
                    </div>
                    </div>
                <div className="modal fade" id="CostCenterModal" tabIndex="-1" role="dialog" aria-labelledby="CostCenterModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="CostCenterModalLabel">Cost Center</h5>
                            <button type="button" className="btn btn-primary" onClick={()=>this.openpromptcost_center_type()}>Add Cost Center Type</button>
                        </div>
                        <div className="modal-body">
                            <div className="col-md-12">
                            <p>Cost Center Type : </p> 
                            </div>
                            
                            <div className="col-md-8">
                            
                            <select className="form-control selectpicker" data-live-search="true" id="CostCenterType" onChange={(event)=>this.setState({CostCenterTypeCode : event.target.value,costcentercategory : event.target.value+"-"})} required>
                            <option value="">--Select Type--</option>
                            {CC_Types_list}
                            </select>
                            </div>
                            <div className="col-md-4">
                                <input type="hidden" id="CostCenterTypeName" />
                                <input type="text" id="CostCenterCodePreview" value={this.state.CostCenterTypeCode} readOnly className="form-control form-control-sm" />
                            </div>

                            <div className="col-md-8" style={{marginTop : '10px'}}>
                                <p>Cost Center Category</p>
                            </div>
                            <div className="col-md-4" style={{marginTop : '10px'}}>
                                <p>Code</p>
                            </div>
                            <div className="col-md-8">
                                <input type="text" id="CostCenterCategory" value={this.state.CostCenterCategory} onChange={(event)=>this.setState({CostCenterCategory : event.target.value})} className="form-control form-control-sm" />
                            </div>
                            <div className="col-md-4">
                                <input type="text" onKeyUp={(event)=>this.checkcostcentercategory(event.target.value)} value={this.state.costcentercategory} onChange={(event)=>this.setState({costcentercategory : event.target.value})} id="CostCenterCategoryCode" className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            
                            <button type="button" className="btn btn-secondary" id="closemodalcostcenter" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" id="SaveCostCenterButton" onClick={()=>this.SaveCostCenter()} >Save</button>
                        </div>
                        </div>
                    </div>
                    </div>
                 <div className="modal fade" id="EditBudget" tabIndex="-1" role="dialog" aria-labelledby="BudgetHeaderModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="BudgetHeaderModal">Set/Update {this.props.COST_CENTER_name} Budget</h5>
                        <button type="button" className="close" id="budgermodalBTN" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="hidden" name="hiddenbudgetcc_no" id="hiddenbudgetcc_no" value={this.props.budget_cost_center_no} />
                                        <select id="my-select-budget" className="form-control" name="" onchange="changeUIbudgetModal()" style={{display : 'none'}}>
                                            <option>Monthly</option>
                                            <option>Bid of Quotation</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="col-md-12" style={{textAlign : 'center'}} id="montlyimportbudgetmodal">
                                    
                                    <input id="excel-upload-budget" type="file" onChange={()=>this.UploadMassBudget()}   accept=".xlsx" />
                                    <label for="excel-upload-budget" style={{opacity : '1', cursor : 'pointer', borderRadius : '10px'}} id="FileImportforBudget" className="custom-excel-upload btn btn-primary">
                                    <span className="glyphicon glyphicon-user">IMPORT BUDGET FROM EXCEL</span>
                                    </label>
                                </div>
                                
                            </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CCModal;

