import React from 'react'

function Mybookings() {
  return (
    <div className='container'>
        <div className='row'>
            <h3 className='ms-5 mt-5'>My bookings</h3>
            <div className='d-flex ms-5 mt-4'>
                <input type="checkbox" id="Upcoming" name="Upcoming" value="Bike" className='ms-3'/>
                <label for="Upcoming" className='ms-3'> Upcoming</label><br/>
                <input type="checkbox" id="Expired" name="Expired" value="Bike" className='ms-5'/>
                <label for="Expired" className='ms-3'> Expired</label><br/>
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-1'></div>
            <div className='col-lg-10'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='row border rounded mb-5 mt-5'>
                            <div className='col-lg-3'>

                            </div>
                            <div className='col-lg-6 mt-3 mb-3'>
                                <h6 className=''>Dr. Michael Johnson</h6>
                                <p>Date : 27/04/2024</p>
                                <p>Time : 11:00 AM</p>
                            </div>
                            <div className='col-lg-3'>
                                <button className='btn btn-primary mt-5'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-1'></div>
        </div>
    </div>
  )
}

export default Mybookings