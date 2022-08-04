import mongoose from 'mongoose'

const bidSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Bid = mongoose.model('Bid', bidSchema)

export default Bid
