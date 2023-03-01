const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(10).max(50).email(),
    password: Joi.string().min(6).max(1000),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(10).max(50).email(),
    password: Joi.string().min(6).max(1000),
  });
  return schema.validate(data);
};

const emailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(10).max(50).email(),
  });
  return schema.validate(data);
};

const passValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(1000),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  emailValidation,
  passValidation,
};
