const mongoose = require("mongoose");

const linksSchema = mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  date: { type: String },
  createdAt: { type: String },
});

const bookmarkSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    banner: {
      type: String,
    },
    labels: [
      {
        type: Object,
      },
    ],
    links: [linksSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
