import file from '@babel/core/lib/transformation/file/file'
import File from '../models/File'

export default {
  add: (req, res) => {
    const data = req.body
    const owner = res.locals.user.user_id
    data['owner'] = owner
    const file = new File(data)
    file
      .save(data)
      .then(doc => res.status(201).json(doc))
      .catch(err =>
        res.status(500).json({ message: 'Error occured while saving', err })
      )
  },
  list: async (req, res) => {
    try {
      const files = await File.find({})
      return res.status(200).json(files)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching  files', error })
    }
  },
  listByOwner: async (req, res) => {
    try {
      const owner = res.locals.user.user_id
      const files = await File.find({ owner })
      return res.status(200).json(files)
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error fetching user files', error })
    }
  },
  userFileStats: async (req, res) => {
    try {
      const owner = res.locals.user.user_id
      //    file stats
      const files = await File.find({ owner }).select('metaInfo')
      const totalFileSize = files.reduce((prev, cur) => {
        const size = cur.metaInfo.size || 0
        prev += size
        return prev
      }, 0)

      return res
        .status(200)
        .json({ totalFileSize, totalFiles: files.length || 0 })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error fetching user file stats', error })
    }
  }
}
