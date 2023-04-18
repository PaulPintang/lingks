import express from "express";
const router = express.Router();
import {
  getBookmark,
  addBookmark,
  deleteBookmark,
  updateBookmark,
  singleBookmark,
} from "../controllers/bookmarkController";
import { Protected } from "../src/config/middleware/authMiddleware";

router.get("/", Protected, getBookmark);
router.post("/add", Protected, addBookmark);
router
  .route("/:id")
  .get(singleBookmark)
  .put(Protected, updateBookmark)
  .delete(Protected, deleteBookmark);

module.exports = router;
