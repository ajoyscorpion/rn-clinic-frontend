import axios from 'axios'

export const commonRequest = async(method,url,body,header) => {
    let config = {
        method,
        url,
        data:body,
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    console.log(config);

    // if(token){
    //     config.headers['access-token'] = token;
    //     console.log(token);
    // }

    try {
        const response = await axios(config)
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in Request :",error);
        throw error;
    }
}