import axios from "axios";
import { createBrowserHistory } from 'history';
import {
    loginFail,
    loginStart,
    loginSuccess,
    registerFail,
    registerStart,
    registerSuccess,
} from "./authSlice";
import {useNavigate} from "react-router-dom";


export const browserHistory = createBrowserHistory();
export const loginUser = async (form, dispatch, navigate, toast) => {
    const LOGIN_API = process.env.REACT_APP_FETCH_API;
    dispatch(loginStart());
    try {
        const res = await axios.post(`${LOGIN_API}/auth/login`, form);
        dispatch(loginSuccess(res.data));
        toast.current.show({severity: 'success', summary: 'Success', detail: 'Login successfully', life: 1000})
        setTimeout(() => {
            navigate("/")
        }, 1000);

    } catch (err) {
        dispatch(loginFail());
        toast.current.show(
            {severity: 'error', summary: 'Error', detail: 'Login fail', life: 1500})
    }
}
export const signUpUser = async (data, dispatch, navigate, toast) => {
    const LOGIN_API = process.env.REACT_APP_FETCH_API;
    dispatch(registerStart());
    try {
        const res = await axios.post(`${LOGIN_API}/users`, data);
        dispatch(registerSuccess());
        toast.current.show(
            {severity: 'success', summary: 'Success', detail: 'Create account successfully', life: 1000})
        setTimeout(() => {
            navigate("/login")
        }, 1000);

    } catch (err) {
        dispatch(registerFail(err.response.data));
        toast.current.show(
            {severity: 'error', summary: 'Error', detail: 'Create account fail', life: 1500})

    }
}

// export const logout = async (dispatch,navigate,token) =>{
//     dispatch(loginStart());
//     try{
//
//     }catch ()
// }