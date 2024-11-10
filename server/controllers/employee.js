const Employee = require("../models/Employee")
const { fileUpload } = require('../utils/fileUploader')
const crypto = require('crypto')

exports.createEmployee = async (req, res) => {
    try {
        //extract other data and validate data
        const {
            name,
            email,
            mobile,
            designation,
            gender,
            course
        } = req.body

        if (!name || !email || !mobile || !designation || !gender || !course) {
            return res.status(400).json({
                success: false,
                message: "All fields are necessary"
            })
        }

        //extract and validate fileType
        const file = req?.files?.file
        console.log("file", file)

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File is required"
            })
        }

        const allowedTypes = ['image/jpeg', '/image/jpg', 'image/png']
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file type"
            })
        }

        //validating email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            })
        }

        const employee = await Employee.findOne({ f_Email:email })
        if (employee) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        //validating mobileNo
        const mobileRegex = /^[0-9]{10}$/
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mobile number format"
            })
        }


        //uploading image to cloudinary
        try {
            var result = await fileUpload(file)
        } catch (err) {
            console.log(err.message)
        }


        //generating unique id for new employee

        const prefix = "EMP-"
        const timestamp = Date.now()
        const hash = crypto.createHash('sha256').update(name + timestamp).digest('hex')
        const uniqueId = `${prefix}${hash.substring(0, 8)}`

        const genderDb = gender === 'M' ? "Male" : "Female"

        //creating entry in db
        const newEmployee = await Employee.create({
            f_id: uniqueId,
            f_Image: result.secure_url,
            f_Name: name,
            f_Email: email,
            f_Mobile: mobile,
            f_Designation: designation,
            f_gender: genderDb,
            f_Course: course,
        })

        return res.status(201).json({
            success: true,
            data: newEmployee,
            message: "New employee created successfully"
        })

    } catch (err) {
        console.log("Error in employee creation", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

exports.getAllEmployee = async (req, res) => {
    try {
        const Employees = await Employee.find({})
        return res.status(200).json({
            success: true,
            data: Employees,
            message: "All employees fetched successfully"
        })
    } catch (err) {
        console.log("Error in getting all employees", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

exports.editEmployee = async (req, res) => {
    try {
        const {
            f_id,
            name,
            email,
            mobile,
            designation,
            gender,
            course
        } = req.body

        const file = req?.files?.file
        if (!f_id) {
            return res.status(400).json({
                success: false,
                message: "employee id is required"
            })
        }
        const employee = await Employee.findOne({ f_id })
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            })
        }
        if (name) {
            employee.f_Name = name
        }
        if (email) {
            employee.f_Email = email
        }
        if (mobile) {
            employee.f_Mobile = mobile
        }
        if (designation) {
            employee.f_Designation = designation
        }
        if (gender) {
            const genderDb = gender === 'M' ? "Male" : "Female"
            employee.f_gender = genderDb
        }
        if (course) {
            employee.f_Course = course
        }
        if (file) {
            const result = await fileUpload(file)
            employee.f_Image = result.secure_url
        }

        await employee.save()

        return res.status(200).json({
            success: true,
            data: employee,
            message: "Employee updated successfully"
        })

    } catch (err) {
        console.log("Error in editing employee", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "employee id is required"
            })
        }
        const employee = await Employee.findOne({ f_id:id })
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            })
        }
        await Employee.findByIdAndDelete(employee._id)
        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        })
    } catch (err) {
        console.log("Error in deleting employee", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}
