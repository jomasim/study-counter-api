import mongoose from 'mongoose'

const quizItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array
    },
    answer: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
  },

  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const QuizItem = mongoose.model('QuizItem', quizItemSchema)

export default QuizItem
