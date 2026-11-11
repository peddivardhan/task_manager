const express = require("express");
const authController = require("../controllers/authController");
const { signupRules, loginRules, handleValidation } = require("../middleware/validators");

const router = express.Router();

router.post("/signup", signupRules, handleValidation, authController.signup);
router.post("/login", loginRules, handleValidation, authController.login);

module.exports = router;