import React,{useState} from 'react';
import './Signup.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email,setEmail] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const [valid,setValid] = useState(true);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errormessage,setErrormessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
      console.log(username,email,password);

      if(password.trim(' ').length<6){
        setValid(false);
        setErrormessage('Please enter password of length greater then 6');
      }else{
        setValid(true);
      }
      console.log(email.includes('@'))
      if(!email.includes('@')){
        setErrormessage("Please enter valid email");
        setValid(false);
      }else{
        setValid(true);
      }

      if(username.trim(' ').length<1){
        setErrormessage('Please enter valid username');
        setValid(false);
      }else{
        setValid(true);
      }
      if(valid){
        console.log(valid)
        setIsLoading(true)
        dispatch(register({email,username,password},navigate,setIsLoading));
      }
    }
    
  return (
    <div className='signup_body'>
      <h1 className='web_name'>TASKBOARD</h1>
        <div className='signup_content'>
            <div className='signup_header'>Sign up</div>
            <input className='signup_input_username input' onChange={(e)=>setUsername(e.target.value)} placeholder='Username'/>
            <input className='signup_input_email input' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
            <input className='signup_input_password input' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' type='password'/>
            {errormessage && <p style={{color:"tomato"}}>{errormessage}</p>}
            <button className='signup_button' disabled={isLoading && true} style={{cursor:`${isLoading?'no-drop':'pointer'}`}} onClick={submitHandler}>Sign up</button>
            <p>Have an account? <Link to={'/login'} className="link">Login</Link></p>
        </div>
    </div>
  )
}

export default Signup