import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import '../css/index.css';
import JEModal from './inc/journal_entry_modal.js';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import {number_format} from '../Helper';
class JournalEntry extends React.Component{
    state ={
        data: [],
        JournalEntry : [],
        cost_center_list : [],
        numbering : [],
        COA : [],
        saleeee : [],
        searchKeyword : '', 
        JournalNoSelected : '1',
        result : [],
        totaldebitpreview : '',
        totalcreditpreview : '',
        journal_entry_title_header_preview : '',
        JE_NO_Preview : '',
        JournalMemopreview : '',
        journalDatepreview : '',
        JournalType : 'Cheque Voucher',
        journalvoucher_no : '',
        chequevoucher_no : '',
        current_date : '',
        jounalcount : '0',
        customers : [],
        YearSelected : moment().format('YYYY'),
        year_beg : '',
        year_end : '',
        yyyyy : '',
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
    getJournalModalInfo = async (props) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getJournalModalInfo',{
            params:{
                query: props
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({current_date : response.data.current_date});
        this.setState({journalvoucher_no : response.data.journalvoucher_no});
        this.setState({chequevoucher_no : response.data.chequevoucher_no});
        this.setState({jounalcount : response.data.jounalcount});
        this.setState({customers : response.data.customers});
        
        
    }
    getJournalEntiesList= async (keyword,no) =>{
        console.log(no);
        console.log(this.state.JournalNoSelected);
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getJournal_List',{
            params:{
                keyword : keyword,
                no : no,
                year: this.state.YearSelected
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({JournalEntry : response.data.JournalEntry});
        this.setState({cost_center_list : response.data.cost_center_list});
        this.setState({numbering : response.data.numbering});
        this.setState({COA : response.data.COA});
        this.setState({JournalNoSelected : parseFloat(response.data.JournalNoSelected)+1});
        this.setState({saleeee : response.data.saleeee});
        this.setState({searchKeyword : response.data.keyword});
        this.setState({STInvoice : response.data.STInvoice});
        this.setState({year_beg : response.data.year_beg});
        this.setState({year_end : response.data.year_end});
        this.setState({yyyyy : response.data.yyyyy});
        this.setState({YearSelected : response.data.yyyyy});
        document.getElementById('rendertablejournallist').click();
        
    }
    componentDidUpdate(prevProps, prevState){
        
        
    }
    componentDidMount(){
        this.getJournalEntiesList(this.state.searchKeyword,this.state.JournalNoSelected);
        this.getJournalModalInfo();
    }
    fetchgogo(){
        this.getJournalEntiesList(this.state.searchKeyword,this.state.JournalNoSelected);
    }
    changePageNumber(number){
        
        var kkkkk=this.state.JournalNoSelected;
        this.setState({JournalNoSelected :parseFloat(kkkkk)+parseFloat(number)}, function() { this.fetchgogo()}.bind(this))
        
    }
    getactions(type,journal){
        
        var invoice_validforcancel=0;
        if(type=="Invoice"){
            const journaltablelist=this.state.saleeee.map((dat,index) =>{
                if(dat.st_type=="Sales Receipt" && dat.st_payment_for==journal.other_no && dat.st_location+" "+dat.st_invoice_type==journal.je_invoice_location_and_type){
                    return invoice_validforcancel=1;
                }
            });
        }
        if(invoice_validforcancel==1){
            
        }else{
            if(journal.remark=="" || journal.remark==null ){
                var locationssss="";
                var invoice_typesss="";
                if(journal.je_invoice_location_and_type!="" && journal.je_invoice_location_and_type!=null){
                    const answer_array = journal.je_invoice_location_and_type.split(' ');
                    locationssss=answer_array[0];
                    invoice_typesss=answer_array[1]+" "+answer_array[2];
                }
                
                return <a className="dropdown-item" href="#" onClick={()=> this.canceltransaction(journal.je_transaction_type, journal.other_no, locationssss, invoice_typesss)}>Cancel Transaction</a>
            }else{
                return <a className="dropdown-item" href="#" >Cancelled</a>
            }
        }
    }
    canceltransaction= async (type,id,locationss,invoice_type) =>{
        console.log(type+" "+id+" "+locationss+" "+invoice_type);
        var Reason = prompt("Reason for Cancellation of Entry", "");
        if (Reason != null) {
            var bodyFormData = new FormData();
                bodyFormData.set('type', type);
                bodyFormData.set('id', id);
                bodyFormData.set('locationss', locationss);
                bodyFormData.set('invoice_type', invoice_type);
                bodyFormData.set('Reason', Reason);
                const response = await axios.post('http://localhost/Accounting_modified/public/api/cancel_entry',bodyFormData);
                console.log(response.data);
                window.location.reload();
        }else{
            alert('Action Cancelled');
        }
    }
    viewJournalEntryDetail = async (id)=>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/get_journal_entry_data',{
            params:{
                no: id
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({result : response.data.result});
        this.setState({totaldebitpreview : response.data.totaldebitpreview});
        this.setState({totalcreditpreview : response.data.totalcreditpreview});
        this.setState({journal_entry_title_header_preview : response.data.journal_entry_title_header_preview});
        this.setState({JE_NO_Preview : response.data.JE_NO_Preview});
        this.setState({JournalMemopreview : response.data.JournalMemopreview});
        this.setState({journalDatepreview : response.data.journalDatepreview});
        
    }
    UploadMassJournalEntry = async () =>{
        var bodyFormData = new FormData();
        var imagefile = document.querySelector('#excel-upload-journal');
        bodyFormData.append("theFile", imagefile.files[0]);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/UploadMassJournalEntry',bodyFormData);

        var LOG="";
        if(response.data.Error_Log!=""){
        LOG=" \n\nSkip Log : \n"+response.data.Error_Log;
        }
        alert("Total number Of Data : "+response.data.Total+"\nData Saved : "+response.data.Success+" \nData Skipped : "+response.data.Skiped+LOG);
        window.location.reload();
    }
    showhide = (type) =>{
        if(type=="Cheque Voucher"){
            this.setState({JournalType : 'Cheque Voucher'});
            document.getElementById('showeightcolumn').click();
        }else{
            this.setState({JournalType : 'Journal Voucher'});
            document.getElementById('hideeightcolumn').click();
        }
    }
    createSelectItems() {
        let items = [];         
        for (let i = moment().format('YYYY'); i >=2019 ; i--) {             
             items.push(<option key={i} value={i}>{i}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    }
    render(){
        const journaltablelist=this.state.JournalEntry.map((dat,index) =>{
            return [
            <tr key={index}>
                <td style={{verticalAlign : 'middle', display: 'none'}}>{dat.je_no}</td>
                <td style={{verticalAlign : 'middle'}}>{moment(dat.je_attachment).format('MM-DD-YYYY')}</td>
                <td style={{verticalAlign : 'middle' , textAlign : 'center'}}>{dat.journal_type}</td>
                <td style={{verticalAlign : 'middle' , textAlign : 'center'}}>
                {dat.coa_code}
                </td>
                <td style={{verticalAlign : 'middle' , textAlign : 'center'}} ><a href="#" data-target="#journalentrymodalpreview" data-toggle="modal" onClick={()=>this.viewJournalEntryDetail(dat.je_no)} className="btn btn-link">{dat.je_series_no}</a></td>
                <td style={{verticalAlign : 'middle'}} className={`${dat.je_debit!=""? 'DebitCell' : 'CreditCell'}`}>{dat.coa_name}</td>
                <td style={{verticalAlign : 'middle'}}>{dat.je_debit!=''? (dat.je_debit!=null? number_format(dat.je_debit,2) : '') : ''}</td>
                <td style={{verticalAlign : 'middle'}}>{dat.je_credit!=''? (dat.je_credit!=null? number_format(dat.je_credit,2) : '') : ''}</td>
                <td style={{verticalAlign : 'middle'}}>{dat.je_desc}</td>
                <td style={{verticalAlign : 'middle'}}>{dat.je_name}</td>
                <td style={{verticalAlign : 'middle'}}>{dat.je_memo}</td>
                <td style={{verticalAlign : 'middle'}}>
                    <div className="btn-group">
                        <button type="button" className="btn bg-transparent  px-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-ellipsis-v"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-custom">
                            <a  className="dropdown-item" href={`print_journal_entry/${dat.je_no}`} target="_blank">Print</a>
                            {this.getactions(dat.je_transaction,dat)}
                        </div>
                    </div>
                    
                </td>
            </tr>
            ]
        });
        const result=this.state.result.map((dat,index) =>{
            return [
                <tr key={index}>
                    <td className="pt-3-half"  style={{padding: '0px 0px 0px 2px'}}>{index+1}</td>
                    <td className="pt-3-half" >
                        {dat.coa_code}
                    </td>
                    <td className="pt-3-half" >
                        {dat.coa_name}
                    </td>
                    <td className="pt-3-half" >
                        {dat.cc_name}
                    </td>
                    <td className="pt-3-half" style={{textAlign : 'right'}} >
                        {dat.je_debit!=''? (dat.je_debit!=null? number_format(dat.je_debit,2) : '') : ''}
                    </td>
                    <td className="pt-3-half"  style={{textAlign : 'right'}}>
                        {dat.je_credit!=''? (dat.je_credit!=null? number_format(dat.je_credit,2) : '') : ''}
                    </td>
                    <td className="pt-3-half"  >
                        {dat.je_desc}
                    </td>
                    <td className="pt-3-half"  >
                        {dat.je_name}
                    </td>
                    <td className="pt-3-half"  >
                        {dat.cheque_no}
                    </td>
                    <td className="pt-3-half" >
                        {dat.ref_no}
                    </td>
                    <td className="pt-3-half"  >
                        {moment(dat.je_attachment).format('MM-DD-YYYY')}
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
                    <JEModal customers={this.state.customers} COA={this.state.COA} JournalType={this.state.JournalType} jounalcount={this.state.jounalcount} current_date={this.state.current_date} chequevoucher_no={this.state.chequevoucher_no} journalvoucher_no={this.state.journalvoucher_no} />
                    <div className="">
                        <div className="breadcrumbs">
                            <div className="page-header float-left">
                                <div className="page-title">
                                    <h1>Journal Entry</h1>
                                    <button type="button" style={{display : 'none'}} id="rendertablejournallist"></button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="modal fade" id="ImportJournalEntryModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog  modal-sm" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Import Journal Entries</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body" style={{textAlign : 'center'}}>
                                        
                                        <input id="excel-upload-journal" onChange={()=>this.UploadMassJournalEntry()} type="file"  accept=".xlsx" />
                                        <label htmlFor="excel-upload-journal" style={{opacity : '1', cursor : 'pointer', borderRadius : '10px'}} id="FIleImportExcelLabel" className="custom-excel-upload btn btn-primary">
                                        <span className="glyphicon glyphicon-user"> IMPORT FROM EXCEL</span>
                                        </label>
                                        
                                    </div>
                                    <div className="modal-footer">
                                        <a className="btn btn-success" href="http://localhost/Accounting_modified/public/api/GetJournalEntryTemplateExcel">Download Excel Template</a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <a href="#" data-target="#journalentrymodalpreview" id="previewmodaljournal" data-toggle="modal"></a>
                            <div className="modal fade p-0" id="journalentrymodalpreview" tabIndex="-1" role="dialog" aria-hidden="true" >
                                <div className="modal-dialog modal-full" role="document" style={{minWidth : '100%' , border : '0'}}>
                                    <div className="modal-content" style={{minHeight : '100vh'}}>
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="journal_entry_title_header_preview">{this.state.journal_entry_title_header_preview}</h5>
                                            <button type="button" className="close" data-dismiss="modal" id="Closeeee" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body p-4">
                                            <div className="col-md-12 p-0 mb-4">
                                                <div className="col-md-12 p-0 mb-4">
                                                    <div className="col-md-2 p-0">
                                                        <p>Journal Date</p>
                                                        <input type="date" name="" id="journalDatepreview" value={this.state.journalDatepreview} readOnly />
                                                    </div>
                                                    <div className="col-md-2 p-0">
                                                    <p>Journal No.</p>    
                                                    
                                                    <input type="text" name="" readOnly id="JE_NO_Preview" value={this.state.JE_NO_Preview} />
                                                    
                                                    </div>
                                                </div>
                                                <div className="table-responsive-md">
                                                <table className="table table-bordered table-light   text-left font14  table-sm" id="journalentrytablepreview">
                                                    <thead>
                                                    <tr className="thead-light">
                                                        <th className="text-left" width="3%">#</th>
                                                        <th className="text-left" width="10%">CODE</th>
                                                        <th className="text-left" width="10%">ACCOUNT</th>
                                                        <th className="text-left" width="10%">COST CENTER</th>
                                                        <th className="text-left" width="10%">DEBITS</th>
                                                        <th className="text-left" width="10%">CREDITS</th>
                                                        <th className="text-left" width="10%">DESCRIPTION</th>
                                                        <th className="text-left" width="10%">PAYEE</th>
                                                        <th className="text-left" width="5%">CHEQUE NO</th>
                                                        <th className="text-left" width="10%">REFERENCE</th>
                                                        <th className="text-left" width="5%">DATE DEPOSITED</th>
                                                        
                                                    </tr>
                                                    </thead>
                                                    <tbody id="journalentrytablebodypreview">
                                                        {result}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td style={{verticalAlign : 'middle'}}></td>
                                                            <td style={{verticalAlign : 'middle'}}></td>
                                                            <td style={{verticalAlign : 'middle'}}></td>
                                                            <td style={{verticalAlign : 'middle'}}></td>
                                                            <td style={{verticalAlign : 'middle' ,fontWeight : 'bold' ,textAlign : 'right', fontSize : '13px'}} id="debit_total_hitnpreview">{number_format(this.state.totaldebitpreview,2)}</td>
                                                            <td style={{verticalAlign : 'middle' ,fontWeight : 'bold' ,textAlign : 'right', fontSize : '13px'}} id="credit_total_hitnpreview">{number_format(this.state.totalcreditpreview,2)}</td>
                                                            <td style={{verticalAlign : 'middle'}}></td>
                                                            <td style={{verticalAlign : 'middle'}}></td>
                                                            <td style={{verticalAlign : 'middle'}}></td>
                                                            <td style={{verticalAlign : 'middle'}}></td>
                                                            <td style={{verticalAlign : 'middle'}}></td>
                                                            
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                                </div>
                                                <div className="col-md-12 p-0 mt-1" >
                                                    
                                                </div>
                                                <div className="col-md-12 p-0 mt-4">
                                                    <div className="col-md-6 pl-0">
                                                        <p>Memo</p>
                                                        <textarea rows="3" className="w-100" id="JournalMemopreview" readOnly value={this.state.JournalMemopreview}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button"className="btn btn-secondary rounded" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-10" >
                                    <div className=" mr-2 mb-5 mt-3">
                                        <a href="#" className="mr-1 btn btn-success" data-target='#journalentrymodal' onClick={()=> this.showhide('Cheque Voucher')} data-toggle="modal">Create New Cheque Voucher</a>
                                        <a href="#" className="mr-1 btn btn-success" data-target='#journalentrymodal' onClick={()=> this.showhide('Journal Voucher')} data-toggle="modal">Create New Journal Voucher</a>
                                        <a href="#" className="mr-1 btn btn-success" data-target='#ImportJournalEntryModal' data-toggle="modal">Import Journal Entry</a>
                                        
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div class="input-group mb-3">
                                        <input type="number" class="form-control" id="yearSSSEELLEECCRTTED" style={{float: 'right'}} value={this.state.YearSelected} onChange={(event)=>this.setState({YearSelected : event.target.value})} />
                                        
                                        <div class="input-group-prepend">
                                            <button class="btn btn-secondary" onClick={()=>this.changePageNumber(0)}>GO</button>
                                        </div>
                                    </div>
                                    {/* <select class="form-control" style={{float: 'right'}} value={this.state.YearSelected} onChange={(event)=>this.setState({YearSelected : event.target.value}, function() { this.changePageNumber(0)}.bind(this))}>
                                        {this.createSelectItems()}
                                    </select>  */}
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-10">
                                    <a style={{display : 'none'}} href="print_journal_entry?no=" id="addedJournalPrintActionBtn" target="_blank">Print</a>
                                    <a style={{display : 'none'}} href="print_cheque_journal_entry?no=" id="addedJournalPrintChequeActionBtn" target="_blank">Print</a>
                                    
                                </div>
                                <div className="col-md-2">
                                    <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Enter Keyword.." value={this.state.searchKeyword} onChange={(event)=> this.setState({searchKeyword: event.target.value})} id="SearchFilterJournalEnties" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary"  onClick={()=>this.changePageNumber(0)} title="Search Journal Entries" type="button"><span className="fa fa-search"></span></button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div id="table" className="table-editable">
                                    <table id="jounalentrytable" className="table table-bordered table-responsive-md font14" width="100%"  style={{backgroundColor: 'white'}}>
                                        <thead>
                                            <tr className="bg-ltgrey">
                                                <th style={{display: 'none'}}></th>
                                                <th style={{verticalAlign : 'middle'}} width="5%" className="text-center">JOURNAL DATE</th>
                                                <th style={{verticalAlign : 'middle'}} width="5%" className="text-center">JOURNAL TYPE</th>
                                                <th style={{verticalAlign : 'middle'}} width="5%" className="text-center">ACCOUNT CODE</th>
                                                <th style={{verticalAlign : 'middle'}} width="5%" className="text-center">JOURNAL NO</th>
                                                <th style={{verticalAlign : 'middle'}} width="15%" className="text-center">ACCOUNT</th>
                                                <th style={{verticalAlign : 'middle'}} width="8%" className="text-center">DEBIT</th>
                                                <th style={{verticalAlign : 'middle'}} width="8%" className="text-center">CREDIT</th>
                                                <th style={{verticalAlign : 'middle'}} width="15%" className="text-center">DESCRIPTION</th>
                                                <th style={{verticalAlign : 'middle'}} width="13%" className="text-center">NAME</th>
                                                <th style={{verticalAlign : 'middle'}} width="13%" className="text-center">MEMO</th>
                                                <th style={{verticalAlign : 'middle'}} width="3%" className="text-center"></th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {journaltablelist}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-group" style={{width: '15%', float : 'right'}}>
                                    <div className="input-group-prepend">
                                    <button type="button" onClick={()=>this.changePageNumber(-20)} className="btn btn-secondary" style={{lineHeight: '2'}}><span className="fa fa-angle-double-left"></span></button>
                                    </div>
                                    <input type="number" id="currentjournal_no" value={parseFloat(this.state.JournalNoSelected)} onChange={(event)=> this.setState({JournalNoSelected: event.target.value})} min="0" step="20" className="form-control removeReadOnly" style={{textAlign : 'center'}} readOnly  />
                                    
                                    <div className="input-group-append">
                                        <button type="button"  onClick={()=>this.changePageNumber(20)} className="btn btn-secondary" style={{lineHeight: '2'}}><span className="fa fa-angle-double-right"></span></button>
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

export default JournalEntry;