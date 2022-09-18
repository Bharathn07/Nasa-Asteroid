import axios from "axios";
import Asteroid from '../interface/Asteroid'
import {API_KEY} from '@env';

async function getRandomAstroidInfo() {
    console.log('api called');
    
    try {
        const response = await axios.get<Asteroid>(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`);           
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

export default getRandomAstroidInfo;