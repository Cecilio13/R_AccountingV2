import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';

import {PrintElem} from '../Helper';
import Side from './inc/side.js';
import moment from 'moment';
import { BrowserRouter, Link, Route } from 'react-router-dom';
var noteshow=0;
class ReportsContent extends React.Component{
    state ={
        data: [],
        date : [],
        all_cost_center_list : [],
        company_setting : [],
        filtertemplate : 'This Year',
        FROM :  moment().format('YYYY')+'-01-01',
        TO :  moment().format('YYYY')+'-12-31',
        CostCenterFilter : 'All',
        CostCenterFilterJournal : ['All'],
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.filtertemplate==this.state.filtertemplate){
            if(prevState.FROM==this.state.FROM){
                if(prevState.TO==this.state.TO){
                    if(prevState.CostCenterFilter==this.state.CostCenterFilter){
                        if(prevState.CostCenterFilterJournal==this.state.CostCenterFilterJournal){
            
                        }else{
                            this.getReport();
                        }
                    }else{
                        this.getReport();
                    }
                }else{
                    this.getReport();
                }
            }else{
                this.getReport();
            }
        }else{
            this.getReport();
        }
    }
    getReport= async (props) =>{
       
        const response = await axios.get('http://localhost/Accounting_modified/public/ProductandServices_ListDATA',{
            params:{
                CostCenterFilter: '',
                filtertemplate : this.state.filtertemplate,
                FROM : this.state.FROM,
                TO : this.state.TO,
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({data : response.data});
    }
    getReportData = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getReportData',{
            params:{
                CostCenterFilter: ["All"],
                filtertemplate : 'Last Year',
                FROM : '2019-01-01',
                TO : '2019-12-31',
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({all_cost_center_list : response.data.all_cost_center_list});
        this.setState({date : response.data.date});
        this.setState({company_setting : response.data.company_setting});
        
    }
    componentDidMount(){
        this.getReportData();
        this.getReport();
        
    }
    changedates = (e) =>{
        this.setState({filtertemplate : e.value})
        var value= e.value;
        var FROM= document.getElementById('Fromdate');
        var TO= document.getElementById('Todate');
        var d = new Date();
        if(value=="All"){
            document.getElementById('datedivs').style.display="none";
        }else{
            if(value=="Custom"){
            
            }
            else if(value=="This Week"){
                var curr = new Date; // get current date
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var last = first + 6;

                var firstday = new Date(curr.setDate(first));
                var lastday = new Date(curr.setDate(last));
                var last=lastday.getDate();
                if(first==0){
                    first=1;
                }
                if(first<10){
                    first="0"+first;
                }
                if(last<10){
                    last="0"+last;
                }
                
                this.setState({FROM : d.getFullYear()+"-"+("0" + (firstday.getMonth() + 1)).slice(-2)+"-"+first});
                this.setState({TO : d.getFullYear()+"-"+("0" + (lastday.getMonth() + 1)).slice(-2)+"-"+last});
                
            }
            else if(value=="This Month"){
                var lastday = new Date(d.getFullYear(), d.getMonth()+1, 0);
                
                this.setState({FROM : d.getFullYear()+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-01"});
                this.setState({TO : d.getFullYear()+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-"+lastday.getDate()});
            }
            else if(value=="This Quarter"){
                if(this.getQuarter(d)=="1"){
                    this.setState({FROM : d.getFullYear()+"-10-01"});
                    this.setState({TO : d.getFullYear()+"-12-31"});
                }
                else if(this.getQuarter(d)=="4"){
                    this.setState({FROM : d.getFullYear()+"-06-01"});
                    this.setState({TO : d.getFullYear()+"-09-30"});
                }
                else if(this.getQuarter(d)=="3"){
                    this.setState({FROM : d.getFullYear()+"-04-01"});
                    this.setState({TO : d.getFullYear()+"-06-30"});
                }
                else if(this.getQuarter(d)=="2"){
                    this.setState({FROM : d.getFullYear()+"-01-01"});
                    this.setState({TO : d.getFullYear()+"-03-31"});
                }
            }
            else if(value=="This Year"){
                this.setState({FROM : d.getFullYear()+"-01-01"});
                this.setState({TO : d.getFullYear()+"-12-31"});
            }
            else if(value=="Last Week"){
                var curr = new Date; // get current date
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var last = first + 6;
                first-=7;
                last=first+6;
                var firstday = new Date(curr.setDate(first));
                var lastday = new Date(curr.setDate(last));
                var last=lastday.getDate();
                if(first<10){
                    first="0"+first;
                }
                if(last<10){
                    last="0"+last;
                }
                this.setState({FROM : d.getFullYear()+"-"+("0" + (firstday.getMonth() + 1)).slice(-2)+"-"+first});
                this.setState({TO : d.getFullYear()+"-"+("0" + (lastday.getMonth() + 1)).slice(-2)+"-"+last});
                
            }
            else if(value=="Last Month"){
                var lastmonth=d.getMonth();
                var year=d.getFullYear();
                if(lastmonth==0){
                    lastmonth=12;
                    year--;
                }
                if(lastmonth<10){
                    lastmonth="0"+lastmonth;
                }
                var lastday = new Date(year,lastmonth , 0);
                
                this.setState({FROM : year+"-"+lastmonth+"-01"});
                this.setState({TO : year+"-"+lastmonth+"-"+lastday.getDate()});
            }
            else if(value=="Last Quarter"){
                if(this.getQuarter(d)=="1"){
                    this.setState({FROM : d.getFullYear()+"-06-01"});
                    this.setState({TO : d.getFullYear()+"-09-30"});
                    
                }
                else if(this.getQuarter(d)=="4"){
                    this.setState({FROM : d.getFullYear()+"-04-01"});
                    this.setState({TO : d.getFullYear()+"-06-30"});
                }
                else if(this.getQuarter(d)=="3"){
                    
                    this.setState({FROM : d.getFullYear()+"-01-01"});
                    this.setState({TO : d.getFullYear()+"-03-31"});
                }
                else if(this.getQuarter(d)=="2"){
                    
                    this.setState({FROM : (d.getFullYear()-1)+"-10-01"});
                    this.setState({TO : (d.getFullYear()-1)+"-12-31"});
                }
            }
            else if(value=="Last Year"){
                this.setState({FROM : (d.getFullYear()-1)+"-01-01"});    
                this.setState({TO : (d.getFullYear()-1)+"-12-31"});
            }
            document.getElementById('datedivs').style.display="block";
            
        }
        //submitdates();
    }
    getQuarter = (d) => {
    // Oct-Dec = 1
    // Jan-Mar = 2
    // Apr-Jun = 3
    // Jul-Sep = 4   
    d = d || new Date();
    var m = Math.floor(d.getMonth()/3) + 2;
    return m > 4? m - 4 : m;
    }
    FilterTableRow = () => {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("filterinputtable");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablemain");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0];
        var td2= tr[i].getElementsByTagName("td")[1];
        var td3= tr[i].getElementsByTagName("td")[2];
        var td4= tr[i].getElementsByTagName("td")[3];
        var td5= tr[i].getElementsByTagName("td")[4];
        var td6= tr[i].getElementsByTagName("td")[5];
        var td7= tr[i].getElementsByTagName("td")[6];
        var td8= tr[i].getElementsByTagName("td")[7];
        
        
        if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || td2.innerHTML.toUpperCase().indexOf(filter) > -1 
                || td3.innerHTML.toUpperCase().indexOf(filter) > -1 || td4.innerHTML.toUpperCase().indexOf(filter) > -1 || td5.innerHTML.toUpperCase().indexOf(filter) > -1
                || td6.innerHTML.toUpperCase().indexOf(filter) > -1 || td7.innerHTML.toUpperCase().indexOf(filter) > -1 || td8.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        } 
    }

    }
    sortTable = (n,order) => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("tablemain");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        if(order!=""){
            dir=order;
        }
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
                }
            }
            }
            if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++; 
            } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
            }
        }
        }
    showhode(){
        if(noteshow==0){
            document.getElementById('employeecontactnote').style.display="inline";
            //$("#employeecontactnote").toggle("slide");
            document.getElementById('showhidebtn').innerHTML="Hide note";
            noteshow="1";
        }else{
            document.getElementById('employeecontactnote').style.display="none";
            //$("#employeecontactnote").toggle("slide");
            document.getElementById('showhidebtn').innerHTML="Add note";
            noteshow="0";
        }
    }
    render(){
        
        const cost_center_list=this.state.all_cost_center_list.map((dat,index) =>{
            return [
                <option key={index} value={dat.cc_no}>{dat.cc_name}</option>
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
                       
                        <div className="container">
                            
                            <div id="">
                            <div id="modallike" onclick="hidecustomizationsection()">
                                
                            </div>
                            <div class="customizationsection">
                                <div class="row" style={{marginTop : '10px'}}>
                                    <div class="col-md-10">
                                        <h4 style={{fontWeight : '400'}}>Customise report</h4>
                                    </div>
                                    <div class="col-md-2" style={{textAlign : 'right'}}>
                                        <button class="btn btn-link" style={{textDecoration : 'none', color : '#ccc'}} onclick="hidecustomizationsection()"><span class="oi oi-x"></span></button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-10">
                                    <div class="accordion" id="accordionExample">
                                        <div class="card" style={{border : '0px solid #ccc', display : 'none'}}>
                                            <div class="card-header" id="headingOne" style={{padding : '0px', borderBottom : '0px solid black'}}>
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" style={{textDecoration : 'none', color: '#262626'}} type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <span class="oi oi-caret-bottom"></span> Table Columns
                                                </button>
                                            </h5>
                                            </div>

                                            <div  id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div class="card-body">
                                            
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="1" id="customCheck6" />
                                                <label class="custom-control-label" for="customCheck6">Date</label>
                                                
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="2" id="customCheck1" />
                                                <label class="custom-control-label" for="customCheck1">Transaction Type</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="3" id="customCheck2" />
                                                <label class="custom-control-label" for="customCheck2">No.</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="4" id="customCheck3" />
                                                <label class="custom-control-label" for="customCheck3">Name</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="5" id="customCheck4" />
                                                <label class="custom-control-label" for="customCheck4">Memo</label>
                                                </div>
                                                
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="6" id="customCheck7" />
                                                <label class="custom-control-label" for="customCheck7">Due Date</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="7" id="customCheck8" />
                                                <label class="custom-control-label" for="customCheck8">Amount</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="8" id="customCheck5" />
                                                <label class="custom-control-label" for="customCheck5">Open Balance</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="9" id="customCheck9" />
                                                <label class="custom-control-label" for="customCheck9">Billing Address</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="10" id="customCheck10" />
                                                <label class="custom-control-label" for="customCheck10">Shipping Address</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                <input type="checkbox" onclick="hideshowcolumntable(this)" name="columnnames[]" checked class="custom-control-input" value="11" id="customCheck11" />
                                                <label class="custom-control-label" for="customCheck11">Terms</label>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="card" style={{border: '0px solid  #ccc'}}>
                                            <div class="card-header" id="headingTwo" style={{padding : '0px', borderBottom : '0px solid black'}}>
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" style={{textDecoration : 'none', color: '#262626'}} type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                <span class="oi oi-caret-bottom"></span> Report Period
                                                </button>
                                            </h5>
                                            </div>

                                            <div id="collapseTwo" class="collapse " aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div class="card-body">
                                                
                                            </div>
                                            </div>
                                        </div>
                                        <div class="card" style={{border: '0px solid  #ccc',display : 'none'}}>
                                                <div class="card-header" id="headingTwo" style={{padding : '0px', borderBottom : '0px solid black'}}>
                                                <h5 class="mb-0">
                                                    <button class="btn btn-link" style={{textDecoration : 'none', color: '#262626'}} type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                    <span class="oi oi-caret-bottom"></span> Table Columns
                                                    </button>
                                                </h5>
                                                </div>
                            
                                                <div  id="collapseThree" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                <div class="card-body">
                                                    
                                                    <select class="form-control" id="filtertemplatetype">
                                                    <option>All</option>
                                                    <option>Custom</option>
                                                    <option>This Week</option>
                                                    <option>This Month</option>
                                                    <option>This Quarter</option>
                                                    <option>This Year</option>
                                                    <option>Last Week</option>
                                                    <option>Last Month</option>
                                                    <option>Last Quarter</option>
                                                    <option>Last Year</option>
                                                    </select>
                                                </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <h4>Product/Services List Report</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <Link to="/reports" class="btn btn-link btn-upper-back" style={{paddingLeft : '0px',textDecoration : 'none'}}><span class="oi oi-chevron-left"></span> Back to report list</Link>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="text" class="form-control" onkeyup="FilterTableRow()" style={{width : '50%'}} id="filterinputtable" placeholder="Filter List.." />
                                    
                                </div>
                                <div class="col-md-6" style={{textAlign : 'right'}}>
                                    <button class="btn btn-outline-dark mr-1" style={{display : 'none'}} onclick="showcustomizationsection()">Customize</button>
                                    <button class="btn btn-success" style={{display : 'none'}} data-toggle="modal" data-target="#exampleModal">Save customization</button>
                                    
                                </div>
                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Custom Report</h5>
                                        <button type="button" onClick={()=>document.getElementById('InputReportname').value=""}  class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        
                                        <div class="modal-body">
                                            
                                            <div class="form-group">
                                                <label for="InputReportname">Custom Report Name</label>
                                                <input type="text" class="form-control" id="InputReportname" placeholder="Enter Custom Report Name" />
                                                <input type="hidden" id="InputReportID" value="" />
                                            
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" id="cancelsavecustom"  onClick={()=>document.getElementById('InputReportname').value=""}  class="btn btn-secondary" data-dismiss="modal" >Cancel</button>
                                        <button type="button" class="btn btn-primary" onclick="SaveCustomReport()">Save</button>
                                        </div>
                                    
                                    </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="row" style={{display : 'none'}}>
                            <div class="col-md-12" style={{marginTop : '10px'}}>
                                    <div class="col-md-12" style={{backgroundColor : 'white', paddingTop : '15px', paddingBottom : '15px',paddingLeft : '0px', paddingRight : '0px'}}>
                                            <div >
                                            
                                            <div class="col-md-6 ">
                                                    
                                                    <p>Date</p>
                                                    <select class="form-control" id="filtertemplate" value={this.state.filtertemplate} onChange={(event)=>this.changedates(event.target)}>
                                                        <option>All</option>
                                                        <option>Custom</option>
                                                        <option>This Week</option>
                                                        <option>This Month</option>
                                                        <option>This Quarter</option>
                                                        <option>This Year</option>
                                                        <option>Last Week</option>
                                                        <option>Last Month</option>
                                                        <option>Last Quarter</option>
                                                        <option>Last Year</option>
                                                    </select>
                                                        
                                                        <div id="datedivs" style={{display : "none", marginTop : '10px', borderTop : '1px solid #ccc'}}>
                                                        <div class="form-group">
                                                            <label for="Fromdate">From</label>
                                                            <input type="date" class="form-control" value={this.state.FROM} onChange={(event)=>this.setState({FROM : event.target.value})} id="Fromdate" />
                                                            
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="Todate">To</label>
                                                            <input type="date" class="form-control" value={this.state.TO} onChange={(event)=>this.setState({TO : event.target.value})} id="Todate" />
                                                            
                                                        </div>
                                                        </div>    
                                            </div>
                                            <div class="col-md-6 ">
                                                    <p>Cost Center</p>
                                                    <select class="form-control selectpicker" data-live-search="true" id="CostCenterFilter" value={this.state.CostCenterFilter} onChange={(event)=>this.setState({CostCenterFilter : event.target.value})}>
                                                        <option>All</option>
                                                        {cost_center_list}
                                                    </select>
                                                    
                                            </div>
                                        </div>
                                    </div>  
                            </div>
                        </div>
                    <div class="row">
                        <div class="col-md-12" >
                            <div class="reportbody">
                                <div id="printablereport_employee_contact_list">
                                    <table class="report-main table table-sm" >
                                    <tbody>
                                        <tr id="report_main_above_button">
                                        <td style={{verticalAlign : 'middle', textAlign :'left'}}>
                                            <div class="dropdown">
                                            <a style={{display : 'none'}} class="btn-link dropdown-toggle btn-sm" href="#" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Sort
                                            </a>
                                            <a href="#!" class="btn-link btn-upper-report" id="showhidebtn" onClick={this.showhode} >Add note</a>
                                            
                                            <div class="dropdown-menu">
                                            <form style={{padding : '1px 10px'}}>
                                                <div class="form-group" style={{display : 'none'}}>
                                                <label for="Sortbyselect">Sort by</label>
                                                
                                                <select id="Sortbyselect" class="form-control" onchange="ss()">
                                                    <option value="0">Default</option>
                                                    <option value="1">Transaction Type</option>
                                                    <option value="2">No.</option>
                                                    <option value="3">Name</option>
                                                    <option value="4">Memo</option>
                                                    <option value="5">Due Date</option>
                                                    <option value="6">Amount</option>
                                                    <option value="7">Open Balance</option>                               
                                                    <option value="8">Billing Address</option>                               
                                                    <option value="9">Shipping Address</option> 
                                                    <option value="10">Terms</option> 
                                                    
                                                    
                                                </select>
                                                
                                                </div>
                                                <label for="exampleRadios1">Sort in</label>
                                                <div class="form-check">
                                                <input class="form-check-input" onchange="ss()" type="radio" name="exampleRadios" id="exampleRadios1" value="asc" />
                                                <label class="form-check-label" for="exampleRadios1">
                                                    Ascending order
                                                </label>
                                                </div>
                                                <div class="form-check">
                                                <input class="form-check-input" onchange="ss()" type="radio" name="exampleRadios" id="exampleRadios2" value="desc"checked />
                                                <label class="form-check-label" for="exampleRadios2">
                                                    Descending order
                                                </label>
                                                </div>
                                            </form>
                                            </div>
                                            </div>
                                            
                                        </td>
                                        <td style={{verticalAlign : "middle",textAlign : 'right'}}>
                                            
                                            <a href="#" class="btn-link btn-upper-report" title="Export to Excel" onclick="exporttoexcelTaxRelief()"><span class="fa fa-table"></span></a>
                                            <a href="#" style={{display : 'none'}} class="btn-link btn-upper-report"><span class="ti-email"></span></a>
                                            <a href="#" class="btn-link btn-upper-report" onClick={()=>PrintElem('printablereport_employee_contact_list')}><span class="ti-printer"></span></a>
                                            <a href="#" style={{display : 'none'}} class="btn-link btn-upper-report"><span class="ti-export"></span></a>
                                            <button style={{display : 'none'}} class="btn btn-link btn-upper-report" onclick="showcustomizationsection()"><span class="ti-settings"></span></button>

                                        </td>
                                        </tr>
                                        <tr>
                                        <td id="report_employee_companynameheader" colspan="2" style={{verticalAlign : 'middle' , fontSize : '22px', textAlign : 'center',paddingTop : '30px' }} contenteditable="true" >{this.state.company_setting.company_name}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" id="report_employee_title" style={{verticalAlign : 'middle', textAlign : "center", fontSize : '14px', fontWeight : 'bold', textTransform : 'uppercase'}} contenteditable="true" >Product/Services List</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style={{verticalAlign : 'middle'}}>

                                                <div dangerouslySetInnerHTML={{ __html: this.state.data }} />
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px'}}>
                                                <textarea class="form-control" placeholder="Add note here" rows="5" style={{border : '0px',display : 'none'}} id="employeecontactnote"></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px',paddingBottom : '10px'}}id="timedatetd">
                                                {this.state.date}
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>
                        

                    {/* div end */}
                    </div>
                    <Modal />
                </div>
                
            </div>
        );
    }
}

export default ReportsContent;