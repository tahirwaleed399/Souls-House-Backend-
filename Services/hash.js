
const crypto = require("crypto");

class HashService {
  constructor() {}


  hash(pureText){
    const hashedText = crypto.createHash('sha256').update(`${pureText}`).digest('hex');

return hashedText;
  }

}

module.exports = new HashService();
