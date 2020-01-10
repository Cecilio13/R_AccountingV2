import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import moment from 'moment';
import Side from './inc/side.js';
import { number_format } from '../Helper';
import CCModal from './inc/cc_modal.js';
var columns = [true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,true];
class CostCenter extends React.Component{
    state ={
        data: [],
        CostCenter: [],
        CC_Type_GROUPPED: [],
        searchKeyword : '', 
        CC_Index : '1',
        budgets : [],
        budget_cost_center_no : '',
        COST_CENTER_name : '',
        CC_Types_list : [],
        CostCenterHiddenNoEdit: '',
        cc_type_code : '',
        cc_type : '',
        cc_name_code : '',
        cc_name : '',
    }
    
    ooiienm= async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/students',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({data : response.data});
    }

    componentDidMount(){
        //this.ooiienm();
        this.getCCInfo(this.state.searchKeyword,this.state.CC_Index);
    }
    show_hide_column() {
        var col_no_raw=document.getElementById('cost_center_column_definer').value;
        console.log(col_no_raw);
        if(col_no_raw=="" || col_no_raw=="Hide All" || col_no_raw=="Show All" ){
            var stl;
            if(col_no_raw=="Hide All"){
                for(var c=5;c<columns.length-1;c++){
                    columns[c]=false;
                }
                stl = 'none';
            }else if(col_no_raw=="Show All"){
                for(var c=5;c<columns.length-1;c++){
                    columns[c]=true;
                }
                stl = 'table-cell';
            }
            var tbl  = document.getElementById('costcenterlisttable');
            var rows = tbl.getElementsByTagName('tr');
            for(var c=5;c<columns.length-1;c++){
                for (var row=0; row<rows.length;row++) {
                    var cels = rows[row].getElementsByTagName('td')
                        
                        if(cels.length>0){
                            cels[c].style.display=stl;
                        }else{
                            
                        }
                        var cels = rows[row].getElementsByTagName('th')
                        if(cels.length>0){
                            cels[c].style.display=stl;
                        }else{
                            
                        }
                    
                }
            }
            
        }else{
            var col_no=col_no_raw-1;
            var do_show=columns[col_no];
                if(do_show){
                    do_show=false;
                    columns[col_no]=false;
                }else{
                    do_show=true;
                    columns[col_no]=true;
                }
                console.log(do_show+" "+col_no);
            var stl;
            if (do_show) stl = 'table-cell'
            else         stl = 'none';
        
            var tbl  = document.getElementById('costcenterlisttable');
            var rows = tbl.getElementsByTagName('tr');
            for (var row=0; row<rows.length;row++) {
                var cels = rows[row].getElementsByTagName('td')
                    
                    if(cels.length>0){
                        cels[col_no].style.display=stl;
                    }else{
                        
                    }
                    var cels = rows[row].getElementsByTagName('th')
                    if(cels.length>0){
                        cels[col_no].style.display=stl;
                    }else{
                        
                    }
                    
                
                //cels[col_no].style.display=stl;
            }
            console.log('columns : '+columns);
        }
        document.getElementById('cost_center_column_definer').value="";
    }
    UploadMassCC =async ()=>{
        var bodyFormData = new FormData();
        var imagefile = document.querySelector('#excel-upload-cc');
        bodyFormData.append("theFile", imagefile.files[0]);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/UploadMassCC',bodyFormData);

        var LOG="";
        if(response.data.Error_Log!=""){
        LOG=" \n\nSkip Log : \n"+response.data.Error_Log;
        }
        alert("Total number Of Data : "+response.data.Total+"\nData Saved : "+response.data.Success+" \nData Skipped : "+response.data.Skiped+LOG);
        window.location.reload();
    }
    changePageNumber(number){
        
        var kkkkk=this.state.CC_Index;
        this.setState({CC_Index :parseFloat(kkkkk)+parseFloat(number)}, function() { this.fetchgogo()}.bind(this))
        
    }
    fetchgogo(){
        this.getCCInfo(this.state.searchKeyword,this.state.CC_Index);
    }
    getCCInfo = async (keyword,no) =>{
        
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getCCInfo',{
            params:{
                keyword : keyword,
                no : no
            },
            crossDomain: true
        });
        console.log(response.data.budgets);
        this.setState({searchKeyword : response.data.keyword});
        this.setState({CostCenter : response.data.CostCenter});
        this.setState({CC_Index : response.data.CC_Index});
        this.setState({CC_Type_GROUPPED : response.data.CC_Type_GROUPPED});
        this.setState({budgets : response.data.budgets});
        this.setState({CC_Types_list : response.data.CC_Types_list});
        
        
    }
    DeleteCC= async (event) =>{
        var bodyFormData = new FormData();
        bodyFormData.set('cost_id', event);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/delete_cost_center',bodyFormData);
        alert('Cost Center Deletion Request Submitted.');
        window.location.reload();
    }
    
    render(){
        const cc_type_grouped=this.state.CC_Type_GROUPPED.map((dat,index) =>{
            return [
                <tbody key={index}>
                <tr >
                    <td class="text-left" ></td>
                    <td class="text-left" >{dat.cc_type_code}</td>
                    <td class="text-left" >{dat.cc_type}</td>
                    <td class="text-left" ></td>
                    <td class="text-left" ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left"  style={{display : 'none'}} ></td>
                    <td class="text-left" ></td>
                </tr>
                {this.state.CostCenter.map((coa,inn)=>{
                    if(dat.cc_type==coa.cc_type){
                        var totalYTDBudget=0;
                        var Bid_OFQUOTATION=0;
                        var m1=0;
                        var m2=0;
                        var m3=0;
                        var m4=0;
                        var m5=0;
                        var m6=0;
                        var m7=0;
                        var m8=0;
                        var m9=0;
                        var m10=0;
                        var m11=0;
                        var m12=0;
                        if(coa.cc_use_quotation=="Yes"){
                            for(var c=0; c<this.state.budgets.length;c++){
                                if(this.state.budgets[c].budget_cost_center==coa.cc_no && this.state.budgets[c].budget_type=="Bid of Quotation"){
                                    totalYTDBudget=this.state.budgets[c].budget_month;
                                }
                            }
                            Bid_OFQUOTATION=totalYTDBudget;
                        }else{
                            for(var c=0; c<this.state.budgets.length;c++){
                                if(this.state.budgets[c].budget_cost_center==coa.cc_no && this.state.budgets[c].budget_year==moment().format('YYYY')){
                                    
                                    if(this.state.budgets[c].m1!= null){
                                        console.log(this.state.budgets[c].m1);
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m1);
                                        m1+=parseFloat(this.state.budgets[c].m1);
                                    }
                                    if(this.state.budgets[c].m2!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m2);
                                        m2+=parseFloat(this.state.budgets[c].m2);
                                    }
                                    if(this.state.budgets[c].m3!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m3);
                                        m3+=parseFloat(this.state.budgets[c].m3);
                                    }
                                    if(this.state.budgets[c].m4!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m4);
                                        m4+=parseFloat(this.state.budgets[c].m4);
                                    }
                                    if(this.state.budgets[c].m5!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m5);
                                        m5+=parseFloat(this.state.budgets[c].m5);
                                    }
                                    if(this.state.budgets[c].m6!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m6);
                                        m6+=parseFloat(this.state.budgets[c].m6);
                                    }
                                    if(this.state.budgets[c].m7!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m7);
                                        m7+=parseFloat(this.state.budgets[c].m7);
                                    }
                                    if(this.state.budgets[c].m8!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m8);
                                        m8+=parseFloat(this.state.budgets[c].m8);
                                    }
                                    if(this.state.budgets[c].m9!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m9);
                                        m9+=parseFloat(this.state.budgets[c].m9);
                                    }
                                    if(this.state.budgets[c].m10!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m10);
                                        m10+=parseFloat(this.state.budgets[c].m10);
                                    }
                                    if(this.state.budgets[c].m11!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m11);
                                        m11+=parseFloat(this.state.budgets[c].m11);
                                    }
                                    if(this.state.budgets[c].m12!= null){
                                        totalYTDBudget+=parseFloat(this.state.budgets[c].m12);
                                        m12+=parseFloat(this.state.budgets[c].m12);
                                    }
                                    
                                }
                            }
                        }
                        return[
                            <tr key={inn}>
                                <td class="text-right" >{coa.cc_no}</td>
                                <td class="text-right" >{coa.cc_name_code}</td>
                                <td class="text-left" ><span style={{display : 'none'}}>{coa.cc_type}</span></td>
                                <td class="text-left" >{coa.cc_name}</td>
                                <td class={`text-left ${coa.cc_use_quotation=="Yes"? 'QuotationClass' : ''}`} >{number_format(totalYTDBudget,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m1,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m2,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m3,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m4,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m5,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m6,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m7,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m8,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m9,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m10,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m11,2)}</td>
                                <td class="text-left"  style={{display : 'none'}} >{number_format(m12,2)}</td>
                                <td class="text-center" >
                                <div class="btn-group">
                                    <button type="button" class="btn bg-transparent  px-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-custom">
                                        <a class="dropdown-item" href={`http://localhost/Accounting_modified/public//api/GetBudgetTemplateExcel/?cc=${coa.cc_no}`}>Download Monthly Budget Excel Template</a>
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#EditBudget" onClick={()=>this.setState({budget_cost_center_no : coa.cc_no, COST_CENTER_name : coa.cc_name})}>Set/Update Budget</a>
                                        <a class="dropdown-item" href="#" data-toggle="modal" onClick={()=>this.setState({CostCenterHiddenNoEdit : coa.cc_no,cc_type_code : coa.cc_type_code , cc_type :coa.cc_type ,cc_name_code :coa.cc_name_code ,cc_name :coa.cc_name})} data-target="#CostCenterModalEdit" >Edit</a>
                                        
                                        <a class="dropdown-item" href="#" onClick={()=>this.DeleteCC(coa.cc_no)}>Delete</a>
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
                        <CCModal cc_type_code={this.state.cc_type_code} cc_type={this.state.cc_type} cc_name_code={this.state.cc_name_code}  cc_name={this.state.cc_name} CostCenterHiddenNoEdit={this.state.CostCenterHiddenNoEdit} CC_Types_list={this.state.CC_Types_list} budget_cost_center_no={this.state.budget_cost_center_no} COST_CENTER_name={this.state.COST_CENTER_name} />
                    <div class="modal fade" id="ImportCCModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog  modal-sm" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Import Cost Center</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style={{textAlign : 'center'}}>
                                
                                <input id="excel-upload-cc" type="file" onChange={()=>this.UploadMassCC()}  accept=".xlsx" />
                                <label htmlFor="excel-upload-cc" style={{opacity : '1', cursor : 'pointer', borderRadius : '10px'}} id="FIleImportExcelLabel" class="custom-excel-upload btn btn-primary">
                                <span class="glyphicon glyphicon-user"> IMPORT FROM EXCEL</span>
                                </label>
                                
                            </div>
                            <div class="modal-footer">
                                <a class="btn btn-success" href="http://localhost/Accounting_modified/public/api/GetChartofCostCenterExcelemplate">Download Excel Template</a>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="breadcrumbs">
                            <div className="page-header float-left">
                                <div className="page-title">
                                    <h1>Cost Centers</h1>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="col-md-12 mb-5 mt-3 p-0">
                                <a className="btn btn-success mr-1" href="#" data-toggle="modal" id="costcenter_modal_open" data-target="#CostCenterModal">New Cost Center</a>
                                <a className="btn btn-success mr-1" href="#" data-toggle="modal" data-target="#ImportCCModal">Import Cost Center</a>
                                <a className="btn btn-success mr-1" href="#" data-toggle="modal" data-target="#ImportBIDOFQUOTATIONModal">Import Bid of Quotation</a>
                            </div>
                            <div className="col-md-10">
                                <div className="dropdown" style={{marginBottom : '10px'}}>
                                        <a className="btn btn-info dropdown-toggle btn-sm" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Hide/Show Month Column
                                        </a>
                                        
                                        <div className="dropdown-menu">
                                        <form style={{padding : '1px 10px'}}>
                                            <div className="form-group" >
                                            
                                            <select className="form-control" id="cost_center_column_definer" onChange={(event)=>this.show_hide_column()}>
                                                <option value=""></option>
                                                <option value="Hide All">Hide All</option>
                                                <option value="Show All">Show All</option>
                                                <option value="6">January</option>
                                                <option value="7">February</option>
                                                <option value="8">March</option>
                                                <option value="9">April</option>
                                                <option value="10">May</option>
                                                <option value="11">June</option>                               
                                                <option value="12">July</option>                               
                                                <option value="13">August</option> 
                                                <option value="14">September</option>
                                                <option value="15">October</option>
                                                <option value="16">November</option>
                                                <option value="17">December</option>
                                            </select>
                                            
                                            </div>
                                            
                                        </form>
                                        </div>
                                    </div>
                            </div>
                            <div className="col-md-2 pr-0">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Enter Keyword.." value={this.state.searchKeyword} onChange={(event)=> this.setState({searchKeyword: event.target.value})} id="SearchFilterCostCenter" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" onClick={()=>this.changePageNumber(0)}  title="Search Cost Center" type="button"><span className="fa fa-search" ></span></button>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-12 mb-1 p-0">
                            <table id="costcenterlisttable" style={{width: '100%', backgroundColor : 'white'}} className="table table-bordered table-responsive-md text-left font14" >
                            
                                <thead>
                                
                                <tr className="bg-ltgrey">
                                    <th className="text-left" width="5%">#</th>
                                    <th className="text-left" width="5%">Code</th>
                                    <th className="text-left" width="10%">Type</th>
                                    <th className="text-left" width="30%">Category</th>
                                    <th className="text-left" width="10%">Budget (YTD)</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">January</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">February</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">March</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">April</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">May</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">June</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">July</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">August</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">September</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">October</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">November</th>
                                    <th className="text-left" style={{display : 'none'}} width="10%">December</th>

                                    <th className="text-left" width="10%"></th>
                                </tr>
                                </thead>
                               
                                    {cc_type_grouped}
                                
                            </table>
                            </div>
                            <div className="col-md-12 p-0">
                                <div className="input-group" style={{width : '15%',float : 'right'}}>
                                <div className="input-group-prepend">
                                <button type="button" className="btn btn-secondary" onClick={()=>this.changePageNumber(-20)} style={{lineHeight : '2'}}><span className="fa fa-angle-double-left"></span></button>
                                </div>
                                <input type="number" value={parseFloat(this.state.CC_Index)} onChange={(event)=> this.setState({CC_Index: event.target.value})} name="" id="currentjournal_no"  min="0" step="20" className="form-control removeReadOnly" style={{textAlign : 'center'}} readOnly />
                                
                                <div className="input-group-append">
                                    <button type="button" onClick={()=>this.changePageNumber(20)} className="btn btn-secondary" style={{lineHeight : '2'}}><span className="fa fa-angle-double-right"></span></button>
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

export default CostCenter;