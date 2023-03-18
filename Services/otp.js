const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");

class OtpService {
  constructor() {}

  generateOtp() {
// const  pureOtp = crypto.randomInt(1000,9999);
const  pureOtp = 1111;

    return pureOtp;
  }


  async sendOtpToMail(email, pureOtp) {
    // let responce = await sendEmail(
    //   email,
    //   "Otp from CodersSouls",
    //   "Please Paste This Otp in our app",
    //   `<b>${pureOtp}</b>`
    // );
    let responce = pureOtp;
    return responce;
  }
}

module.exports = new OtpService();
