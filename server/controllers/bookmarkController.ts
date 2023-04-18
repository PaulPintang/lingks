import { Request, Response, NextFunction } from "express";
import Bookmark from "../models/bookmarkModel";
import { IBookmark } from "../interfaces/BookmarkInterface";

export const getBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookmarks = await Bookmark.find({ user: res.locals.user._id });
    res.json(bookmarks);
  } catch (error) {
    next(error);
  }
};

export const addBookmark = async (
  req: Request<{}, {}, IBookmark, {}>,
  res: Response,
  next: NextFunction
) => {
  const { title, description, banner, labels, links } = req.body;
  try {
    const bookmark = await Bookmark.create({
      user: res.locals.user._id,
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

export const deleteBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookmark: IBookmark | null = await Bookmark.findByIdAndDelete(
      req.params.id
    );
    res.json({ _id: bookmark?._id });
  } catch (error) {
    next(error);
  }
};

export const updateBookmark = async (
  req: Request<{ id: string }, {}, IBookmark, {}>,
  res: Response,
  next: NextFunction
) => {
  const { title, description, banner, labels, links } = req.body;
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        banner,
        labels,
        links,
      },
      {
        new: true,
      }
    );
    res.json(bookmark);
  } catch (error) {
    next(error);
  }
};

export const singleBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookmark = await Bookmark.find({ _id: req.params.id });
    res.json(bookmark);
  } catch (error) {
    next(error);
  }
};
