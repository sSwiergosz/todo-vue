const Joi = require('@hapi/joi');

// register validation
const registerValidation = (data) => {
  const validationSchema = Joi.object({
    username: Joi.string().alphanum().min(6).required(),
    password: Joi.string().min(6).required()
  });

  // data validation
  return validationSchema.validate(data);
}

// login validation
const loginValidation = (data) => {
  const validationSchema = Joi.object({
    username: Joi.string().alphanum().min(6).required(),
    password: Joi.string().min(6).required()
  });

  // data validation
  return validationSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
