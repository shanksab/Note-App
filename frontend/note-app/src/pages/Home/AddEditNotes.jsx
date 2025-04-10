import React, { useState } from 'react'
import TagInput from '../../Components/inputs/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';


const AddEditNotes = ({noteData,type,getAllNotes ,onClose, showToastMssage}) => {

    const [title,setTitle] = useState(noteData?.title || "");
    const [content,setContent] = useState(noteData?.content || "");
    const [tags,setTags] = useState(noteData?.tags || []);

    const [error,setError] = useState(null);

    const addNote = async ()=>{
        try{
            const response = await axiosInstance.post("/add-note",{
                title,
                content,
                tags, 
                
            });
            if(response.data && response.data.note){
                getAllNotes();
                showToastMssage("Note Added Successfully");
                onClose();
            }
        }catch(error){
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                setError(error.response.data.message)
            }
            console.log(error)
        } 
    }

    const editNote = async ()=>{
        const noteId = noteData._id;
        try{
            const response = await axiosInstance.put("/edit-note/"+noteId,{
                title,
                content,
                tags, 
                
            });
            if(response.data && response.data.note){
                getAllNotes();
                onClose();
                showToastMssage("Note Updated Successfully");

            }
        }catch(error){
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                setError(error.response.data.message)
            }
            console.log(error)
        } 
    }

    const handleAddNote = ()=>{
        if(!title){
            setError("Please enter the title.");
            return;
        }

        if(!content){
            setError("Please enter the content of your note.");
            return;
        }
        setError("");

        if(type === 'edit'){
            editNote();
        }else{
            addNote();
        }
      
    }

    return (
    <div className='relative'>

        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -right-3 -top-3 hover:bg-slate-50' 
                onClick={onClose}>
            <MdClose className='text-xl text-slate-400'/>
        </button>


        <div className='flex flex-col gap-2'>
            <label className='text-xs text-slate-400'>Title</label>
            <input type="text" 
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Go To Gym At 5'
                    value={title}
                    onChange={({target})=>setTitle(target.value)}/>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='text-2xl text-slate-950 outline-none'>CONTENT</label>
            <textarea  type="text"
                       className='text-sm text-late-950 outline-none p-2 bg-slate-50 rounded'
                       placeholder='Content'
                       value={content}
                       onChange={({target}) => setContent(target.value)}
                       rows={10}></textarea>
        </div>
        <div className='mt-3'>
            <label className='text-2xl text-slate-950 outline-none'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>

        {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

        <button className=' font-medium mt-5 p-3 bg-blue-500 w-full text-white cursor-pointer ' onClick={handleAddNote}>{type === 'edit' ? "Update" : "ADD"}</button>
    </div>

  )
}

export default AddEditNotes
