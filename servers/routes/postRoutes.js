const express = require("express");
const router = express.Router();
const {
  getPost,
  addPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

router.get("/", getPost);
router.post("/add", addPost);
router.route("/:id").put(updatePost).delete(deletePost);

module.exports = router;
