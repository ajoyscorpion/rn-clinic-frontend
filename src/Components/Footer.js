import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <div className='container footer' id='ContactUs'>
        <div className='row'>
            <div className='col-lg-6'>
                <div className='row mt-5 mb-5'>
                    <div className='col-lg-1'></div>
                    <div className='col-lg-10'>
                        <h3>
                            <strong>Contact Us</strong>
                        </h3>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <input type="Name" class="form-control mt-3" id="Name" placeholder="Name"/>
                                <input type="email" class="form-control mt-3" id="Email" placeholder="Email"/>
                            </div>
                            <div className='col-lg-6'>
                                <textarea placeholder="Message" class="form-control mt-3" id="Message" rows="3"></textarea>
                                <button className='btn btn-primary mt-3'>Submit</button>
                            </div>  
                        </div>  
                    </div>
                    <div className='col-lg-1'></div>
                </div>
            </div>
            <div className='col-lg-6 border-start'>
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
  )
}

export default Footer