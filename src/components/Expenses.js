import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import { number_format } from '../Helper';
class Expense extends React.Component{
    state ={supplierss: []}
    
    getExpenseTransactionPage= async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getExpenseTransactionPage',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({supplierss : response.data.supplierss});
    }

    componentDidMount(){
        this.getExpenseTransactionPage();
        
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
                    <Modal />
                </div>
                
            </div>
        );
    }
}

export default Expense;