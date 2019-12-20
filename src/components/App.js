import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/index.css';

class App extends React.Component{
    state ={data: []}
    
    ooiienm= async (props) =>{
        const response = await axios.get('http://localhost/HR/public/students',{
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
                <h1>Accounting V2</h1>
            </div>
        );
    }
}

export default App;