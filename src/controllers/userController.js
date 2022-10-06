import admin from 'firebase-admin'
import User from '../models/User'
export default {
  createUser: async (req, res) => {
    try {
      const { password, email, role = 'student' } = req.body
      const user = await admin.auth().createUser({
        password,
        email
      })
      // firebase user uid
      const { uid } = user 
      await admin.auth().setCustomUserClaims(uid, { role })
      const userProfile = new User({
        email: user.email,
        emailVerified: user.emailVerified,
        memberType: role,
        fuid: uid
      })
      await userProfile.save()
      const current_year = new Date().getFullYear()
      const prefix = String(userProfile._id).slice(0, 7)
      const externalId = `${prefix}-${current_year}`
      // update external id as first 6 chars of id and year
      await User.updateOne({ _id: userProfile._id }, { $set: { externalId } })
      return res.status(201).send({ user: userProfile })
    } catch (err) {
      return res.status(400).send(err)
    }
  },
  getUserProfile: async (req, res) => {
    const email = res.locals.user.email
    try {
      const profile = await User.findOne({ email })
      res.status(200).send(profile)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  updateUserProfile: async (req, res) => {
    const email = res.locals.user.email
    try {
      const profile = await User.findOne({ email })
      if (!profile) {
        return res.status(400).send({ message: 'User with profile not found!' })
      }
      User.findOneAndUpdate({ _id: profile._id }, req.body, (err, data) => {
        if (err) {
          return res.status(400).send(err)
        }
        return res.status(200).send(data)
      })
    } catch (error) {
      res.status(400).send(error)
    }
  }
}
