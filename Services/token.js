const jwt = require('jsonwebtoken');
console.log(process.env.JWT_ACCESS_TOKEN_KEY)

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_KEY;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_KEY;
class TokenService {
    constructor(){

    }
  generateTokens(payload){
    const accessToken = jwt.sign(payload ,accessTokenSecret , {
        expiresIn: '1h',
    } )
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
        expiresIn: '1y',
    });
    return { accessToken, refreshToken };
  }
}

module.exports = new TokenService();