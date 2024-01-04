import axios from '../helpers/axiosHelper';

export default async function UseAuth(props) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/signin`, {
            username: props.username,
            password: props.password
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return response.data.message;
        }
    } catch (e) {
        console.error(e);
    }
}
