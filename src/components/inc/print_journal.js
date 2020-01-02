import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import '../../css/index.css';
import {number_format} from '../../Helper';

class PrintComponent extends React.Component{
    state ={
        data: [],
        JournalEntry : [],
        company_name : [],
        journal_type_query : [],
        Journal_no_selected : '',
        
    }
    getJournalEntry= async (no) =>{
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getJournalEntry',{
            params:{
                no : no
            },
            crossDomain: true
        });
        console.log(response.data);
        this.setState({JournalEntry : response.data.JournalEntry});
        this.setState({company_name : response.data.company_name});
        this.setState({Journal_no_selected : response.data.Journal_no_selected});
        this.setState({journal_type_query : response.data.journal_type_query});
        
    }
    componentDidMount(){

        this.getJournalEntry(this.props.no);
        
    }
    
    render(){
        var total_debit_journal ='0';
        var total_credit_journal='0';
        const journaltablelist=this.state.JournalEntry.map((dat,index) =>{
            total_debit_journal =total_debit_journal+dat.je_debit;
            total_credit_journal=total_credit_journal+dat.je_credit;
            return [
            <tr key={index}>
                <td style={{verticalAlign : 'middle', textAlign : 'center'}}>{dat.coa_code}</td>
                <td style={{verticalAlign : 'middle'}}>{dat.je_desc}</td>
                <td style={{verticalAlign : 'middle', textAlign : 'right'}}>{dat.je_debit!=''? number_format(dat.je_debit,2) : ''}</td>
                <td style={{verticalAlign : 'middle', textAlign : 'right'}}>{dat.je_credit!=''? number_format(dat.je_credit,2) : ''}</td>
            </tr>
            ]
        });
        return (
            <div>

                
                <div style={{border : 'double', backgroundColor : 'white'}} id="voucher_tables_print_area">
                <table className="table table-sm  font14" style={{marginTop : '10px' , marginBottom : '10px', border : '0'}}>
                    <tbody className="voucherprint_header" >
                        <tr>    
                            <td colSpan="4"></td>
                        </tr>
                        <tr>
                            <td colSpan="4" style={{fontWeight : 'bold', textAlign : 'center', fontSize : '16px', textDecoration : 'underline', textTransform : 'uppercase'}}>{this.state.company_name.company_legal_name!=""? this.state.company_name.company_legal_name : this.state.company_name.company_name}</td>
                        </tr>
                        <tr>    
                            <td colSpan="4" style={{textAlign : 'right'}}>No : {this.state.journal_type_query.je_series_no}</td>
                        </tr>
                        <tr>    
                            <td colSpan="4" style={{textAlign : 'right'}}>Date : {moment(this.state.journal_type_query.je_attachment).format('MM-DD-YYYY')}</td>
                        </tr>
                        <tr>    
                            <td colSpan="4" style={{textAlign : 'left'}}>Pay To : {this.state.journal_type_query.je_name}</td>
                        </tr>
                    </tbody>
                </table>
                <table id="jounalentrytable" className="table table-bordered  table-sm  font14" style={{marginBottom : '0px', border : '1px solid black'}}>
                
                <thead>
                    <tr id="thead_tr_print_withCSS" style={{backgroundColor : 'rgb(228, 236, 247)'}}>
                        <th className="text-center" width="10%">ACCOUNT CODE</th>
                        <th className="text-center" width="15%">PARTICULARS</th>
                        <th className="text-center" width="8%">DEBITS</th>
                        <th className="text-center" width="8%">CREDITS</th>
                    </tr>
                </thead>
                <tbody>
                    {journaltablelist}
                    <tr>
                        <td >
                        </td>
                        <td style={{verticalAlign : 'middle', textAlign : 'right' , fontWeight : 'bold'}}>TOTAL :</td>
                        <td style={{verticalAlign : 'middle', textAlign : 'right' , fontWeight : 'bold'}}>{number_format(total_debit_journal,2)}</td>
                        <td style={{verticalAlign : 'middle', textAlign : 'right' , fontWeight : 'bold'}}>{number_format(total_credit_journal,2)}</td>
                        
                    </tr> 
                </tbody>
                </table>
                <table className="table table-sm  font14" style={{border : '0'}}>
                    <tbody className="voucherprint_footer" >
                        
                        <tr>
                            <td colSpan="3" style={{fontSize : '12px', textAlign : 'left'}}></td>
                            <td colSpan="3" style={{fontSize : '12px', textAlign : 'right'}}>Cheque No. : {this.state.journal_type_query.cheque_no!=""? (this.state.journal_type_query.cheque_no!=null? this.state.journal_type_query.cheque_no : '__________') : '__________'}</td>
                        </tr>
                        <tr>    
                            <td colSpan="2" style={{textAlign : 'left'}}>Prepared by : <input type="text" readOnly style={{width : '50%'}} /></td>
                            <td colSpan="2" style={{textAlign : 'left'}}>Signature : <input type="text" readOnly style={{width : '50%'}} /></td>
                            <td colSpan="2" style={{textAlign : 'left'}}>Date : <input type="text" readOnly style={{width : '50%'}} /></td>
                        </tr>
                        <tr>    
                            <td colSpan="2" style={{textAlign : 'left'}}>Approved by : <input type="text" readOnly style={{width : '50%'}} /></td>
                            <td colSpan="2" style={{textAlign : 'left'}}>Signature : <input type="text" readOnly style={{width : '50%'}} /></td>
                            <td colSpan="2" style={{textAlign : 'left'}}>Date : <input type="text" readOnly style={{width : '50%'}} /></td>
                        </tr>
                        <tr>    
                            <td colSpan="2" style={{textAlign : 'left'}}>Recorded by : <input type="text" readOnly style={{width : '50%'}} /></td>
                            <td colSpan="2" style={{textAlign : 'left'}}>Signature : <input type="text" readOnly style={{width : '50%'}} /></td>
                            <td colSpan="2" style={{textAlign : 'left'}}>Date : <input type="text" readOnly style={{width : '50%'}} /></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        );
    }

}

const PrintJE = (props) => {
  const componentRef = useRef();
  return (
    <div className="ReactToPrintTriggerButtonDiv">
      <PrintComponent ref={componentRef} no={props.match.params.no} />
      <ReactToPrint
        trigger={() => <button className="btn btn-primary" > <i className="fa fa-print"></i> Print</button>}
        content={() => componentRef.current}
      />
    </div>
  );
};



export default PrintJE;