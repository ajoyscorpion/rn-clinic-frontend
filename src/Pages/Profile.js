import React, { useEffect, useState } from 'react'
import "./Profile.css"
import Divider from '@mui/material/Divider';
import profile from "../Images/profile.png"
import { profileUpdate } from '../Services/allAPIs';


function Profile() {

    const [gender,setGender] = useState('')
    const [dob,setDob] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [pincode,setPincode] = useState('')
    const [emPhoneNo,setEmPhoneNo] = useState('')
    const [bloodGroup,setBloodGroup] = useState('')
    const [profileImage, setProfileImage] = useState(null);
    //const [profileImageFile, setProfileImageFile] = useState(null);
    const[preview,setPreview] = useState("")


    useEffect(()=>{
        if(profileImage){
            setPreview(URL.createObjectURL(profileImage))
        }
    },[profileImage])

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleDobChange = (e) => {
        setDob(e.target.value);
    };

    const handleAddress1Change = (e) => {
        setAddress1(e.target.value);
    };

    const handleAddress2Change = (e) => {
        setAddress2(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handlePincodeChange = (e) => {
        setPincode(e.target.value);
    };

    const handleEmPhoneNoChange = (e) => {
        setEmPhoneNo(e.target.value);
    };

    const handleBloodGroupChange = (e) => {
        setBloodGroup(e.target.value);
    };

    const handleImageUpload = (e) => {
        setProfileImage(e.target.files[0])
        // const file = e.target.files[0]

        // if(file){
        //     setProfileImageFile(file);
        //     const reader = new FileReader()
        //     reader.onloadend = () => setProfileImage(reader.result)
        //     reader.readAsDataURL(file)
        // }
    }

    console.log(profileImage);

    console.log(preview);

    const user_id = localStorage.getItem("customerId")


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('user_id',user_id)
        data.append('gender', gender);
        data.append('dob', dob);
        data.append('address1', address1);
        data.append('address2', address2);
        data.append('city', city);
        data.append('state', state);
        data.append('pincode', pincode);
        data.append('emPhoneNo', emPhoneNo);
        data.append('bloodGroup', bloodGroup);
        data.append('profile_image', profileImage);
    
        
        console.log(profileImage);

        console.log(data);

        // for (const [key, value] of data.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        const headerConfig = { "Content-Type":"multipart/form-data" }

        try {
            const response = await profileUpdate(data,headerConfig)
            console.log(response);
            alert("Successfully Updated")
        } catch (error) {
            console.error(error); 
        }

    }
    

  return (
    <div className='container'>
        <div className='row mt-5 mb-5'>
            {/* */}
            <div className='col-lg-6 d-flex justify-content-center align-items-center'>
                <div className='bg' type="file">
                    {/* <img src={profileImage} className="btn form-control" alt='profile'/> */}
                    <img src={preview?preview:profile} className="btn form-control" alt='profile'/>
                    
                    {/* <input type="file" accept="image/*" onChange={handleImageUpload} className="fileinput" /> */}
                    <input type="file" name='profileImage' onChange={handleImageUpload} className="fileinput" />
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='row'>
                    <h3>Paulson Mathew</h3>
                    <h6>Register Number : 121424</h6>
                </div>
                <Divider component="" className='mt-3'/>
                <form className='mt-4' onSubmit={handleSubmit}> 
                    <div className='row'>
                        <div className='col-3'>
                            <label for="Gender" class="form-label">Gender</label>
                            <select id="Gender" class="form-select w-auto" value={gender} onChange={handleGenderChange}>
                                <option value=''>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div className='col-4'>
                            <label for="Email" class="form-label">Email</label>
                            <input type="email" class="form-control w-auto" id="Email"/>
                        </div>
                        <div className='col-3'>
                            <label for="DateOfBirth" class="form-label">Date of Birth</label>
                            <input type="date" class="form-control w-auto" id="DateOfBirth" placeholder="" value={dob} onChange={handleDobChange}/>    
                        </div>
                        <div class="col-12 mt-3">
                            <label for="Address1" class="form-label">Address</label>
                            <input type="text" class="form-control" id="Address1" placeholder="" value={address1} onChange={handleAddress1Change}/>
                        </div>
                        <div class="col-12 mt-3">
                            <label for="Address2" class="form-label">Address 2</label>
                            <input type="text" class="form-control" id="Address2" placeholder="" value={address2} onChange={handleAddress2Change}/>
                        </div>
                        <div class="col-6 mt-3">
                            <label for="City" class="form-label">City</label>
                            <input type="text" class="form-control" id="City" value={city} onChange={handleCityChange}/>
                        </div>
                        <div class="col-4 mt-3">
                            <label for="State" class="form-label">State</label>
                            <input type="text" id="State" class="form-select" value={state} onChange={handleStateChange}/>
                        </div>
                        <div class="col-2 mt-3">
                            <label for="Pincode" class="form-label">Pin Code</label>
                            <input type="text" class="form-control" id="Pincode" value={pincode} onChange={handlePincodeChange}/>
                        </div>
                        <div className='col-6 mt-3'>
                            <label for="Phone Number" class="form-label">Phone Number</label>
                            <input type="text" class="form-control" id="Phone Number" placeholder=""/>
                        </div>
                        <div className='col-6 mt-3'>
                            <label for="Emergency Phone Number" class="form-label">Emergency Phone Number</label>
                            <input type="text" class="form-control" id="Emergency Phone Number" placeholder="" value={emPhoneNo} onChange={handleEmPhoneNoChange}/>
                        </div>
                        <div className='col-3 mt-3'>
                            <label for="Blood Group" class="form-label">Blood Group</label>
                            <select id="Blood Group" class="form-select w-auto" value={bloodGroup} onChange={handleBloodGroupChange}>
                                <option>Select Blood Group</option>
                                <option>A+</option>
                                <option>B+</option>
                                <option>O+</option>
                                <option>A-</option>
                                <option>B-</option>
                                <option>O-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                                <option>Rh+</option>
                                <option>Rh-</option>
                            </select>
                        </div>
                        <div className='col-12 mt-3'>
                            <button className='btn btn-primary w-auto' type='submit'>
                                Save
                            </button>
                        </div> 
                    </div>
                </form> 
            </div>
            <div className='col-lg-'></div>
            {/* */}
        </div>
        
    </div>
  )
}

export default Profile