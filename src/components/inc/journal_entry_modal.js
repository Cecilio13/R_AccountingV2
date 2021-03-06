import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../css/index.css';
import {number_format} from '../../Helper';
var journalrow=2;
var initialheight=0;
    var initialheight2=0;
    var hiiiiqweqwe=40;
    var rerenderselectpicker=0;
class JEModal extends React.Component{
    state ={data: [],rows:[]}
    setDefaultDraggfging =(event) =>{
        if(hiiiiqweqwe<40){
            hiiiiqweqwe=40;
        }
        console.log("setted to :"+hiiiiqweqwe);
    }
    dragging = (e,element)=>{
        console.log(element);
        var dragX = e.pageX, dragY = e.pageY;
        console.log(initialheight+" X: "+dragX+" Y: "+dragY+" 22222:"+initialheight2);
        initialheight=dragY;
        
        if(initialheight>initialheight2){
            initialheight2=dragY+parseFloat(1);
        }else{
            initialheight2=dragY-1;
        }

        if(initialheight>initialheight2){
            hiiiiqweqwe=hiiiiqweqwe-5;
        }else{
            hiiiiqweqwe=hiiiiqweqwe+parseFloat(5); 
        }
        console.log(hiiiiqweqwe);
        document.getElementById(element).style.height=hiiiiqweqwe+"px";
        //console.log(initialheight+" X: "+dragX+" Y: "+dragY+" height: "+element.style.height);
    }
    swap2 = async (id,type) =>{

        document.getElementById(id+type).value="";
        var debitJhint=0;
        var creditJhint=0;
        for(var c=1;c<=journalrow;c++){
            var td3 = document.getElementById("journaldebit"+c);
            var td4 = document.getElementById("journalcredit"+c);
            if(td3.value!=""){
                   
                debitJhint=debitJhint+parseFloat(td3.value);
                
            }
            if(td4.value!=""){
                   
                creditJhint=creditJhint+parseFloat(td4.value);
                
            }
        }
        document.getElementById('debit_total_hitn').innerHTML=number_format(debitJhint,2);
        document.getElementById('credit_total_hitn').innerHTML=number_format(creditJhint,2);
        
    }
    setAccountCodeJournalEntry= async (row) =>{
        var code=document.getElementById('accjournbale'+row).value;
        console.log(code+" "+row+" account code journal entry");
        document.getElementById('accjournalcode'+row).value=code;
        document.getElementById('setselectpickerbuttonjournal_entry_code').setAttribute('data-value',row);
        document.getElementById('setselectpickerbuttonjournal_entry_code').click();
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getCostCenterJournal',{
            params:{
                id : code
            },
            crossDomain: true
        });
        document.getElementById('journalcost_center_td'+row).value=response.data.no!=null? response.data.no : '';
        document.getElementById('journalcost_center_td_input'+row).value=response.data.no!=null? response.data.no : '';
        document.getElementById('journaldescription'+row).value=response.data.no!=null? response.data.no : '';
        document.getElementById('render_select_cost_center_desc_code').click();
    }
    setAccountJournalEntry = async(row) =>{
        var code=document.getElementById('accjournalcode'+row).value;
        console.log(code+" "+row+" account journal entry");
        document.getElementById('accjournbale'+row).value=code;
        document.getElementById('setselectpickerbuttonjournal_entry').setAttribute('data-value',row);
        document.getElementById('setselectpickerbuttonjournal_entry').click();
        const response = await axios.get('http://localhost/Accounting_modified/public/api/getCostCenterJournal',{
            params:{
                id : code
            },
            crossDomain: true
        });
        document.getElementById('journalcost_center_td'+row).value=response.data.no!=null? response.data.no : '';
        document.getElementById('journaldescription'+row).value=response.data.no!=null? response.data.no : '';
        document.getElementById('journalcost_center_td_input'+row).value=response.data.no!=null? response.data.no : '';
        
        document.getElementById('render_select_cost_center_desc_code').click();
    }
    set_select_value_cost_center_desc_code(origin,destination,hidden){
        var code=document.getElementById(origin).value;
        document.getElementById(destination).value=code!=null? code : '' ;
        document.getElementById(hidden).value=code!=null? code : '' ;
        document.getElementById('setselectpickerbutton').click();
        
    }
    DeleteAllRows = ()=>{
        document.getElementById('destroydatatable').click();
        var t = document.getElementById('journalentrytablebody');
        if(journalrow>2){
            
            this.setState({rows : []});
            journalrow=2;
            
        }
        var debitJhint=0;
        var creditJhint=0;
        for(var c=1;c<=journalrow;c++){
            var td3 = document.getElementById("journaldebit"+c);
            var td4 = document.getElementById("journalcredit"+c);
            if(td3.value!=""){
                   
                debitJhint=debitJhint+parseFloat(td3.value);
                
            }
            if(td4.value!=""){
                   
                creditJhint=creditJhint+parseFloat(td4.value);
                
            }
        }
        document.getElementById('debit_total_hitn').innerHTML=number_format(debitJhint,2);
        document.getElementById('credit_total_hitn').innerHTML=number_format(creditJhint,2);
    }
    AddTableRow(){
        document.getElementById('destroy_seelcpickerjournal').click();
        const item = "asdasdasd";
        this.setState({
          rows: [...this.state.rows, item]
        });                     
        journalrow++;
    }
    refreshselecpickerselects =() =>{
        if(rerenderselectpicker==1){
            document.getElementById('setselectpickerbutton').click();
            document.getElementById('rerenderdatatable').click();
            rerenderselectpicker=0;
        }
        
    }
    handleRemoveRow = () => {
    this.setState({
        rows: this.state.rows.slice(0, -1)
    });
    journalrow--;
        var debitJhint=0;
        var creditJhint=0;
        for(var c=1;c<=journalrow;c++){
            var td3 = document.getElementById("journaldebit"+c);
            var td4 = document.getElementById("journalcredit"+c);
            if(td3.value!=""){
                   
                debitJhint=debitJhint+parseFloat(td3.value);
                
            }
            if(td4.value!=""){
                   
                creditJhint=creditJhint+parseFloat(td4.value);
                
            }
        }
        document.getElementById('debit_total_hitn').innerHTML=number_format(debitJhint,2);
        document.getElementById('credit_total_hitn').innerHTML=number_format(creditJhint,2);
    }
    submitJournalEntryModal = async (event) =>{
        event.preventDefault();
        var table, tr;
        table = document.getElementById("journalentrytablebody");
        tr = table.getElementsByTagName("tr");
        var debitJ=0;
        var creditJ=0;
        var PayeeCheck=1;
        document.getElementById('journal_table_count').value=journalrow;
        for(var c=tr.length;c>0;c--){
            
            var td3 = document.getElementById("journaldebit"+c);
            var td4 = document.getElementById("journalcredit"+c);
            var payee_input = document.getElementById("journalnamename"+c);
            if(td3.value!=""){
                debitJ=debitJ+parseFloat(td3.value);
            }
            if(td4.value!=""){
                creditJ=creditJ+parseFloat(td4.value);
            }
            if(payee_input.value==""){
                PayeeCheck=0;
            }

        }
        if(PayeeCheck==1){
            debitJ=number_format(debitJ,2);
            creditJ=number_format(creditJ,2);
            console.log(debitJ+"  "+creditJ);
            if( debitJ!="0.00" && creditJ!="0.00"){
                if(debitJ==creditJ){
                    const bodyFormData = new FormData(event.target);
                    console.log(event.target);
                    const response = await axios.post('http://localhost/Accounting_modified/public/api/SaveJournalEntry',bodyFormData);
                    console.log(response.data);
                    window.location.reload();
                }else{
                    alert('Credit and Debit not Equal');
                }
            }else{
                alert('please check credit or debit amount');
            }
            
        }else{                          
            alert("Payee Field is required");
        }
        
        
    }
    _handleKeyDown =(e,indx) => {
        
        console.log(" key pressed : "+e.key);
        if(e.key === 'ArrowRight'){
            e.preventDefault();
            var withNoDigits = e.target.id.replace(/[0-9]/g, '');
            if(withNoDigits==""){
                e.target.click();
                console.log("e.target : "+e.target.getAttribute('aria-controls'));
                var ariacontrol=e.target.getAttribute('aria-controls');
                console.log(document.querySelectorAll("[aria-owns='"+ariacontrol+"']"));
                var nodelist=document.querySelectorAll("[aria-owns='"+ariacontrol+"']");
                for (var i = 0; i < nodelist.length; i++) {
                    console.log(nodelist[i].getAttribute('data-id'));
                    withNoDigits=nodelist[i].getAttribute('data-id').replace(/[0-9]/g, '');
                }
                if(withNoDigits!=''){
                    console.log("withNoDigits : "+withNoDigits+(parseFloat(indx)-parseFloat(1)));
                    //document.getElementById('journalcost_center_td1').focus();
                    if(withNoDigits=="accjournalcode"){
                        document.getElementById("accjournbale"+(parseFloat(indx))).focus(); 
                        document.getElementById("accjournbale"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="accjournbale"){
                        document.getElementById("journaldescription"+(parseFloat(indx))).focus(); 
                        document.getElementById("journaldescription"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journaldescription"){
                        document.getElementById("journalcost_center_td"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalcost_center_td"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journalcost_center_td"){
                        document.getElementById("journaldebit"+(parseFloat(indx))).focus(); 
                        document.getElementById("journaldebit"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journaldebit"){
                        document.getElementById("journalcredit"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalcredit"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journalcredit"){
                        document.getElementById("journalnamename"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalnamename"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journalnamename"){
                        if(this.props.JournalType=="Cheque Voucher"){
                            document.getElementById("journalcheque_no_td"+(parseFloat(indx))).focus(); 
                            document.getElementById("journalcheque_no_td"+(parseFloat(indx))).click(); 
                        }else{
                            document.getElementById("journalref_no_td"+(parseFloat(indx))).focus(); 
                            document.getElementById("journalref_no_td"+(parseFloat(indx))).click(); 
                        }
                        
                    }
                    else if(withNoDigits=="journalcheque_no_td"){
                        document.getElementById("journalref_no_td"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalref_no_td"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journalref_no_td"){
                        document.getElementById("date_deposited"+(parseFloat(indx))).focus(); 
                        document.getElementById("date_deposited"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="date_deposited"){
                        document.getElementById("accjournalcode"+(parseFloat(indx))).focus(); 
                        document.getElementById("accjournalcode"+(parseFloat(indx))).click(); 
                    }
                }
            }else{
                
                //document.getElementById('journalcost_center_td1').focus();
                if(withNoDigits=="accjournalcode"){
                    document.getElementById("accjournbale"+(parseFloat(indx))).focus(); 
                    document.getElementById("accjournbale"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="accjournbale"){
                    document.getElementById("journaldescription"+(parseFloat(indx))).focus(); 
                    document.getElementById("journaldescription"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journaldescription"){
                    document.getElementById("journalcost_center_td"+(parseFloat(indx))).focus(); 
                    document.getElementById("journalcost_center_td"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journalcost_center_td"){
                    document.getElementById("journaldebit"+(parseFloat(indx))).focus(); 
                    document.getElementById("journaldebit"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journaldebit"){
                    document.getElementById("journalcredit"+(parseFloat(indx))).focus(); 
                    document.getElementById("journalcredit"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journalcredit"){
                    document.getElementById("journalnamename"+(parseFloat(indx))).focus(); 
                    document.getElementById("journalnamename"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journalnamename"){
                    if(this.props.JournalType=="Cheque Voucher"){
                        document.getElementById("journalcheque_no_td"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalcheque_no_td"+(parseFloat(indx))).click(); 
                    }else{
                        document.getElementById("journalref_no_td"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalref_no_td"+(parseFloat(indx))).click(); 
                    }
                    
                }
                else if(withNoDigits=="journalcheque_no_td"){
                    document.getElementById("journalref_no_td"+(parseFloat(indx))).focus(); 
                    document.getElementById("journalref_no_td"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journalref_no_td"){
                    document.getElementById("date_deposited"+(parseFloat(indx))).focus(); 
                    document.getElementById("date_deposited"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="date_deposited"){
                    document.getElementById("accjournalcode"+(parseFloat(indx))).focus(); 
                    document.getElementById("accjournalcode"+(parseFloat(indx))).click(); 
                }
                
            }
        }
        if(e.key === 'ArrowLeft'){
            e.preventDefault();
            var withNoDigits = e.target.id.replace(/[0-9]/g, '');
            if(withNoDigits==""){
                e.target.click();
                console.log("e.target : "+e.target.getAttribute('aria-controls'));
                var ariacontrol=e.target.getAttribute('aria-controls');
                console.log(document.querySelectorAll("[aria-owns='"+ariacontrol+"']"));
                var nodelist=document.querySelectorAll("[aria-owns='"+ariacontrol+"']");
                for (var i = 0; i < nodelist.length; i++) {
                    console.log(nodelist[i].getAttribute('data-id'));
                    withNoDigits=nodelist[i].getAttribute('data-id').replace(/[0-9]/g, '');
                }
                if(withNoDigits!=''){
                    //document.getElementById('journalcost_center_td1').focus();
                    if(withNoDigits=="accjournalcode"){
                        document.getElementById("date_deposited"+(parseFloat(indx))).focus(); 
                        document.getElementById("date_deposited"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="accjournbale"){
                        document.getElementById("accjournalcode"+(parseFloat(indx))).focus(); 
                        document.getElementById("accjournalcode"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journaldescription"){
                        document.getElementById("accjournbale"+(parseFloat(indx))).focus(); 
                        document.getElementById("accjournbale"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journalcost_center_td"){
                        document.getElementById("journaldescription"+(parseFloat(indx))).focus(); 
                        document.getElementById("journaldescription"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journaldebit"){
                        document.getElementById("journalcost_center_td"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalcost_center_td"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journalcredit"){
                        document.getElementById("journaldebit"+(parseFloat(indx))).focus(); 
                        document.getElementById("journaldebit"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journalnamename"){
                        
                        document.getElementById("journalcredit"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalcredit"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journalcheque_no_td"){
                        document.getElementById("journalnamename"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalnamename"+(parseFloat(indx))).click(); 
                    }
                    else if(withNoDigits=="journalref_no_td"){
                        if(this.props.JournalType=="Cheque Voucher"){
                            document.getElementById("journalcheque_no_td"+(parseFloat(indx))).focus(); 
                            document.getElementById("journalcheque_no_td"+(parseFloat(indx))).click(); 
                        }else{
                            document.getElementById("journalnamename"+(parseFloat(indx))).focus(); 
                            document.getElementById("journalnamename"+(parseFloat(indx))).click(); 
                        }
                        
                    }
                    else if(withNoDigits=="date_deposited"){
                        document.getElementById("journalref_no_td"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalref_no_td"+(parseFloat(indx))).click(); 
                    }
                }
            }else{
                //document.getElementById('journalcost_center_td1').focus();
                if(withNoDigits=="accjournalcode"){
                    document.getElementById("date_deposited"+(parseFloat(indx))).focus(); 
                    document.getElementById("date_deposited"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="accjournbale"){
                    document.getElementById("accjournalcode"+(parseFloat(indx))).focus(); 
                    document.getElementById("accjournalcode"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journaldescription"){
                    document.getElementById("accjournbale"+(parseFloat(indx))).focus(); 
                    document.getElementById("accjournbale"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journalcost_center_td"){
                    document.getElementById("journaldescription"+(parseFloat(indx))).focus(); 
                    document.getElementById("journaldescription"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journaldebit"){
                    document.getElementById("journalcost_center_td"+(parseFloat(indx))).focus(); 
                    document.getElementById("journalcost_center_td"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journalcredit"){
                    document.getElementById("journaldebit"+(parseFloat(indx))).focus(); 
                    document.getElementById("journaldebit"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journalnamename"){
                    
                    document.getElementById("journalcredit"+(parseFloat(indx))).focus(); 
                    document.getElementById("journalcredit"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journalcheque_no_td"){
                    document.getElementById("journalnamename"+(parseFloat(indx))).focus(); 
                    document.getElementById("journalnamename"+(parseFloat(indx))).click(); 
                }
                else if(withNoDigits=="journalref_no_td"){
                    if(this.props.JournalType=="Cheque Voucher"){
                        document.getElementById("journalcheque_no_td"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalcheque_no_td"+(parseFloat(indx))).click(); 
                    }else{
                        document.getElementById("journalnamename"+(parseFloat(indx))).focus(); 
                        document.getElementById("journalnamename"+(parseFloat(indx))).click(); 
                    }
                    
                }
                else if(withNoDigits=="date_deposited"){
                    document.getElementById("journalref_no_td"+(parseFloat(indx))).focus(); 
                    document.getElementById("journalref_no_td"+(parseFloat(indx))).click(); 
                }
            }
        }
        if(e.key === 'ArrowUp'){
            e.preventDefault();
            if(indx!=1){
                var withNoDigits = e.target.id.replace(/[0-9]/g, '');
                if(withNoDigits==""){
                    console.log("e.target : "+e.target.getAttribute('aria-controls'));
                    var ariacontrol=e.target.getAttribute('aria-controls');
                    console.log(document.querySelectorAll("[aria-owns='"+ariacontrol+"']"));
                    var nodelist=document.querySelectorAll("[aria-owns='"+ariacontrol+"']");
                    for (var i = 0; i < nodelist.length; i++) {
                        console.log(nodelist[i].getAttribute('data-id'));
                        withNoDigits=nodelist[i].getAttribute('data-id').replace(/[0-9]/g, '');
                    }
                    if(withNoDigits!=''){
                        console.log("withNoDigits : "+withNoDigits+(parseFloat(indx)-parseFloat(1)));
                        //document.getElementById('journalcost_center_td1').focus();
                        document.getElementById(withNoDigits+(parseFloat(indx)-parseFloat(1))).focus(); 
                        document.getElementById(withNoDigits+(parseFloat(indx)-parseFloat(1))).click(); 
                    }
                    
                }else{
                    console.log("withNoDigits : "+withNoDigits+(parseFloat(indx)-parseFloat(1)));
                    //document.getElementById('journalcost_center_td1').focus();
                    document.getElementById(withNoDigits+(parseFloat(indx)-parseFloat(1))).focus(); 
                    document.getElementById(withNoDigits+(parseFloat(indx)-parseFloat(1))).click(); 
                }
                
            }
        }
        if (e.key === 'Enter' || e.key === 'ArrowDown') {
            e.preventDefault();
            if(indx==parseFloat(this.state.rows.length)+parseFloat(2)){
                this.AddTableRow();
            }else{
                var withNoDigits = e.target.id.replace(/[0-9]/g, '');
                if(withNoDigits==""){
                    console.log("e.target : "+e.target.getAttribute('aria-controls'));
                    var ariacontrol=e.target.getAttribute('aria-controls');
                    console.log(document.querySelectorAll("[aria-owns='"+ariacontrol+"']"));
                    var nodelist=document.querySelectorAll("[aria-owns='"+ariacontrol+"']");
                    for (var i = 0; i < nodelist.length; i++) {
                        console.log(nodelist[i].getAttribute('data-id'));
                        withNoDigits=nodelist[i].getAttribute('data-id').replace(/[0-9]/g, '');
                    }
                    if(withNoDigits!=''){
                        console.log("withNoDigits : "+withNoDigits+(parseFloat(indx)+parseFloat(1)));
                        //document.getElementById('journalcost_center_td1').focus();
                        document.getElementById(withNoDigits+(parseFloat(indx)+parseFloat(1))).focus();
                        document.getElementById(withNoDigits+(parseFloat(indx)+parseFloat(1))).click();
                    }
                    
                }else{
                    console.log("withNoDigits : "+withNoDigits+(parseFloat(indx)+parseFloat(1)));
                    //document.getElementById('journalcost_center_td1').focus();
                    document.getElementById(withNoDigits+(parseFloat(indx)+parseFloat(1))).focus();
                    document.getElementById(withNoDigits+(parseFloat(indx)+parseFloat(1))).click();
                }
                
               
            }
          console.log(indx+" "+(parseFloat(this.state.rows.length)+parseFloat(2)));
        }
      }
    render(){
        
        const coa_code_list=this.props.COA.map((dat,index) =>{
            return [
                <option key={index} value={dat.id}>{dat.coa_code}</option>
            ]
        });
        const coa_name_list=this.props.COA.map((dat,index) =>{
            return [
                <option key={index} value={dat.id}>{dat.coa_name}</option>
            ]
        });
        const customers_list=this.props.customers.map((dat,index) =>{
            return [
                <option key={index} value={dat.display_name!=""? dat.display_name : dat.f_name+" "+dat.l_name}>{dat.account_type}</option>
            ]
        });
        const cost_center_list_list=this.props.cost_center_list.map((dat,index) =>{
            return [
                <option key={index} value={dat.cc_no}>{dat.cc_name}</option>
            ]
        });
        const cost_center_code_list=this.props.cost_center_list.map((dat,index) =>{
            return [
                <option key={index} value={dat.cc_no}>{dat.cc_name_code}</option>
            ]
        });
        // const data=this.state.data.map((dat) =>{
        //     return <div key={dat.id}>{dat.id+" "+dat.name+" "+dat.position}</div>
        // });
        return (
            <div>
                <button style={{display:'none'}} id="destroy_seelcpickerjournal"></button>
                <div className="modal fade p-0" id="journalentrymodal" tabIndex="-1" role="dialog" aria-hidden="true" >
                <form onSubmit={this.submitJournalEntryModal} id="journalentry_modal_form">
                    <div className="modal-dialog modal-full" role="document" style={{minWidth : '100%' , margin :'0'}}>
                        <div className="modal-content" style={{minHeight :"100vh"}}>
                        
                            <div className="modal-header">
                                <h5 className="modal-title" id="journal_entry_title_header">{this.props.JournalType=="Cheque Voucher"? "Cheque Voucher" : "Journal Voucher"}</h5>
                                
                                <button type="button" className="close" data-dismiss="modal" id="Closeeee" aria-label="Close" onClick={()=>this.DeleteAllRows()}>
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            
                            <div className="modal-body p-4" id="result">
                                <div className="col-md-12 p-0 mb-4">
                                    <div className="col-md-12 p-0 mb-4">
                                        <div className="col-md-2 p-0">
                                            <p>Journal Date</p>
                                            <input type="date" name="journalDate" id="journalDate" value={this.props.current_date} required />
                                            <input type="hidden" name="journal_entry_type" id="journal_entry_type" value={this.props.JournalType} />
                                            <input type="hidden" name="journal_table_count" id="journal_table_count" value="2" />
                                        </div>
                                        <div className="col-md-2 p-0">
                                        <p>Journal No.</p>
                                        <input type="number" name="JournalNo" style={{display : 'none'}} readOnly id="JournalNo" placeholder="1" value={this.props.jounalcount} />
                                        <input type="text" name="JVCVVOUCHERNO" readOnly id="JVCVVOUCHERNO" value={this.props.JournalType=="Cheque Voucher"? this.props.chequevoucher_no : this.props.journalvoucher_no} />
                                        <input type="text" style={{display : 'none'}} name="OtherNo" readOnly id="OtherNo" placeholder="1" value={'Journal-'+this.props.jounalcount} />
                                        <input type="text" style={{display : 'none'}} name="goSalesReceipt" readOnly id="goSalesReceipt" placeholder="1" value="0" />
                                        <input type="text" style={{display : 'none'}} name="JournalEntryTransactionType" readOnly id="JournalEntryTransactionType" value="Journal Entry" />

                                        </div>
                                        <div className="col-md-2 p-0" style={{display : 'none'}}>
                                            <p>Cost Center</p>
                                            <select name="" className="selectpicker form-control" data-live-search="true" id="CostCenterJournalEntrty" name="CostCenterJournalEntrty" >
                                                <option value="">--Select Cost Center--</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <a className="dropdown-item" href="#" style={{display : 'none'}} id="SalesReceiptModalHiddenButton" onClick="no_reload_sr()" data-toggle="modal" data-target="#salesreceiptmodal">Sales Receipt</a>
                                    <a className="dropdown-item"  href="#" id="invoicemodalSelect" style={{display : 'none'}} data-toggle="modal" data-target="#invoicemodaljournal">Invoice</a>
                                    <div className="table-responsive-xl">
                                    <button type="button" id="render_select_cost_center_desc_code" style={{display : 'none'}}></button>
                                    <table className=" table table-bordered text-left font14 table-sm" style={{border : '0'}} id="journalentrytable">
                                        <thead>
                                        <tr style={{backgroundColor : 'rgb(228, 236, 247)', color :'#666'}}>
                                            <th className="text-left" width="3%">#</th>
                                            <th className="text-left" width="10%">ACCOUNT CODE</th>
                                            <th className="text-left" width="10%">ACCOUNT DESCRIPTION</th>
                                            <th className="text-left" width="10%">COST CENTER CODE</th>
                                            <th className="text-left" width="10%">COST CENTER DESCRIPTION</th>
                                            <th className="text-left" width="8%">DEBIT</th>
                                            <th className="text-left" width="8%">CREDIT</th>
                                            <th className="text-left" width="15%">PAYEE</th>
                                            <th className="text-left" width="8%">CHEQUE NO</th>
                                            <th className="text-left" width="8%">REFERENCE</th>
                                            <th className="text-left" width="10%">DATE DEPOSITED</th>
                                            <th className="text-center" width="2%"></th>
                                        </tr>
                                        </thead>
                                        <tbody id="journalentrytablebody">
                                        <tr id="journalrow1" onDrag={(event)=>this.dragging(event,'journalrow1')} onDragOver={(event)=>this.setDefaultDraggfging(event)} onKeyDown={(event)=>this._handleKeyDown(event,'1')}>
                                            
                                            <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>1</td>
                                            <td className="pt-3-half" >
                                                <select className="selectpicker form-control " onChange={()=>this.setAccountJournalEntry('1')} required data-live-search="true"  id="accjournalcode1" name="accjournalcode1" >
                                                    <option value="">--Select--</option>
                                                    {coa_code_list}
                                                </select>
                                                
                                            </td>
                                            <td className="pt-3-half" >
                                                <select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry('1')} required data-live-search="true"  id="accjournbale1" name="accjournbale1"  >
                                                    <option value="">--Select--</option>
                                                    {coa_name_list}
                                                </select>
                                                <input type="hidden" id="journalcost_center_td_input1" name="journalcost_center_td_input1"/>
                                            </td>
                                            <td className="pt-3-half"  >
                                                <select id="journaldescription1" onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription1', 'journalcost_center_td1','journalcost_center_td_input1')} name="journaldescription1" class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true">
                                                    <option value="">--Select--</option>
                                                    {cost_center_code_list}
                                                </select>
                                            </td>
                                            <td className="pt-3-half"  >
                                                <select  onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td1', 'journaldescription1','journalcost_center_td_input1')} id="journalcost_center_td1" class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true">
                                                    <option value="">--Select--</option>
                                                    {cost_center_list_list}
                                                </select>

                                            </td>
                                            <td className="pt-3-half"  >
                                                <input type="number" step="0.01" onKeyUp={()=>this.swap2('journalcredit','1')} onInput={()=>this.swap2('journalcredit','1')} id="journaldebit1" name="journaldebit1" />
                                            </td>
                                            <td className="pt-3-half"  >
                                                <input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit','1')} onInput={()=>this.swap2('journaldebit','1')} id="journalcredit1" name="journalcredit1" />
                                            </td>
                                            
                                            <td className="pt-3-half"  >
                                                <input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id="journalnamename1" name="journalnamename1" />
                                            </td>
                                            <td className="pt-3-half"  >
                                                <textarea id="journalcheque_no_td1" name="journalcheque_no_td1" style={{width : '100%',border : '0px solid white' }}></textarea>
                                            </td>
                                            <td className="pt-3-half" >
                                                <textarea id="journalref_no_td1" name="journalref_no_td1" style={{width : '100%',border : '0px solid white'}}></textarea>
                                            </td>
                                            <td className="pt-3-half"  >
                                                <input type="date" id="date_deposited1" name="date_deposited1" style={{height : 'unset'}} />
                                            </td>
                                            <td className="pt-3-half text-center"  style={{position : 'relative'}}><div className="draggablepencilbutton" draggable="true">_________</div></td>
                                        </tr>
                                        
                                        <tr id="journalrow2" onDrag={(event)=>this.dragging(event,'journalrow2')} onDragOver={(event)=>this.setDefaultDraggfging(event)} onKeyDown={(event)=>this._handleKeyDown(event,'2')}>
                                            <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>2</td>
                                            <td className="pt-3-half" >
                                                
                                                <select className="selectpicker form-control" onChange={()=>this.setAccountJournalEntry('2')} required data-live-search="true" id="accjournalcode2" name="accjournalcode2" >
                                                    <option value="">--Select--</option>
                                                    {coa_code_list}
                                                </select>    
                                            </td>
                                            <td className="pt-3-half" >
                                                
                                                <select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry('2')} required data-live-search="true" id="accjournbale2" name="accjournbale2" >
                                                    <option value="">--Select--</option>
                                                    {coa_name_list}
                                                </select>  
                                                <input type="hidden" id="journalcost_center_td_input2" name="journalcost_center_td_input2"/>  
                                            </td>
                                            <td className="pt-3-half" >
                                                <select onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription2', 'journalcost_center_td2','journalcost_center_td_input2')} id="journaldescription2" class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true">
                                                    <option value="">--Select--</option>
                                                    {cost_center_code_list}
                                                </select>
                                            </td>
                                            <td className="pt-3-half"  >
                                                <select onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td2', 'journaldescription2','journalcost_center_td_input2')} id="journalcost_center_td2" class="form-control  COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true">
                                                    <option value="">--Select--</option>
                                                    {cost_center_list_list}
                                                </select>
                                            </td>
                                            <td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journalcredit','2')} onInput={()=>this.swap2('journalcredit','2')} id="journaldebit2" name="journaldebit2" /></td>
                                            <td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit','2')} onInput={()=>this.swap2('journaldebit','2')}  id="journalcredit2" name="journalcredit2" /></td>
                                            
                                            <td className="pt-3-half"  >
                                                <input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id="journalnamename2" name="journalnamename2" />
                                                
                                                    <datalist id="customer_list_all">
                                                    <option value="">--Select Name--</option>
                                                    {customers_list}
                                                    <option value="--Add Customer/Supplier--"></option>
                                                    </datalist>
                                            </td>
                                            <td className="pt-3-half"  id="">
                                                <textarea id="journalcheque_no_td2" name="journalcheque_no_td2" style={{width : '100%',border : '0px solid white'}}></textarea>
                                            </td>
                                            <td className="pt-3-half"  >
                                                <textarea id="journalref_no_td2" name="journalref_no_td2" style={{width : '100%',border : '0px solid white'}}></textarea>
                                            </td>
                                            <td className="pt-3-half"  >
                                                <input type="date" id="date_deposited2" style={{height : 'unset'}} />
                                            </td>
                                            <td className="pt-3-half text-center"  style={{position : 'relative'}}><div className="draggablepencilbutton" draggable="true">_________</div></td>
                                        </tr>
                                        {this.state.rows.map((item, idx) => {
                                            rerenderselectpicker=1;
                                            var thirteenth ="";
                                            document.getElementById('destroydatatable').click();
                                            var table = document.getElementById("journalentrytable");

                                            var first =table.rows[0].cells[0].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>       : first;
                                            var second =table.rows[0].cells[1].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>      : second;
                                            var third =table.rows[0].cells[2].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>       : third;
                                            var fourth =table.rows[0].cells[3].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>      : fourth;
                                            var fifth =table.rows[0].cells[4].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>       : fifth;
                                            var sixth =table.rows[0].cells[5].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>       : sixth;
                                            var seventh =table.rows[0].cells[6].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>     : seventh;
                                            var eighth =table.rows[0].cells[7].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>      : eighth;
                                            var nineth =table.rows[0].cells[8].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>      : nineth;
                                            var thenth =table.rows[0].cells[9].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>      : thenth;
                                            var twelve =table.rows[0].cells[10].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td>     : twelve;
                                            if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="#"? <td className="pt-3-half"  style={{padding : '0px 0px 0px 2px'}}>{parseFloat(idx)+parseFloat(3)}</td> : thirteenth;
                                            }
                                                
                                                first =table.rows[0].cells[0].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_code_list}</select></td>)  : first;
                                                second =table.rows[0].cells[1].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_code_list}</select></td>) : second;
                                                third =table.rows[0].cells[2].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`}  name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_code_list}</select></td>)  : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`}  name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_code_list}</select></td>)  : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_code_list}</select></td>)  : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_code_list}</select></td>)  : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`}  name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_code_list}</select></td>)  : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_code_list}</select></td>)  : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_code_list}</select></td>)  : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_code_list}</select></td>)  : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_code_list}</select></td>) : twelve;
                                                if(""==""){
                                                    thirteenth =table.rows[0].cells[11].innerHTML=="ACCOUNT CODE"? (<td className="pt-3-half" ><select className="selectpicker form-control input-block-level" onChange={()=>this.setAccountJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} name={`accjournalcode${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_code_list}</select></td>) : thirteenth;
                                                }
                                                

                                                first =table.rows[0].cells[0].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} />  </td>)  : first;
                                                second =table.rows[0].cells[1].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : second;
                                                third =table.rows[0].cells[2].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`} name={`accjournbale${parseFloat(idx)+parseFloat(3)}`}><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="ACCOUNT DESCRIPTION"? (<td className="pt-3-half" ><select className="selectpicker form-control" onChange={()=>this.setAccountCodeJournalEntry(parseFloat(idx)+parseFloat(3))} required data-live-search="true" id={`accjournbale${parseFloat(idx)+parseFloat(3)}`}name={`accjournbale${parseFloat(idx)+parseFloat(3)}`} ><option value="">--Select--</option>{coa_name_list}</select><input type="hidden"  id={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td_input${parseFloat(idx)+parseFloat(3)}`} /></td>)  : thirteenth;
                                                }

                                                first =table.rows[0].cells[0].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half"  ><select  onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>)  : first;
                                                second =table.rows[0].cells[1].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half"  ><select onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )}  id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>)  : second;
                                                third =table.rows[0].cells[2].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half"  ><select  onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>)  : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half"  ><select onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )}  id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>)  : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half"  ><select  onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>)  : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half"  ><select  onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>)  : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="COST CENTER DESCRIPTION"?(<td className="pt-3-half"  ><select onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>)  : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half"  ><select onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>)  : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half"  ><select onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>)  : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half"  ><select onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>) : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half" ><select onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)) )} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>) : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="COST CENTER DESCRIPTION"? (<td className="pt-3-half" ><select onChange={()=>this.set_select_value_cost_center_desc_code('journalcost_center_td'+(parseFloat(idx)+parseFloat(3)), 'journaldescription'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcost_center_td${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_list_list}</select></td>) : thirteenth;
                                                }

                                                first =table.rows[0].cells[0].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : first;
                                                second =table.rows[0].cells[1].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01"autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : second;
                                                third =table.rows[0].cells[2].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" autoFocus onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="DEBIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journalcredit',parseFloat(idx)+parseFloat(3))} id={`journaldebit${parseFloat(idx)+parseFloat(3)}`} name={`journaldebit${parseFloat(idx)+parseFloat(3)}`} /></td>)  : thirteenth;
                                                }

                                                first =table.rows[0].cells[0].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : first;
                                                second =table.rows[0].cells[1].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : second;
                                                third =table.rows[0].cells[2].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="CREDIT"? (<td className="pt-3-half"  ><input type="number" step="0.01" onKeyUp={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))} onInput={()=>this.swap2('journaldebit',parseFloat(idx)+parseFloat(3))}  id={`journalcredit${parseFloat(idx)+parseFloat(3)}`} name={`journalcredit${parseFloat(idx)+parseFloat(3)}`} /></td>) : thirteenth;
                                                }
                                                
                                                first =table.rows[0].cells[0].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select   onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`}  name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : first;
                                                second =table.rows[0].cells[1].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select  onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : second;
                                                third =table.rows[0].cells[2].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select   onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`}  class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select  onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select   onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select   onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half"><select  onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select  onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select  onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select  onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="COST CENTER CODE"? (<td className="pt-3-half" ><select onChange={()=>this.set_select_value_cost_center_desc_code('journaldescription'+(parseFloat(idx)+parseFloat(3)), 'journalcost_center_td'+(parseFloat(idx)+parseFloat(3)),'journalcost_center_td_input'+(parseFloat(idx)+parseFloat(3)))} id={`journaldescription${parseFloat(idx)+parseFloat(3)}`} name={`journaldescription${parseFloat(idx)+parseFloat(3)}`} class="form-control COSTCENTER_LIST_JOURNALDESCRIPTION selectpicker" data-live-search="true"><option value="">--Select--</option>{cost_center_code_list}</select></td>)  : thirteenth;
                                                }
                                                
                                                first =table.rows[0].cells[0].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`}/></td>) : first;
                                                second =table.rows[0].cells[1].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : second;
                                                third =table.rows[0].cells[2].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="PAYEE"? (<td className="pt-3-half"  ><input type="text" className="w-100" list="customer_list_all" placeholder="Supplier/Customer" onKeyUp="addnewCustomerDatalist(this)" onChange="addnewCustomerDatalist(this)" id={`journalnamename${parseFloat(idx)+parseFloat(3)}`}  name={`journalnamename${parseFloat(idx)+parseFloat(3)}`} /></td>) : thirteenth;
                                                }


                                                first =table.rows[0].cells[0].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : first;
                                                second =table.rows[0].cells[1].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : second;
                                                third =table.rows[0].cells[2].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`}   name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`}   name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`}   name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`}  style={{width : '100%',border : '0px solid white'}}></textarea></td>) : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="CHEQUE NO"? (<td className="pt-3-half"  id=""><textarea id={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} name={`journalcheque_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : thirteenth;
                                                }

                                                first =table.rows[0].cells[0].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : first;
                                                second =table.rows[0].cells[1].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : second;
                                                third =table.rows[0].cells[2].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}style={{width : '100%',border : '0px solid white'}}></textarea></td>) : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}style={{width : '100%',border : '0px solid white'}}></textarea></td>) : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}style={{width : '100%',border : '0px solid white'}}></textarea></td>) : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}style={{width : '100%',border : '0px solid white'}}></textarea></td>) : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}style={{width : '100%',border : '0px solid white'}}></textarea></td>) : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}  name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`}style={{width : '100%',border : '0px solid white'}}></textarea></td>) : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="REFERENCE"? (<td className="pt-3-half"  ><textarea id={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} name={`journalref_no_td${parseFloat(idx)+parseFloat(3)}`} style={{width : '100%',border : '0px solid white'}}></textarea></td>) : thirteenth;
                                                }
                                                
                                                first =table.rows[0].cells[0].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`} name={`date_deposited${parseFloat(idx)+parseFloat(3)}`} style={{height : 'unset'}} /></td>) : first;
                                                second =table.rows[0].cells[1].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`} name={`date_deposited${parseFloat(idx)+parseFloat(3)}`} style={{height : 'unset'}} /></td>) : second;
                                                third =table.rows[0].cells[2].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`}  name={`date_deposited${parseFloat(idx)+parseFloat(3)}`}style={{height : 'unset'}} /></td>) : third;
                                                fourth =table.rows[0].cells[3].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`}  name={`date_deposited${parseFloat(idx)+parseFloat(3)}`}style={{height : 'unset'}} /></td>) : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`}  name={`date_deposited${parseFloat(idx)+parseFloat(3)}`}style={{height : 'unset'}} /></td>) : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`}  name={`date_deposited${parseFloat(idx)+parseFloat(3)}`}style={{height : 'unset'}} /></td>) : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`} name={`date_deposited${parseFloat(idx)+parseFloat(3)}`} style={{height : 'unset'}} /></td>) : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`}  name={`date_deposited${parseFloat(idx)+parseFloat(3)}`}style={{height : 'unset'}} /></td>) : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`} name={`date_deposited${parseFloat(idx)+parseFloat(3)}`} style={{height : 'unset'}} /></td>) : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`} name={`date_deposited${parseFloat(idx)+parseFloat(3)}`} style={{height : 'unset'}} /></td>) : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`} name={`date_deposited${parseFloat(idx)+parseFloat(3)}`} style={{height : 'unset'}} /></td>) : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML=="DATE DEPOSITED"? (<td className="pt-3-half"  ><input type="date" id={`date_deposited${parseFloat(idx)+parseFloat(3)}`} name={`date_deposited${parseFloat(idx)+parseFloat(3)}`} style={{height : 'unset'}} /></td>) : thirteenth;
                                                }

                                                first =table.rows[0].cells[0].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : first;
                                                second =table.rows[0].cells[1].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : second;
                                                third =table.rows[0].cells[2].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : third;
                                                fourth =table.rows[0].cells[3].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : fourth;
                                                fifth =table.rows[0].cells[4].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : fifth;
                                                sixth =table.rows[0].cells[5].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : sixth;
                                                seventh =table.rows[0].cells[6].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : seventh;
                                                eighth =table.rows[0].cells[7].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : eighth;
                                                nineth =table.rows[0].cells[8].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : nineth;
                                                thenth =table.rows[0].cells[9].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : thenth;
                                                twelve =table.rows[0].cells[10].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : twelve;
                                                if(""==""){
                                                thirteenth =table.rows[0].cells[11].innerHTML==""? (<td className="pt-3-half text-center"  style={{position : 'relative'}}>{parseFloat(idx)+parseFloat(1)==this.state.rows.length? <a  href="#" id={`DeleteJournalRow${parseFloat(idx)+parseFloat(3)}`} onClick={()=> this.handleRemoveRow()}><span className="fa fa-trash"></span></a> : ''}<div className="draggablepencilbutton" draggable="true">_________</div></td>) : thirteenth;
                                                }
                                                
                                            return [
                                            <tr onMouseMove={()=>this.refreshselecpickerselects()} key={parseFloat(idx)+parseFloat(3)} id={`journalrow${parseFloat(idx)+parseFloat(3)}`} onDrag={(event)=>this.dragging(event,'journalrow'+(parseFloat(idx)+parseFloat(3)))} onDragOver={(event)=>this.setDefaultDraggfging(event)} onKeyDown={(event)=>this._handleKeyDown(event,parseFloat(idx)+parseFloat(3))}>
                                                {first}
                                                {second}
                                                {third}
                                                {fourth}
                                                {fifth}
                                                {sixth}
                                                {seventh}
                                                {eighth}
                                                {nineth}
                                                {thenth}
                                                {twelve}
                                                {thirteenth}
                                            </tr>
                                            ]
                                            
                                        })}
                                        
                                        </tbody>
                                        <tfoot>
                                            <tr className="noBorder">
                                                <td style={{verticalAlign :'middle'}}></td>
                                                <td style={{verticalAlign :'middle'}}></td>
                                                <td style={{verticalAlign :'middle'}}></td>
                                                <td style={{verticalAlign :'middle'}}></td>
                                                <td style={{verticalAlign :'middle'}}></td>
                                                <td style={{verticalAlign :'middle' , fontWeight : 'bold' , fontSize : '13px'}} id="debit_total_hitn">0.00</td>
                                                <td style={{verticalAlign :'middle' , fontWeight : 'bold' , fontSize : '13px'}} id="credit_total_hitn">0.00</td>
                                                <td style={{verticalAlign :'middle'}}></td>
                                                <td style={{verticalAlign :'middle'}}></td>
                                                <td style={{verticalAlign :'middle'}}></td>
                                                <td style={{verticalAlign :'middle'}}></td>
                                                <td style={{verticalAlign :'middle'}}></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    </div>
                                    <div className="col-md-12 p-0 mt-1" >
                                        <div className="float-left">
                                            <div className="d-inline-flex">
                                                <button type="button" id="journalentryaddrow" className="btn btn-outline-dark rounded mr-1 font14" onClick={()=>this.AddTableRow()}>Add Items</button>
                                                <button type="button" id="journalentrydeleteallrow" className="btn btn-outline-dark rounded mr-1 font14" onClick={()=>this.DeleteAllRows()}>Clear All Items</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="col-md-12 p-0 mt-4">
                                        
                                        <div className="col-md-6 pl-0">
                                            <p>Memo</p>
                                            <textarea rows="3" className="w-100" id="JournalMemo"  name="JournalMemo" ></textarea>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" style={{display : 'none'}} id="setselectpickerbutton"></button>
                                <button type="button" style={{display : 'none'}} id="setselectpickerbuttonjournal_entry"></button>
                                <button type="button" style={{display : 'none'}} id="setselectpickerbuttonjournal_entry_code"></button>
                                

                                <button type="button" style={{display : 'none'}} id="hideeightcolumn"></button>
                                <button type="button" style={{display : 'none'}} id="showeightcolumn"></button>

                                <button type="button" style={{display : 'none'}} id="destroydatatable"></button>
                                <button type="button" style={{display : 'none'}} id="rerenderdatatable"></button>
                                <button type="button" id="canceljournalentry" className="btn btn-secondary rounded" data-dismiss="modal" onClick={()=>this.DeleteAllRows()}>Cancel</button>
                                <button className="btn btn-success rounded"  id="JournalEntrySaveButton" type="submit">Save</button>
                            </div>
                            
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default JEModal;

