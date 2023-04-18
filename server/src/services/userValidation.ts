import Joi from "joi";
import { IUser } from "../interfaces/UserInterface";

export const registerValidation = (data: IUser) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(10).max(50).email(),
    password: Joi.string().min(6).max(1000),
  });
  return schema.validate(data);
};

export const loginValidation = (data: IUser) => {
  const schema = Joi.object({
    email: Joi.string().min(10).max(50).email(),
    password: Joi.string().min(6).max(1000),
  });
  return schema.validate(data);
};

export const emailValidation = (data: IUser) => {
  const schema = Joi.object({
    email: Joi.string().min(10).max(50).email(),
  });
  return schema.validate(data);
};

export const passValidation = (data: IUser) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(1000),
  });
  return schema.validate(data);
};
