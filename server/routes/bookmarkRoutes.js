const express = require("express");
const router = express.Router();
const {
  getBookmark,
  addBookmark,
  deleteBookmark,
  updateBookmark,
  singleBookmark,
} = require("../controllers/bookmarkController");
const { Protected } = require("../middleware/authMiddleware");

router.get("/", Protected, getBookmark);
router.post("/add", Protected, addBookmark);
router
  .route("/:id")
  .get(singleBookmark)
  .put(Protected, updateBookmark)
  .delete(Protected, deleteBookmark);

module.exports = router;
