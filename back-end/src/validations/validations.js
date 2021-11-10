const Joi = require('joi');

const schemaCreatedUser = Joi.object({
  name: Joi.string()
    .min(12)
    .required(),
  email: Joi.string() 
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

module.exports = {
  schemaCreatedUser,
};
