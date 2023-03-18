const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      require: [true, "Token is required"],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
