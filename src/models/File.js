import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema(
  {
    title: {
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
    },
    url: {
      type: String,
      required: true
    },
    metaInfo: {
      type: Object,
      default: {}
    },
    instructions: {
      type: String
    },
    owner: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const File = mongoose.model('File', FileSchema)

export default File
