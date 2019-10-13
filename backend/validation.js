const Joi = require('@hapi/joi');

// validation register
const registerValidation = (data) => {
  const validationSchema = Joi.object({
    username: Joi.string().alphanum().min(6).required(),
    password: Joi.string().min(6).required()
  });

  // data validation
  return validationSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
