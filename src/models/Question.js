import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    questionType: {
      type: String,
      required: true
    },
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
    paperInfo: {
      type: Object
    },
    subject_code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field'
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    course_code: {
      type: String,
      required: true
    },
    tags: {
      type: Array
    },
    files: {
      type: Array
    },
    deadline: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'AVAILABLE'
    },
    answers: {
      type: Array,
      default: []
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Question = mongoose.model('Question', questionSchema)

export default Question
