import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../Components/inputs/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault()
    if(!validateEmail(email)){
      setError("Please enter a valid email address!");
      return;
    }
    if(!password){
      setError("Please enter the password")
      return;
    }
    setError("");


    try{
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
    }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate('/dashboard')
      }

    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        console.log(error.response?.data || error.message);
        setError("An unexpected error occured! try again")
      }
    }
  };

  return (
    <>


    <div className='flex items-center justify-center mt-50'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
            <form onSubmit={handleLogin}>
                <h4 className='text-2xl mb-7 ml-30'>Notes</h4>
                <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' />
                <PasswordInput value={password} OnChange={(e)=>setPassword(e.target.value)}/>
                
                {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                <button type='submit' className='w-full text-sm cursor-pointer text-white bg-blue-500 p-2 rounded my-1 hover:bg-blue'>Login</button>
                <p className='text-sm text-center mt-4'>
                  Not registered yet?{""}
                  <Link to="/signUp" className='font-medium text-primary underline text-blue-500 ml-3'>
                      Create an Account
                  </Link>
                </p>
            </form>
        </div>
    </div>
    
    </>
    
  )
}

export default Login


//    primary : #2B85FF   secondary:#EF863E