const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (userInfo) =>
  JWT.sign(
    { 
      _id: userInfo._id, 
      email: userInfo.email,
      role: userInfo.role
    }, 
    process.env.SECRET
  );

const verifyPassword = (attemptedPw, hashedPw) =>
  bcrypt.compareSync(attemptedPw, hashedPw);

const hashPassword = (password) => bcrypt.hashSync(password);

const verifyToken = (token) => JWT.verify(token, process.env.SECRET);

module.exports = { createToken, verifyPassword, hashPassword, verifyToken };
