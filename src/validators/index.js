import Joi from '@hapi/joi'
const schemas = {
  question: Joi.object().keys({
    title: Joi.string()
      .required()
      .messages({
        'string.base': 'invalid type, title should be a string',
        'string.empty': 'please enter title',
        'any.required': 'title is required'
      }),
    body: Joi.string()
      .required()
      .messages({
        'string.empty': 'body should not be empty',
        'any.required': 'body is required'
      }),
    subject_code: Joi.string()
      .required()
      .messages({
        'string.empty': 'subject code should not be empty',
        'any.required': 'subject code is required'
      }),
    course_code: Joi.string()
      .required()
      .messages({
        'string.empty': 'course code should not be empty',
        'any.required': 'course code is required'
      }),
    tags: Joi.array(),
    files: Joi.array(),
    deadline: Joi.string()
      .required()
      .messages({
        'string.empty': 'deadline should not be empty',
        'any.required': 'deadline is required'
      })
  }),
  answerSchema: Joi.object().keys({
    answer: Joi.string()
      .required()
      .messages({
        'string.empty': 'body should not be empty',
        'any.required': 'body is required'
      })
  }),
  fieldSchema: Joi.object().keys({
    title: Joi.string()
      .required()
      .messages({
        'string.empty': 'title should not be empty',
        'any.required': 'title is required'
      })
  })
}

export default {
  field: (req, res, next) => {
    const { error } = schemas.fieldSchema.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  },
  question: (req, res, next) => {
    const { error } = schemas.question.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  },
  answer: (req, res, next) => {
    const { error } = schemas.answerSchema.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  }
}
