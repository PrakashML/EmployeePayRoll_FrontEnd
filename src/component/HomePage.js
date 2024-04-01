import Header from './Header';
import './HomePage.css'
import { IoIosSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Display from './/Display?'
import EmployeeService from '../service/EmployeeService';

function HomePage() {
  const [searchExpand, setSearchExpand] = useState(false);
  const [AllEmployeeArray, setAllEmployeeArray] = useState([]);
  useEffect(() => {
    getAllEmployee();
  }, []); 

  const openSearch = () => {
    setSearchExpand(true);
  };

  const getAllEmployee = () => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        setAllEmployeeArray(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        alert("Something went wrong while getting all the records", err);
      });
  };

  const search = (event) => {
    let search = event.target.value;
    let empArray = AllEmployeeArray;
    if (search.trim().length > 0)
      empArray = empArray.filter(element =>
        element.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    setAllEmployeeArray(empArray);
  };


  return (
    <div className='container'>

        <Header />

        <div style={{
          display:"flex",
        }}>
          
        <div className='employeedetails'>Employee Details</div>
        
        <div className="search-box" onClick={openSearch}>
              <input
                className={"input1 " + (searchExpand && "input1-expand")}
                onChange={search}
                type="text"
                placeholder=""
              />
              <img className="search-icon" src={<IoIosSearch/>} alt="" />
        </div>

        <Link to={"/form"}>
        <button className='addb'><AiOutlinePlus />Add User</button>
        </Link>
        </div>

        <div className="table-main">
             <Display employeeArray={AllEmployeeArray} getAllEmployees={getAllEmployee} />
        </div>
        
     </div>
    
  )
}

export default HomePage








