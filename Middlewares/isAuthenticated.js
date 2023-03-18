const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const NewErrorHandler = require('../Utils/NewErrorHandler');
const {catchAsyncErrors} = require('../Utils/catchAsyncErrors');
module.exports = catchAsyncErrors(async (req , res , next) => {

    const {soulsHouseAccessToken : accessToken } =req.cookies;
    if(!accessToken) next(new NewErrorHandler("Not Authenticated" , 401));
    let {email} = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_KEY);
    let user = await User.findOne({email});

    if(!user) next(new NewErrorHandler("Not Authenticated" , 403));

    req.user = user ;
    next();

})