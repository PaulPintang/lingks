const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  generateOTP,
  profile,
  verifyOTP,
  resetPassword,
  updateProfile,
  deleteAccount,
} = require("../controllers/userController");
const { Protected } = require("../middleware/authMiddleware");
// const sendEmail = require("../services/sendEmail");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/recover", generateOTP);
router.get("/verify", verifyOTP);
router.put("/reset", resetPassword);
router.get("/me", Protected, profile);
router.delete("/delete", Protected, deleteAccount);
router.put("/update", Protected, updateProfile);

module.exports = router;
