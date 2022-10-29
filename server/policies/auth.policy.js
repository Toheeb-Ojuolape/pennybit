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

const confirmAccount = {
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is a required field`,
    }),
    pin: Joi.string().required().messages({
      "string.empty": `Pin cannot be an empty field`,
      "any.required": `Pin is a required field`,
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
    }),
    gender: Joi.string().required().messages({
      "string.empty": `Gender cannot be an empty field`,
      "any.required": `Gender is a required field`,
    }),
    phoneNumber: Joi.string().required().messages({
      "string.empty": `phoneNumber cannot be an empty field`,
      "any.required": `phoneNumber is a required field`,
    }),
    dateOfBirth: Joi.string().messages({
      "string": ``,
    })
  }),
}

const updateUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required().messages({
      "string.empty": `First Name cannot be an empty field`,
      "any.required": `First Name is a required field`,
    }),
    lastName: Joi.string().required().messages({
      "string.empty": `Last Name cannot be an empty field`,
      "any.required": `Last Name is a required field`,
    }),
    phoneNumber: Joi.string().required().messages({
      "string.empty": `phoneNumber cannot be an empty field`,
      "any.required": `phoneNumber is a required field`,
    })
  })
}

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is a required field`,
      "string.email": `You need to enter a valid email`,
    }),
  }),
}

const resetPassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required().messages({
      "string.empty": `oldPassword cannot be an empty field`,
      "string.min": `Old Password should have a minimum length of {#limit}`,
      "string.max": `Old Password should have a maximum length of {#limit}`,
      "any.required": `oldPassword is a required field`,
    }),
    newPassword: Joi.string().min(8).max(20).required().messages({
      "string.empty": `newPassword cannot be an empty field`,
      "string.min": `New Password should have a minimum length of {#limit}`,
      "string.max": `New Password should have a maximum length of {#limit}`,
      "any.required": `newPassword is a required field`,
    })
  }),
}

const updatePassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().min(8).max(20).required().messages({
      "string.empty": `New Password cannot be an empty field`,
      "string.min": `New Password should have a minimum length of {#limit}`,
      "string.max": `New Password should have a maximum length of {#limit}`,
      "any.required": `New Password is a required field`,
    }),
    oldPassword: Joi.string().required().messages({
      "string.empty": `Old Password cannot be an empty field`,
      "any.required": `Old Password is a required field`,
    }),
  }),
}

const resendMail = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is a required field`,
      "string.email": `You need to enter a valid email`,
    }),
  }),
}

module.exports = {
  register,
  login,
  confirmAccount,
  forgotPassword,
  resetPassword,
  updatePassword,
  resendMail,
  updateUser
}