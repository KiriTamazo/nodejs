const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Static signup method
userSchema.statics.signup = async function (email, password) {
  // use this keyword insted of schema becuz this is custom method

  //   validation
  if (!email || !password) {
    throw Error("All fields must be exits");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  //   find if the user already exit
  const exits = await this.findOne({ email });
  if (exits) {
    throw Error("Email already exists");
  }
  //   generate a password that is hard to hack (the frater the number the loner it take to decode the password)
  const salt = await bcrypt.genSalt(10);
  //   generate hash value for the password
  const hash = await bcrypt.hash(password, salt);

  //   save to db
  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  console.log("res", email, password);
  //   validation
  if (!email || !password) {
    throw Error("All fields must be exits");
  }

  //   find if the user already exit
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }
  const match = await bcrypt.compare(password, user.password);
  console.log(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }
  console.log(user);
  return user;
};

module.exports = mongoose.model("User", userSchema);
