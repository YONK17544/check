import axios from 'axios';
import { errorToast } from './toastify.service';

const serverURL = "http://localhost:8080";

export const postData = async (url: string, data: any) => {
    try {
        const response = await axios.post(`${serverURL}/${url}`, data);
        return response.data;
    } catch (error: any) {
        errorToast(error.response.data.message)
    }
}

export const postDataWithJWT = async (url: string, data: any) => {
    try {
        const token = useSelector((state: any) => state.auth.token);
        const response = await axios.post(`${serverURL}/${url}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        errorToast(error.response.data.message);
    }
}
