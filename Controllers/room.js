const Room = require("../Models/Room");
const { catchAsyncErrors } = require("../Utils/catchAsyncErrors");
const NewErrorHandler = require("../Utils/NewErrorHandler");
const RoomDto = require('../Dtos/room-dto');
const { jsonResponce } = require("../Utils/responce");

exports.createRoom = catchAsyncErrors(async function(req , res , next){
    const {topic , type} = req.body ;
    const owner = req.user._id;
    const speakers = [owner];
    if(!topic) return next(new NewErrorHandler("No Topic Recieved" , 400));
   const room = await Room.create({topic , type , owner , speakers});
   jsonResponce(res , 201 , true , room);
   
})
exports.getRooms = catchAsyncErrors(async function(req , res , next){
 
   const rooms =(await Room.find().populate('owner').populate('speakers').exec()).map((room)=>new RoomDto(room));


   jsonResponce(res , 200 , true , {rooms});
   
})