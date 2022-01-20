import QuizItem from '../models/QuizItem'
import QuizSet from '../models/QuizSet'

export default {
  add: (req, res) => {
    const data = req.body
    const { title: quizSetTitle, subject, questions } = req.body

    let quizes = []
    for (let question of questions) {
      // create single quiz item
      const { quizItemTitle, options, answer } = question
      const quizItem = new QuizItem({ title: quizItemTitle, options, answer })
      quizes.push(quizItem._id)
    }

    const quizSet = new QuizSet({
      quizSetTitle,
      subject,
      questions: quizes
    })

    quizSet
      .save(data)
      .then(doc => res.status(201).json(doc))
      .catch(err =>
        res.status(500).json({ message: 'Error occured while saving', err })
      )
  },
  list: async (req, res) => {
    const quizSets = await QuizSet.find({})
    return res.status(200).json(quizSets)
  }
}
