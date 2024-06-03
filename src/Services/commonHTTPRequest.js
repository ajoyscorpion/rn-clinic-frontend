import axios from 'axios'

export const commonRequest = async(method,url,body,header) => {
    let config = {
        method,
        url,
        data:body,
        headers : header ? header :
        {
            'Content-Type' : 'application/json',
            //...header
        }
    }

    console.log(config);

    // if(token){
    //     config.headers['access-token'] = token;
    //     console.log(token);
    // }

    try {
        console.log("fuck");
        const response = await axios(config)
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error) {
        // Logging detailed error information
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error("Error response:", error.response);
            console.error("Status code:", error.response.status);
            console.error("Response data:", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No response received:", error.request);
        } else {
            // Something happened while setting up the request
            console.error("Error in request setup:", error.message);
        }
        // Logging the full error object for further investigation
        console.error("Error config:", error.config);
        throw error;
    }
}

//header = {}