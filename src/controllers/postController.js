import Post from '../models/Post'
export default {
  create: async (req, res) => {
    const author = res.locals.user.user_id
    const { title, content, tags } = req.body
    const post = new Post({ title, author, content, tags })
    post
      .save()
      .then(async doc => {
        return res.status(201).json({
          statusCode: 201,
          message: 'Fetched post',
          data: {
            post: doc || {}
          }
        })
      })
      .catch(err => {
        res.status(500).json({ message: 'Error occured while saving', err })
      })
  },
  getAll: async (req, res) => {
    const posts = await Post.find({}, null, { sort: { created_at: -1 } })
    return res.status(200).json({
      statusCode: 200,
      message: 'Fetched all posts',
      data: { posts }
    })
  },
  getById: async (req, res) => {
    const post = await Post.findById(req.params.id)
    return res.status(200).json({
      statusCode: 200,
      message: 'Fetched post',
      data: {
        post: post || {}
      }
    })
  },
  updateById: async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      title,
      author,
      content,
      tags
    })

    return res.status(200).json({
      statusCode: 200,
      message: 'Updated post',
      data: { post }
    })
  }
}
