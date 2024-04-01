import React, { useEffect, useState } from 'react';
import './Form.css';
import blackmale from './images/black-male-image.png';
import blackfemale from './images/test1.png';
import whitemale from './images/white-male-image.png';
import whitefemale from './images/white-female-image.png';
import Header from "./Header";
import EmployeeService from '../service/EmployeeService';
import { Link, useParams } from 'react-router-dom';


function EmployeePayrollForm() {

  let initialValue = {
    name: '',
    allDepartment: [
      'HR', 'Sales', 'Finance', 'Engineer', 'Others'
    ],
    profileImage: '',
    gender: '',
    departments: [],
    salary: '',
    day: '',
    month: '',
    year: '',
    startDate: '',
    notes: '',
    id: '',
    isUpdate: false,
  }

  const [formValue, setForm] = useState(initialValue);
  const params = useParams();

  useEffect(() => {
    if (params.id){
      getDataById(params.id);
    }
  }, [params.id])


  const getDataById = (id) => {
    EmployeeService
      .getEmployee(id)
      .then((response) => {
        console.log(response);
        let obj = response.data;
        setData(obj);
      })
      .catch((err) => {
        alert("err is ", err);
      });
  };

  const setData = (obj) => {
    let array=obj.startDate;
    console.log(array);
    console.log()
    setForm({
       ...formValue,
       ...obj,
       id: obj.emp_id,
       name: obj.name,
       departments: obj.departments,
       isUpdate: true,
       day:array[0]+array[1],
       month:array[3]+array[4]+array[5],
       year:array[7]+array[8]+array[9]+array[10],
       notes: obj.notes,
     });
   };

  //  const changeValue = (event) => {
  //   setForm({ ...formValue, [event.target.name]: event.target.value })
  //  }

const onCheckChange = (name) => {
    let index = formValue.departments.indexOf(name);

    let checkArray = [...formValue.departments]
    if (index > -1)
        checkArray.splice(index, 1)
    else
        checkArray.push(name);
    setForm({ ...formValue, departments: checkArray });
}

const getChecked = (name) => {
    return formValue.departments && formValue.departments.includes(name);
}

const save = async (event) => {
  event.preventDefault();
  
  let object = {
      name: formValue.name,
      profileImage: formValue.profileImage,
      gender: formValue.gender,
      departments: formValue.departments,
      salary: formValue.salary,
      startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
      notes: formValue.notes,
    };

    console.log(object)

    if (formValue.isUpdate) {
      var answer =  window.confirm("Data once modified cannot be restored!! Do you wish to continue?");
      if(answer === true){
          EmployeeService
          .updateEmployee(params.id,object)
          .then((data) => {
                alert("Data updated successfully!", data);
          })
          .catch((error) => {
              alert("WARNING!! Error updating the data!",error);
          });
          }else{
              window.location.reload();
          }
      } else {
        EmployeeService.addEmployee(object).then((response) => {
          console.log(response);
          alert("Data Added successfully!!",response)
        })
        .catch(error => {
          console.log(error);
          alert("WARNING!! Error while adding the data!");
        });
  }
    
}

const reset = () => {
  setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
}

  

  


  return (
    
    <div className='container'>
    <div>
      <Header />
    </div>
    
    <div className="formcontainer">
    <h4 className='emph'>Employee Payroll Form</h4>
    <form onSubmit={save}>
      <label className="name">
        Name:
        <input
          className='nameinput'
          type="text"
          name="name"
          value={formValue.name}
          placeholder='Your name...'
          onChange={(e) => setForm({...formValue, name: e.target.value})} //(e) => setName(e.target.value)
          required
        />
      </label>
      <div className='profileimg'>
        Profile Image:
        <label className='imgoption'>
          <input
            type="radio"
            name='profileImage'
            value="./images/black-male-image.png"
            checked={formValue.profileImage === "./images/black-male-image.png"}
            onChange={(e) => setForm({...formValue, profileImage: e.target.value})} //(e) => setProfileImage(e.target.value)
          />
          <img src={blackmale} alt="Black Male" className='pic'/>
        </label>
        <label>
          <input
            type="radio"
            name='profileImage'
            value="./images/white-male-image.png"
            checked={formValue.profileImage === './images/white-male-image.png'}
            onChange={(e) => setForm({...formValue, profileImage: e.target.value})}//(e) => setProfileImage(e.target.value)
          />

          {/* https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png */}

          <img src={whitemale} alt="White Male" className='pic'/>
        </label>
        <label>
          <input
            type="radio"
            name='profileImage'
            value="./images/white-female-image.png"
            checked={formValue.profileImage === './images/white-female-image.png'}
            // (e) => setProfileImage(e.target.value)
            onChange={(e) => setForm({...formValue, profileImage: e.target.value})}
          />
          {/* https://static.vecteezy.com/system/resources/previews/002/002/297/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg */}
          <img src={whitefemale} alt="White Female" className='pic' />
        </label>
        <label>
          <input
            type="radio"
            name='profileImage'
            value="./images/test1.png"
            checked={formValue.profileImage === './images/test1.png'}
            onChange={(e) => setForm({...formValue, profileImage: e.target.value})} //(e) => setProfileImage(e.target.value)
          />
          {/* https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg */}
          <img src={blackfemale} alt="Black Female" className='pic'/>
        </label>
      </div>
      <div className='gender'>
        Gender:
        <label className='genderoption'>
          <input
            type="radio"
            value="male"
            name='gender'
            checked={formValue.gender === 'male'}
            onChange={(e) => setForm({...formValue, gender: e.target.value})}//(e) => setGender(e.target.value)
            required
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            name='gender'
            checked={formValue.gender === 'female'}
            onChange={(e) => setForm({...formValue, gender: e.target.value})}//(e) => setGender(e.target.value)
            required
          />
          Female
        </label>
      </div>
      

      <div className="dept">
          <label className="deptoption" htmlFor="departments">Department</label>
              {formValue.allDepartment.map((item, index) => (
                  <span key={`${item}_${index}`}>
                      <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                          checked={getChecked(item)} value={item} />
                      <label className="text" htmlFor={item}>{item}</label>
                  </span>
              ))}

          {/* <error className="error">{formValue.error.department}</error> */}
        </div>


      <div className='salary'>
        Salary:
        {/* (e) => setSalary(e.target.value) */}
        <select className='salaryoption' name='salary' value={formValue.salary} onChange={(e) => setForm({...formValue, salary: e.target.value})} required>
          <option value="">Select Salary</option>
          <option value="1 lakh">1 Lakh</option>
          <option value="2 lakh">2 Lakh</option>
          <option value="3 lakh">3 Lakh</option>
          <option value="4 lakh">4 Lakh</option>
          <option value="5 lakh">5 Lakh</option>
        </select>
      </div>

      <div className='startdate'>
        Start Date:
        <select
          id="day"
          name='day'
          className='startdatemenu'
          value={formValue.day}
          onChange={(e) => setForm({...formValue, day: e.target.value})}// (e) => setStartDate({ ...startDate, day: e.target.value })
          required
        >
          <option value="">Day</option>
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
        <select
          id='month'
          name='month'
          className='month'
          value={formValue.month}
          onChange={(e) => setForm({...formValue, month: e.target.value})}// (e) => setStartDate({ ...startDate, month: e.target.value })
          required
        >
          <option value="">Month</option>
          <option value="Jan">January</option>
          <option value="Feb">Febuary</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
          <option value="May">May</option>
          <option value="Jun">June</option>
          <option value="Jul">July</option>
          <option value="Aug">August</option>
          <option value="Sep">September</option>
          <option value="Oct">October</option>
          <option value="Nov">November</option>
          <option value="Dec">December</option>
        </select>
        <select
          id='year'
          name='year'
          className='year'
          value={formValue.year}
          onChange={(e) => setForm({...formValue, year: e.target.value})}
           
          required
        >
          <option value="">Year</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
        </select>

      </div> 
      <div className='notes'>
        <span className='noteslabel'>Notes:</span>
        {/* (e) => setNotes(e.target.value) */}
        <textarea name="notes" value={formValue.notes} className='notetext' onChange={(e) => setForm({...formValue, notes: e.target.value})} />
      </div>
      <div>
        <Link to="/">
        <button type="cancel" className='cancel'>Cancel</button>
        </Link>
        <button type="submit" className='submit'>{formValue.isUpdate ? 'Update' : 'Submit'}</button>
        <button type="button" className='reset' onClick={reset}>Reset</button>
      </div>
    </form>
    </div>
    </div>
    
  );
}

export default EmployeePayrollForm;