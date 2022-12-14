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

const lndLogin = {
  body: Joi.object().keys({
    host: Joi.string().required().messages({
      "string.empty": `host cannot be an empty field`,
      "any.required": `host is a required field`,
    }),
    cert: Joi.string().required().messages({
      "string.empty": `cert cannot be an empty field`,
      "any.required": `cert is a required field`,
    }),
    macaroon: Joi.string().required().messages({
      "string.empty": `macaroon cannot be an empty field`,
      "any.required": `macaroon is a required field`,
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

const confirmLndInvoice = {
  body: Joi.object().keys({
    token: Joi.string().required().messages({
      "string.empty": `token cannot be an empty field`,
      "any.required": `token is a required field`,
    }),
    hash: Joi.string().required().messages({
      "string.empty": `hash cannot be an empty field`,
      "any.required": `hash is a required field`,
    }),
    amount: Joi.string().required().messages({
      "string.empty": `amount cannot be an empty field`,
      "any.required": `amount is a required field`,
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

const nodeInfo = {
  body: Joi.object().keys({
    token: Joi.string().required().messages({
      "string.empty": `token cannot be an empty field`,
      "any.required": `token is a required field`,
    }),
  }),
}

const resetPassword = {
  body: Joi.object().keys({
    token: Joi.string().required().messages({
      "string.empty": `token cannot be an empty field`,
      "string.min": `token should have a minimum length of {#limit}`,
      "string.max": `token should have a maximum length of {#limit}`,
      "any.required": `token is a required field`,
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
      "string.min": `New Password should have a minimum length of {#limit}`,
      "string.max": `New Password should have a maximum length of {#limit}`,
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
  updateUser,
  lndLogin,
  nodeInfo,
  confirmLndInvoice
}