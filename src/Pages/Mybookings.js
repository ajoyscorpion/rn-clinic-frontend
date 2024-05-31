import React, { useContext, useEffect, useState } from 'react'
import { DateContext, TimeContext } from '../Context/ContextShare'
import { cancelBooking, mybookings, sendEmail, updateDateTime } from '../Services/allAPIs'
import './Mybookings.css'
import Calender from '../Components/Calender';
import Time from '../Components/Time'
import Divider from '@mui/material/Divider';
import logo from "../Images/logo.png"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


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


    const email = async(emailData) => {
        const emailResponse = await sendEmail(emailData)
        console.log(emailResponse);
        console.log("Yo");
    }



    const handleCancelBooking = async (bookingId) => {

        const data = { booking_id: bookingId };

        console.log(data);

        try {
            console.log("hey");
            const response = await cancelBooking(data)
            console.log(response);
            const bookingDetails = response.data
            console.log(bookingDetails);
            const emailData = {
                to: 'ajoyscorpion@gmail.com',
                subject: 'RN Clinic Appointment',
                message:`
                    <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>RN Clinic Email</title>
                            <style>
                                .main {
                                    background-color: #ffffff;
                                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                                }
                                .container {
                                    margin: 0 auto;
                                    padding: 20px 25px 48px;
                                    background-image: url("/assets/raycast-bg.png");
                                    background-position: bottom;
                                    background-repeat: no-repeat, no-repeat;
                                }
                                .heading {
                                    font-size: 28px;
                                    font-weight: bold;
                                    margin-top: 48px;
                                }
                                .body {
                                    margin: 24px 0;
                                }
                                .paragraph {
                                    font-size: 16px;
                                    line-height: 26px;
                                }
                                .link {
                                    color: #FF6363;
                                    text-decoration:none
                                }
                                .hr {
                                    border-color: #dddddd;
                                    margin-top: 48px;
                                }
                                .footer {
                                    color: #8898aa;
                                    font-size: 12px;
                                    margin-left: 4px;
                                }
                            </style>
                        </head>
                        <body class="main">
                            <div class="container">
                                <img src="${logo}" width="48" height="48" alt="Raycast">
                                <h1 class="heading">RN Clinic</h1>
                                <div class="body">
                                    <p class="paragraph">This is to inform you that the booking ( Booking No : ${bookingId}) scheduled on ${bookingDetails.date_of_appointment} at ${bookingDetails.time_of_appointment} has been cancelled</p>
                                </div>
                                <p class="paragraph">Best Regards,<br />- RN Clinic Team</p>
                                <hr class="hr">
                                <img src="${logo}" width="32" height="32" style="webkit-filter: grayscale(100%); filter: grayscale(100%); margin: 20px 0;">
                                <p class="footer">RN Clinic</p>
                                <p class="footer">Kottayam, Kerala, 686001</p>
                            </div>
                        </body>
                    </html>
                `
            };
            console.log(emailData.to);
            email(emailData)
            setSnackbarMessage('Booking has been Cancelled. Thank You!');
            setSnackbarSeverity('success');
            setOpen(true);
            myBookings()
        } catch (error) {
            console.error(error);
            setSnackbarMessage('Failed to cancel booking. Please try again!');
            setSnackbarSeverity('error');
            setOpen(true);
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
            const bookingDetails = response.data
            console.log(bookingDetails);
            const emailData = {
                to: 'ajoyscorpion@gmail.com',
                subject: 'RN Clinic Appointment',
                message:`
                    <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>RN Clinic Email</title>
                            <style>
                                .main {
                                    background-color: #ffffff;
                                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                                }
                                .container {
                                    margin: 0 auto;
                                    padding: 20px 25px 48px;
                                    background-image: url("/assets/raycast-bg.png");
                                    background-position: bottom;
                                    background-repeat: no-repeat, no-repeat;
                                }
                                .heading {
                                    font-size: 28px;
                                    font-weight: bold;
                                    margin-top: 48px;
                                }
                                .body {
                                    margin: 24px 0;
                                }
                                .paragraph {
                                    font-size: 16px;
                                    line-height: 26px;
                                }
                                .link {
                                    color: #FF6363;
                                    text-decoration:none
                                }
                                .hr {
                                    border-color: #dddddd;
                                    margin-top: 48px;
                                }
                                .footer {
                                    color: #8898aa;
                                    font-size: 12px;
                                    margin-left: 4px;
                                }
                            </style>
                        </head>
                        <body class="main">
                            <div class="container">
                                <img src="${logo}" width="48" height="48" alt="RN Clinic">
                                <h1 class="heading">RN Clinic</h1>
                                <div class="body">
                                    <p class="paragraph">This is to inform you that the booking ( Booking No : ${bookingId}) has been rescheduled to ${bookingDetails.date_of_appointment} at ${bookingDetails.time_of_appointment}. Any furthur inquiries please reach out to our team</p>
                                </div>
                                <p class="paragraph">Best Regards,<br />- RN Clinic Team</p>
                                <hr class="hr">
                                <img src="${logo}" width="32" height="32" style="webkit-filter: grayscale(100%); filter: grayscale(100%); margin: 20px 0;">
                                <p class="footer">RN Clinic</p>
                                <p class="footer">Kottayam, Kerala, 686001</p>
                            </div>
                        </body>
                    </html>
                `
            };
            console.log(emailData.to);
            email(emailData)
            setSnackbarMessage('Updated Booking. Thank You!');
            setSnackbarSeverity('success');
            setOpen(true);
            myBookings()
        } catch (error) {
           console.error(error);
           setSnackbarMessage('Failed to update booking. Please try again!');
            setSnackbarSeverity('error');
            setOpen(true); 
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

  return (
    <>
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
            <Divider component="" className='mt-4'/>
            <div className='row'>
                <div className='col-lg-1 col-1'></div>
                <div className='col-lg-10 col-10'>
                    <div className='row'>
                        {filterBookings.map((booking)=>(
                        <div className='col-lg-5 m-4 col-10 cardBooking' key={booking.booking_id}>
                            <div className='row border rounded'>
                                <div className='col-lg-3 col-12 d-flex justify-content-center'>
                                    <img src={`http://localhost:8000${booking.doctor_pic}`} class="Doc1 mt-3" alt="Dr. Michael Johnson"/>
                                </div>
                                <div className='col-lg-6 col-12 mt-3 mb-3 booking-details d-flex flex-column align-items-center justify-content-end'>
                                    <p><strong>{booking.doctor_name}</strong></p>
                                    <p><strong>Booking ID : {booking.booking_id}</strong></p>
                                    <p>{formatDate(booking.date_of_appointment)}</p>
                                    <p>{booking.time_of_appointment}</p>
                                </div>
                                <div className='col-lg-3 col-12 mt-2 mb-2 d-flex flex-column align-items-center justify-content-center'>
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
                <div className='col-lg-1 col-1'></div>
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

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </>
  )
}

export default Mybookings