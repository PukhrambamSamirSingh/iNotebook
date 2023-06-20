import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getAllNotes()
        } else {
            navigate("/login")
        }
    }, [])
    const updateNote = (currentNote) => {
        setShowModal(true);
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    };
    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <>
            <AddNote />
            {showModal && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                        <div className="bg-white rounded-lg p-4 z-20 max-w-2xl">
                            <form className="bg-gray-500 shadow-md rounded px-20 pt-6 pb-8 mb-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="etitle">
                                        Title
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="etitle"
                                        name="etitle"
                                        type="text"
                                        value={note.etitle}
                                        onChange={handleChange}
                                        placeholder="Enter title"
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="eedescription">
                                        Description
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="edescription"
                                        name='edescription'
                                        type="text"
                                        rows={6}
                                        value={note.edescription}
                                        onChange={handleChange}
                                        placeholder="Enter description"
                                        minLength={10}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="etag">
                                        Tag
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="etag"
                                        name="etag"
                                        value={note.etag}
                                        onChange={handleChange}
                                        placeholder="Enter tag"
                                    ></input>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Update Note
                                    </button>
                                </div>
                            </form>
                            <button
                                className="bg-gray-700 cursor-pointer text-white py-2 px-4 rounded hover:bg-gray-800"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </>
            )}

            <div className="flex flex-wrap justify-center">
                <h1 className="text-3xl font-bold mt-8 mb-4 w-full text-center">Your Notes</h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {notes.length === 0 && (
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-md m-2">
                            <p className="text-lg text-white">No notes to display.</p>
                        </div>
                    )}
                    {notes.map((note) => (
                        <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    ))}
                </div>
            </div>

        </>
    );

};

export default Notes;
