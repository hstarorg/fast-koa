const Joi = require('joi');

/**
 * Validate the request body or other data.
 * @param {object} data Need validate data
 * @param {object} schema The joi data schema
 * @param {object} options The validate options
 * @param {bool} options.abortEarly If error, stop other validate, default: false
 * @param {bool} options.allowUnknown Allow unknown property, default: true
 */
const validate = (data, schema, options = { abortEarly: false, allowUnknown: true }) => {
  return new Promise((resolve, reject) => {
    Joi.validate(data, schema, options, (err, value) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

module.exports = {
  validate
};
