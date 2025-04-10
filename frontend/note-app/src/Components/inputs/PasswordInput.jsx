import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'


const PasswordInput = ({value,OnChange,placeholder}) => {

    const [isShowPassword,setisShowPassword] = useState(false);


    const toggleShowPassword = ()=>{
        setisShowPassword(!isShowPassword);
    }


  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'> 
        <input
            value={value}
            onChange={OnChange}
            type={isShowPassword ? "text" : "password"}
            placeholder={placeholder||'Password'}
            className='w-full text-sm bg-transparent py-2 mr-3 rounded outline-none '

        />

        {
            isShowPassword ? (
                <FaRegEye
                size={22}
                className="text-blue-500 cursor-pointer"
                onClick={()=>toggleShowPassword()}
            />
            ):(
                <FaRegEyeSlash
                    size={22}
                    className='text-slate-400 cursor-pointer'
                    onClick={()=>toggleShowPassword()}
                />
            )
        }
       



    </div>
  )
}

export default PasswordInput
