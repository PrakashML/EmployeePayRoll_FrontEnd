
import axios from 'axios';

class EmployeeService{
    addEmployee(data){
        return axios.post("http://localhost:8080/payroll/employee/add",data)
    }

    getAllEmployees(){
        return axios.get("http://localhost:8080/payroll/employees")
    }

    getEmployee(id){
        return axios.get(`http://localhost:8080/payroll/employee/${id}`)
    }

    updateEmployee(id,data){
        return axios.put(`http://localhost:8080/payroll/employee/update/${id}`,data)
    }

    deleteEmployee(id){
        return axios.delete(`http://localhost:8080/payroll/employee/delete/${id}`)
    }
}

export default new EmployeeService();