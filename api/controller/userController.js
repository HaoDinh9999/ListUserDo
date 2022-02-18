const User = require("../models/User");
const cactchaSync = require("../ultil/cactchAsync");

//CREATE USER
exports.createUser = cactchaSync(async (req, res, next) => {
  const newUser = new User(req.body);
  const saveUser = await newUser.save();
  res.status(200).json({
    status: "success",
    user: saveUser,
  });
  next();
});
//GET ALL USER
exports.getAllUser = async (req, res) => {
  const email = req.query.user;
  const catName = req.query.cat;
  try {
    let users = await User.find();

    res.status(200).json({
      status: "success",
      total: users.length,
      users: users,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
//GET USER BY NAME OR BY EMAIL
exports.getUser = async (req, res) => {
  try {
    let name = req.params.name;
    const user = await User.find({
      $or: [
        { username: { $regex: `${req.params.name}` } },
        { email: { $regex: `${req.params.name}` } },
      ],
    }).collation({ locale: "en_US" });
    res.status(200).json({
      status: "success",
      total: user.length,
      users: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
//GET USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
//UPDATE USER
exports.updateUser = cactchaSync(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    user: updateUser,
  });
  next();
});
