import mongoose from 'mongoose'

const fieldSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Field = mongoose.model('Field', fieldSchema)

export default Field
