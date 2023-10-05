import axios from 'axios';

type User = {
    user: string,
    password: string
}
export default async function useAuth(props: User) {
    try {
        const response = await axios.post('http://10.1.23.167:8080/login', {
            username: props.user,
            password: props.password
        });
        if (response.status === 400) {
            return response.statusText;
        } else {
            localStorage.setItem('access-token', response.data.token)
            localStorage.setItem('access-time', response.data.receivedTime)
            localStorage.setItem('expire-time', response.data.expiresIn)
            return "Success";
        }
    } catch (e) {
        console.error(e);
        return "Fail";
    }
}