const User = require("../Models/User");
const { catchAsyncErrors } = require("../Utils/catchAsyncErrors");
const { jsonResponce } = require("../Utils/responce");
const jwt = require("jsonwebtoken");
const OtpService = require("../Services/otp");
const HashService = require("../Services/hash");
const NewErrorHandler = require("../Utils/NewErrorHandler");
const TokenService = require("../Services/token");

exports.sendOtp = catchAsyncErrors(async function (req, res, next) {
  const { email, password } = req.body;


  if (!email || !password)
    return jsonResponce(res, 400, false, { message: "Email Or Password Not Recieved" });
    console.log({ email, password });
  const pureOtp = OtpService.generateOtp();
  console.log(pureOtp)
  const hashedOtp = HashService.hash(pureOtp);
  const hashedPassword = HashService.hash(password);
  const data = {
    hashedOtp,
    email,
    date: Date.now(),
    password : hashedPassword 
  };


  const otpToken = jwt.sign({ data }, process.env.OTP_JSONWEBTOKEN_PRIATEKEY, {
    expiresIn: "1h",
  });


  const responce = await OtpService.sendOtpToMail(email, pureOtp);

  jsonResponce(res, 200, true, { otpToken, pureOtp });
});

exports.verifyOtp = catchAsyncErrors(async function (req, res, next) {
  const { otpToken, pureOtp } = req.body;
  const hashedOtp = HashService.hash(pureOtp);
  const { data } = jwt.verify(otpToken, process.env.OTP_JSONWEBTOKEN_PRIATEKEY);
 const {email , password}  = data ;
 

 

  if (data.hashedOtp === hashedOtp) {
    let user = await User.create({email, password});
    if(user){
      let {accessToken , refreshToken} = TokenService.generateTokens(data);
      res.cookie('soulsHouseAccessToken',accessToken, { maxAge: 900000, httpOnly: true })
      res.cookie('soulsHouseRefreshToken',refreshToken, { maxAge: 900000, httpOnly: true })
      jsonResponce(res, 200, true, "Verified and Account created");
    }
  } else {
   return next(new NewErrorHandler('Otp Not Verified', 400))
  }
});
