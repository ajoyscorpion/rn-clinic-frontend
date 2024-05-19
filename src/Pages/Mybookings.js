import React, { useContext, useEffect, useState } from 'react'
import { DateContext, TimeContext } from '../Context/ContextShare'
import { cancelBooking, mybookings, updateDateTime } from '../Services/allAPIs'
import './Mybookings.css'
import Calender from '../Components/Calender';
import Time from '../Components/Time'

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function Mybookings() {

    const [booking_data,setBooking_data] = useState([])
    const [showUpcoming, setShowUpcoming] = useState(false);
    const [showExpired, setShowExpired] = useState(false);
    const {date} = useContext(DateContext)
    const {time} = useContext(TimeContext)
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const user_id = localStorage.getItem('customerId')

    useEffect(()=>{
        myBookings()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const myBookings = async () => {
        const data ={
            user_id:user_id
        }
        console.log(data);

        try {
            const response = await mybookings(data)
            console.log(response);
            const sortedData = response.data.sort((a, b) => new Date(b.date_of_appointment) - new Date(a.date_of_appointment));
            setBooking_data(sortedData);
            //setBooking_data(response.data)
            const booking_data = response.data
            console.log(booking_data);
        } catch (error) {
            console.error();
        }
    }


    const handleCancelBooking = async (bookingId) => {

        const data = { booking_id: bookingId };

        console.log(data);

        try {
            console.log("hey");
            const response = await cancelBooking(data)
            console.log(response);
            myBookings()
        } catch (error) {
            console.error(error);
        }
    }


    const handleUpdateClick = async (bookingId) => {

        const formattedDate = date.format('YYYY-MM-DD');
        const formattedTime = time.format('HH:mm');

        const data = {
            booking_id:bookingId,
            updatedDate:formattedDate,
            updatedTime:formattedTime
        }

        console.log(data);

        try {
            const response = await updateDateTime (data)
            console.log(response);
            myBookings()
        } catch (error) {
           console.error(error); 
        }
    }


    const filterBookings = booking_data.filter(booking => {
        const bookingDate = new Date(booking.date_of_appointment)
        console.log(bookingDate);
        const today = new Date()
        console.log(today);

        if (showUpcoming && showExpired) {
            return true
        } else if (showUpcoming) {
            return bookingDate >= today
        } else if (showExpired) {
            return bookingDate < today
        } else {
            return true
        }
    })

    console.log(filterBookings);

  return (
    <div className='container'>
        <div className='row'>
            <h3 className='ms-5 mt-5'>My bookings</h3>
            <div className='d-flex ms-5 mt-4'>
                <input 
                    type="checkbox" 
                    id="Upcoming" 
                    name="Upcoming" 
                    className='ms-3'
                    checked={showUpcoming}
                    onChange={() => setShowUpcoming(!showUpcoming)}
                />
                <label for="Upcoming" className='ms-3'> Upcoming</label><br/>
                <input 
                    type="checkbox" 
                    id="Expired" 
                    name="Expired"  
                    className='ms-5'
                    checked={showExpired} 
                    onChange={() => setShowExpired(!showExpired)}
                />
                <label for="Expired" className='ms-3'> Expired</label><br/>
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-1'></div>
            <div className='col-lg-10'>
                <div className='row'>
                    {filterBookings.map((booking)=>(
                    <div className='col-lg-5 m-4'>
                        <div className='row border rounded'>
                            <div className='col-lg-3'>
                                <img src={`http://localhost:8000${booking.doctor_pic}`} class="Doc1 mt-3" alt="Dr. Michael Johnson"/>
                            </div>
                            <div className='col-lg-6 mt-3 mb-3 booking-details'>
                                <p><strong>{booking.doctor_name}</strong></p>
                                <p><strong>Booking ID : {booking.booking_id}</strong></p>
                                <p>{formatDate(booking.date_of_appointment)}</p>
                                <p>{booking.time_of_appointment}</p>
                            </div>
                            <div className='col-lg-3 d-flex flex-column align-items-center justify-content-center'>
                                { booking.booking_status === "Booked" && (
                                    <>
                                        <button className='btn btn-primary disabled'>{booking.booking_status}</button>
                                        <button 
                                            className='btn btn-warning mt-1'
                                            data-bs-toggle="modal" 
                                            data-bs-target="#dateTime"
                                            onClick={() => setSelectedBookingId(booking.booking_id)} 
                                        >
                                            Update
                                        </button>
                                        <button className='btn btn-danger mt-1' onClick={() => handleCancelBooking(booking.booking_id)}>Cancel</button>  
                                    </>
                                )}

                                { booking.booking_status === "Cancelled" && (
                                    <>
                                        <button className='btn btn-danger'>{booking.booking_status}</button>  
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className='col-lg-1'></div>
        </div>

        <div class="modal fade" id="dateTime">
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
                            onClick={() => handleUpdateClick(selectedBookingId)}
                            data-bs-dismiss="modal"
                        >Submit</button>
                    </div>
                </div>
            </div>
        </div>


    </div>
  )
}

export default Mybookings