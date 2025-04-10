import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProfileInfo from '../../Components/cards/ProfileInfo'
import NoteCard from '../../Components/cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import { data, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import axiosInstance from '../../utils/axiosinstance'
import moment from "moment";
import Toast from '../../Components/ToastMessage/Toast'
import EmptyCard from '../../Components/EmptyCard/EmptyCard'

const Home = () => {

  const [isSearch,setIsSearch] = useState(false);
  const [allNotes,setAllNotes] = useState([]);
  const [openAddEditModal,setOpenAddEditModal] = useState({
      isShown:false,
      type:'add',
      data:null,
  });

  const [showToastMessage,setShowToastMessage] = useState({
    isShown : false,
    message : '',
    type : "add"
  })


  const [userInfo,setUserInfo] = useState(null);
  const navigate = useNavigate();


  const handleEdit = (noteDetails)=>{
      setOpenAddEditModal({isShown:true, data:noteDetails, type:"edit"})
  }

  const showToastMssage = (message,type)=>{
    setShowToastMessage({
      isShown:true,
      message ,
      type
    })
  }


  const handleCloseToast = ()=>{
    setShowToastMessage({
      isShown:false,
      message : ''
    })
  }


  const getUserInfo = async ()=>{
    try{
      
        const response = await axiosInstance.get('/get-user');
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
        console.log(response.data.user.fullName)   
        console.log(response.data.user)   
      }
    }catch(error){
      if(error.response && error.message.status === 401){
        localStorage.clear();
        navigate("/login");
      }
    }
  }
 

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
  
      if (response.data && response.data.notes) {
        // Filter notes to display only those that match the query
        const filteredNotes = response.data.notes.filter(note => {
          return note.title.toLowerCase().includes(query.toLowerCase()) ||
                 note.content.toLowerCase().includes(query.toLowerCase());
        });
  
        setIsSearch(true);
        setAllNotes(filteredNotes); // Only show filtered notes
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(
    ()=>{
      getAllNotes();
      getUserInfo();
      return ()=>{};
    },[]
  )

  const getAllNotes= async ()=>{
    try{
      const response = await axiosInstance.get("/get-all-notes");
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
        
      }
    }catch(error){
      console.log("An unexpected error occurred!");
    };
  }

  const deleteNote = async( data )=>{
    const noteId =data._id;
    try{
        const response = await axiosInstance.delete("/delete-note/"+noteId);
        if(response.data && !response.data.error){
              getAllNotes();
           
              showToastMssage("Note Deleted Successfully","delete");

          }
      }catch(error){
          if(
              error.response &&
              error.response.data &&
              error.response.data.message
          ){
            console.log("An unexpected error occurred!");
          }
          console.log(error)
        } 
  }

  const updateIsPinned = async (noteData) => { 
    const noteId = noteData._id; 
    try {
        const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
            isPinned: !noteData.isPinned 
        });
        if (response.data && response.data.note) {
            getAllNotes();
            showToastMssage("Note Updated Successfully", "update");
        }
    } catch (error) {
        console.log(error);
    } 
};

  
  return (
   <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote}/>
      <div className='container mx-auto pr-5'> 
        { allNotes.length > 0 ? <div className='grid grid-cols-3 gap-4 mt-8 ml-4'>
        {allNotes.map((item, index) => {
            
            return (
            <NoteCard 
            key={item._id}
            title={item.title}
            date={ new Date(item.createdOn).toLocaleString("en-US")}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => {handleEdit(item)}}
            onDelete={() => {deleteNote(item)}}
            onPinNote={() => updateIsPinned(item)}
        />
    );
})}
         
        </div> : <EmptyCard/>}
      </div>
      <button onClick={()=>{
            setOpenAddEditModal({isShown:true, type:"add" , data:null})
          }} 
            className='cursor-pointer w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10' >
          <MdAdd className='text-{32px} text-white' />
      </button>

      <Modal
          
          isOpen = {openAddEditModal.isShown}
          onRequestClose = {()=>{}}
          style={
            {
              overlay:{
                backgroundColor:"rgba(0,0,0,0.2)",
              },
            }
          }
          contentLabel=''
          className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 '
      >
      <AddEditNotes 

        type = {openAddEditModal.type}  
        noteData={openAddEditModal.data}
        onClose={()=>{
          setOpenAddEditModal({isShown:false,type:'add',data:null})
      }}
       getAllNotes = {getAllNotes}
       showToastMssage = {showToastMssage}
      />
      
      </Modal>
      <Toast

        isShown = {showToastMessage.isShown}
        message = {showToastMessage.message}
        type = {showToastMessage.type}
        onClose = {handleCloseToast}


      />
   </>
  )
}

export default Home
