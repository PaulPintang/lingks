import { Schema } from "mongoose";

export interface ILink extends IBookmark {
  name: string;
  link: string;
  date: string;
  createdAt: string;
}

export interface IBookmark {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  title: string;
  description: string;
  banner: string;
  labels: Object[];
  links: ILink[];
}
