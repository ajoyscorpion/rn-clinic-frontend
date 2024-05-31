import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import signin from "../Images/signin.jpg"
import { signUp } from '../Services/allAPIs'
import "./SignUp.css"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignUp() {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [pswd,setPswd] = useState('')
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


    const handleSignUp = async(e) =>{
        e.preventDefault()

        const data = {
            name:name,
            email:email,
            pswd:pswd,
            phone:phone
        }

        console.log(data);

        try {
            const response = await signUp(data)
            console.log(response);
            setSnackbarMessage('Signed Up Successfully. Welcome!');
            setSnackbarSeverity('success');
            setOpen(true);
            window.location.href = "/Login";
        } catch (error) {
            console.error("Enter valid credentials");
            setSnackbarMessage('Invalid credentials. Please try again.');
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
        <div className='container'>
            <div className='row mt-5 mb-5'>
                <div className='col-lg-6 col-10 d-none d-lg-flex align-items-center justify-content-center'>
                    <img src={signin} className="signinpic" alt="signin"></img>
                </div>
                <div className='col-lg-6 col-12'>
                    <div className='row'>
                        <div className='col-lg-3 col-2'></div>
                        <div className='col-lg-6 col-8 d-flex flex-column justify-content-center'>
                            <div className='mt-5'>
                                <h3 className='text-center'>
                                    <strong>Sign Up</strong>
                                </h3>
                                <form onSubmit={handleSignUp}>
                                    <div class="mb-3 mt-3">
                                        <label for="Name" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div class="mb-3 mt-3">
                                        <label for="Email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div class="mb-3 mt-3">
                                        <label for="Phone" class="form-label">Phone Number</label>
                                        <input type="number" class="form-control" id="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="Password" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="Password" required value={pswd} onChange={(e) => setPswd(e.target.value)}/>
                                    </div>
                                    <div className='d-flex justify-content-center mt-5'>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>  
                                    <div className='d-flex justify-content-center mt-3'>
                                        <p>Already have an account ?<span> <Link to={"/Login"}> Sign In</Link></span></p>
                                    </div> 
                                </form>
                            </div>
                        </div>
                        <div className='col-lg-3 col-2'></div>
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

export default SignUp