import mongoose from 'mongoose'

const quizSetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field'
    }
  },
  {
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
