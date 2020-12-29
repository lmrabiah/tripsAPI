const bcrypt = require("bcrypt");
const { User, Profile, Trip } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      massage: "wooow",
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    req.body.userId = newUser.id;
    const userProfile = await Profile.create(req.body);
    res.status(201).json({ token, userProfile });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      id: user.id,
      username: user.username,
      exp: Date.now() + 900000,
    };

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    const userProfile = await Profile.findOne({
      where: {
        userId: user.id,
      },
    });
    res.json({ token, userProfile });
  } catch (error) {
    next(error);
  }
};
