import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/ContextShare';
import logo from  "../Images/logo.png"
import "./Navbar.css"
//import Divider from '@mui/material/Divider';


function Navbar() {

    const navigate = useNavigate();
    const {isAuthenticated,logout} = useContext(AuthContext)
    const name = localStorage.getItem('user'); 

    const logOut = async() => {
        logout()
        // localStorage.removeItem('customerId')
        // localStorage.removeItem('user')
        navigate('/')
        window.location.reload()
    }


  return (
    <>
        <nav class="container navbar navbar-expand-lg border-bottom pb-4">
            <div class="container-fluid ">
                <a class="navbar-brand ms-3 mt-2" href="/">
                    <img src={logo} alt="logo" width={"60px"} height={"60px"}/>
                </a>
                <button class="navbar-toggler justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">
                            <strong>Home</strong>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/Booking">
                            <strong>Booking</strong>
                        </a>
                    </li>
                    <li class="nav-item">
                        { isAuthenticated ? (
                            <div class="btn-group">
                                <button type="button" class="btn dropdown-toggle nav-link" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                    <strong>Paulson Mathew</strong>
                                </button>
                                <ul class="dropdown-menu" style={{border:"none"}}>
                                    <li class="nav-item">
                                        <Link to={`/${name}`} className="linkUnderline">
                                            <button class="dropdown-item" type="button">
                                                <strong>Profile</strong>    
                                            </button>
                                        </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to={'/Mybookings'} className="linkUnderline">
                                            <button class="dropdown-item" type="button">
                                                <strong>My Bookings</strong>
                                            </button>   
                                        </Link>    
                                    </li>
                                    <li class="nav-item">
                                        <button class="dropdown-item" type="button" onClick={logOut}>
                                            <strong>Log Out</strong>
                                        </button>
                                    </li>
                                </ul>
                            </div> )
                            :(
                            <a class="nav-link" href="/Login">
                                <strong>Sign In</strong>
                            </a> )
                        }
                    </li>
                </ul>
            </div>
            </div>
        </nav>
        {/* <Divider component="" className=''/> */}
    </>
  )
}

export default Navbar