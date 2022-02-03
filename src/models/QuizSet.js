import mongoose from 'mongoose'

const quizSetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field'
    },
    shortCode: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizItem'
      }
    ]
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const QuizSet = mongoose.model('QuizSet', quizSetSchema)

export default QuizSet
