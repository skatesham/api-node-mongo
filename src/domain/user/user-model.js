const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
      unique: true
    },
    password: {
      type: String,
      required: false,
      select: true // TODO: Should be false
    },
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);