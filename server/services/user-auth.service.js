const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async ({email, username, password}) => {

    const secret = process.env.SECRET; // Hash secret phrase taken from .env outside the repository.

    const newUser = await new User({ email, username, password }).save();

    const newUserDTO = {
      email: newUser.email, 
      username: newUser.username
    };

    const token = jwt.sign({ username: newUser.username }, secret, {
      expiresIn: "2h",
    });

    return { newUserDTO, token };
  
};

const login = async ( usernameOrEmail ) => {
  const secret = process.env.SECRET; // Hash secret phrase taken from .env outside the repository.

  let user = await User.findOne({ usernameOrEmail });

  const token = jwt.sign({ username: user.usernameOrEmail }, secret, {
    expiresIn: "2h",
  });

  return { token };
};

module.exports = { register, login };