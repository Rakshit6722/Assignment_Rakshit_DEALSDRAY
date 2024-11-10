const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    f_id:{
        type:String,
        required:true,
    },
    f_Image:{
        type:String,
        required:true,
    },
    f_Name:{
        type:String,
        required:true,
    },
    f_Email:{
        type:String,
        required:true,
    },
    f_Mobile:{
        type:Number,
        required:true,
    },
    f_Designation:{
        type:String,
        enum:["HR","Manager","Sales"],
        required:true,
    },
    f_gender:{
        type:String,
        enum:["Male","Female","Others"],
        required:true,
    },
    f_Course:{
        type:String,
        enum:["MCA","BCA","BSC"],
        required:true,
    },
    f_createDate:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model("Employee",employeeSchema)