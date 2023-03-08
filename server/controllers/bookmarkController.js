const Bookmark = require("../models/bookmarkModel");

const getBookmark = async (req, res, next) => {
  try {
    const bookmarks = await Post.find();
    res.json(bookmarks);
  } catch (error) {
    next(error);
  }
};

const addBookmark = async (req, res, next) => {
  const { title, description, banner, labels, links } = req.body;
  try {
    const bookmark = await Bookmark.create({
      user: req.user._id,
      title,
      description,
      banner,
      labels,
      links,
    });
    res.json(bookmark);
  } catch (error) {
    next(error);
  }
};

const deleteBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ DELETED: bookmark });
  } catch (error) {
    next(error);
  }
};

const updateBookmark = async (req, res, next) => {
  const { title, description, banner, labels, links } = req.body;
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {
      title,
      description,
      banner,
      labels,
      links,
    });
    res.json(bookmark);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookmark,
  addBookmark,
  deleteBookmark,
  updateBookmark,
};
