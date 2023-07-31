import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { withRouter } from 'react-router-dom';

class ListEmployeeComponent extends Component {

   constructor(props){
    super(props);
    this.state={
        employees:[]
    }
    this.addEmployee=this.addEmployee.bind(this);
    this.UpdateEmployee=this.UpdateEmployee.bind(this);
    this.DeleteEmployee=this.DeleteEmployee.bind(this);
   }

   componentDidMount(){
    EmployeeService.getEmployees().then((res)=>{

        this.setState({employees:res.data});
    });

   }

   UpdateEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
   }

   DeleteEmployee(id){
        EmployeeService.deleteEmployee(id).then((res)=>
        {
            this.setState({employees:this.state.employees.filter(employee => employee.id !== id)})
        });
   }

   addEmployee(){

    const { history } = this.props;
    if(history) history.push('/add-employee/-1');
    // console.log(this.props);
    // this.props.history.push('/add-employee');
   }

    render() {
        return (
            
            <div>
                <h1 style={{textAlign:"center"}}>Employee Management System</h1><br></br>
                <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                <hr></hr>
                <table className="table table-striped table-bordered">
			<thead className="table-dark">
				<tr>
					<th>Firstname</th>
					<th>Lastname</th>
					<th>Email</th>
					<th>Action</th>
				</tr>

			</thead>
            <tbody>
                {
                    this.state.employees.map(
                        employee=>
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.emailId}</td>

                            <button className="btn btn-info" onClick={()=>this.UpdateEmployee(employee.id)}>Update</button>
                            <button style={{marginLeft:"10px"}} className="btn btn-danger" onClick={()=>this.DeleteEmployee(employee.id)}>Delete</button>
                     
                        </tr>
                    )
                }
            </tbody>
            </table>
            </div>
        );
    }
}

export default withRouter(ListEmployeeComponent);