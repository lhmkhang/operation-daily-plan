import axios from "@/components/helpers/axiosHelper";

type Props = {
    username: string,
    password: string
}

export default async function UseSignUp(props: Props) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/signup`, {
            username: props.username,
            password: props.password
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (e) {
        console.error(e);
    }
}