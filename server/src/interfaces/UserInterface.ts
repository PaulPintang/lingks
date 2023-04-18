import { Schema } from "mongoose";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  name: string;
  email: string;
  day?: string;
  password: string;
  image?: {
    public_id: string;
    url: string;
  };
}
