import Joi from '@hapi/joi'
const schemas = {
  question: Joi.object().keys({
    questionType: Joi.string().required().messages({
      'string.base': 'invalid type, title should be a string',
      'string.empty': 'please select question type',
      'any.required': 'question type is required'
    }),
    title: Joi.string().required().messages({
      'string.base': 'invalid type, title should be a string',
      'string.empty': 'please enter title',
      'any.required': 'title is required'
    }),
    body: Joi.string().required().messages({
      'string.empty': 'body should not be empty',
      'any.required': 'body is required'
    }),
    paperInfo: Joi.object().keys({
      spacing: Joi.string().allow(''),
      format: Joi.string().allow(''),
      pages: Joi.number().allow('')
    }),
    subject_code: Joi.string().required().messages({
      'string.empty': 'subject code should not be empty',
      'any.required': 'subject code is required'
    }),
    course_code: Joi.string().required().messages({
      'string.empty': 'course code should not be empty',
      'any.required': 'course code is required'
    }),
    tags: Joi.array(),
    files: Joi.array(),
    deadline: Joi.string().required().messages({
      'string.empty': 'deadline should not be empty',
      'any.required': 'deadline is required'
    })
  }),
  answerSchema: Joi.object().keys({
    answer: Joi.string().required().messages({
      'string.empty': 'body should not be empty',
      'any.required': 'body is required'
    })
  }),
  fieldSchema: Joi.object().keys({
    title: Joi.string().required().messages({
      'string.empty': 'title should not be empty',
      'any.required': 'title is required'
    })
  }),
  quizSetSchema: Joi.object().keys({
    quizSetTitle: Joi.string().required().messages({
      'string.empty': 'quizset title should not be empty',
      'any.required': 'quizset title is required'
    }),
    custom: Joi.boolean(),
    meta: Joi.object(),
    subject: Joi.string().required().messages({
      'string.empty': 'subject should not be empty',
      'any.required': 'subject is required'
    }),
    questions: Joi.array()
      .items({
        questionTitle: Joi.string().required().messages({
          'string.empty': 'question title should not be empty',
          'any.required': 'question title is required'
        }),
        options: Joi.array(),
        image: Joi.string().allow(''),
        answer: Joi.string().required().messages({
          'string.empty': 'answer should not be empty',
          'any.required': 'answer is required'
        })
      })
      .min(1)
      .required()
  }),
  bidSchema: Joi.object().keys({
    message: Joi.string(),
    amount: Joi.number().required(),
    question: Joi.string()
  }),
  fileSchema: Joi.object().keys({
    title: Joi.string(),
    subject_code: Joi.string().required(),
    course_code: Joi.string().required(),
    url: Joi.string().required(),
    metaInfo: Joi.object(),
    instructions: Joi.string()
  }),
  postSchema: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    tags: Joi.array()
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
  quizSet: (req, res, next) => {
    const { error } = schemas.quizSetSchema.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  },
  answer: (req, res, next) => {
    const { error } = schemas.answerSchema.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  },
  bid: (req, res, next) => {
    const { error } = schemas.bidSchema.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  },
  file: (req, res, next) => {
    const { error } = schemas.fileSchema.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  },
  post: (req, res, next) => {
    const { error } = schemas.postSchema.validate(req.body)
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    next()
  }
}
