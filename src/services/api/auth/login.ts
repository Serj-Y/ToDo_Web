import axios from "axios";
import {BASE_URL} from "../../../consts/BASE_URL";


type LoginPropsType = {
    email: string
    password: string
}
export const Login = async () => {
const data =  await axios.post<{ token: string }>(`${BASE_URL}auth/login`, {
        email: 'user@example.com',
        password: 'password123'
    })
        .then(response => {
            console.log('Login successful');
            // console.log('Token:', response.data);
           return response.data
        })
        .catch(error => {
            console.error('Login failed:', error.response.data.message);
        });
return data
}
