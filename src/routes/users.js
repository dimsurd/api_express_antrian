const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getDetailUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users_controller");

router.get("/", getAllUsers);
router.get("/:id", getDetailUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
