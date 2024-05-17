import { commonRequest } from "./commonHTTPRequest";

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