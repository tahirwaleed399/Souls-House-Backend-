const mongoose = require("mongoose");
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({

     email : {
        type : String ,
        required : [true , " Please Enter The Email"],
        unique : [true, "Email already exist"] ,
        lowercase: true,
        trim:true,
        validate: [ isEmail, 'invalid email' ]
    },
    password : {
        type : String ,
        required : [true , " Please Enter The Password"],
        minLength: [8, "Password should be at least of 8 chaaracters"],
        select: false,
    },
    activated : {
        type: Boolean , 
        default: false   
    }
},
{
timestamps:true
});



module.exports = mongoose.model('User', userSchema);