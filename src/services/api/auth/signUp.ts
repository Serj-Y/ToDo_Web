import axios from "axios";
import {BASE_URL} from "../../../consts/BASE_URL";
type SignUpPropsType = {
    name: string
    email: string
    password: string
}
export const SignUp = async () => {
  await axios.post<{ token: string }>(`${BASE_URL}auth/signup`, {
            name:"serj",
            email: 'user@example.com',
            password: 'password123'}, )
            .then(response => {
                console.log('Signup successful');
                console.log('Token:', response.data.token);
                return response.data.token
            })
            .catch(error => {
                console.error('Signup failed:', error.response.data.message);
            })

}
