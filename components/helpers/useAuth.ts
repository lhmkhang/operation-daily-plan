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
        console.log(response);
        
        if (response.status === 200) {
            console.log(response);
            
            localStorage.setItem('access-token', response.data.accessToken)
            localStorage.setItem('refresh-token', response.data.refreshToken)
            return "Success";
        } else {
            return response.data.message;
        }
    } catch (e) {
        console.error(e);
        return "Fail";
    }
}