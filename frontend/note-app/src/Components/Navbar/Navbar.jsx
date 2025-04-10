import React,{useState} from 'react';
import './Navbar.css';
import ProfileInfo from '../cards/ProfileInfo';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';


const Navbar = ({userInfo, onSearchNote}) => {


  const [searchQuery,setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = ()=>{
      navigate("/login");
      localStorage.clear();
  }

  const handleSearch = ()=>{
      if(searchQuery){
        onSearchNote(searchQuery);
        console.log(searchQuery)
      }
  }

  const onClearSearch = ()=>{
    setSearchQuery("");
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-3xl font-medium text-black py-2'>Notes</h2>
        <SearchBar value={searchQuery} onChange={({target})=>{setSearchQuery(target.value)}} handleSearch={handleSearch} onClearSearch={onClearSearch}/>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar
