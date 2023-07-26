import axiosClient from "./axiosServer"
import { useUserStore } from "@/zustand/store";
const getuser = async () => {
    try {
        const { data } = await axiosClient.post('auth/getuser');
        data.isauthenticated = true;
        useUserStore.setState(data);
        return data;
    }
    catch {
        const initialState = {
            name: '',
            email: '',
            image: '',
            mobile_number: '',
            createdAt: new Date,
            updatedAt: new Date,
            isauthenticated: false
        }
        useUserStore.setState(initialState);
        return null;
    }

}

export default getuser;