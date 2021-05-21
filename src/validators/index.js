import Joi from '@hapi/joi'
const schemas = {
  question: Joi.object().keys({
    title: Joi.string()
      .required()
      .messages({
        'string.base': 'invalid type, title should be a string',
        'string.empty': 'please enter title',
        'any.required': 'title is required'
      })
  }),
}

export default {
  question: (req, res, next) => {
    const { error } = schemas.question.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  },
}
