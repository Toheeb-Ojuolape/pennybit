const Joi = require("joi")

const lookUpHash = {
    body: Joi.object().keys({
      hash: Joi.string().required().messages({
        "string.empty": `hash cannot be an empty field`,
        "any.required": `hash is a required field`,
      })
    })
}

const lookUpInvoice = {
    body: Joi.object().keys({
      invoice: Joi.string().required().messages({
        "string.empty": `invoice cannot be an empty field`,
        "any.required": `invoice is a required field`,
      })
    })
}

const lookUpVoltageInvoice = {
  body: Joi.object().keys({
    rhash: Joi.string().required().messages({
      "string.empty": `rhash cannot be an empty field`,
      "any.required": `rhash is a required field`,
    })
  })
}

const createInvoice = {
    body: Joi.object().keys({
      amountInSats: Joi.required().messages({
        "string.empty": `amountInSats cannot be an empty field`,
        "any.required": `amountInSats is a required field`,
      })
    })
}

module.exports = {
  lookUpHash,
  lookUpInvoice,
  createInvoice,
  lookUpVoltageInvoice
}