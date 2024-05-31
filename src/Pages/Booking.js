import React, { useEffect, useState } from 'react'
import "./Booking.css"
//import DrMichealJohnson from "../Images/Dr. Michael Johnson.png"
import { Link } from 'react-router-dom'
import { getAllDoc } from '../Services/allAPIs'

function Booking() {

    const [doctorsDetails,setDoctorsDetails] = useState([])
    const [selectedDepartment,setSelectedDepartment] = useState('')

    const allDoctors = async() => {
        const doctors = await getAllDoc()
        console.log(doctors);
        setDoctorsDetails(doctors)
    }

    console.log(doctorsDetails);

    useEffect(()=>{
        allDoctors()
    },[])

    const handleDepartment = (department) => {
        setSelectedDepartment(department)
    }

    const filterDoctors = selectedDepartment ? doctorsDetails.filter((doctor)=>doctor.department === selectedDepartment) : doctorsDetails

  return (
    <div className='container'>
        <div className='row bookings mt-5 mb-5'>

            {/* Dropdown for mobile view */}
            <div className="col-8 d-lg-none">
                <div className="dropdown ms-3">
                    <button className="btn btn-light dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Department
                    </button>
                    <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                        <li><button className="dropdown-item" onClick={() => handleDepartment('')}>All Department</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDepartment('Cardiology')}>Cardiology</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDepartment('ENT')}>ENT</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDepartment('Nephrology')}>Nephrology</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDepartment('Neurology')}>Neurology</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDepartment('Orthopedics')}>Orthopedics</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDepartment('Ophthalmology')}>Ophthalmology</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDepartment('Pediatrics')}>Pediatrics</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDepartment('Urology')}>Urology</button></li>
                    </ul>
                </div>
            </div>

            <div className='col-lg-9 col-12'>
                <div className='row'>
                    <div className='col-lg-1 col-1'></div>
                    <div className='col-lg-10 col-10 d-flex'>
                        <div className='row'>
                        {filterDoctors.map((doctor,index)=>(
                        <div className='col-lg-5 col-12 mt-3 me-4 DocCard' key={index}>
                            <div class="d-flex align-items-center justify-content-center">
                                <img src={`http://localhost:8000/media/${doctor.img}`} class="Doc1 mt-3" alt="Dr. Michael Johnson"/>
                            </div> 
                            <div class="d-flex flex-column align-items-center mt-3">
                                <h6 class="card-title text-center">{doctor.name}</h6>
                                <p class="card-text text-center rounded-pill mt-2" style={{width:"100px",backgroundColor:"#E1E1E1"}}>{doctor.department}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-center mt-2 mb-2">
                                <Link to={`/View/${doctor.id}`}>
                                    <button className='btn btn-primary'>Book Now</button>
                                </Link>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                    <div className='col-lg-1 col-1'></div>   
                </div>
            </div>
           
            <div className='col-lg-3 col-3 border-start'>
                <div className='ms-5 d-none d-lg-block'>
                    <h5 className='mt-5 mb-5'>
                        <strong>Select Department</strong>
                    </h5>
                    <p type="button" onClick={() => handleDepartment('')}>
                        <strong>All Department</strong>
                    </p>
                    <p type="button" onClick={() => handleDepartment('Cardiology')}>
                        <strong>Cardiology</strong>
                    </p>
                    <p type="button" onClick={() => handleDepartment('ENT')}>
                        <strong>ENT</strong>
                    </p>
                    <p type="button" onClick={() => handleDepartment('Nephrology')}>
                        <strong>Nephrology</strong>
                    </p>
                    <p type="button" onClick={() => handleDepartment('Neurology')}>
                        <strong>Neurology</strong>
                    </p>
                    <p type="button" onClick={() => handleDepartment('Orthopedics')}>
                        <strong>Orthopedics</strong>
                    </p>
                    <p type="button" onClick={() => handleDepartment('Ophthalmology')}>
                        <strong>Ophthalmology</strong>
                    </p>
                    <p type="button" onClick={() => handleDepartment('Pediatrics')}>
                        <strong>Pediatrics</strong>
                    </p>
                    <p type="button" onClick={() => handleDepartment('Urology')}>
                        <strong>Urology</strong>
                    </p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Booking