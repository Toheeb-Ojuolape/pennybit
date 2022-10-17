const Joi = require("joi")

const login = {
    body: Joi.object().keys({
        email: Joi.string().required().messages({
            "string.empty": `Email cannot be an empty field`,
            "any.required": `Email is a required field`,
        }),
        password: Joi.string().required().messages({
            "string.empty": `Password cannot be an empty field`,
            "any.required": `Password is a required field`,
        })
    })
}

const register = {
    body: Joi.object().keys({
      firstName: Joi.string().required().messages({
        "string.empty": `First Name cannot be an empty field`,
        "any.required": `First Name is a required field`,
      }),
      lastName: Joi.string().required().messages({
        "string.empty": `Last Name cannot be an empty field`,
        "any.required": `Last Name is a required field`,
      }),
      password: Joi.string().required().messages({
        "string.empty": `Password cannot be an empty field`,
        "any.required": `Password is a required field`,
      }),
      email: Joi.string().required().messages({
        "string.empty": `Email cannot be an empty field`,
        "any.required": `Email is a required field`,
      })
    }),
}

module.exports = {
    register,
    login
}