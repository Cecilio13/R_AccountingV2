import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';

class CostCenter extends React.Component{
    state ={
        data: [],
        searchKeyword : '',
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
        
    }

    render(){

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
                                            
                                            <select className="form-control chosen-select" onchange="showhidemonthcolumn(this.value)">
                                                <option value="Hide All">Hide All</option>
                                                <option value="Show All">Show All</option>
                                                <option value="5">January</option>
                                                <option value="6">February</option>
                                                <option value="7">March</option>
                                                <option value="8">April</option>
                                                <option value="9">May</option>
                                                <option value="10">June</option>                               
                                                <option value="11">July</option>                               
                                                <option value="12">August</option> 
                                                <option value="13">September</option>
                                                <option value="14">October</option>
                                                <option value="15">November</option>
                                                <option value="16">December</option>
                                            </select>
                                            
                                            </div>
                                            
                                        </form>
                                        </div>
                                    </div>
                            </div>
                            <div className="col-md-2 pr-0">
                                <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter Keyword.." value={this.state.searchKeyword} onChange={(event)=> this.setState({searchKeyword: event.target.value})} id="SearchFilterJournalEnties" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" onclick="currentcc_no_go()" title="Search Journal Entries" type="button"><span className="fa fa-search"></span></button>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-12 mb-1 p-0">
                            <table id="costcenterlisttable" style={{width: '100%'}} className="table table-bordered table-responsive-md text-left font14" >
                                <thead>
                                <tr className="bg-ltgrey">
                                    <th className="text-left" width="5%">#</th>
                                    <th className="text-left" width="5%">Code</th>
                                    <th className="text-left" width="10%">Type</th>
                                    <th className="text-left" width="30%">Category</th>
                                    <th className="text-left" width="10%">Budget (YTD)</th>
                                    <th className="text-left" width="10%">January</th>
                                    <th className="text-left" width="10%">February</th>
                                    <th className="text-left" width="10%">March</th>
                                    <th className="text-left" width="10%">April</th>
                                    <th className="text-left" width="10%">May</th>
                                    <th className="text-left" width="10%">June</th>
                                    <th className="text-left" width="10%">July</th>
                                    <th className="text-left" width="10%">August</th>
                                    <th className="text-left" width="10%">September</th>
                                    <th className="text-left" width="10%">October</th>
                                    <th className="text-left" width="10%">November</th>
                                    <th className="text-left" width="10%">December</th>

                                    <th className="text-left" width="10%"></th>
                                </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
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