const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    bcrypt.hash(password, 10, async (error, hash) => {
      let data = await userModel.create({
        username,
        email,
        password: hash,
      });
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getUser = async (req, res) => {
  try {
    let data = await userModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const userUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await userModel.findByIdAndUpdatee(id, req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await userModel.findByIdAndDelete(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const userlogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await userModel.findOne({ username });
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (isMatch) {
      const Token = jwt.sign(username, "Private-key");
      res.cookie("token", Token);
      // res.status(200).send("yor are login");
      return res.status(200).send("login Successfully!");
    }
    res.send("username or password not match");
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { createUser, getUser, userUpdate, deleteUser, userlogin };
