import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  generateOTP,
  profile,
  verifyOTP,
  resetPassword,
  updateProfile,
  deleteAccount,
} from "../controllers/userController";
import { Protected } from "../middleware/authMiddleware";

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/recover", generateOTP);
router.get("/verify", verifyOTP);
router.put("/reset", resetPassword);
router.get("/me", Protected, profile);
router.delete("/delete", Protected, deleteAccount);
router.put("/update", Protected, updateProfile);

module.exports = router;
