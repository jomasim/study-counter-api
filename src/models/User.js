import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String
    },
    profileImage: {
      type: String
    },
    aboutMe: {
      type: String
    },
    profession: {
      type: String
    },
    subjects: {
      type: Array,
      default: []
    },
    memberType: {
      type: String
    },
    emailVerified: {
      type: Boolean
    },
    status: {
      type: String
    },
    address: {
      type: String
    },
    phone: {
      type: String
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const User = mongoose.model('User', userSchema)

export default User
