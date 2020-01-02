import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';

class Sales extends React.Component{
    state ={data: []}
    
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
                        <div class="breadcrumbs">
                            <div class="page-header float-left">
                                <div class="page-title">
                                    <h1>Sales</h1>
                                </div>
                            </div>
                        </div>
                        <button id="SampleButton" data-toggle="modal" data-target="#exampleModal" className="btn btn-primary">Sample Button</button>
                    </div>
                    <Modal />
                </div>
                
            </div>
        );
    }
}

export default Sales;