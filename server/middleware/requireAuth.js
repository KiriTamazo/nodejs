const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  // check for value
  if (!authorization) {
    return res.status(401).json({ error: "Authorization required" });
  }
  console.log(authorization);
  const token = authorization.split(" ")[1];

  try {
    // grab item from
    // 1 verify the token and secrete
    const { _id } = jwt.verify(token, process.env.SECRETE);
    // 2 with id find the id in the db and return it
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
