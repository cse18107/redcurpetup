import { LOAD_USER_FAIL,LOAD_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constants/userConstants"
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/getBaseUrl";

export const login = ({email, password},navigate) => async (dispatch) => {

    try{

        dispatch({type:LOGIN_USER_REQUEST});

        await fetch(`${baseURL}/api/user/login`,{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json'
            }
        }).then((res)=>res.json()).then((data)=>{
            localStorage.setItem("task-token",data.message.token);
            dispatch({type:LOGIN_USER_SUCCESS,payload:data.message});
            navigate('/home');
        })

    }catch(error) {
        dispatch({type:LOGIN_USER_FAIL,payload:error.message});
    }
};

export const register = ({username,email,password},navigate,setIsLoading) => async (dispatch) =>{
    // const navigate = useNavigate();
    try{
        dispatch({type:REGISTER_USER_REQUEST});

        await fetch(`${baseURL}/api/user/signup`,{
           method:'POST',
           body:JSON.stringify({username,email,password}),
           headers:{
               'Content-Type':'application/json',
               Accept:'application/json'
           }
        }).then((res)=>{return res.json();}).then((data)=>{
            dispatch({type:REGISTER_USER_SUCCESS});
            setIsLoading(false);
            navigate('/login')
        });

    }catch(error){
        dispatch({type:REGISTER_USER_FAIL,payload:error.message});
    }
};

export const loadUser = (navigate) => async (dispatch) => {
    try{
        const token = localStorage.getItem('task-token');

        if(token){
            await fetch(`${baseURL}/api/user/me`,{
                method:'GET',
                headers:{
                    token:`Bearer ${token}`
                }
            }).then(res=>res.json()).then((data)=>{
                dispatch({type:LOAD_USER_SUCCESS,payload:data.message});
                navigate('/home');
            });
        }else{
            navigate('/login');
        }
        
    }catch(error){

        dispatch({type:LOAD_USER_FAIL,payload:error.message});
    }
};

export const logout = ()=> (dispatch) => {
    try{
        // dispatch({type:LOGOUT_USER_REQUEST});
        localStorage.setItem('task-token',"");
        dispatch({type:LOGOUT_USER_SUCCESS});
    }catch(error){
        dispatch({type:LOGOUT_USER_FAIL});
    }
}