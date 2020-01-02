import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../css/index.css';

class Nav extends React.Component{
    state ={data: []}
   


    render(){

        // const data=this.state.data.map((dat) =>{
        //     return <div key={dat.id}>{dat.id+" "+dat.name+" "+dat.position}</div>
        // });
        return (
            <div>
                <div className="header-menu">
                
                <div className="col-sm-7">
                    <div className="header-left">
                        <button style={{display : 'none'}} className="search-trigger"><i className="fa fa-search"></i></button>
                        <div className="form-inline">
                            <form className="search-form">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search ..." aria-label="Search" />
                                <button className="search-close" type="submit"><i className="fa fa-close"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5">
                    <div className="user-area dropdown float-right">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="user-avatar rounded-circle" src="images/customers.png" alt="User Avatar" />
                        </a>
                        <div className="user-menu dropdown-menu">
                            <a className="nav-link" href="#"><i className="far fa-user"></i> Username</a>
                            <a className="nav-link" href="#" ><i className="fa fa-power-off"></i> Sign Out</a>
                            <form id="logout-form" action="" method="POST" style={{display : 'none'}}>
                                
                            </form>
                        </div>
                        <div className="modal fade float-right" id="staticModal" tabIndex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="false">
                            <div className="modal-dialog modal-sm float-right w-100" style={{marginTop : '75px'}} role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticModalLabel">Feedback</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <textarea className="rounded w-100" rows="6" placeholder="Share your feedback or report a bug">
                                        </textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-info rounded">Send</button>
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

export default Nav;