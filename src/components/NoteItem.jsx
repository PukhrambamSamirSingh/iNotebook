import React, { useContext } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import noteContext from '../context/notes/NoteContext'

const NoteItem = ({ note, updateNote }) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    return (
        <div className="max-w-xs bg-white hover:bg-gray-100 shadow-lg rounded-lg overflow-hidden my-4 mx-auto" style={{ width: "100%" }}>
            <div className="px-4 py-2">
                <h1 className="text-gray-900 font-bold text-xl uppercase">{note.title.substring(0, 24)}...</h1>
                <p className="text-gray-600 text-sm mt-1">{note.description.substring(0, 100)}...</p>
                <p className="text-gray-700">{note.tag}</p>
            </div>
            <div className="px-4 py-2 flex justify-end">
                <MdDelete onClick={() => deleteNote(note._id)} className="text-gray-700 mx-2 hover:text-gray-800 cursor-pointer text-2xl" />
                <FaEdit onClick={() => updateNote(note)} className="text-blue-500 mx-2 hover:text-blue-700 cursor-pointer text-2xl" />
            </div>
        </div>
    )
}

export default NoteItem
