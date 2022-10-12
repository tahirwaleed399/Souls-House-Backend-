const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , " Please Enter The Name"],
        unique : true ,
        minLength : [3, 'Minimum Characters of a name are three']
    },  
     email : {
        type : String ,
        required : [true , " Please Enter The Email"],
        unique : true ,
    },
  

});


module.exports = mongoose.model('Sample', sampleSchema);