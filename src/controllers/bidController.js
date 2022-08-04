import Bid from '../models/Bid'

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
  }
}
