const connectToMongo = require('./db')
const cors = require("cors")
const express = require("express")
const app = express()
const PORT = 3500
const dotenv = require('dotenv')

dotenv.config()
connectToMongo()
app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})