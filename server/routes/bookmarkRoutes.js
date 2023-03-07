const express = require("express");
const router = express.Router();
const {
  getBookmark,
  addBookmark,
  deleteBookmark,
  updateBookmark,
} = require("../controllers/bookmarkController");

router.get("/", getBookmark);
router.post("/add", addBookmark);
router.route("/:id").put(updateBookmark).delete(deleteBookmark);

module.exports = router;
