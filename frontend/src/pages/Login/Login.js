import React,{useState} from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const Login = () => {
    const [email,setEmail] = useState("");

    const {error, isLoading} = useSelector(state => state.user);

    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
        dispatch(login({email,password},navigate));
    }

    console.log(error);

  return (
    <div className='login_body'>
      <h1 className='web_name'>TASKBOARD</h1>
        <div className='login_content'>
            <div className='login_header'>Login</div>
            <input className='login_input_email input' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
            <input className='login_input_password input' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' type='password'/>
            <button className='login_button' disabled={isLoading && true} style={{cursor:`${isLoading?'no-drop':'pointer'}`}} onClick={submitHandler}>Login</button>
            {error && <p style={{color:"tomato"}}>please enter valid credentials</p>}
            <p>Don`t have an account? <Link to={'/signup'} className="link">Create account</Link></p>
        </div>
    </div>
  )
}

export default Login