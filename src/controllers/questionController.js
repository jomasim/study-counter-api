import Question from '../models/Question'

export default {
  list: async (req, res) => {
    const { limit = 10, page = 1 } = req.query
    const total = (await Question.countDocuments()) || 0
    const questions = await Question.find({}, null, {
      sort: { created_at: -1 },
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    })
    const questionData = {
      page,
      nextPage: page + 1,
      prevPage: page - 1 > 0 ? page - 1 : null,
      count: Math.ceil(total / limit),
      questions
    }
    return res.status(200).json(questionData)
  },
  listByAuthor: async (req, res) => {
    const author = res.locals.user.user_id
    let questions = []
    if (author) {
      questions = await Question.find({}, null, {
        sort: { created_at: -1 }
      })
        .where('author')
        .equals(author)
    }

    return res.status(200).json(questions)
  },
  getById: async (req, res) => {
    const { id } = req.params
    const data = await Question.findOne({ _id: id })
    return res.status(200).json(data)
  },
  add: (req, res) => {
    0
    const author = res.locals.user.user_id
    const data = req.body
    data.author = author
    const question = new Question(data)
    question
      .save(data)
      .then(doc => res.status(201).json(doc))
      .catch(err =>
        res.status(500).json({ message: 'Error occured while saving', err })
      )
  },
  answer: async (req, res) => {
    const { id } = req.params
    const data = req.body.answer || ''
    Question.findByIdAndUpdate(
      id,
      { $push: { answers: data } },
      { upsert: true },
      (err, doc) => {
        if (err) return res.send(500, { message: err })
        return res
          .status(200)
          .send({ message: 'Succesfully saved.', data: doc })
      }
    )
  }
}
