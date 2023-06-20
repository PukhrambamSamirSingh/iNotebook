const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const fetchuser = require("../middleware/fetchUser")
const JWT_SECRET = "I am a good boy"

//Create a user using POST "/api/auth/createuser". No login required
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
],
    async (req, res) => {
        let success = false
        //If there are errors, Return bad requests and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Check whether the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success, error: "Sorry a user already exist with this email" })
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPwd = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPwd
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            success = true
            return res.status(200).json({ success, authtoken })
        } catch (error) {
            return res.status(500).json({ error: `Internal server error` })
        }
    })

//Login a user "/api/auth/login"
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
],
    async (req, res) => {
        let success = false
        //If there are errors, Return bad requests and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            success = true
            res.send({ success, authtoken })
        } catch (error) {
            return res.status(500).json({ error: `Internal server error` })
        }
    })

//Get loggedin user details using: Post "/api/auth/getuser". Login required
router.get("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: `Internal server error` })
    }
})

module.exports = router