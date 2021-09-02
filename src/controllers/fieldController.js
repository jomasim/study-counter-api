import Field from '../models/Field'

export default {
  add: (req, res) => {
    const data = req.body
    const field = new Field(data)
    field
      .save(data)
      .then(doc => res.status(201).json(doc))
      .catch(err =>
        res.status(500).json({ message: 'Error occured while saving', err })
      )
  },
  list: async (req, res) => {
    const fields = await Field.find({})
    return res.status(200).json(fields)
  }
}
