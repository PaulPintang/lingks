import { Schema, model } from "mongoose";
import { IBookmark, ILink } from "../interfaces/BookmarkInterface";

const linksSchema = new Schema<ILink>({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  date: { type: String },
  createdAt: { type: String },
});

const bookmarkSchema = new Schema<IBookmark>(
  {
    user: {
      type: Schema.Types.ObjectId,
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

export default model<IBookmark>("Bookmark", bookmarkSchema);
