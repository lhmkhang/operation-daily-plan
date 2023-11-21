import axios from 'axios';

type Props = {
    username: string,
    password: string
}

export default async function useAuth(props: Props) {
    try {
        const response = await axios.post('http://localhost:8090/api/v1/signin', {
            username: props.username,
            password: props.password
        });

        if (response.status === 200) {
            sessionStorage.setItem('access-token', response.data.accessToken)
            sessionStorage.setItem('refresh-token', response.data.refreshToken)
            return "Success";
        } else {
            return response.data.message;
        }
    } catch (e) {
        console.error(e);
        return "Fail";
    }
}
