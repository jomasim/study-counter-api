import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    author: {
      type: String,
      required: true
    },

    body: {
      type: String,
      required: true
    },
    subject_code: {
      type: String,
      required: true
    },
    course_code: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Question = mongoose.model('Question', questionSchema)

export default Question
