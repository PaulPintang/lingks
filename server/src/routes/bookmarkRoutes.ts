import express from "express";
const router = express.Router();
import {
  getBookmark,
  addBookmark,
  deleteBookmark,
  updateBookmark,
  singleBookmark,
} from "../controllers/bookmarkController";
import { Protected } from "../middleware/authMiddleware";
import { checkBookmark } from "../middleware/bookmarkMiddleware";

router.get("/", Protected, getBookmark);
router.post("/add", Protected, addBookmark);
router
  .route("/:id")
  .get(Protected, checkBookmark, singleBookmark)
  .put(Protected, checkBookmark, updateBookmark)
  .delete(Protected, checkBookmark, deleteBookmark);

module.exports = router;
