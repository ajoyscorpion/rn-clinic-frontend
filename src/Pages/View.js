import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Calender from '../Components/Calender';
import { getuserdetails, handlemeet, sendEmail, viewdoctor } from '../Services/allAPIs';
import { DateContext, TimeContext } from '../Context/ContextShare';
import Time from '../Components/Time'
import Rating from '@mui/material/Rating';
import logo from "../Images/logo.png"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function View() {

    const [doctorView,setDoctorView] = useState({
        name: '',
        department: '',
        img: '',
        rating: 0,
    })
    const {date,setDate} = useContext(DateContext)
    const {time,setTime} = useContext(TimeContext)
    const [isRealMeet, setIsRealMeet] = useState(true);
    const [userDetails,setUserDetails] = useState('')
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');



    useEffect(() => {
        getUserDetails();
        // eslint-disable-next-line
    }, []);

    const getUserDetails = async () => {
        console.log("thu");
        const response = await getuserdetails(user_id)
        console.log(response);

        setUserDetails(response.data)
    }

    console.log(userDetails);

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
        setDate(null);
        setTime(null);
    };


    const email = async(emailData) => {
        const emailResponse = await sendEmail(emailData)
        console.log(emailResponse);
        console.log("Yo");
    }


    const handleMeetClick = async () => {
        const formattedDate = date.format('YYYY-MM-DD');
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
            const response = await handlemeet(data);
            console.log(response);
            const booking_id = response.data.booking_id
            console.log(booking_id);
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
                                .paragraphC{
                                    font-size: 16px;
                                    line-height: 10px; 
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
                                <img src="{${logo}}" width="48" height="48" alt="Raycast">
                                <h1 class="heading">RN Clinic</h1>
                                <div class="body">
                                    <p class="paragraph">This is to inform you about the conformation of booking scheduled on ${formattedDate}. If you have any further inquiries, please do reach out to our team.</p>
                                    <p class="paragraphC">
                                        Doctor : ${doctorView.name}
                                    </p>
                                    <p class="paragraphC">
                                        Department : ${doctorView.department}
                                    </p>
                                    <p class="paragraphC">
                                        Date : ${formattedDate}}
                                    </p>
                                    <p class="paragraphC">
                                        Time : ${formattedTime}
                                    </p>
                                    <p class="paragraphC">
                                        Booking No. : ${booking_id}
                                    </p>
                                </div>
                                <p class="paragraph">Best Regards,<br />- RN Clinic Team</p>
                                <hr class="hr">
                                <img src="{${logo}}" width="32" height="32" style="webkit-filter: grayscale(100%); filter: grayscale(100%); margin: 20px 0;">
                                <p class="footer">RN Clinic</p>
                                <p class="footer">Kottayam, Kerala, 686001</p>
                            </div>
                        </body>
                    </html>
                `
            };
            console.log(emailData.to);
            email(emailData)
            console.log("Yo");
            closeModal();
            setSnackbarMessage('Booking has been Successful. Thank You!');
            setSnackbarSeverity('success');
            setOpen(true);
        } catch (error) {
            console.error(error);
            setSnackbarMessage('Sorry, Booking has&apos;nt been initiated. Please try again !');
            setSnackbarSeverity('error');
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

  return (
    <>
        <div className='container '>
            <div className='row mt-5 mb-5'>
                <div className='col-lg-2 col-1'></div>
                <div className='col-lg-8 col-10'>
                    <div className='border rounded'>
                        <div className='row mt-5 mb-5'>
                            <div className='col-lg-1 col-1'></div>
                            <div className='col-lg-7 col-10'>
                                <div className='row'>
                                    <div className='col-lg-3 col-3'>
                                        <img src={`http://localhost:8000${doctorView.img}`} class="Doc1 mt-3" alt="Dr. Michael Johnson"/>
                                    </div>
                                    <div className='col-lg-6 col-6 d-flex flex-column align-items-end justify-content-end'>
                                        <h5 class="card-title text-center">{doctorView.name}</h5>
                                        <p className='text-center'>
                                            <strong>{doctorView.department}</strong>
                                        </p>
                                    </div>
                                    <div className='col-lg-3 d-flex align-items-end'>
                                        <Rating name="read-only" value={doctorView.rating} readOnly />
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
                            <div className='col-lg-3 col-10 d-flex flex-lg-column justify-content-center'>
                                <button 
                                    type='button' 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#dateTime" 
                                    className='btn btn-warning mt-3 me-3 me-lg-0'
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
                            <div className='col-lg-1 col-1'></div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2 col-1'></div>
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
                                onClick={handleMeetClick}
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

export default View


