const Login = require("../models/Login")
const bcrypt = require("bcrypt")

const initialValues = {
    s_no:1,
    userName:"Hukum Gupta",
    password:"123456"
}

exports.insertInitialLoginValues = async () => {
    //check if initial values are already there
    const existingLogin = await Login.findOne({userName:initialValues.userName})
    if(existingLogin){
        return
    }

    const hashedPassword = await bcrypt.hash(initialValues.password,5)

    await Login.create({
        s_no:initialValues.s_no,
        userName:initialValues.userName,
        password:hashedPassword
    })

    console.log("inserted initial values")
}