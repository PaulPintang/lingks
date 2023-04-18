import Joi from "joi";

interface DataInterface {
  name: string;
  email: string;
  password: string;
}

export const registerValidation = (data: DataInterface) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(10).max(50).email(),
    password: Joi.string().min(6).max(1000),
  });
  return schema.validate(data);
};

export const loginValidation = (data: DataInterface) => {
  const schema = Joi.object({
    email: Joi.string().min(10).max(50).email(),
    password: Joi.string().min(6).max(1000),
  });
  return schema.validate(data);
};

export const emailValidation = (data: DataInterface) => {
  const schema = Joi.object({
    email: Joi.string().min(10).max(50).email(),
  });
  return schema.validate(data);
};

export const passValidation = (data: DataInterface) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(1000),
  });
  return schema.validate(data);
};
