import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = ({ children }) => {
    const host = "http://localhost:3500"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all notes
    const getAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const json = await response.json()
        setNotes(json)
    }
    //Add a note
    const addNote = async (title, description, tag) => {
        //Api Call
        const response = await fetch(`${host}/api/notes/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json()
        const note = {
            "_id": json._id,
            "title": title,
            "description": description,
            "tag": tag
        }
        setNotes([...notes, note])
    }
    //Delete a note
    const deleteNote = async (id) => {
        //Api Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const json = await response.json()
        setNotes(notes.filter((note) => note._id !== id))
    }
    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //Api Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json()
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit the client side
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break
            }
        }
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{ notes, getAllNotes, addNote, deleteNote, editNote }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState
