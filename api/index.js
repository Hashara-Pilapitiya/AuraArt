import axios from "axios";

const API_KEY = '44622310-a4e30bd6101c3dcefdff72651';

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
    
}

export const apiCall = async (params) => {
    try {
        const response = await axios.get(formatUrl(params));
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        return {success: false, msg: error.message}
    }
};