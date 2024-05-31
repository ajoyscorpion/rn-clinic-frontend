import { commonRequest } from "./commonHTTPRequest";
//import RNClinicEmailSend from "../../emails";

const BASE_URL = "http://127.0.0.1:8000"

// register user

export const signUp = async(body) => {
    const response = await commonRequest("POST",`${BASE_URL}/signup`,body)
    console.log(response);
    return response
}

// login user

export const signIn = async(body) => {
    const response = await commonRequest("POST",`${BASE_URL}/signin`,body)
    console.log(response);
    return response
}


// Get All Doctors

export const getAllDoc = async() => {
    const response = await commonRequest("GET",`${BASE_URL}/doctors/`)
    console.log(response);
    return response
}

// View Doctor

export const viewdoctor = async (id) => {
    const response = await commonRequest("GET",`${BASE_URL}/view-doctor/${id}`,'')
    console.log(response);
    return response
}

// Real Meet 

export const handlemeet = async (body) => {
    const response = await commonRequest("POST",`${BASE_URL}/handlemeet/`,body)
    console.log(response);
    return response
}

// My Bookings

export const mybookings = async (body) => {
    const response = await commonRequest("POST",`${BASE_URL}/mybookings/`,body)
    console.log(response);
    return response
}

// Cancel Booking

export const cancelBooking = async (body) => {
    const response = await commonRequest("PUT",`${BASE_URL}/cancelBooking/`,body)
    console.log(response);
    return response
}

// Update Date and Time

export const updateDateTime = async (body) => {
    const response = await commonRequest("PUT",`${BASE_URL}/updateDateTime/`,body)
    console.log(response);
    return response
}

// Get All Booked Date and Time

export const getAllDatesAndTimes = async () => {
    const response = await commonRequest("GET",`${BASE_URL}/bookedDatesTimes`)
    console.log(response);
    return response
}

// Profile Update

export const profileUpdate = async(body,header) => {
    const response = await commonRequest("POST",`${BASE_URL}/update_profile/`,body,header)
    console.log(response);
    return response
}


// User Details

export const getuserdetails = async (user_id) => {
    const response = await commonRequest("GET",`${BASE_URL}/userdetails/${user_id}`,'')
    console.log(response);
    return response
}


// Send Email

export const sendEmail = async (body) =>{
    const response = await commonRequest("POST",`${BASE_URL}/sendEmail`,body)
    console.log(response);
    return response
}