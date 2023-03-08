const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Please add title"],
  },
  description: {
    type: String,
    required: [true, "Please add title description"],
  },
  banner: {
    type: String,
  },
  labels: [
    {
      type: String,
    },
  ],
  links: [
    {
      type: Object,
    },
  ],
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
