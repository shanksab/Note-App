import React, { useState } from 'react'
import PasswordInput from '../../Components/inputs/PasswordInput';
import Navbar from '../../Components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance'




  const Signup = () => {

    
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const handleSingUp = async (e)=>{
      e.preventDefault()

      if(!name){
        setError("Please enter your name");
        return;
      }
      if(!validateEmail(email)){
        setError("Please enter a valid email adress.");
        return;
      }
      if(!password){
        setError("Please enter the password");
        return;
      }
      setError("")

      
  try{
    const response = await axiosInstance.post("/create-account",{
      fullName:name,
      email:email,
      password:password,
    });

    if(response.data && response.data.error){
      setError(response.data.message);
      return;
    }
    if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate("/dashboard")
      }

  }catch(error){
    if(error.response && error.response.data && error.response.data.message){
      setError(error.response.data.message)
    }else{
      setError("An unexpected error occured! try again")
    }
  }



    }

  

  return (
    <>
      
      <div className='flex items-center justify-center mt-50'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSingUp}>
              <h4 className='text-2xl mb-7 ml-30'>Notes</h4>

              
              <input type="text"value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' />

              <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' />
             
              
              
              <PasswordInput value={password} OnChange={e=>setPassword(e.target.value)}/>
              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
              <button type='submit' className='w-full text-sm cursor-pointer text-white bg-blue-500 p-2 rounded my-1 hover:bg-blue'>CREATE ACCOUNT</button>
              <p className='text-sm text-center mt-4'>
                  Already have an account?{""}
                  <Link to="/login" className='font-medium text-primary underline text-blue-500 ml-3'>
                      Login
                  </Link>
              </p>
          
          </form>
      </div>
    </div>
    </>
  
  )
}

export default Signup
