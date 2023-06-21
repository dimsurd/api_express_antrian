const authModel = require("../models/auth_model");

const doLogin = async (req, res) => {
  try {
    await authModel.doLogin(req.body);
    res.status(200).json({
      message: "Login success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};
const forgoPassword = async (req, res) => {
  try {
    const { body, params } = req;
    const { id } = params;

    await authModel.resetPassword(id, body);
    res.status(200).json({
      message: "Forgot Password success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Forgot Password failed",
      error: err.message,
    });
  }
};

module.exports = { doLogin, forgoPassword };
