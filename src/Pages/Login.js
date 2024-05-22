import React, { useContext, useState } from 'react'
import './Login.css'
import signin from "../Images/signin.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../Services/allAPIs'
import { AuthContext } from '../Context/ContextShare'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {

    const [email,setEmail] = useState('')
    const [pswd,setPswd] = useState('')
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSignIn = async(e) => {
        
        e.preventDefault()

        const data = {
            email:email,
            pswd:pswd
        }

        console.log(data);

        try {
            const response = await signIn(data)
            console.log(response.user.name);
            const name = response.user.name
            const customer_id = response.user.customer_id
            login(name,customer_id)
            setSnackbarMessage('Login successful!');
            setSnackbarSeverity('success');
            setOpen(true);
            setTimeout(()=>{
                navigate('/')
            },2000)
            // localStorage.setItem('user',name)
            // localStorage.setItem('customerId',customer_id)
            // window.location.href='/' 
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
    <div className='container'>
        <div className='row mt-5 mb-5'>
            <div className='col-lg-6 d-flex align-items-center justify-content-center'>
                <img src={signin} className="signinpic" alt="signin"></img>
            </div>
            <div className='col-lg-6'>
                <div className='row'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-6 d-flex flex-column justify-content-center'>
                        <div className='mt-5'>
                            <h3 className='text-center'>
                                <strong>Sign In</strong>
                            </h3>
                            <form onSubmit={handleSignIn}>
                                <div class="mb-3 mt-3">
                                    <label for="Email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <label for="Password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="Password" required value={pswd} onChange={(e) => setPswd(e.target.value)}/>
                                </div>
                                <div className='d-flex justify-content-center mt-5'>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>  
                                <div className='d-flex justify-content-center mt-3'>
                                    <p>Don't have an Account ?<span> <Link to={"/SignUp"}> Sign Up</Link></span></p>
                                </div> 
                            </form>
                        </div>
                    </div>
                    <div className='col-lg-3'></div>
                </div>
            </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </div>
  )
}

export default Login