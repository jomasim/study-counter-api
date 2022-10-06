import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    fuid: {
      type: String,
      default: null
    },
    externalId: {
      type: String,
      default: null
    },
    username: {
      type: String,
      default: null
    },
    firstName: {
      type: String,
      default: null
    },
    lastName: {
      type: String,
      default: null
    },
    profileImage: {
      type: String,
      default: null
    },
    aboutMe: {
      type: String,
      default: null
    },
    country: {
      type: Object,
      default: null
    },
    timeZone: {
      type: Object,
      default: null
    },
    profession: {
      type: String,
      default: null
    },
    subjects: {
      type: Array,
      default: []
    },
    memberType: {
      type: String
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      default: null
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const User = mongoose.model('User', userSchema)

export default User
