import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    decription: {
      type: String
    },
    content: {
      type: String
    },
    author: {
      type: String,
      required: true
    },
    tags: {
      type: [String]
    }
  },

  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Field = mongoose.model('Blog', blogSchema)

export default Field
