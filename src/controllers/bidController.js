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
            console.log('home', err)
            return res.status(400).send(err)
          }
          return res.status(200).send(data)
        }
      )
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  bidByUser: async (req, res) => {
    const { question_id } = req.params
    const user = res.locals.user.user_id
    try {
      const bid = await Bid.findOne({ user, question: question_id })
      res.status(200).json(bid)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}
