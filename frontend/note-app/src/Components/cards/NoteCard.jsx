import React from 'react'
import {MdOutlinePushPin} from 'react-icons/md'
import moment from "moment";
import { MdCreate,MdDelete } from 'react-icons/md'

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}) => {
  return (
    <div>
        <div className='cursor-pointer border rounded p-4 mt-4 bg-white hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-sm text-slate-500'>{date}</span>
                </div>
                <div className=' rounded-full h-6 w-6 flex justify-center items-center active:bg-gray-500'>
                    <MdOutlinePushPin className={` cursor-pointer ${isPinned?'text-blue-500 ' : ' text-slate-300'}`} onClick={onPinNote}/>
                </div>
                
            </div>
            <p className='text-xs text-slate-600 mt-2 mb-1'>{content?.slice(0,60)}</p> 
            <div className='flex items-center  justify-between mt-2'>
                <div className='text-xs mb-1 text-slate-500'>
                    {tags.map((item)=>`#${item}`)}
                </div>
                <div className='flex items-center gap-2'>
                    <MdCreate
                        className='icon-btn hover:text-green-600 cursor-pointer'
                        onClick={onEdit}/>

                    <MdDelete
                    
                        className='cursor-pointer icon-btn hover:text-red-500'
                        onClick={onDelete}/>
                </div>
            </div>
        </div>
      
      
    </div>
  )
}

export default NoteCard


// icon-btn : text-xl text-slate-300 cursor-pointer hover:text-blue-500