import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/UserInterface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    day: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
