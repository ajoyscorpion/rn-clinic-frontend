import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import signin from "../Images/signin.jpg"
import { signUp } from '../Services/allAPIs'
import "./SignUp.css"

function SignUp() {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [pswd,setPswd] = useState('')


    const handleSignUp = async(e) =>{
        e.preventDefault()

        const data = {
            name:name,
            email:email,
            pswd:pswd
        }

        console.log(data);

        try {
            const response = await signUp(data)
            console.log(response);
            window.location.href = "/Login";
        } catch (error) {
            console.error("Enter valid credentials");
        }
    }

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
                                <div class="mb-3">
                                    <label for="Password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="Password" required value={pswd} onChange={(e) => setPswd(e.target.value)}/>
                                </div>
                                <div className='d-flex justify-content-center mt-5'>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>  
                                <div className='d-flex justify-content-center mt-3'>
                                    <p>Have an Account ?<span> <Link to={"/Login"}> Sign In</Link></span></p>
                                </div> 
                            </form>
                        </div>
                    </div>
                    <div className='col-lg-3'></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp