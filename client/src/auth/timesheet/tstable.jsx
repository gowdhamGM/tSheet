import React, { useEffect, useState,Fragment} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import TableNavbar from '../__navbar'
import {Link} from 'react-router-dom';  
import Example from './addTs'
import AddTest from './addTest'
import { useHistory,  useRouteMatch } from "react-router-dom";
import TimeSheetTable from './timeSheetTable'


const TSTable = () => {


  let history = useHistory();
  let hasToken = JSON.parse(localStorage.getItem('auth'));
  if (hasToken === null || hasToken === undefined ) {
      history.push('/login'); 
  }else{
      console.log("has data")
      var name = hasToken.name;
      var role = hasToken.role;
      var empId = hasToken.empId;
  }
  const logout = () => {       
      localStorage.removeItem('auth');
      history.push('/login'); 
  }

  
  const [data, setData] = useState([]); 
  useEffect(() => {
    loadData();
   
  }, []);
  
  console.log("employeeName",name)
  console.log("employeeId",empId)


  const loadData = async() => {
    axios.get(`http://localhost:5000/api/timesheetgetdata/${empId}`)
    
      .then(response => {setData(response.data.map(d => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                return{
            select: false,
            id: d._id,
            date:d.date,
            employeeId:d.employeeId,
            employeeName:d.employeeName,
            clientName : d.clientName,
            projectName: d.projectName,
            taskName: d.taskName, 
            workDone:d.workDone,           
            status:d.status,
            durationHrs:d.durationHrs,
            durationMins:d.durationMins,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
        }));
        
      
      }).catch(function (error) {
          console.log(error);
      })
   
  }; 
  console.log("data" ,loadData.employeeName)

  var styles = {
    color:"blue",
  }

  
  const delData = (e) => {
    console.log(e.clientname)
    var option = window.confirm(`Are you sure to delete ${e.clientname}`)
    if(option){
      console.log(e.id)
      axios.delete(`http://localhost:5000/api/clientdeldata/${e.id}`).then(res => {
        window.location.reload(false);
      })
   }
  }

  
    
  return (
    <>
        <div className="Container">
          <div className="col-lg-12">
            <div className="row justify-content-md-center">
              <div className="col-lg-6">
              <br></br>
                <br></br>
                <h3>TIMESHEET</h3>
              </div>
            <div className="col-lg-6">
            <br></br>
            <p className="text-right"><button type="button" class="btn btn-primary" onClick={logout}>Logout</button></p>
              
              <p className="text-right" >Home     .    .</p>
              <br></br>
            <br></br>
            

            </div>
            </div>
            
          
          </div>
        <div className="col-lg-12">      
          <h5 style={styles}><b>Manage Timesheet</b></h5>
        </div>
        <div className="col-lg-12">        
        <div className="card">
        <div className="card-body">  

        <div className="row">
          <div className="col-md-2">
            <p>Name</p>
          </div>
          <div className="col-md-4">
            <p>{name}</p>
          </div> 
          <div className="col-md-2">
            <p>IotRight:</p>
          </div>
          <div className="col-md-2">
            <p>20Hrs</p>
          </div>
          <div>
            <p>10Mins</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <p>Month</p>
          </div>
          <div className="col-md-4">
            <p>September</p>
          </div> 
        </div>

        <div className="row">
          <div className="col-md-2">
            <p>Duration Worked</p>
          </div>
          <div className="col-md-4">
            <p>61Hrs:0Mins</p>
          </div> 
        </div>
        <div className="row">
          <div className="col-md-2">
            <p>Working Days</p>
          </div>
          <div className="col-md-4">
            <p>6</p>
          </div> 
        </div>
        <div className="row">
          <div className="col-md-2">
            <p>Leave Days</p>
          </div>
          <div className="col-md-4">
            <p>0</p>
          </div> 
          </div>
          <div className="row">
          <div className="col-md-2">
            <p>Select a Month</p>
          </div>
          <div className="col-md-4">
          <button type="button" class="btn btn-outline-primary">September</button>
          <bk>  </bk>
          <Fragment>
           <AddTest empId={empId} empName={name}/>  
          </Fragment>
              

          </div> 
        </div>
        </div>
        </div>
        </div>
               <br></br> 
               <br></br> 
               <br></br> 

        <div className="bottomContainer">
          <Fragment>
          <TimeSheetTable empId={empId}/>
          </Fragment>
  
        </div>
      </div>       
    </>
  );
}

export default TSTable;