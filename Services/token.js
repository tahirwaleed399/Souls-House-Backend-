const jwt = require("jsonwebtoken");
const RefreshToken = require("../Models/RefreshToken");
console.log(process.env.JWT_ACCESS_TOKEN_KEY);

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_KEY;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_KEY;
class TokenService {
  constructor() {}
  async generateTokens(payload, userId, res, next) {
    try {
      const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: "1h",
      
      });

      const refreshToken = jwt.sign(payload, refreshTokenSecret, {
        expiresIn: "1y",
      });
      const cookieOptions = {
        expires: new Date(Date.now() + 60 * 1000 * 60 * 24 * 100),
        httpOnly: true,
        maxAge :Date.now() + 60 * 1000 * 60 * 24 * 100,
      };

      let databaseRefreshToken = await RefreshToken.findOne({user : userId});
      if(databaseRefreshToken){
        await RefreshToken.findOneAndUpdate({user:userId},{
refreshToken
        }, {new:true});
      }
      else {
        await RefreshToken.create({ refreshToken, user: userId });

      }

res.cookie("soulsHouseAccessToken", accessToken, cookieOptions);
res.cookie("soulsHouseRefreshToken", refreshToken, cookieOptions);
console.log({ accessToken, refreshToken })

      return { accessToken, refreshToken };
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TokenService();
