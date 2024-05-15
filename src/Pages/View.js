import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Calender from '../Components/Calender';
import { realMeetBook, viewdoctor } from '../Services/allAPIs';
import { DateContext, TimeContext } from '../Context/ContextShare';
import Time from '../Components/Time'

function View() {

    const [doctorView,setDoctorView] = useState({})
    const {date,setDate} = useContext(DateContext)
    const {time,setTime} = useContext(TimeContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRealMeet, setIsRealMeet] = useState(true);

    const {id} = useParams()
    console.log(id);

    const user_id = localStorage.getItem('customerId')
    console.log(user_id);

    const viewDoctor = async() => {
        const doctor = await viewdoctor(id)
        console.log(doctor);
        setDoctorView(doctor)
    }

    
    useEffect(()=>{ 
        viewDoctor()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])


    // Inside the closeModal function
    const closeModal = () => {
        setIsModalOpen(false);
        setDate(null);
        setTime(null);
    };


    const handleMeetClick = async () => {
        const formattedDate = date.format('DD-MM-YYYY');
        const formattedTime = time.format('HH:mm');
    
        const data = {
            doctor_id: id,
            date_of_appointment: formattedDate,
            time_of_appointment: formattedTime,
            online: isRealMeet ? false : true,
            offline: isRealMeet ? true : false,
            booking_status: "Booked",
            user_id: user_id,
        };
    
        try {
            const response = await realMeetBook(data);
            console.log(response);
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className='container '>
        <div className='row mt-5 mb-5'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
                <div className='border rounded'>
                    <div className='row mt-5 mb-5'>
                        <div className='col-lg-1'></div>
                        <div className='col-lg-7'>
                            <div className='row'>
                                <div className='col-lg-3'>
                                    <img src={`http://localhost:8000${doctorView.img}`} class="Doc1 mt-3" alt="Dr. Michael Johnson"/>
                                </div>
                                <div className='col-lg-6 d-flex flex-column align-items-end justify-content-end'>
                                    <h5 class="card-title text-center">{doctorView.name}</h5>
                                    <p className='text-center'>
                                        <strong>{doctorView.department}</strong>
                                    </p>
                                </div>
                                <div className='col-lg-3 d-flex align-items-end'>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                        <div className='col-lg-3 d-flex flex-column justify-content-center'>
                            <button 
                                type='button' 
                                data-bs-toggle="modal" 
                                data-bs-target="#dateTime" 
                                className='btn btn-warning mt-3'
                                onClick={() => setIsRealMeet(true)} 
                                >
                                    Real Meet
                            </button>
                            <button 
                                type='button' 
                                data-bs-toggle="modal" 
                                data-bs-target="#dateTime" 
                                className='btn btn-danger mt-3'
                                onClick={() => setIsRealMeet(false)}
                                >
                                    Virtual Meet
                            </button>
                        </div>
                        <div className='col-lg-1'></div>
                    </div>
                </div>
            </div>
            <div className='col-lg-2'></div>
        </div>


        <div class="modal fade" id="dateTime" style={{ display: isModalOpen ? 'block' : 'none' }}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Select Date and Time</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body ">
                        <div className='d-flex align-items-center justify-content-center'>
                            <Calender/>
                            <Time/>
                        </div>
                        <div className='ms-5'>
                            <p>
                                <strong>Date : {date ? date.format('DD-MM-YYYY')  : 'Select a date'}</strong>
                            </p>
                            <p>
                                <strong>Time : {time ? time.format('HH:mm') : 'Select a time'}</strong>
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button 
                            type="button" 
                            class="btn btn-primary"
                            onClick={handleMeetClick}
                        >Submit</button>
                    </div>
                </div>
            </div>
        </div>


    </div>
  )
}

export default View


