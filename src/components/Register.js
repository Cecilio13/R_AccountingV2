import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/index.css';
import Modal from './inc/modal.js';
import Nav from './inc/nav.js';
import Side from './inc/side.js';
import { Link } from 'react-router-dom';

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
        name : '',
        position : '',
        email : '',
        pass : '',
        confirmpass : '',
        emailstyle: '',
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
    submit_register= async (event) =>{
        event.preventDefault();
        const response = await axios.get('http://localhost/Accounting_modified/public/api/checkemail',{
            params:{
                email: this.state.email,
            },
            crossDomain: true
        });
        if(response.data=="1"){
            this.setState({emailstyle : ''});
            if(this.state.pass==this.state.confirmpass){
                const bodyFormData = new FormData();
                    bodyFormData.append("name", this.state.name);
                    bodyFormData.append("position", this.state.position);
                    bodyFormData.append("email", this.state.email);
                    bodyFormData.append("password", this.state.pass);
                const response = await axios.post('http://localhost/Accounting_modified/public/api/register_user',bodyFormData);
            }else{
                alert('The password confirmation does not match');
                this.setState({style : 'borderRED'}); 
            }

        }else{
            alert('The email has already been taken.');
            this.setState({emailstyle : 'borderRED'});
        }
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
                <nav class="navbar navbar-expand-md navbar-light bg-light mb-0"><div class="container">
                    <Link style={{fontSize : '22px !important'}} to="." class="navbar-brand">
                    AccountingSystem
                    </Link> 
                <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button> 
                <div id="navbarSupportedContent" class="collapse navbar-collapse">
                    <ul class="navbar-nav mr-auto"></ul>
                     <ul class="navbar-nav ml-auto">
                        <li class="nav-item"><Link to="." class="nav-link">Login</Link></li>
                        <li class="nav-item"><Link to="register" class="nav-link">Register</Link></li>
                    </ul>
                </div>
                </div>
                </nav>
                    <div className="py-4">
                        <div className="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-header">Register</div>

                                    <div class="card-body">
                                        <form method="POST" onSubmit={this.submit_register}>
                                            
                                            <div class="form-group row">
                                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                                                <div class="col-md-6">
                                                    <input id="name" type="text" class="form-control" value={this.state.name} onChange={(event)=>this.setState({name : event.target.value})} name="name" required autofocus />

                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="name" class="col-md-4 col-form-label text-md-right">Position</label>
                                                <div class="col-md-6">
                                                    <input id="name" type="text" list="Position_lIst" value={this.state.position} onChange={(event)=>this.setState({position : event.target.value})} class="form-control" name="position"  />
                                                    <datalist id="Position_lIst">
                                                    <option value="Sales">Position</option>
                                                    <option value="Expenses">Position</option>
                                                    <option value="A\P Local">Position</option>
                                                    <option value="A\P Others">Position</option>
                                                    <option value="A\R Sales Invoice">Position</option>
                                                    <option value="A\R Collection">Position</option>
                                                    <option value="Intermediate">Position</option>
                                                    <option value="Executive">Position</option>
                                                    </datalist>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                                                <div class="col-md-6">
                                                    <input id="email" type="email" class={`form-control ${this.state.emailstyle}`} name="email" value={this.state.email} onChange={(event)=>this.setState({email : event.target.value})}  required />

                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                                <div class="col-md-6">
                                                    <input id="password" type="password" class={`form-control ${this.state.style}`} value={this.state.pass} onChange={(event)=>this.setState({pass : event.target.value})}  name="password" required />

                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                                <div class="col-md-6">
                                                    <input id="password-confirm" type="password" class="form-control" value={this.state.confirmpass} onChange={(event)=>this.setState({confirmpass : event.target.value})}  name="password_confirmation" required />
                                                </div>
                                            </div>
                                            <div class="form-group row mb-0">
                                                <div class="col-md-6 offset-md-4">
                                                    <button type="submit" class="btn btn-primary">
                                                        Register
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default App;