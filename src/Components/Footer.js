import React, { useState } from 'react'
import "./Footer.css"
import Divider from '@mui/material/Divider';
import { sendEmail } from '../Services/allAPIs';
import logo from "../Images/logo.png"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Footer() {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


    const handleSubmit = async () => {
        const emailData = {
            from: `${name} <${email}>`,
            to: 'ajoyscorpion@gmail.com',
            subject: 'Contact Us',
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
                                <p class="paragraph">Dear RN Clinic Team</p>
                                <p class="paragraph">${message}</p>
                            </div>
                            <p class="paragraph">Best Regards,<br />- ${name}</p>
                            <hr class="hr">
                            <img src="${logo}" width="32" height="32" style="webkit-filter: grayscale(100%); filter: grayscale(100%); margin: 20px 0;">
                            <p class="footer">RN Clinic</p>
                            <p class="footer">Kottayam, Kerala, 686001</p>
                        </div>
                    </body>
                </html>
            `
        };
        try {
            console.log(emailData.to);
            const response = await sendEmail(emailData)
            console.log(response);
            setSnackbarMessage('Message has been sent successfully. Thank You!');
            setSnackbarSeverity('success');
            setOpen(true);
        } catch (error) {
            console.error(error);
            setSnackbarMessage('Failed to sent the message. Please try again.');
            setSnackbarSeverity('error');
            setOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

  return (
    <>
        <div className='container footer' id='ContactUs'>
            <div className='row'>
                <div className='col-lg-6 col-12'>
                    <div className='row mt-5 mb-5'>
                        <div className='col-lg-1 col-1'></div>
                        <div className='col-lg-10 col-10'>
                            <h3>
                                <strong>Contact Us</strong>
                            </h3>
                            <Divider component="" className='mt-4 mb-2'/>
                            <div className='row'>
                                <div className='col-lg-6 col-6'>
                                    <input type="Name" class="form-control mt-3" id="Name" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
                                    <input type="email" class="form-control mt-3" id="Email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className='col-lg-6 col-6'>
                                    <textarea placeholder="Message" class="form-control mt-3" id="Message" rows="3" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                    <button className='btn btn-primary mt-3' onClick={handleSubmit}>Submit</button>
                                </div>  
                            </div>  
                        </div>
                        <div className='col-lg-1 col-1'></div>
                    </div>
                </div>
                <div className='col-lg-6 col-12 border-start'>
                    <div className='ms-5 mt-5'>
                        <div className='d-flex align-items-center'>
                            <i class="fa-solid fa-location-dot"></i>
                            <div className='mt-2 ms-3'>
                                <strong>
                                    <p>RN Clinic,</p>
                                    <p>Bengaluru</p>
                                    <p>647382</p>
                                </strong>
                            </div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <i class="fa-regular fa-envelope"></i>
                            <strong>
                                <p className='mt-2 ms-3'>rnClinic@gmail.com</p>
                            </strong> 
                        </div>
                        <div className='d-flex align-items-center'>
                            <i class="fa-solid fa-phone"></i>
                            <strong>
                                <p className='mt-2 ms-3'>+91 7536291826</p>
                            </strong>
                        </div>
                        <strong>
                            <p className='text-center mt-4'>Paulson Mathew © 2023</p>
                        </strong>
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

export default Footer