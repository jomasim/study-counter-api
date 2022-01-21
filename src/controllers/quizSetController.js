import QuizItem from '../models/QuizItem'
import QuizSet from '../models/QuizSet'

export default {
  add: async (req, res) => {
    const { quizSetTitle, subject, questions } = req.body

    let quizes = []
    for (let question of questions) {
      // create single quiz item
      const { questionTitle, options, answer } = question
      const quizItem = new QuizItem({ title: questionTitle, options, answer })
      await quizItem.save()
      quizes.push(quizItem._id)
    }

    const quizSet = new QuizSet({
      title: quizSetTitle,
      subject,
      questions: quizes
    })

    quizSet
      .save()
      .then(doc => res.status(201).json(doc))
      .catch(err =>
        res.status(500).json({ message: 'Error occured while saving', err })
      )
  },
  list: async (req, res) => {
    const quizSets = await QuizSet.find({})
      .populate('subject')
      .populate('questions')
    return res.status(200).json(quizSets)
  }
}
