import axios from 'axios';
import '../App.css'
import { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [currentState, setCurrentState] = useState('Login');
  const user = JSON.parse(localStorage.getItem('user'))
 const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async(e)=>{
    e.preventDefault();
   try {
    if(currentState === 'Sign Up'){
      const resp = await API.post('/user/signup',{
        name,
        email,
        password
      })
      toast.success(resp.data.message);
      localStorage.removeItem('user')
      localStorage.setItem('user',JSON.stringify(resp.data.user))
      navigate('/')
    } else{
      const resp = await API.post('/user/login',{
        email,
        password
      })
      if(resp.data.user){
        localStorage.setItem('user',JSON.stringify(resp.data.user))
        console.log(localStorage.getItem('user'))
        navigate('/')
      } else{
        toast.error(resp.data.message)
      }
    }
   } catch (error) {
    console.log(error)
    toast.error(error.message)
   }
   
}
  return (
    <div className="loginpage">
    <form onSubmit={onSubmit} className='login'>
      <div className='login-1'>
        <p className='login-2'>{currentState}</p>
        <p className='line-1'></p>
      </div>
      <div className="loginform">
        {currentState === 'Login'? '':
      <div className="md-6">
    <label htmlFor="inputName14" className="form-label">Name</label>
    <input type="text" className="form-control" id="inputName14" value={name} onChange={(e) => setName(e.target.value)} required/>
  </div>
}
  
      <div className="md-6">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" id="inputEmail4"  onChange={(e) => setEmail(e.target.value)} value={email} required/>
  </div>
  <div className="md-6">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control" id="inputPassword4" value={password} onChange={(e) => setPassword(e.target.value)} required/>
  </div>
  </div>
  <div className="login-3">
    <p>Forgot your password?</p>
   {currentState === 'Login'?
   <p onClick={() => setCurrentState('Sign Up')}>Create Account</p>: 
   <p onClick={() => setCurrentState('Login')}>Login Here</p>
   } 
  </div>
  <div className='login-4'>
  <button  type="submit" className="btn btn-dark login-btn">{currentState === 'Login'? 'Sign In': 'Sign Up'}</button>
  </div>
    </form>
    </div>
  );
}

export default Login;