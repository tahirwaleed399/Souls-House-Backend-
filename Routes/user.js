let express = require('express');
const {sendOtp,verifyOtp, activateUser, refreshTokens ,signIn, logout} = require('../Controllers/user');
const isAuthenticated = require('../Middlewares/isAuthenticated');
let router = express.Router()
router.post('/sign-in', signIn)
router.post('/logout',isAuthenticated,logout);
router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/activate-user', isAuthenticated,activateUser)
router.get('/refresh-tokens',refreshTokens);
module.exports = router;