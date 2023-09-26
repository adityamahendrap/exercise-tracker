const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const User = model("user", userSchema);
module.exports = User;
