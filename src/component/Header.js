import React from 'react'
import './Header.css'
import { TbUserDollar } from "react-icons/tb";

const Header = () => {
  return (
    <header>
        <div className="navbar">
          <div style={{
            paddingLeft:"200px",
            display:"flex"
          }}>
            <span><TbUserDollar className='App-logo'/></span>
            <div>
            <span className="emp">EMPLOYEE</span><br/>
            <span className="payroll">PAYROLL</span>
            </div>
          </div> 
        </div>
    </header>
  )
}

export default Header

