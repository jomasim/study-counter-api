import { v4 as uuidv4 } from 'uuid'

export default {
  list: (req, res) => {
    return res.status(200).json([])
  },
  add: (req, res) => {
    return res.status(201).json({ message: 'artist added successfully' })
  }
}
