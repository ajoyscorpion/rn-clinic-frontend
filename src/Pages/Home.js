import React from 'react'
import './Home.css'
import HomePic from '../Images/HomePic.png'
import WhyRNClinic from '../Images/WhyRNClinic.jpg'
import DrMichealJohnson from '../Images/Dr. Michael Johnson.png'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    <div className='container'>
        <div className='row'>
            <div className='col-lg-6 homeLeft'>
                <div className='row'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-6'>
                        <h2 className='mt-5'>
                            <strong>Explore alternative medicine with our expert healers</strong>
                        </h2>
                        <p className='mt-5'>
                            <strong>Book a consultation for just INR 50 and start your journey to wellness today.</strong>
                        </p>
                        <Link to={'/booking'}>
                            <button className={`btn homeButton mt-5`}>
                                <strong>Book Consultation</strong>
                            </button>
                        </Link>
                    </div>
                    <div className='col-lg-2'></div>
                </div>
            </div>
            <div className='col-lg-6 homeRight d-flex justify-content-center'>
                <div className='HomePicBack'></div>
                <img src={HomePic} alt='HomePic' className='HomePic'></img>
            </div>
        </div>

        {/* Why RN Clinic? */}
        <div className='row WhyRNClinic'>
            <div className='col-lg-6 WhyRNClinicLeft d-flex justify-content-center align-items-center'>
                <div className='WhyRNCliniBack'></div>
                <img src={WhyRNClinic} alt='Why RN Clinic?' className='WhyRNClinicPic'></img>
            </div>
            <div className='col-lg-6 WhyRNClinicRight d-flex align-items-center'>
                <div className='col-lg-2'></div>
                <div className='col-lg-8'>
                    <h3 className='mt-5'>
                        <strong>
                            Why RN Clinic?
                        </strong>
                    </h3>
                    <p className='mt-5'>
                        <strong>
                            At RN Clinic, we are committed to revolutionizing the way you access medical care. 
                            Our platform is designed to connect you with skilled healthcare professionals effortlessly, ensuring that quality healthcare is always within reach.
                        </strong>
                    </p>
                    <p className='mt-5'>
                        <strong>
                            With RN Clinic, you can schedule appointments with ease, whether you're seeking traditional medical expertise or exploring alternative healing methods. 
                            Our team of dedicated doctors and healers is here to provide personalized care and support on your journey to wellness.
                        </strong>
                    </p>
                </div>
                <div className='col-lg-2'></div>
            </div>
        </div>

        {/* Best In Us */}
        <div className='row BestInUs'>
            <div className='mt-5'>
                <h2 className='text-center'>Best In Us</h2>
                <div className='row mt-5'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'>
                        <div className='row d-flex justify-content-evenly'>

                            <div class="card">
                                <img src={DrMichealJohnson} class="Doc1 mt-4" alt="Dr. Michael Johnson"/>
                                <div class="card-body d-flex flex-column align-items-center mt-3">
                                    <h5 class="card-title text-center">Dr. Michael Johnson</h5>
                                    <p class="card-text text-center rounded-pill" style={{width:"100px",backgroundColor:"#E1E1E1"}}>Cardiology</p>
                                </div>
                            </div>

                            <div class="card">
                                <img src={DrMichealJohnson} class="Doc1 mt-4" alt="Dr. Michael Johnson"/>
                                <div class="card-body d-flex flex-column align-items-center mt-3">
                                    <h5 class="card-title text-center">Dr. Michael Johnson</h5>
                                    <p class="card-text text-center rounded-pill" style={{width:"100px",backgroundColor:"#E1E1E1"}}>Cardiology</p>
                                </div>
                            </div>

                            <div class="card">
                                <img src={DrMichealJohnson} class="Doc1 mt-4" alt="Dr. Michael Johnson"/>
                                <div class="card-body d-flex flex-column align-items-center mt-3">
                                    <h5 class="card-title text-center">Dr. Michael Johnson</h5>
                                    <p class="card-text text-center rounded-pill" style={{width:"100px",backgroundColor:"#E1E1E1"}}>Cardiology</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='row d-flex justify-content-evenly mt-5'>

                            <div class="card">
                                <img src={DrMichealJohnson} class="Doc1 mt-4" alt="Dr. Michael Johnson"/>
                                <div class="card-body d-flex flex-column align-items-center mt-3">
                                    <h5 class="card-title text-center">Dr. Michael Johnson</h5>
                                    <p class="card-text text-center rounded-pill" style={{width:"100px",backgroundColor:"#E1E1E1"}}>Cardiology</p>
                                </div>
                            </div>

                            <div class="card">
                                <img src={DrMichealJohnson} class="Doc1 mt-4" alt="Dr. Michael Johnson"/>
                                <div class="card-body d-flex flex-column align-items-center mt-3">
                                    <h5 class="card-title text-center">Dr. Michael Johnson</h5>
                                    <p class="card-text text-center rounded-pill" style={{width:"100px",backgroundColor:"#E1E1E1"}}>Cardiology</p>
                            </div>
                        </div>
                        </div>
                        
                        <div className='d-flex align-items-center justify-content-center mt-5'>
                            <Link to={"/Booking"}>
                                <button className='btn btn-primary'>View All</button>
                            </Link>
                        </div>
                        
                    </div>
                    <div className='col-lg-2'></div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home