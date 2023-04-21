import { Request, Response, NextFunction } from "express";
import Bookmark from "../models/bookmarkModel";
import { IBookmark } from "../interfaces/BookmarkInterface";
import { ObjectId } from "mongodb";

export const checkBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookmark: IBookmark = await Bookmark.findById({ _id: req.params.id });
    if (bookmark.user.toString() !== res.locals.user._id)
      return res.status(404).send("Bookmark not found!");
    next();
  } catch (error) {
    next(error);
  }
};
