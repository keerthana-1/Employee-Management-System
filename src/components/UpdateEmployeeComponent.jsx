import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { params } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class UpdateEmployeeComponent extends Component {

    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id,
            firstName:"",
            lastName:"",
            emailId:""
        };

        this.onFirstNameChange=this.onFirstNameChange.bind(this);
        this.onLastNameChange=this.onLastNameChange.bind(this);
        this.onEmailIdChange=this.onEmailIdChange.bind(this);
        this.updateEmployee=this.updateEmployee.bind(this);
        this.cancelEmployee=this.cancelEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res)=>
        {let employee=res.data;
            this.setState({firstName:employee.firstName,lastName:employee.lastName,emailId:employee.emailId});

         });
    }

    onFirstNameChange = (event) => {
        this.setState({firstName:event.target.value});
    }

    onLastNameChange =(event) =>{
        this.setState({lastName:event.target.value});
    }

    onEmailIdChange =(event)=>{
        this.setState({emailId:event.target.value});
    }

    updateEmployee=(e)=>{
        e.preventDefault();
        let employee={firstName:this.state.firstName,lastName:this.state.lastName,emailId:this.state.emailId};
        console.log(JSON.stringify(employee));

        EmployeeService.updateEmployee(this.state.id,employee).then((res)=>{
            this.props.history.push('/employees');
        });
       
    }

    cancelEmployee(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <h1>Update Employee Form</h1>

                <form>
                    <label>FirstName:</label>
                    <input placeholder="FirstName" className="form-control" name="firstName"
                      value={this.state.firstName} onChange={this.onFirstNameChange}></input>
                      <br></br><br></br>

                      <label>LastName:</label>
                    <input placeholder="LastName" className="form-control" name="lastName"
                      value={this.state.lastName} onChange={this.onLastNameChange}></input>
                      <br></br><br></br>

                      <label>EmailId:</label>
                    <input placeholder="Email" className="form-control" name="emailId"
                      value={this.state.emailId} onChange={this.onEmailIdChange}></input>
                      <br></br><br></br>

                      <button className="btn btn-primary" onClick={this.updateEmployee}>Update</button>
                      <button className="btn btn-danger" onClick={this.cancelEmployee}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default withRouter(UpdateEmployeeComponent);