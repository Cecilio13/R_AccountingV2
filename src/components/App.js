import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';

class App extends React.Component{
    constructor() {
        super();
        let data = sessionStorage.getItem('Accounting_App_Logged');
        if(data=="1"){
            console.log('Logged In');
            window.location.href="dashboard";
            
        }else{
            console.log('need to log in first from outside');
        }
    }
    state ={
        data: [],
        email : '',
        pass : '',
        style: '',
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
    check_credentials =async (event) =>{
        event.preventDefault();
        console.log(this.state.email+" "+this.state.pass);
        var bodyFormData = new FormData();
        bodyFormData.set('email', this.state.email);
        bodyFormData.set('pass', this.state.pass);
        const response = await axios.post('http://localhost/Accounting_modified/public/api/check_user',bodyFormData);
        if(response.data=="0"){
            
            console.log('incorrect credentials');
            this.setState({style : 'borderRED'});
            sessionStorage.setItem('Accounting_App_Logged', '0');
            sessionStorage.setItem('Accounting_App_email', '');
            sessionStorage.setItem('Accounting_App_name', '');
            sessionStorage.setItem('Accounting_App_position', '');
        }else{
            console.log('correct credentials');
            console.log(response.data);
            this.setState({style : ''});
            sessionStorage.setItem('Accounting_App_Logged', '1');
            sessionStorage.setItem('Accounting_App_email', this.state.email);
            sessionStorage.setItem('Accounting_App_name', response.data.name);
            sessionStorage.setItem('Accounting_App_position', response.data.position);
            window.location.href="dashboard";
        }
        // const response = await axios.get('http://localhost/Accounting_modified/public/api/students',{
        //     params:{
        //         query: ''
        //     },
        //     crossDomain: true
        // });
        //console.log(response.data);
        //this.setState({data : response.data});
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
                <div className="">
                
                    <div className="py-4">
                        <div className="container">
                                <div class="row justify-content-center">
                                    <div class="col-md-8">
                                        <div class="card">
                                            <div class="card-header">Login</div> 
                                            <div class="card-body">
                                                <form method="POST" onSubmit={this.check_credentials}>
                                                    <div class="form-group row"><label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label> 
                                                    <div class="col-md-6">
                                                        <input id="email" className={`form-control ${this.state.style}`} type="email" name="email" value={this.state.email} onChange={(event)=>this.setState({email : event.target.value})} required="required" autofocus="autofocus"/>
                                                    </div>
                                                    </div> 
                                                    <div class="form-group row">
                                                        <label for="password" class="col-md-4 col-form-label text-md-right">Password</label> 
                                                        <div class="col-md-6">
                                                            <input id="password" type="password" name="password" value={this.state.pass} onChange={(event)=>this.setState({pass : event.target.value})} required="required"  className={`form-control ${this.state.style}`} />
                                                        </div>
                                                    </div> 
                                                    
                                                <div class="form-group row mb-0">
                                                    <div class="col-md-8 offset-md-4">
                                                        <button type="submit" class="btn btn-primary">Login</button> 
                                                        
                                                    </div>
                                                </div>
                                                </form>
                                            </div>
                                            </div>
                                    </div>
                                </div>
                            {/* <button className="btn btn-light" onClick={()=>(sessionStorage.setItem('Logged', ''))}>Log in</button> */}
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default App;