import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import COAModal from './inc/coa_modal.js';
import {number_format} from '../Helper';
class Accounting extends React.Component{
    state ={
        data: [],
        COA: [],
        COA_Group: [],
        searchKeyword : '', 
        COANoSelected : '1',
        cost_center_list : [],
        COA_edit_data : [],
        
    }
    
    getCOAInfo= async (keyword,no) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getCOAInfo',{
            params:{
                keyword : keyword,
                no : no
            },
            crossDomain: true
        });
        console.log(response.data.CC_Types_list);
        this.setState({searchKeyword : response.data.keyword});
        this.setState({COA : response.data.COA});
        this.setState({CC : response.data.CC});
        this.setState({COANoSelected : response.data.COA_Index});
        this.setState({COA_Group : response.data.COA_Type_GROUPPED});
        this.setState({cost_center_list : response.data.cost_center_list});
        
        
        document.getElementById('rendertablecoalist').click();
    }
    changePageNumber(number){
        
        var kkkkk=this.state.COANoSelected;
        this.setState({COANoSelected :parseFloat(kkkkk)+parseFloat(number)}, function() { this.fetchgogo()}.bind(this))
        
    }
    fetchgogo(){
        this.getCOAInfo(this.state.searchKeyword,this.state.COANoSelected);
    }
    componentDidMount(){
        
        this.getCOAInfo(this.state.searchKeyword,this.state.COANoSelected);
        
    }
    UploadMassAccounting = async () =>{
        var bodyFormData = new FormData();
        var imagefile = document.querySelector('#excel-upload');
        bodyFormData.append("theFile", imagefile.files[0]);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/UploadMassCOA',bodyFormData);

        var LOG="";
        if(response.data.Error_Log!=""){
        LOG=" \n\nSkip Log : \n"+response.data.Error_Log;
        }
        alert("Total number Of Data : "+response.data.Total+"\nData Saved : "+response.data.Success+" \nData Skipped : "+response.data.Skiped+LOG);
        window.location.reload();
    }
    EditCOA = async (event) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getCOA_info_edit',{
            params:{
                id: event
            },
            crossDomain: true
        });
        console.log(response.data);
        //this.setState({COA_edit_data : response.data});
        this.setState({COA_edit_data : response.data });
    }
    DeleteCOA = async (event) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('id', event);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/destroy_coa',bodyFormData);
        alert('Chart of Account Deletion Request Submitted.');
        window.location.reload();
    }
    render(){
        
        const coa_table_list=this.state.COA_Group.map((dat,index) =>{
            return [
                <tbody key={index}>
                <tr>
                    <td style={{textAlign :'left'}}>

                    </td>
                    <td style={{textAlign :'left'}}>{dat.coa_title}</td>
                    <td style={{textAlign :'left'}}></td>
                    <td style={{textAlign :'left'}}></td>
                    <td style={{textAlign :'left'}}></td>
                    <td style={{textAlign :'left', display : 'none'}}></td>
                    <td style={{textAlign :'left'}}></td>
                </tr>
                {this.state.COA.map((coa,inn)=>{
                    if(dat.coa_title==coa.coa_title){
                        return[
                            <tr key={inn}>
                                <td style={{textAlign :'left'}}>
                                    {coa.coa_code}
                                </td>
                                <td className="pt-3-half"><span style={{display : 'none'}}>{coa.coa_title}</span></td>
                                <td className="pt-3-half">{coa.coa_account_type}</td>
                                <td className="pt-3-half">{coa.coa_name}</td>
                                <td className="pt-3-half">Php {number_format(coa.coa_balance,2)}</td>
                                <td className="pt-3-half" style={{display :'none'}}>Php {number_format(coa.coa_balance,2)}</td>
                                <td className="text-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn bg-transparent  px-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-ellipsis-v"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                        <a className="dropdown-item" onClick={()=>this.EditCOA(dat.id)} data-toggle="modal" data-target="#chartofaccountsmodaledit" href="#">Edit</a>
                                        <a className="dropdown-item" onClick={()=>this.DeleteCOA(dat.id)}>Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ]
                    }
                    
                })}
                </tbody>
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
                        <COAModal  cost_center_list={this.state.cost_center_list} COA_edit_data={this.state.COA_edit_data}/>
                        <div className="breadcrumbs">
                            <div className="page-header float-left">
                                <div className="page-title">
                                <h1>Accounting</h1>
                                <button type="button" style={{display : 'none'}} id="rendertablecoalist"></button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                        <div class="modal fade" id="ImpirtCOAModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog  modal-sm" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Import Chart of Accounts</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style={{textAlign : 'center'}}>
                                
                                <input id="excel-upload" type="file" onChange={()=>this.UploadMassAccounting()}  accept=".xlsx" />
                                <label for="excel-upload" style={{opacity : '1', cursor : 'pointer', borderRadius : '10px'}}id="FIleImportExcelLabel" class="custom-excel-upload btn btn-primary">
                                <span class="glyphicon glyphicon-user">IMPORT FROM EXCEL</span>
                                </label>
                                
                            </div>
                            <div class="modal-footer">
                                <a class="btn btn-success" href="http://localhost/Accounting_modified/public/api/GetChartofAccountsExcelemplate" >Download Excel Template</a>
                            </div>
                            </div>
                        </div>
                        </div>
                            <div className="col-md-12 mb-5 mt-3 p-0">
                                <a className="mr-1 btn btn-success" href="#" data-toggle="modal" data-target="#chartofaccountsmodal">New Chart of Accounts</a>
                                <a className="mr-1 btn btn-success" href="#" data-toggle="modal" data-target="#ImpirtCOAModal">Import Chart of Accounts</a>
                            </div>
                        
                            <div className="col-md-10">
                            </div>
                            <div className="col-md-2 pr-0">
                                <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter Keyword.."  id="SearchFilterChartofAccounts" value={this.state.searchKeyword} onChange={(event)=> this.setState({searchKeyword: event.target.value})} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" onClick={()=>this.changePageNumber(0)}  title="Search Chart Of Account." type="button"><span className="fa fa-search" ></span></button>
                                </div>
                                </div>
                            </div>
                            <div className="table-editable">
                                
                                <table id="coatable" className="table table-bordered table-responsive-md text-left font14" style={{backgroundColor: 'white'}}>
                                    <thead>
                                    <tr className="bg-ltgrey">
                                        <th className="text-left">CODE</th>
                                        <th className="text-left">CLASSIFICATION</th>
                                        <th className="text-left">LINE ITEM</th>
                                        <th className="text-left">ACCOUNT TITLE</th>
                                        <th className="text-left">BALANCE</th>
                                        <th className="text-center" style={{display:'none'}}>BANK BALANCE</th>
                                        <th className="text-center">ACTION</th>
                                    </tr>
                                </thead>
                                    {coa_table_list}
                                </table>
                                
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-group" style={{width : '15%',float : 'right'}}>
                                    <div className="input-group-prepend">
                                    <button type="button" className="btn btn-secondary" onClick={()=>this.changePageNumber(-20)} style={{lineHeight : '2'}}><span className="fa fa-angle-double-left"></span></button>
                                    </div>
                                    <input type="number" value={parseFloat(this.state.COANoSelected)} onChange={(event)=> this.setState({COANoSelected: event.target.value})} name="" id="currentjournal_no"  min="0" step="20" className="form-control removeReadOnly" style={{textAlign : 'center'}} readOnly />
                                    
                                    <div className="input-group-append">
                                        <button type="button" onClick={()=>this.changePageNumber(20)} className="btn btn-secondary" style={{lineHeight : '2'}}><span className="fa fa-angle-double-right"></span></button>
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

export default Accounting;