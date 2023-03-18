const User = require("../Models/User");
const { catchAsyncErrors } = require("../Utils/catchAsyncErrors");
const { jsonResponce } = require("../Utils/responce");
const jwt = require("jsonwebtoken");
const OtpService = require("../Services/otp");
const HashService = require("../Services/hash");
const NewErrorHandler = require("../Utils/NewErrorHandler");
const TokenService = require("../Services/token");
const UserDto = require("../Dtos/user-dto");
const RefreshToken = require("../Models/RefreshToken");
const cloudinary = require("cloudinary").v2;
exports.sendOtp = catchAsyncErrors(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password)
    return jsonResponce(res, 400, false, {
      message: "Email Or Password Not Recieved",
    });
  console.log({ email, password });
  const pureOtp = OtpService.generateOtp();
  console.log(pureOtp);
  const hashedOtp = HashService.hash(pureOtp);
  const hashedPassword = HashService.hash(password);
  const data = {
    hashedOtp,
    email,
    date: Date.now(),
    password: hashedPassword,
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
  const { email, password } = data;

  if (data.hashedOtp === hashedOtp) {
    let user = await User.create({ email, password });

    if (user) {
      let { accessToken, refreshToken } = await TokenService.generateTokens(
        { userId: user._id, email: user.email },
        user._id,
        res,
        next
      );

      jsonResponce(res, 200, true, {
        message: "Verified and Account created",
        user: new UserDto(user),
      });
    }
  } else {
    return next(new NewErrorHandler("Otp Not Verified", 400));
  }
});

exports.activateUser = catchAsyncErrors(async function (req, res, next) {
  let { profile, name, userId } = req.body;
  if (!name || !userId)
    return next(new NewErrorHandler("Name or UserId not recieved", 403));
  const user = await User.findById(userId);
  if (!user) next(new NewErrorHandler("User not found", 403));
  if (user.activated === true)
    return next(new NewErrorHandler("User already activated", 403));

  if (profile) {
    console.log("I am uploading");
    const { url, public_id } = await cloudinary.uploader.upload(profile, {
      folder: process.env.CLOUDINARY_FOLDER,
    });
    console.log({ url, public_id });
    profile = { url, public_id };
  }
  user.profile = profile;
  user.activated = true;
  await user.save();
  jsonResponce(res, 201, true, { user: new UserDto(user) });
});
exports.refreshTokens = catchAsyncErrors(async function (req, res, next) {
  const { soulsHouseRefreshToken, soulsHouseAccessToken } = req.cookies;
  if (!soulsHouseAccessToken || !soulsHouseRefreshToken)
    return next(new NewErrorHandler("Invalid Token", 403));

  let { email } = jwt.verify(
    soulsHouseRefreshToken,
    process.env.JWT_REFRESH_TOKEN_KEY
  );
  let user = await User.findOne({ email });
  console.log(user);
  if (!user) return next(new NewErrorHandler("Invalid Token", 401));

  let databaseToken = await RefreshToken.findOne({
    user: user._id,
  });
  console.log(databaseToken)
  if (!databaseToken) return next(new NewErrorHandler("Invalid Token", 403));

  if (!(databaseToken.refreshToken === soulsHouseRefreshToken))
    return next(new NewErrorHandler("Invalid Token", 403));

  const { accessToken, refreshToken } = await TokenService.generateTokens(
    { userId: user._id, email: user.email },
    user._id,
    res,
    next
  );
  let newRefreshToken = await RefreshToken.updateOne(
    { _id: databaseToken._id, user: user._id },
    { refreshToken },
    { new: true }
  );

  jsonResponce(res, 200, true, { user: new UserDto(user) });
});
exports.signIn = catchAsyncErrors(async function (req, res, next) {
  console.log("sign in called");
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password").exec();

  if (!user)
    return next(new NewErrorHandler("No user Find With the email"), 404);
  const isPasswordCorrect = HashService.hash(password) === user.password;

  if (!isPasswordCorrect)
    return next(new NewErrorHandler("Password is incorrect", 401));
  TokenService.generateTokens(
    { userId: user._id, email: user.email },
    user._id,
    res,
    next
  )
    .then((responce) => {
      console.log(responce);
     jsonResponce(res , 200 , true , {user : new UserDto(user)})
    })
    .catch((err) => {
      console.log(err);
    });
});