const express = require("express")
const fetchuser = require("../middleware/fetchUser")
const Notes = require("../models/Notes")
const router = express.Router()
const { body, validationResult } = require("express-validator")


//Fetch all notes "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

//Create a note "/api/notes/createnote"
router.post("/createnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description should be atleast 5 characters").isLength({ min: 10 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //If there are errors, Return bad requests and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        return res.status(200).json(saveNote)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
})

//Updating a note "/api/notes/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //Create a new note
        const newNote = {}
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }
        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.status(200).json(note)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
})

//Delete a note "/api/notes/deletenote"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body

        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
        //Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        return res.status(200).json({ "Success": "Note has been deleted successfully" })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router