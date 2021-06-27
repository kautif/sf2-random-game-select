const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: String,

    username: String,
    password: String
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;