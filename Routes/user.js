let express = require('express');
const {sendOtp,verifyOtp } = require('../Controllers/user');
let router = express.Router()
router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
module.exports = router;