import Bid from '../models/Bid'
import Question from '../models/Question'
import User from '../models/User'

export default {
  add: (req, res) => {
    const user = res.locals.user.user_id
    const data = req.body
    data.user = user
    const bid = new Bid(data)
    bid
      .save(data)
      .then(doc => res.status(201).json(doc))
      .catch(err =>
        res.status(500).json({ message: 'Error occured while saving', err })
      )
  },
  list: async (req, res) => {
    const bids = await Bid.find({})
    return res.status(200).json(bids)
  },
  listByQuestion: async (req, res) => {
    const { question_id } = req.params
    const bids = await Bid.find({ question: question_id })
    return res.status(200).json(bids)
  },
  acceptBid: async (req, res) => {
    const { id } = req.params
    try {
      Bid.findOneAndUpdate(
        { _id: id },
        { status: 'ACCEPTED' },
        { upsert: true },
        (err, data) => {
          if (err) {
            return res.status(400).send(err)
          }
          // update question status
          Question.findOneAndUpdate(
            { _id: data.question },
            { status: 'IN_PROGRESS' },
            { upsert: true },
            (err, _) => {
              if (err) {
                return res.status(400).send(err)
              }
              return res.status(200).send(data)
            }
          )
        }
      )
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  getTutorInProgress: async (req, res) => {
    try {
      const user = res.locals.user.user_id
      const { limit = 10, page = 1 } = req.query
      const total =
        (await Bid.countDocuments({ user, status: 'ACCEPTED' })) || 0
      const bids = await Bid.find({ user, status: 'ACCEPTED' }, null, {
        sort: { created_at: -1 },
        limit: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit)
      }).populate('question')
      const questions = bids.map(bid => bid.question)
      const questionData = {
        page,
        nextPage: page + 1,
        prevPage: page - 1 > 0 ? page - 1 : null,
        count: Math.ceil(total / limit),
        questions
      }
      return res.status(200).json(questionData)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  getTutorCompleted: async (req, res) => {
    try {
      const user = res.locals.user.user_id
      const { limit = 10, page = 1 } = req.query
      const total =
        (await Bid.countDocuments({ user, status: 'COMPLETED' })) || 0
      const bids = await Bid.find({ user, status: 'COMPLETED' }, null, {
        sort: { created_at: -1 },
        limit: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit)
      }).populate('question')
      const questions = bids.map(bid => bid.question)
      const questionData = {
        page,
        nextPage: page + 1,
        prevPage: page - 1 > 0 ? page - 1 : null,
        count: Math.ceil(total / limit),
        questions
      }
      return res.status(200).json(questionData)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  getTutorStats: async (req, res) => {
    try {
      const user = res.locals.user.user_id
      const completed =
        (await Bid.countDocuments({ user, status: 'COMPLETED' })) || 0
      const inProgress =
        (await Bid.countDocuments({ user, status: 'ACCEPTED' })) || 0
      const available =
        (await Question.countDocuments({
          $or: [{ status: 'available' }, { status: 'AVAILABLE' }]
        })) || 0
      const stats = { completed, inProgress, available }
      return res.status(200).json(stats)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  bidByUser: async (req, res) => {
    const { question_id } = req.params
    const user = res.locals.user
    try {
      const bid = await Bid.findOne({
        user: user.user_id,
        question: question_id
      }).lean()
      const profile = await User.findOne({ email: user.email })
      bid.user = profile
      res.status(200).json(bid)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}
