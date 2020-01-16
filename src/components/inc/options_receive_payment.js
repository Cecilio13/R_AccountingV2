import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../css/index.css';
import {number_format} from '../../Helper';

class RE extends React.Component{
    state ={data: [],cost_center_llql: '',CostCenterTypeCode: '',costcentercategory:'',CostCenterCategory: '',costcentercategoryEdit:'',CostCenterCategoryEdit: '',CostCenterHiddenNoEdit :''}
    
    render(){
        
        const list=this.props.STInvoice.map((stinvoice,inn)=>{
            if(stinvoice.st_i_no==this.props.dat.st_no && stinvoice.st_p_invoice_type==this.props.dat.st_invoice_type  && stinvoice.st_p_location==this.props.dat.st_location){
                if(stinvoice.st_i_total>stinvoice.st_p_amount){
                    var label="";
                    if(stinvoice.st_i_desc!="" && stinvoice.st_i_desc!=null){
                        label=stinvoice.st_i_desc;
                    }else if(stinvoice.st_p_cost_center!="" && stinvoice.st_p_cost_center!=null){
                        label=stinvoice.cc_name;
                    }else if(stinvoice.st_i_product!="" && stinvoice.st_i_product!=null){
                        label=stinvoice.product_name;
                    }
                    return [
                        <a onClick={this.props.onClick} data-invoice_item_no={stinvoice.st_i_item_no} data-invoice_location={stinvoice.st_p_location} data-invoice_type={stinvoice.st_p_invoice_type} data-st_no={stinvoice.st_i_no} className="dropdown-item receive_payment" data-st_customer_id={this.props.dat.st_customer_id} data-st_invoice_job_order={this.props.dat.st_invoice_job_order} data-st_invoice_work_no={this.props.dat.st_invoice_work_no}  data-toggle="modal" data-target="#salesreceiptmodal" style={{cursor : 'pointer'}}>{label}</a>
                    ]
                    
                }else{
                    var label="";
                    if(stinvoice.st_i_desc!="" && stinvoice.st_i_desc!=null){
                        label=stinvoice.st_i_desc;
                    }else if(stinvoice.st_p_cost_center!="" && stinvoice.st_p_cost_center!=null){
                        label=stinvoice.cc_name;
                    }else if(stinvoice.st_i_product!="" && stinvoice.st_i_product!=null){
                        label=stinvoice.product_name;
                    }
                    return [
                        <a className="dropdown-item disabled" style={{cursor : 'not-allowed'}}>{label+"(Paid)"}</a>
                    ]
                    
                }
            }
            
        })
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default RE;

