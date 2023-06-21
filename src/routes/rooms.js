const express = require("express");
const router = express.Router();
const {
  getAllRoom,
  getDetail,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/rooms_controller");

router.get("/", getAllRoom);
router.get("/:id", getDetail);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
