const cloudinary = require('cloudinary').v2
require('dotenv').config()

exports.fileUpload = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: process.env.FOLDER
        })
        return result
    } catch (err) {
        console.log("Error uploading file",err)
    }
}