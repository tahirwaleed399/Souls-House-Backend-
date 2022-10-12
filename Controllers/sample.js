const Sample = require("../Models/Sample");
const { catchAsyncErrors } = require("../Utils/catchAsyncErrors");
const { jsonResponce } = require("../Utils/responce")

exports.getSample =  catchAsyncErrors(async function (req,res,next){
    // ye jo req res next he ye catchasyncerror jo function return kar raha he us mne se arahe not directly from node js 
    jsonResponce(res , 200 , true , ['sample']);

})

exports.createSample =  catchAsyncErrors(async function (req,res,next){
    let sample = await Sample.create(req.body);
    jsonResponce(res,201,true , sample);

})