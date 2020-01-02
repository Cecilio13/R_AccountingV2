import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    useParams
} from "react-router-dom";
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import {number_format} from '../Helper';

const google = window.google;
const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
class Dashboard extends React.Component{
    // initialize state variables
    state ={expense_month: '',dashboardData: [] }
    getData= async (props) =>{
        
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getDashboardData',{
            params:{
                expense_month: props
            },
            crossDomain: true
        });
        console.log("RestFul API : "+response.data);
        this.setState({dashboardData:response.data});
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(this.drawChart);
        google.charts.setOnLoadCallback(this.drawChart_due);
        google.charts.setOnLoadCallback(this.drawChart_receivable);
        google.charts.setOnLoadCallback(this.drawChart_expenses);
        document.getElementById('selectedexpense').value=this.state.dashboardData.month_selected_raw;
    }
    drawChart_expenses= () => {
        
        var data = google.visualization.arrayToDataTable([
            ['Month/Year', 'Expense', 'Overdue Expenses'],
            [months[this.state.dashboardData.three_month-1]+' '+this.state.dashboardData.year_less_three, this.state.dashboardData.current_month_less_three, this.state.dashboardData.current_month_less_three_due],
            [months[this.state.dashboardData.two_month-1]+' '+this.state.dashboardData.year_less_two, this.state.dashboardData.current_month_less_two, this.state.dashboardData.current_month_less_two_due],
            [months[this.state.dashboardData.one_month-1]+' '+this.state.dashboardData.year_less_one, this.state.dashboardData.current_month_less_one, this.state.dashboardData.current_month_less_one_due],
            [months[this.state.dashboardData.month_selected_raw-1]+' '+this.state.dashboardData.current_year, this.state.dashboardData.current_month, this.state.dashboardData.current_month_due],
            
        ]);
    
        var options = {
          chart: {
            title: 'Expense',
          },
          bars: 'vertical' // Required for Material Bar Charts.
        };
    
        var chart = new google.charts.Bar(document.getElementById('piechart_expense'));
    
        chart.draw(data, google.charts.Bar.convertOptions(options));
    
    }
    drawChart = () => {

    var data = google.visualization.arrayToDataTable([
      ['Invoice Status', 'Amount'],
      ['Receivables',this.state.dashboardData.total_invoice_receivable!==0? this.state.dashboardData.total_invoice_receivable-this.state.dashboardData.total_invoice_receivable_due : 0 ],
      ['Over Due Receivables',this.state.dashboardData.total_invoice_receivable_due]
    ]);
    var options = {
        pieSliceText: 'value-and-percentage'
    };
    
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    
    chart.draw(data, options);
    }

    drawChart_due = () => {

    var data = google.visualization.arrayToDataTable([
      ['Invoice Status', 'Amount'],
      ['Over Due Receivables',this.state.dashboardData.total_invoice_receivable_due]
    ]);
    
    var options = {
        pieSliceText: 'value-and-percentage'
    };
    
    var chart = new google.visualization.PieChart(document.getElementById('piechart_due'));
    
    chart.draw(data, options);
    document.getElementById('piechart_due').style.display="none";
    }

    drawChart_receivable = () => {

    var data = google.visualization.arrayToDataTable([
      ['Invoice Status', 'Amount'],
      ['Receivables',this.state.dashboardData.total_invoice_receivable!==0? this.state.dashboardData.total_invoice_receivable-this.state.dashboardData.total_invoice_receivable_due : 0 ]
    ]);
    
    var options = {
        pieSliceText: 'value-and-percentage'
    };
    
    var chart = new google.visualization.PieChart(document.getElementById('piechart_receivable'));
    
    chart.draw(data, options);
    document.getElementById('piechart_receivable').style.display="none";
    }
    showreceivable = () =>{
        var e=document.getElementById('selectedinvoice');
        console.log(e.value);
        if(e.value==="Both"){
            document.getElementById('piechart').style.display="block";
            document.getElementById('piechart_due').style.display="none";
            document.getElementById('piechart_receivable').style.display="none";
            document.getElementById('INVOICE_RECIEVABLE_LABEL').innerHTML="PHP "+number_format(this.state.dashboardData.total_invoice_receivable,2);
            document.getElementById('LABEL_RECEIVABLE').innerHTML="RECEIVABLES";
            
        }
        else if(e.value==="Over Due"){
            document.getElementById('piechart').style.display="none";
            document.getElementById('piechart_due').style.display="block";
            document.getElementById('piechart_receivable').style.display="none";
            document.getElementById('INVOICE_RECIEVABLE_LABEL').innerHTML="PHP "+number_format(this.state.dashboardData.total_invoice_receivable_due,2);
             document.getElementById('LABEL_RECEIVABLE').innerHTML="OVER DUE RECEIVABLES";
        }
        else if(e.value==="Receivable"){
            document.getElementById('piechart').style.display="none";
            document.getElementById('piechart_due').style.display="none";
            document.getElementById('piechart_receivable').style.display="block";
            document.getElementById('INVOICE_RECIEVABLE_LABEL').innerHTML="PHP "+number_format(this.state.dashboardData.total_invoice_receivable!==0? this.state.dashboardData.total_invoice_receivable-this.state.dashboardData.total_invoice_receivable_due : 0,2);
            document.getElementById('LABEL_RECEIVABLE').innerHTML="RECEIVABLE";
        }
        

    }
    showexpenses = () =>{
        var e=document.getElementById('selectedexpense');
        console.log(e.value);
        //set selected month state
        this.getData(e.value);
        this.setState({expense_month: e.value});
    }
    componentDidMount = () =>{
        
        this.getData('');
        console.log(this.state.expense_month);
        //this.ooiienm();
        google.charts.load('current', {'packages':['corechart', 'bar']});
        
    }

    render(){
        
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
                            <h1>Dashboard</h1>
                            </div>
                        </div>
                    </div>
                        
                        <div className="content mt-3">
                            <div className="animated fadeIn">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card">
                                            <div className="card-header">
                                            <strong className="card-title" id="LABEL_RECEIVABLE">RECEIVABLES</strong>
                                            <select className="float-right"  onChange={this.showreceivable} id="selectedinvoice">
                                                <option value="Both">Both</option>
                                                <option value="Over Due">Over Due</option>
                                                <option value="Receivable">Receivable</option>
                                            </select>
                                            </div>
                                            <div className="card-body">
                                                <div style={{position : 'absolute',zIndex : '100' }}>
                                                    <h3 id="INVOICE_RECIEVABLE_LABEL">PHP {number_format(this.state.dashboardData.total_invoice_receivable,2)}</h3>
                                                </div>
                                                <div id="piechart"></div>
                                                <div id="piechart_due" ></div>
                                                <div id="piechart_receivable" ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <strong className="card-title" id="LABEL_EXPENSES">EXPENSES</strong>
                                                <select className="float-right" onChange={this.showexpenses} id="selectedexpense">
                                                        <option value=""   >Current Month</option>
                                                        <option value="1"  >January</option>
                                                        <option value="2"  >February</option>
                                                        <option value="3"  >March</option>
                                                        <option value="4"  >April</option>
                                                        <option value="5"  >May</option>
                                                        <option value="6"  >June</option>
                                                        <option value="7"  >July</option>
                                                        <option value="8"  >August</option>
                                                        <option value="9"  >September</option>
                                                        <option value="10" >October</option>
                                                        <option value="11" >November</option>
                                                        <option value="12" >December</option>
                                                        
                                                </select>
                                            </div>
                                            <div className="card-body">
                                                <div id="piechart_expense"></div>
                                            </div>
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

export default Dashboard;