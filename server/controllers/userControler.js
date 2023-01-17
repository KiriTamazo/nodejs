const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRETE, {
    expiresIn: "3d",
  });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // signup is custom function to save in the mongo db
    const user = await User.login(email, password);

    // create JWT Token
    const token = createToken(user._id);

    console.log(user._id, token);
    res.status(200).json({ email, token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};

// signup user

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // signup is custom function to save in the mongo db
    const user = await User.signup(email, password);

    // create JWT Token
    const token = createToken(user._id);

    console.log(user._id, token);
    res.status(200).json({ email, token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};

module.exports = { loginUser, signupUser };
