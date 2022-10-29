const Joi = require("joi");
const ApiError = require("../helpers/ApiError");
const pick = require("../helpers/pick");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "headers"]);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    const errorCode = error.code || 500
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
      return res.status(errorCode).send({
        message: `${errorMessage}`,
    })
    //return next(new ApiError(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
