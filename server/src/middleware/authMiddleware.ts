import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const Protected = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SCRT!);
    res.locals.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};
export const localVariables = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.app.locals = {
    OTP: null,
    session: false,
  };
  next();
};
