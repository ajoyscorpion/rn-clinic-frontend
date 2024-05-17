import React from 'react'
import { Link } from 'react-router-dom'
import logo from  "../Images/logo.png"

function Navbar() {
  return (
    <>
        <nav class="container navbar navbar-expand-lg">
            <div class="container-fluid">
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
                        <a class="nav-link" href="/#ContactUs">
                            <strong>Contact Us</strong>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/Login">
                            <strong>Sign In</strong>
                        </a>
                    </li>
                    <li class="nav-item">
                        <div class="btn-group">
                            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                Paulson Mathew
                            </button>
                            <ul class="dropdown-menu dropdown-menu-lg-end">
                                <li>
                                    <Link to={'/Mybookings'}>
                                        <button class="dropdown-item" type="button">My Bookings</button>
                                    </Link>
                                </li>
                                <li>
                                    <button class="dropdown-item" type="button">Log Out</button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar