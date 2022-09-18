import axios from "axios";
import {API_KEY} from '@env';

async function getAstroidInfo(ASTEROID_ID: any) {
    
    try {
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${ASTEROID_ID}?api_key=${API_KEY}`);           
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("ERROR:check axios:", error.message);
            return '404';
        }else{
            console.log("ERROR: something else", error);
            return "404"
        }
    }
}

export default getAstroidInfo;