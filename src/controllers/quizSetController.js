import slugify from 'slugify'
import ShortUniqueId from 'short-unique-id'
import QuizItem from '../models/QuizItem'
import QuizSet from '../models/QuizSet'

export default {
  add: async (req, res) => {
    try {
      const {
        quizSetTitle,
        subject,
        questions,
        custom = false,
        meta
      } = req.body

      let quizes = []
      for (let question of questions) {
        // create single quiz item
        const { questionTitle, options, answer, image } = question
        const quizItem = new QuizItem({
          title: questionTitle,
          options,
          answer,
          image
        })
        await quizItem.save()
        quizes.push(quizItem._id)
      }
      const uid = new ShortUniqueId({ length: 10 })
      const quizSet = new QuizSet({
        title: quizSetTitle,
        subject,
        custom,
        meta,
        questions: quizes,
        slug: slugify(quizSetTitle, { lower: true }),
        shortCode: uid()
      })
      const doc = await quizSet.save()
      res.status(201).json(doc)
    } catch (error) {
      res.status(500).json({ message: 'Error occured while saving', error })
    }
  },
  getByShortCode: async (req, res) => {
    const { short_code } = req.params
    const data = await QuizSet.findOne({ shortCode: short_code })
      .populate('subject')
      .populate('questions')
    return res.status(200).json(data)
  },
  getQuizSetSlugs: async (req, res) => {
    try {
      const data = await QuizSet.find({}).select('slug')
      return res.status(200).json(data)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error occured while fetching records', err })
    }
  },
  list: async (req, res) => {
    const { limit = 10, page = 1 } = req.query
    const total = (await QuizSet.countDocuments()) || 0
    const quizSets = await QuizSet.find({}, null, {
      sort: { created_at: -1 },
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    })
      .populate('subject')
      .populate('questions')
    const quizSetsData = {
      page,
      nextPage: page + 1,
      prevPage: page - 1 > 0 ? page - 1 : null,
      count: Math.ceil(total / limit),
      total,
      quizSets
    }
    return res.status(200).json(quizSetsData)
  }
}
