import React, { useEffect, useState } from 'react'
import "./Profile.css"
import Divider from '@mui/material/Divider';
import profile from "../Images/profile.png"
import { getuserdetails, profileUpdate } from '../Services/allAPIs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    const [userDetails,setUserDetails] = useState('')
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


    const BASE_URL = 'http://127.0.0.1:8000'; 

    const getUserDetails = async () => {
        console.log("thu");
        const response = await getuserdetails(user_id)
        console.log(response);

        setUserDetails(response.data)
        setGender(response.data.gender || '');
        setDob(response.data.dob || '');
        setAddress1(response.data.address1 || '');
        setAddress2(response.data.address2 || '');
        setCity(response.data.city || '');
        setState(response.data.state || '');
        setPincode(response.data.pincode || '');
        setEmPhoneNo(response.data.emPhoneNo || '');
        setBloodGroup(response.data.bloodGroup || '');
        setProfileImage(response.data.profileImage ? `${BASE_URL}${response.data.profileImage}` : null);
        setPreview(response.data.profileImage ? `${BASE_URL}${response.data.profileImage}` : profile);

    }

    console.log(userDetails);

    useEffect(() => {
        getUserDetails();
        // eslint-disable-next-line
    }, []);

    useEffect(()=>{
        if (profileImage && typeof profileImage === 'object') {
            setPreview(URL.createObjectURL(profileImage));
        } else if (profileImage && typeof profileImage === 'string') {
            setPreview(profileImage);
        }
        // eslint-disable-next-line
    },[profileImage])

    //const handleGenderChange = (e) => { setGender(e.target.value); };

    // const handleDobChange = (e) => { setDob(e.target.value);};

    // const handleAddress1Change = (e) => { setAddress1(e.target.value);};

    // const handleAddress2Change = (e) => { setAddress2(e.target.value);};

    // const handleCityChange = (e) => { setCity(e.target.value);  };

    // const handleStateChange = (e) => { setState(e.target.value); };

    // const handlePincodeChange = (e) => { setPincode(e.target.value); };

    // const handleEmPhoneNoChange = (e) => { setEmPhoneNo(e.target.value); };

    // const handleBloodGroupChange = (e) => { setBloodGroup(e.target.value); };

    const handleImageUpload = (e) => { setProfileImage(e.target.files[0]) }

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

        const headerConfig = { "Content-Type":"multipart/form-data" }

        try {
            const response = await profileUpdate(data,headerConfig)
            console.log(response);
            setSnackbarMessage('Profile has been successfully updated. Thank You!');
            setSnackbarSeverity('success');
            setOpen(true);
        } catch (error) {
            console.error(error);
            setSnackbarMessage('Failed to update profile. Please try again.');
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
                <div className='col-lg-6 col-12 d-flex flex-column justify-content-center align-items-center'>
                    <div className='bg' type="file">
                        {/* <img src={profileImage} className="btn form-control" alt='profile'/> */}
                        <img src={preview} className="btn form-control" alt='profile'/>
                        
                        {/* <input type="file" accept="image/*" onChange={handleImageUpload} className="fileinput" /> */}
                        <input type="file" name='profileImage' onChange={handleImageUpload} className="fileinput" />
                    </div>
                    <div className='mt-3'>
                        <p className='' style={{fontSize: "12px", opacity:"0.7"}}>Click on the Image to change the profile picture</p>
                    </div>
                </div>
                <div className='col-lg-6 col-12 mt-2'>
                    <div className='row'>
                        <h3>{userDetails.name}</h3>
                        <h6>Register Number : {userDetails.customer_id}</h6>
                    </div>
                    <Divider component="" className='mt-3'/>
                    <form className='mt-4' onSubmit={handleSubmit}> 
                        <div className='row'>
                            <div className='col-3'>
                                <label for="Gender" class="form-label">Gender</label>
                                <select id="Gender" class="form-select w-auto" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value=''>Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className='col-4'>
                                <label for="Email" class="form-label">Email</label>
                                <input type="email" class="form-control w-auto" id="Email" placeholder={userDetails.email} readOnly disabled/>
                            </div>
                            <div className='col-3'>
                                <label for="DateOfBirth" class="form-label">Date of Birth</label>
                                <input type="date" class="form-control w-auto" id="DateOfBirth" placeholder={userDetails.dob} value={dob} onChange={(e) => setDob(e.target.value)}/>    
                            </div>
                            <div class="col-12 mt-3">
                                <label for="Address1" class="form-label">Address</label>
                                <input type="text" class="form-control" id="Address1" placeholder={userDetails.address1} value={address1} onChange={(e) => setAddress1(e.target.value)}/>
                            </div>
                            <div class="col-12 mt-3">
                                <label for="Address2" class="form-label">Address 2</label>
                                <input type="text" class="form-control" id="Address2" placeholder={userDetails.address2} value={address2} onChange={(e) => setAddress2(e.target.value)}/>
                            </div>
                            <div class="col-6 mt-3">
                                <label for="City" class="form-label">City</label>
                                <input type="text" class="form-control" id="City" placeholder={userDetails.city} value={city} onChange={(e) => setCity(e.target.value)}/>
                            </div>
                            <div class="col-4 mt-3">
                                <label for="State" class="form-label">State</label>
                                <input type="text" id="State" class="form-select" value={state} placeholder={userDetails.state}  onChange={(e) => setState(e.target.value)}/>
                            </div>
                            <div class="col-2 mt-3">
                                <label for="Pincode" class="form-label">Pin Code</label>
                                <input type="text" class="form-control" id="Pincode" value={pincode} placeholder={userDetails.pincode} onChange={(e) => setPincode(e.target.value)}/>
                            </div>
                            <div className='col-6 mt-3'>
                                <label for="Phone Number" class="form-label">Phone Number</label>
                                <input type="text" class="form-control" id="Phone Number" placeholder={userDetails.phone} readOnly disabled/>
                            </div>
                            <div className='col-6 mt-3'>
                                <label for="Emergency Phone Number" class="form-label">Emergency Phone Number</label>
                                <input type="text" class="form-control" id="Emergency Phone Number" placeholder={userDetails.emPhoneNo} value={emPhoneNo} onChange={(e) => setEmPhoneNo(e.target.value)}/>
                            </div>
                            <div className='col-3 mt-3'>
                                <label for="Blood Group" class="form-label">Blood Group</label>
                                <select id="Blood Group" class="form-select w-auto" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
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

export default Profile