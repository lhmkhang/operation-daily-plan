import axios from 'axios';

type Props = {
    username: string,
    password: string
}

export default async function useAuth(props: Props) {
    try {
        const response = await axios.post('http://10.1.23.167:8090/api/v1/login', {
            username: props.username,
            password: props.password
        });
        if (response.status === 200) {
            console.log(response);
            
            localStorage.setItem('access-token', response.data.token)
            localStorage.setItem('access-time', response.data.receivedTime)
            localStorage.setItem('expire-time', response.data.expiresIn)
            return "Success";
        } else {
            return response.data.message;
        }
    } catch (e) {
        console.error(e);
        return "Fail";
    }
}