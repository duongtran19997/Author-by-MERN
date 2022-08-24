import axios from 'axios';
import setBearer from "../../utils/setBearer";

const API_URL = process.env.REACT_APP_API_ENDPOINT +'/users/';
//Register user
const register = async (userData) => {
    const res = await axios.post(API_URL,userData)

    // if(res.data){
    //     localStorage.setItem('user',JSON.stringify(res.data))
    // }
    return res.data
}
//login user
const login = async (userData) => {
        const res = await axios.post(API_URL+'login',userData)
    console.log(res.data)
        if(res.data){
            localStorage.setItem('token',JSON.stringify(res.data.token))
            setBearer(res.data.token)
        }
        return res.data
}

 const loadUser = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){
        setBearer(token);
        const res = await axios.get(API_URL+'me')
        return res.data;
    }
}

const logout = async ()=>{
    localStorage.removeItem('token')
}

const authService = {
    register,
    logout,
    login,
    loadUser
}

export default authService