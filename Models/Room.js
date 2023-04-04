const mongoose = require("mongoose");
const { isEmail } = require("validator");

const roomSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    speakers : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    type : {
        type : String ,
        required : [true , "Type is Required"],
        enum : ['public','social', 'closed'],
        default:'public'

    }, topic : {
        type : String ,
        required : [true , "Topic is Required"],

    },
  },
  {
    timestamps: true,
  }
);





module.exports = mongoose.model("Room", roomSchema);
