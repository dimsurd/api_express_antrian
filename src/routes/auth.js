const express = require("express");
const router = express.Router();
const { doLogin, forgoPassword } = require("../controllers/auth_controller");

router.post("/login", doLogin);
router.put("/forgot_password/:id", forgoPassword);

module.exports = router;
