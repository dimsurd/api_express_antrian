const usersModel = require("../models/users_model");

const getAllUsers = async (req, res) => {
  try {
    const [data] = await usersModel.getAllUsers();
    res.status(200).json({
      message: "Get all data success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get all data failed",
      error: err,
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [dataUser] = await usersModel.getDetail(id);

    const data = dataUser.length >= 1 ? dataUser : "User not found";

    res.status(200).json({
      message: "Get detail success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get detail failed",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;

    await usersModel.createUser(body);
    res.status(200).json({
      message: "Create user success",
      data: body,
    });
  } catch (err) {
    res.status(500).json({
      message: "Create user failed",
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { body, params } = req;
    const { id } = params;

    await usersModel.updateUser(id, body);

    res.status(200).json({
      message: "Update user success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Update user failed",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await usersModel.deleteUser(id);
    res.status(200).json({
      message: "Delete user success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete user failed",
      error: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getDetailUser,
  createUser,
  updateUser,
  deleteUser,
};
