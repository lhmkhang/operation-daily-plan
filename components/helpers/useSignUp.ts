import axios from 'axios';

type Props = {
    username: string,
    password: string
}

export default async function useSignUp(props: Props) {
    try {
        const response = await axios.post('http://10.1.26.196:8090/api/v1/signup', {
            username: props.username,
            password: props.password
        });
        if (response.status === 200) {
            return "Success";
        } else {
            return response.data.message;
        }
    } catch (e) {
        console.error(e);
        return "Fail";
    }
}