const express = require("express")
const dbConnect = require("./config/database")
const { insertInitialLoginValues } = require("./utils/insertInitialLoginValues")
const cloudinaryConnect = require("./config/cloudinary")
const fileUploader = require('express-fileupload')
const cookieParser = require("cookie-parser")
require("dotenv").config()
const auth = require('./routes/auth')
const employee = require('./routes/employee')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(fileUploader({
    useTempFiles: true,
    tempFileDir: "/tmp"
}))
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

//routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/employee', employee)

app.listen(PORT, () => {
    console.log(`server successfully running on PORT ${PORT}`)
})

app.get('/', (req, res) => {
    return res.send("server working")
})

cloudinaryConnect()
dbConnect()
insertInitialLoginValues()