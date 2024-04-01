import React from "react";
import "./Display.css";
// import { TiUserDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
// import { FaUserEdit } from "react-icons/fa";
import EmployeeService from "../service/EmployeeService";
import DeleteIcon from "./images/delete-icon.png";
import EditIcon from "./images/edit-icon.png";


const Display = (props) => {
  const navigate = useNavigate();
 
  const update = (id) => {
        navigate(`update/${id}`);
  };

  const remove = (id) => {
    console.log(id);
    var answer = window.confirm("Data once deleted cannot be restored!! Do you wish to continue ?");
        if(answer === true){
            EmployeeService.deleteEmployee(id).then((data) => {
              alert("Data deleted successfully!!",data);
              window.location.reload();
              props.getAllEmployees();       
            })
      .catch((error) => {
        alert("Something Went Wrong!", error);
      });
    }else{
      alert("Data Not Deleted")
    }
  };
   
    return (
      <>
      <table id="display" className="display">
        <tbody>
              
          <tr id="columns"> 
            <th>Profile Image</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Departments</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
          {
              props.employeeArray &&
                props.employeeArray.map((employees,index) => (
                  <tr key={`${index}`}>
                    <td><img className="profile" 
                      src={
                        employees.profileImage 
                      }
                      alt=""
                      />
                    </td>
                   
                    <td>{employees.name}</td>
                    <td className="gender">{employees.gender}</td>
                    <td>
                      {employees.departments &&
                        employees.departments.map((dept) => (
                          <div>{dept}</div>
                        ))}
                    </td>
                    <td> ₹{employees.salary}</td>
                    <td>{employees.startDate}</td>
                    <td>{employees.notes}</td>
                    <td>
                      <img onClick={() => remove(employees.id)}
                      src={DeleteIcon}
                      alt="delete" className="deleteimg"/>


                    <img onClick={() => update(employees.id)}
                      src={EditIcon}
                      alt="edit" className="editimg"/>
                    </td>
                  </tr>
                ))
            }
          </tbody>
      </table>
      </>
    );
  };
  export default (Display); 



