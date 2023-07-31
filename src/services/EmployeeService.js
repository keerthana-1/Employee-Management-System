import axios from 'axios';

const BASE_URL="http://localhost:8080/api/v1/employees";

class EmployeeService{

    getEmployees(){

        return axios.get(BASE_URL);

    }

    createEmployee(employee){

        return axios.post(BASE_URL,employee);

    }
    
    getEmployeeById(id){

        return axios.get(BASE_URL+'/'+id);

    }

    updateEmployee(employeeid,employee){
        return axios.put(BASE_URL+'/'+employeeid,employee);
    }

    deleteEmployee(employeeid){
        return axios.delete(BASE_URL+'/'+employeeid);
    }
}

const empObj=new EmployeeService();
export default empObj;