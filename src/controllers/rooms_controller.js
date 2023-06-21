const roomsModel = require("../models/rooms_model");

const getAllRoom = async (req, res) => {
  try {
    const [data] = await roomsModel.getAll();
    res.status(200).json({
      message: "Get all room success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get all room failed",
      error: err.message,
    });
  }
};

const getDetail = async (req, res) => {
  try {
    const [data] = await roomsModel.getDetail(req.params.id);
    res.status(200).json({
      message: "Get detail success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get detail failed",
      error: err.message,
    });
  }
};

const createRoom = async (req, res) => {
  try {
    const { body } = req;
    await roomsModel.createData(body);
    res.status(200).json({
      message: "Create room success",
      data: body,
    });
  } catch (err) {
    res.status(500).json({
      message: "Create room failed",
      error: err.message,
    });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { body, params } = req;
    const { id } = params;
    await roomsModel.updateUser(id, body);
    res.status(200).json({
      message: "Update room success",
      data: body,
    });
  } catch (err) {
    res.status(500).json({
      message: "Update room failed",
      error: err.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    await roomsModel.deleteUser(req.params.id);
    res.status(200).json({
      message: "Delete room success",
    });
  } catch (err) {
    res.status(200).json({
      message: "Delete room failed",
      error: err.message,
    });
  }
};

module.exports = { getAllRoom, getDetail, createRoom, updateRoom, deleteRoom };
