import Question from '../models/Question'

export default {
  list: async (req, res) => {
    const questions = await Question.find({}, null, {
      sort: { created_at: -1 }
    })
    return res.status(200).json(questions)
  },
  getByName: async (req, res) => {
    const { title } = req.params
    const data = await Question.findOne({ title })
    return res.status(200).json(data)
  },
  add: (req, res) => {
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
  }
}
